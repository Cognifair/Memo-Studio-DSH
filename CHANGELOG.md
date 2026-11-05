# 更新记录

## v0.1.2 — 2026-11-05

影响面：产品命名与最新开发版同步（client.js、index.js、status.js、progress.js、update.js、locale、README、INSTALL.md）

- 产品名改为 **Memo Studio（DSH）**；技术包名/仓库保留 `dsh-memo-skill-island`，避免破坏已安装用户的安装与更新路径。
- 同步本地最新开发版：动效、状态、进度与上传视图；离线测试 59 项通过。
- 安装器保留 SHA256 校验与 DSH `plugin_manager` 命令输出。

## v0.1.1 — 2026-11-05

影响面：安装分发（INSTALL.md、install.ps1、install.cmd、package.json、README）

- 新增 Windows 安装脚本：下载最新 Release、校验 SHA256、解压到固定目录，并复制 `plugin_manager install_bundle` 命令。
- 新增 `INSTALL.md`：脚本安装、手动安装、卸载和边界说明。
- `package.json` 移除 `private` 限制，补充 npm 公开发布元数据；npm 包尚未实际发布。
- 修正 README 的安装入口，不再要求用户手动拼路径。

首个公开版本 v0.1.0（2026-11-05）：技能指南、会话状态与技能运行指示、上传登记发现及进度展示、GitHub Release 更新检查。
