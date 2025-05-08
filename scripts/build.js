const fs = require('fs');
const products = require('./products.json');

function generateHTML(products) {
  return `<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>七点科技产品展示</title>
  <style>
    body {
      font-family: sans-serif;
      background: #f9f9f9;
      padding: 2rem;
      max-width: 1200px;
      margin: auto;
    }
    .product-card {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.08);
      overflow: hidden;
      margin-bottom: 2rem;
    }
    .product-card img {
      width: 100%;
      height: 220px;
      object-fit: cover;
    }
    .product-card .info {
      padding: 1rem;
      text-align: center;
    }
    .product-card h3 {
      margin: 0.5rem 0;
      color: #003366;
    }
    .product-card p {
      color: #555;
      font-size: 0.95rem;
    }
    .product-card a {
      display: inline-block;
      margin-top: 1rem;
      background: #007bff;
      color: #fff;
      padding: 0.5rem 1.2rem;
      text-decoration: none;
      border-radius: 6px;
    }
  </style>
</head>
<body>
  <h1 style="text-align:center; color:#003366;">七点科技 · 产品展示</h1>
  ${products.map(p => `
    <div class="product-card">
      <img src="\${p.icon}" alt="\${p.name}">
      <div class="info">
        <h3>\${p.name}</h3>
        <p>\${p.description}</p>
        <a href="\${p.link}" target="_blank">访问产品</a>
      </div>
    </div>
  `).join('')}
</body>
</html>`;
}

const html = generateHTML(products);
fs.writeFileSync('index.html', html);
console.log('✅ index.html 已生成');
