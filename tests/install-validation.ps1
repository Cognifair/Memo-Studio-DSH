$ErrorActionPreference = 'Stop'
$installer = Join-Path (Split-Path $PSScriptRoot) 'install.ps1'
$root = Join-Path $env:TEMP ('memo-install-test-' + [guid]::NewGuid().ToString('N'))
$dest = Join-Path $root 'installs'
$good = & $installer -Source (Split-Path $PSScriptRoot) -Destination $dest
if (-not (Test-Path (Join-Path $good 'package.json'))) { throw 'No good snapshot' }
$fixture = Join-Path $root 'bad'
Copy-Item -LiteralPath $good -Destination $fixture -Recurse
$manifest = Join-Path $fixture 'package.json'
$bytes = [IO.File]::ReadAllBytes($manifest)
[IO.File]::WriteAllBytes($manifest, [byte[]](239,187,191) + $bytes)
$rejected = $false
try { & $installer -Source $fixture -Destination $dest } catch { $rejected = $_.Exception.Message -match 'BOM' }
if (-not $rejected) { throw 'BOM not rejected' }
[IO.File]::WriteAllBytes($manifest,$bytes)
$locale = Join-Path $fixture 'locale/en.json'
$localeBytes = [IO.File]::ReadAllBytes($locale)
[IO.File]::WriteAllBytes($locale, [byte[]](239,187,191) + $localeBytes)
$rejected = $false
try { & $installer -Source $fixture -Destination $dest } catch { $rejected = $_.Exception.Message -match 'BOM' }
if (-not $rejected) { throw 'Locale BOM not rejected' }
[IO.File]::WriteAllBytes($locale,$localeBytes)
Rename-Item -LiteralPath (Join-Path $fixture 'client.js') -NewName 'client.missing'
$rejected = $false
try { & $installer -Source $fixture -Destination $dest } catch { $rejected = $_.Exception.Message -match 'Missing or unsafe' }
if (-not $rejected) { throw 'Missing entry not rejected' }
if (@(Get-ChildItem -LiteralPath $dest -Directory).Count -ne 1) { throw 'Invalid package created install' }
if (-not (Test-Path (Join-Path $good 'client.js'))) { throw 'Good snapshot changed' }
Write-Output 'PASS: local snapshot, BOM rejection, locale BOM rejection, missing entry rejection, old snapshot preserved'
