# 孕妇备产清单｜腾讯云 CloudBase 版

这个版本使用腾讯云 CloudBase 做国内可访问的静态网页托管、云数据库和图片云存储。家人打开同一个链接后，勾选状态、新增/编辑/删除物品、分类调整和图片都会同步到同一份云端清单。

## 1. 创建 CloudBase 环境

1. 打开腾讯云 CloudBase 控制台：https://tcb.cloud.tencent.com/dev
2. 新建一个环境，地域建议选择「上海 / ap-shanghai」。
3. 记录环境 ID，例如：`xxx-123456`。
4. 开通以下能力：
   - 静态网站托管：用于发布网页。
   - 云数据库：用于保存清单。
   - 云存储：用于保存上传的物品图片。
   - 身份认证 → 匿名登录：用于让家人无需注册即可读写云端数据。

## 2. 创建数据库集合

在 CloudBase 控制台进入「数据库」，新建集合：

```text
checklist_items
```

本项目会在集合中维护一个固定文档：

```text
shared
```

文档结构由网页首次打开时自动写入，大致如下：

```json
{
  "items": [],
  "updatedAt": 0,
  "version": "cloudbase-v1"
}
```

## 3. 配置安全规则

为了让外部家人打开链接后可以同步清单，需要开启匿名登录，并允许已登录匿名用户读写这个集合。

数据库集合 `checklist_items` 可配置为：

```json
{
  "read": "auth != null",
  "write": "auth != null"
}
```

云存储权限可配置为：

```json
{
  "read": "auth != null",
  "write": "auth != null"
}
```

> 这是家庭共享清单的便捷方案：拿到链接的人可以编辑。后续如果要改成只有你能编辑、家人只能查看，可以再加登录或云函数权限控制。

## 4. 配置前端环境 ID

复制示例配置：

```bash
cp config.example.js config.js
```

然后编辑 `config.js`：

```js
window.CLOUDBASE_ENV_ID = "baby-bag-checklist-d2c763786b57f";
window.CLOUDBASE_REGION = "ap-shanghai";
window.CLOUDBASE_COLLECTION = "checklist_items";
```

如果通过 CloudBase / GitHub 自动构建，也可以设置环境变量：

```text
CLOUDBASE_ENV_ID=baby-bag-checklist-d2c763786b57f
CLOUDBASE_REGION=ap-shanghai
CLOUDBASE_COLLECTION=checklist_items
```

构建时会由 `build-config.js` 自动生成 `config.js`。

## 5. 本地预览

这个项目是纯静态页面，可以直接打开 `index.html` 预览 UI。未填写 CloudBase 环境 ID 时，会显示「待配置」，并使用浏览器本地缓存。

如果要测试云端同步，需要：

1. 完成上面的 CloudBase 环境、匿名登录、数据库集合和安全规则配置。
2. 在 CloudBase 控制台「安全来源 / Web 安全域名」里加入本地调试域名或正式访问域名。
3. 通过本地静态服务或部署后的域名访问。

## 6. 部署到腾讯云静态网站托管

### 方式 A：控制台手动上传

1. 在 CloudBase 控制台进入「静态网站托管」。
2. 上传本目录下这些文件：
   - `index.html`
   - `config.js`
   - `vendor/cloudbase.full.js`
3. 上传完成后，用静态托管分配的公网域名访问。

### 方式 B：CloudBase CLI 部署

安装并登录 CloudBase CLI 后，在本目录执行：

```bash
npm run build
cloudbase hosting deploy . -e 你的 CloudBase 环境 ID
```

如果使用腾讯云控制台的 GitHub 自动部署，安装命令建议留空；构建命令保留 `npm run build`，构建产物目录填写 `./`。

> 注意：如果使用 CLI 部署，需要确保 `config.js` 已经生成，或者提前设置 `CLOUDBASE_ENV_ID` 环境变量。

## 7. 图片说明

配置 CloudBase 后，新上传图片会保存到云存储 `baby-bag/` 目录，数据库只保存 CloudBase fileID。页面展示时会自动换取临时访问链接。若 CloudBase 未配置成功，图片会临时退回为浏览器压缩后的本地数据，便于调试但不建议作为正式方案。
