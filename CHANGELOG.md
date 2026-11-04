# 更新记录

## v0.1.1 — 2026-11-05

影响面：安装分发（INSTALL.md、install.ps1、install.cmd、package.json、README）

- 新增 Windows 安装脚本：下载最新 Release、校验 SHA256、解压到固定目录，并复制 `plugin_manager install_bundle` 命令。
- 新增 `INSTALL.md`：脚本安装、手动安装、卸载和边界说明。
- `package.json` 移除 `private` 限制，补充 npm 公开发布元数据；npm 包尚未实际发布。
- 修正 README 的安装入口，不再要求用户手动拼路径。

首个公开版本 v0.1.0（2026-11-05）：技能指南、会话状态与技能运行指示、上传登记发现及进度展示、GitHub Release 更新检查。
