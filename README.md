# 全球时钟 (Global Clock)

一个具有科技感的全球主要城市时钟展示应用，以9宫格形式展示不同城市的实时时间。

![全球时钟预览](https://github.com/cypggs/global-clock/raw/main/preview.png)

## 功能特点

- **9宫格布局**：清晰展示全球主要城市的时间
- **双重时钟显示**：同时提供模拟时钟和数字时钟显示
- **科技感设计**：采用现代化UI设计，具有浓厚的科技感
- **响应式布局**：完美适配电脑和手机等各种设备
- **自定义城市**：用户可以根据需要自定义显示的城市
- **全屏模式**：支持全屏显示，提供更佳的视觉体验
- **本地存储**：记住用户的城市选择，下次访问时自动恢复

## 预设城市

应用默认显示以下9个全球主要城市的时间：

1. 北京（中国）
2. 纽约（美国）
3. 伦敦（英国）
4. 东京（日本）
5. 悉尼（澳大利亚）
6. 莫斯科（俄罗斯）
7. 迪拜（阿联酋）
8. 巴黎（法国）
9. 里约热内卢（巴西）

此外，用户还可以从更多城市中进行选择，包括新德里、开罗、约翰内斯堡、洛杉矶等。

## 技术实现

- 纯前端实现，使用HTML5、CSS3和JavaScript
- 使用CSS Grid实现响应式9宫格布局
- 使用JavaScript Date对象和toLocaleString方法处理不同时区的时间
- 使用LocalStorage保存用户自定义设置
- 使用FlagCDN提供国旗图标

## 本地运行

1. 克隆仓库到本地：
   ```
   git clone https://github.com/cypggs/global-clock.git
   ```

2. 进入项目目录：
   ```
   cd global-clock
   ```

3. 使用任意HTTP服务器运行项目，例如：
   ```
   npx serve src
   ```
   
4. 在浏览器中访问 `http://localhost:3000` 即可查看应用

## Vercel一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fcypggs%2Fglobal-clock)

### 手动部署到Vercel步骤

1. Fork 本仓库到你的GitHub账户

2. 登录 [Vercel](https://vercel.com/)，如果没有账号请先注册

3. 在Vercel控制台中点击 "New Project"

4. 从GitHub导入你fork的仓库

5. 配置项目：
   - Framework Preset: 选择 "Other"
   - Root Directory: 保持默认
   - Build Command: 留空
   - Output Directory: `src`

6. 点击 "Deploy" 按钮

7. 部署完成后，Vercel会提供一个域名，通过该域名即可访问你部署的全球时钟应用

## 自定义和开发

### 添加新城市

如需添加更多城市，请编辑 `cities.js` 文件中的 `availableCities` 数组：

```javascript
{
  name: "城市名称",
  country: "国家名称",
  timezone: "时区标识", // 例如: "Asia/Shanghai"
  flag: "国旗URL"       // 例如: "https://flagcdn.com/cn.svg"
}
```

### 修改样式

项目的样式定义在 `styles.css` 文件中，你可以根据需要修改颜色、字体、动画等样式。

## 许可证

MIT

## 作者

[cypggs](https://github.com/cypggs)
