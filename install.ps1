[CmdletBinding()]
param(
    [string]$Destination = (Join-Path $env:LOCALAPPDATA "MemoCardest\island"),
    [string]$Tag = "latest"
)

$ErrorActionPreference = "Stop"
$repo = "Cognifair/dsh-memo-skill-island"
$api = if ($Tag -eq "latest") {
    "https://api.github.com/repos/$repo/releases/latest"
} else {
    "https://api.github.com/repos/$repo/releases/tags/$Tag"
}

Write-Host "Memo Studio 安装器" -ForegroundColor Cyan
Write-Host "查询 $repo 的 Release..." -ForegroundColor Cyan
$release = Invoke-RestMethod -Uri $api -Headers @{ "User-Agent" = "memo-island-installer" }
$version = $release.tag_name.TrimStart("v")
$tgz = $release.assets | Where-Object { $_.name -like "*.tgz" } | Select-Object -First 1
$sums = $release.assets | Where-Object { $_.name -eq "SHA256SUMS.txt" } | Select-Object -First 1
if (-not $tgz -or -not $sums) {
    throw "Release 缺少 .tgz 或 SHA256SUMS.txt；请到 Release 页面手动下载。"
}

$tmp = Join-Path $env:TEMP ("memo-island-" + [guid]::NewGuid().ToString("N"))
New-Item -ItemType Directory -Path $tmp | Out-Null
try {
    $tgzPath = Join-Path $tmp $tgz.name
    $sumsPath = Join-Path $tmp "SHA256SUMS.txt"
    Write-Host "下载 $($tgz.name) ..." -ForegroundColor Cyan
    Invoke-WebRequest -UseBasicParsing -Uri $tgz.browser_download_url -OutFile $tgzPath
    Invoke-WebRequest -UseBasicParsing -Uri $sums.browser_download_url -OutFile $sumsPath

    $line = Get-Content $sumsPath | Where-Object { $_ -match [regex]::Escape($tgz.name) } | Select-Object -First 1
    if (-not $line) { throw "SHA256SUMS.txt 中没有 $($tgz.name)。" }
    $expected = ($line -split "\s+")[0].ToLowerInvariant()
    $actual = (Get-FileHash -Algorithm SHA256 -Path $tgzPath).Hash.ToLowerInvariant()
    if ($expected -ne $actual) {
        throw "SHA256 校验失败：期望 $expected，实际 $actual。已停止，不解压。"
    }
    Write-Host "SHA256 校验通过。" -ForegroundColor Green

    $target = Join-Path $Destination $version
    if (Test-Path $target) {
        Write-Host "移除同版本旧目录：$target" -ForegroundColor Yellow
        Remove-Item -LiteralPath $target -Recurse -Force
    }
    New-Item -ItemType Directory -Path $target -Force | Out-Null
    Write-Host "解压到 $target ..." -ForegroundColor Cyan
    tar -xzf $tgzPath -C $target
    if ($LASTEXITCODE -ne 0) { throw "解压失败（tar exit $LASTEXITCODE）。" }

    $packageDir = Get-ChildItem -LiteralPath $target -Directory |
        Where-Object { Test-Path (Join-Path $_.FullName "package.json") } |
        Select-Object -First 1
    if (-not $packageDir) { throw "解压后没有找到包含 package.json 的目录。" }

    $command = "plugin_manager install_bundle  target = $($packageDir.FullName)"
    try { Set-Clipboard -Value $command } catch { }
    Write-Host ""
    Write-Host "安装包已就绪：" -ForegroundColor Green
    Write-Host $packageDir.FullName
    Write-Host ""
    Write-Host "在 DSH 桌面端的会话里粘贴并发送：" -ForegroundColor Cyan
    Write-Host $command -ForegroundColor Yellow
    Write-Host ""
    Write-Host "命令已尝试复制到剪贴板。安装后若没有出现胶囊，重启 DSH 桌面端。" -ForegroundColor DarkGray
}
finally {
    Remove-Item -LiteralPath $tmp -Recurse -Force -ErrorAction SilentlyContinue
}
