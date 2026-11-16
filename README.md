# Movora

本地预览：双击 `index.html`，或双击 `启动网站.command` 通过本地服务器打开。

- `index.html`：入口。
- `study.js` / `study.css`：流程与视觉样式。
- `assets/指导语.docx`：研究指导语来源。
- `assets/dramas.xlsx`：12个电影标题，Genre / ItemNumber / Title。
- `assets/poster/`：12幅海报，按编号每两张对应一个genre。
- `assets/NeedForArousal.png`：情感需求网格原图。
- `assets/brand/Movora Logo.png`：平台标识。
- `research/word-paragraphs.json`：从Word提取的网站文案。
- `content/local-preview.js`：直接双击HTML时使用的文案与Excel快照。
- `vendor/xlsx.full.min.js`、`xlsx.LICENSE`：Excel读取库及许可。

修改Word/Excel后须同步文案JSON和本地预览快照。HTTP方式直接读取assets/dramas.xlsx。

当前为本地预览，问卷完成后可点击 Start a new preview 重新预览；重新访问已结束的预览会自动从头开始；没有连接云端数据库或Connect正式提交。

完成码配置在 study-config.js，沿用原站代码 8B361969E9；新项目招募前请核对。显示完成码不代表云端提交成功。
