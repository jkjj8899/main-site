# 🧠 七点科技 · 产品中心

欢迎访问七点科技的产品展示平台。  
本系统基于 GitHub 构建，所有产品均通过仓库独立维护，主站将它们自动汇总展示，实现智能联动。

---

## 🛠️ 技术能力简介

- ✅ GitHub 仓库即产品，无需服务器
- ✅ 自动收集 `.product.json` → 展示产品列表
- ✅ 所有页面纯静态部署，可被 Google 收录
- ✅ 支持产品仓库扩展页面、组件、API 等

---

## 🧩 产品列表

我们已发布的产品如下，点击访问了解详情：

<div id="product-list" style="display: flex; flex-wrap: wrap; gap: 20px;"></div>

<script>
fetch('products.json')
  .then(res => res.json())
  .then(products => {
    const container = document.getElementById('product-list');
    container.innerHTML = products.map(p => `
      <div style="width: 240px; padding: 16px; border: 1px solid #ccc; border-radius: 8px;">
        <img src="${p.icon}" alt="${p.name}" style="width: 100%; height: auto; border-radius: 6px;" />
        <h3 style="margin-top: 12px;">${p.name}</h3>
        <p style="font-size: 14px; color: #666;">${p.description}</p>
        <a href="${p.link}" target="_blank" style="color: blue;">访问产品页面</a>
      </div>
    `).join('')
  })
</script>

---

## 📜 项目背景

我们希望以最简洁高效的方式发布和管理产品：

- 每个产品是一个公开仓库，具备独立文档与展示页
- 主站统一收集产品列表，展示最新功能
- 所有内容皆托管于 GitHub，可持续自动化维护

---

## 📬 联系我们

- 官网地址：[https://3xex.com](https://3xex.com)
- Telegram：[t.me/你的频道](https://t.me/xxx)

感谢你的访问！
