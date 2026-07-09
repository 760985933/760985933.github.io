# 主站导航 · 760985933.github.io

个人学习 & 项目导航主页，纯静态、无后端、可离线访问。

视觉与交互风格复用 [`esp32-learning`](https://760985933.github.io/esp32-learning) 项目（暖橙主题、亮/暗/跟随系统）。

## 本地预览

```bash
python3 -m http.server 8099
# 打开 http://localhost:8099
```

## 部署（GitHub Pages 用户站点）

1. 在 GitHub 新建仓库，名称必须为 **`760985933.github.io`**（用户站点仓库）。
2. 把本目录内容推上去：

   ```bash
   cd 760985933.github.io
   git init
   git add .
   git commit -m "add main site navigation"
   git branch -M main
   git remote add origin git@github.com:760985933/760985933.github.io.git
   git push -u origin main
   ```

3. 仓库 Settings → Pages → Source 选 `main` 分支 `/ (root)`。
4. 稍等片刻，访问 <https://760985933.github.io> 即可。

> 说明：`/esp32-learning` 是另一个独立仓库 `esp32-learning` 以「项目站点」方式自动发布的，
> 路径正是 `用户名.github.io/仓库名`，与本站共存，无需放进本仓库。

## 新增项目

编辑 `assets/app.js` 里的 `PROJECTS` 数组，追加一条：

```js
{ icon: "🧩", title: "新项目", desc: "一句话简介", url: "/new-project/", status: "live", tag: "已上线" }
```

`status: "soon"` 的卡片显示为「敬请期待」虚线占位，不影响上线。
