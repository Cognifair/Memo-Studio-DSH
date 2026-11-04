# 墨卡大师灵动岛 v0.1.1

DSH 桌面端插件：技能指南、会话状态、技能启用指示与 API 上传进度。

## 安装

**推荐：** 从 [Releases](https://github.com/Cognifair/dsh-memo-skill-island/releases/latest) 下载 `install.cmd` 和 `install.ps1`，双击 `install.cmd`。脚本会下载最新正式版、校验 SHA256、解压到固定目录，并复制一条 `plugin_manager install_bundle` 命令；把它粘贴到 DSH 桌面端即可。

完整步骤、手动安装、卸载与边界见 [INSTALL.md](https://github.com/Cognifair/dsh-memo-skill-island/blob/main/INSTALL.md)。

npm 包名已准备为 `dsh-memo-skill-island`，**目前尚未发布**；发布后可以直接在 DSH 里说「把 dsh-memo-skill-island 装上」。在那之前请使用 Releases 安装脚本。

安装或更新宿主代码后，在没有活跃上传任务时重启 DSH。客户端与宿主必须使用同一版本。不要直接把 GitHub 的 Source code 压缩包当作安装包。

## 使用

点击顶部胶囊打开技能指南；左栏选择功能，右栏查看说明、复制示例。它不会自行执行制卡或上传。

上传进度需要 Memo-Cardest 的 upload_task.py 与 change_journal.py 配合。插件只观察登记与清单，不执行写卡；未接入的旧脚本仅支持兼容检测。此包不包含技能、凭证或用户上传记录。

## 更新

启动后后台检查 Cognifair/dsh-memo-skill-island 的正式 GitHub Release；有新版本时通过界面入口查看更新。第一版提供发布页/下载入口，不自动覆盖本地开发目录或强制重启。当前版本没有新版提示属于正常情况。

## 验证与边界

执行 `node --test tests/*.test.mjs` 运行离线测试。首版测试使用模拟宿主、模拟网络和脱敏夹具；真实 DSH 安装包升级及真实写卡未验收。

## 文件

`index.js` 为宿主入口，`client.js` 为界面，`status.js` 为会话归约，`progress.js` 为进度读取，`update.js` 与 `update-config.js` 为版本检查，`cordis.patch.yml` 为插件声明，`install.ps1` / `install.cmd` 为安装脚本。

## 许可与参考

请阅读 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。Glyph Roll/Svelte 许可随包附带。动画参考实现存在未声明许可的上游，本版本不声称整个包均受 MIT 授权。
