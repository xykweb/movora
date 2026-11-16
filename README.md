# Movora

本地预览：双击index.html，或双击启动网站.command。

网站运行文件：
- index.html：入口。
- app.js：全部自定义运行代码、公开配置和双击预览内容快照。
- study.css：视觉样式。
- vendor/xlsx.full.min.js及许可：第三方Excel读取库。
- assets/：图片、Word和Excel来源文件。
- research/：研究约定、数据字典及文案JSON。
- supabase/：建表/升级SQL、Edge Function及配置说明，不需要上传到GitHub Pages。

GitHub更新时，以本目录为准，删除旧startup.js、study.js、tracking.js、cloud-save.js、recaptcha.js、study-config.js及content/local-preview.js。不要修改远程数据库或删除数据表。公开配置在app.js内搜索MOVORA_CONFIG；Secret Key不能放入app.js。

线上及本地服务器读取assets/dramas.xlsx。直接双击HTML使用app.js内置快照；更新Excel后需同步内置快照。所有历史分配保留实际标题版本。

Supabase Edge Function在服务器运行，不能并入公开网页app.js。
