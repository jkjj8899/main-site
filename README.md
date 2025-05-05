---
home: true
heroText: 七点科技 · 产品中心
tagline: 用 GitHub 仓库做大脑，自动扩展多产品展示页
actions:
  - text: 创建新产品
    link: /guide/tech.html
    type: primary
features:
  - title: 自动扩展
    details: 每个产品仓库自动注册到主站
  - title: GitHub 驱动
    details: 全站部署于 GitHub Pages，无需服务器
  - title: 产品互联
    details: 所有产品页面自动互相链接
---
---

## 🧩 当前产品列表

<div id="product-list" style="display: flex; flex-wrap: wrap; gap: 16px;"></div>

<script>
fetch('/products.json')
  .then(res => res.json())
  .then(products => {
    const container = document.getElementById('product-list')
    container.innerHTML = products.map(p => `
      <div style="border: 1px solid #ccc; padding: 1rem; width: 240px; border-radius: 8px;">
        <img src="${p.icon}" alt="${p.name}" style="height: 64px;" />
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <a href="${p.link}" target="_blank">访问产品</a>
      </div>
    `).join('')
  })
</script>

### 🧩 当前产品（自动生成区域）

<!-- 自动插入产品卡片 -->
<div id="product-list"></div>

<script>
fetch('/products.json')
  .then(res => res.json())
  .then(products => {
    const container = document.getElementById('product-list')
    container.innerHTML = products.map(p => `
      <div style="margin-bottom: 1rem; border: 1px solid #ccc; padding: 1rem;">
        <img src="${p.icon}" style="height: 80px;" />
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <a href="${p.link}" target="_blank">访问产品</a>
      </div>
    `).join('')
  })
</script>
