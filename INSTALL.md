# 墨卡大师灵动岛 · 安装

这是 **DSH 桌面端插件**，不是技能。不要把它放进 `skills` 目录，也不要在 Codex / Claude Code 里安装。

## 方式 A：安装脚本（推荐）

1. 从 [Releases](https://github.com/Cognifair/dsh-memo-skill-island/releases/latest) 下载 `install.cmd` 与 `install.ps1`，放在同一个文件夹；
2. 双击 `install.cmd`，或在 PowerShell 运行：

   ```powershell
   powershell -NoProfile -ExecutionPolicy Bypass -File .\install.ps1
   ```

3. 脚本会下载最新正式版、校验 `SHA256SUMS.txt`、解压到 `%LOCALAPPDATA%\MemoCardest\island\<版本>`，并把安装命令复制到剪贴板；
4. 在 DSH 桌面端的会话里粘贴并发送脚本打印的命令：

   ```text
   plugin_manager install_bundle  target = <脚本输出的 package 路径>
   ```

5. 安装完成若没有出现胶囊，重启 DSH 桌面端；客户端与宿主需要使用同一版本。

脚本不会自动调用 DSH、不会自动覆盖旧版本、不会上传任何数据。

## 方式 B：手动下载

1. 在 Releases 下载 `dsh-memo-skill-island-<版本>.tgz` 和 `SHA256SUMS.txt`；
2. 校验：

   ```powershell
   Get-FileHash .\dsh-memo-skill-island-<版本>.tgz -Algorithm SHA256
   ```

   与 `SHA256SUMS.txt` 对应行一致才继续；
3. 解压到一个**固定、以后不会移动或删除**的目录：

   ```powershell
   tar -xzf .\dsh-memo-skill-island-<版本>.tgz -C D:\Plugins
   ```

4. 找到包含 `package.json` 的 `package` 目录；
5. 在 DSH 桌面端发送：

   ```text
   plugin_manager install_bundle  target = D:\Plugins\package
   ```

不要用 GitHub 的 “Source code” 压缩包代替发布包。

## 方式 C：npm（准备中）

npm 包名已准备为 `dsh-memo-skill-island`，但目前尚未发布。发布后可以直接在 DSH 里说：

```text
把 dsh-memo-skill-island 装上
```

或指定版本：

```text
plugin_manager install_bundle  target = dsh-memo-skill-island@<版本>
```

在 npm 正式发布前，请使用方式 A 或 B。

## 卸载

在 DSH 桌面端发送：

```text
plugin_manager remove_bundle  target = dsh-memo-skill-island
```

只想临时关闭：

```text
plugin_manager set_bundle  target = dsh-memo-skill-island  enabled = false
```

## 边界

- 只显示状态和技能指南，不执行制卡、上传或账户操作；
- 上传进度依赖 Memo-Cardest 的进度登记；
- 不自动安装更新，更新入口只打开版本说明；
- 第三方动画参考的许可边界见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。
