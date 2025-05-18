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
  if (!GH_TOKEN || !USERNAME) {
    console.error('❌ 请设置 GH_TOKEN 和 GH_USERNAME 环境变量');
    process.exit(1);
  }

  try {
    const res = await axios.get(`https://api.github.com/repos/${USERNAME}/${SOURCE_REPO}/contents/products.json`, { headers });
    const products = JSON.parse(Buffer.from(res.data.content, 'base64').toString('utf-8'));

    const html = `<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="七点科技 - 产品展示页，AI、Web3、交易系统等合集" />
  <meta name="keywords" content="七点科技, AI系统, 交易所, 区块链产品, Web3, 产品列表" />
  <title>数字货币交易平台系统大全｜全模块源码部署｜七点科技</title>
  <style>
    body {
      margin: 0;
      font-family: system-ui, sans-serif;
      background: linear-gradient(to bottom right, #e0f7ff, #ffffff);
    }
    header {
      background: #003366;
      color: white;
      padding: 1rem 2rem;
      text-align: center;
      font-size: 1.5rem;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
      padding: 2rem;
      max-width: 1400px;
      margin: auto;
    }
    .card {
      background: #fff;
      border-radius: 14px;
      box-shadow: 0 6px 16px rgba(0,0,0,0.1);
      overflow: hidden;
      transition: transform 0.2s ease;
      display: flex;
      flex-direction: column;
    }
    .card:hover {
      transform: translateY(-6px);
    }
    .card img {
      width: 100%;
      height: 180px;
      object-fit: cover;
      background: #f0f0f0;
    }
    .card-content {
      padding: 1.2rem;
      text-align: center;
    }
    .card-content h3 {
      font-size: 1.2rem;
      margin: 0.5rem 0;
      color: #003366;
      min-height: 2.6em;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .card-content p {
      font-size: 0.95rem;
      color: #666;
      min-height: 3.6em;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .card-content a {
      display: inline-block;
      margin-top: 1rem;
      color: #007acc;
      text-decoration: none;
      font-weight: bold;
    }
    footer {
      text-align: center;
      padding: 2rem;
      font-size: 0.8rem;
      color: #888;
    }
  </style>
</head>
<body>
  <header>数字货币交易平台, 交易系统源码, 秒合约系统, AI交易, 跨境商城系统, 私有部署, 白标交易所, 区块链系统开发</header>
  <div class="container">
    ${products.map(p => {
      const name = (p.name || '未命名产品').trim();
      const icon = p.icon || 'https://via.placeholder.com/300x180?text=No+Image';
      const link = p.link || '#';
      const rawDesc = (p.description || '').replace(/[\r\n]+/g, ' ').trim();
      const shortDesc = rawDesc.length > 100 ? rawDesc.slice(0, 100) + '...' : rawDesc;
      return `
        <div class="card">
          <img src="${icon}" alt="${name}" />
          <div class="card-content">
            <h3>${name}</h3>
            <p>${shortDesc}</p>
            <a href="${link}" target="_blank">访问产品</a>
          </div>
        </div>
      `;
    }).join('')}
  </div>
  <footer>© 2025 <p>
七点科技提供全套数字货币交易所系统解决方案，覆盖币币撮合、AI 智能交易、秒合约、ETF 系统、跨境商城、多语言钱包与风控后台。支持源码部署、私有化上线与白标品牌定制，适用于搭建专业数字资产交易平台。
</p>
</footer>
</body>
</html>`;

    fs.writeFileSync('index.html', html);
    console.log('✅ index.html 页面已生成');
  } catch (err) {
    console.error('❌ 构建失败但不中断：', err.message);
    fs.writeFileSync('index.html', '<h1>构建失败，请检查 products.json 格式</h1>');
  }
})();
