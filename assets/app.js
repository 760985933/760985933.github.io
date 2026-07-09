/* ============================================================
   主站导航 · 交互逻辑
   1) 主题切换 (亮 / 暗 / 跟随系统)，与 esp32-learning 保持一致
   2) 项目卡片数据驱动渲染，方便以后新增
   ============================================================ */

/* ---------- 主题 ---------- */
(function () {
  const root = document.documentElement;
  const STORE = "site-theme";
  const btns = Array.from(document.querySelectorAll(".theme-btn"));

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    btns.forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.themeSet === theme))
    );
  }

  function initial() {
    const saved = localStorage.getItem(STORE);
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  apply(initial());

  btns.forEach((b) =>
    b.addEventListener("click", () => {
      const t = b.dataset.themeSet;
      localStorage.setItem(STORE, t);
      apply(t);
    })
  );

  // 跟随系统时，随系统变化
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (localStorage.getItem(STORE) === "system" || !localStorage.getItem(STORE)) {
        apply(e.matches ? "dark" : "light");
      }
    });
})();

/* ---------- 项目数据 ----------
   以后新增项目：在 PROJECTS 数组里加一条即可，
   字段：icon(emoji/SVG) title desc url status("live"|"soon") tag
*/
const PROJECTS = [
  {
    icon: "🔌",
    title: "ESP32 学习路线",
    desc: "从零基础到专家的交互式课程。电流像水流、PWM 像快闪的灯，配 15+ 可玩演示。",
    url: "https://760985933.github.io/esp32-learning/",
    status: "live",
    tag: "已上线",
  },
];

(function render() {
  const grid = document.getElementById("project-grid");
  if (!grid) return;

  grid.innerHTML = PROJECTS.map((p) => {
    const isLive = p.status === "live";
    const tagClass = isLive ? "tag live" : "tag soon";
    const cardClass = isLive ? "card" : "card placeholder";
    const href = isLive ? p.url : "javascript:void(0)";
    const go = isLive ? '<span class="go">→</span>' : "";
    const ext = isLive ? ' target="_blank" rel="noopener"' : '';
    return `
      <a class="${cardClass}" href="${href}"${ext}>
        <div class="ic">${p.icon}</div>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="meta">
          <span class="${tagClass}">${p.tag}</span>
          ${go}
        </div>
      </a>`;
  }).join("");
})();
