const axios = require('axios');
const fs = require('fs');

const GH_TOKEN = process.env.GH_TOKEN;
const USERNAME = process.env.GH_USERNAME;
const SOURCE_REPO = 'main-site';

const headers = {
  Authorization: `token ${GH_TOKEN}`,
  Accept: 'application/vnd.github.v3+json',
};

(async () => {
  const res = await axios.get(`https://api.github.com/repos/${USERNAME}/${SOURCE_REPO}/contents/products.json`, { headers });
  const products = JSON.parse(Buffer.from(res.data.content, 'base64').toString('utf-8'));

  const html = `<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="七点科技 - 产品展示页，AI、Web3、交易系统等合集" />
  <meta name="keywords" content="七点科技, AI系统, 交易所, 区块链产品, Web3, 产品列表" />
  <title>七点科技产品目录</title>
  <style>
    body { margin: 0; font-family: system-ui, sans-serif; background: linear-gradient(to bottom right, #e0f7ff, #ffffff); }
    header { background: #003366; color: white; padding: 1rem 2rem; text-align: center; font-size: 1.5rem; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
    .container { padding: 2rem; max-width: 1200px; margin: auto; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.5rem; }
    .card { background: white; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.08); padding: 1.5rem; transition: transform 0.2s ease; text-align: center; }
    .card:hover { transform: translateY(-6px); }
    .card img { width: 60px; height: 60px; object-fit: contain; margin-bottom: 1rem; }
    .card h3 { font-size: 1.2rem; color: #003366; margin: 0.5rem 0; }
    .card p { color: #666; font-size: 0.9rem; height: 40px; overflow: hidden; text-overflow: ellipsis; }
    .card a { margin-top: 1rem; display: inline-block; color: #007acc; text-decoration: none; font-weight: bold; }
    footer { text-align: center; padding: 2rem; font-size: 0.8rem; color: #888; }
  </style>
</head>
<body>
  <header>七点科技 · 产品目录</header>
  <div class="container">
    <div class="grid">
      ${products.map(p => `
      <div class="card">
        <img src="${p.icon}" alt="${p.name}" />
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <a href="${p.link}" target="_blank">访问产品</a>
      </div>
      `).join('')}
    </div>
  </div>
  <footer>© 2025 七点科技 · 所有产品自动同步展示 · SEO 自动适配</footer>
</body>
</html>`;

  fs.writeFileSync('index.html', html);
  console.log('✅ index.html 页面已生成');
})();
