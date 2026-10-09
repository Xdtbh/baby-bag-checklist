# 孕妇备产清单｜公网部署版

这个版本改为使用 Supabase 保存清单数据，适合部署到 Vercel 后给外部家人访问。

## 1. 初始化 Supabase 数据表

在 Supabase Dashboard 中进入你的项目：

1. 打开 SQL Editor
2. 新建 Query
3. 粘贴并执行 `supabase-setup.sql` 的全部内容

执行后会创建 `checklist_items` 表，并开放匿名读写，方便无需登录的家人共同编辑。

## 2. Vercel 环境变量

在 Vercel 项目 Settings → Environment Variables 添加：

```text
SUPABASE_URL=https://ynxmaiwuepenquyopcql.supabase.co
SUPABASE_ANON_KEY=你的 Supabase anon public key
```

注意不要填写 `service_role` key。

## 3. Vercel 部署设置

Vercel 会自动读取：

- `package.json`：运行 `npm run build`
- `build-config.js`：根据环境变量生成 `config.js`
- `vercel.json`：将当前目录作为静态输出目录

部署完成后，网页会通过 Supabase 同步清单数据。

## 4. 图片说明

当前图片会在浏览器端压缩后存入 Supabase 数据表的 `images` JSON 字段。家庭清单少量图片够用；如果后续图片很多，可以再迁移到 Supabase Storage。
