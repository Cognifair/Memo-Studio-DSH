# 更新记录

## v0.1.7 — 2026-11-05

影响面：同步用户最终本地版本（client.js、THIRD_PARTY_NOTICES.md、tests/client.test.mjs、tests/motion-timing.test.mjs、package.json、README.md）

- 按本地正在使用的最终版本上传，不回滚本地：客户端 299911 字节。
- 同步最后的胶囊、状态、上传视图与动效修正；新增第三方图标/头像来源声明。
- 67 项离线测试通过；本地与仓库 `client.js` 哈希一致。

## v0.1.6 — 2026-11-05

影响面：客户端胶囊文案（client.js、package.json、README.md）

- 恢复并上传本地最新 GPT 修复：上传数字与标签保持垂直居中，标签空白不被吞。
- 离开品牌文案时不再保留旧 ghost，避免 “Memo Studio” 重叠残影；等待提示仍保留过渡。
- 60 项离线测试通过；本地与仓库 `client.js` 哈希一致。

## v0.1.5 — 2026-11-05

影响面：本地最新客户端恢复（client.js、tests/client.test.mjs、package.json、README.md）

- 恢复 2026-11-05 13:44 的本地最新备份：会话切换、复制模糊与等待提示等改动回到客户端。
- 测试夹具同步包含 `memoSessionSnapshots`，60 项离线测试通过。
- 仓库名与更新地址继续指向 `Memo-Studio-DSH`。

## v0.1.4 — 2026-11-05

影响面：GitHub 仓库改名与更新地址（README、INSTALL、package.json、update-config.js、install.ps1）

- GitHub 仓库从 `dsh-memo-skill-island` 改名为 `Memo-Studio-DSH`；GitHub 旧地址会重定向。
- 更新检查默认仓库、Release 链接、安装器下载地址和 package repository/homepage 全部指向新仓库。
- npm 包名保持 `dsh-memo-skill-island`，不破坏已有安装与 `plugin_manager` 路径。

## v0.1.3 — 2026-11-05

影响面：界面产品名（client.js、locale、README、package.json）

- 胶囊与面板产品名从 “Memo Studio（DSH）” 改为 “Memo Studio”；DSH 作为宿主平台在安装说明中保留。
- 技术包名/仓库仍为 `dsh-memo-skill-island`。

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
