// build.js

const fs = require('fs');
const path = require('path');

const products = JSON.parse(fs.readFileSync('./products.json', 'utf8'));
const header = fs.readFileSync('./components/header.html', 'utf8');
const footer = fs.readFileSync('./components/footer.html', 'utf8');

const cards = products.map(p => `
  <div class="product-card">
    <img src="${p.icon}" alt="${p.name}">
    <div class="card-content">
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <a href="${p.link}" target="_blank">访问产品</a>
    </div>
  </div>
`).join('\n');

fs.writeFileSync('../product-site/index.html', header + cards + footer);
console.log('✅ index.html 构建成功');
