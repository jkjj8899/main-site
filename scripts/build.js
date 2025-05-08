
const fs = require('fs');
const products = require('./products.json');
const header = fs.readFileSync('./components/header.html', 'utf8');
const footer = fs.readFileSync('./components/footer.html', 'utf8');

const html = `
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8" />
  <title>七点科技 · 产品展示</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  ${header}
  <main>
    <input type="search" class="search-bar" placeholder="搜索产品..." oninput="filterProducts(this.value)">
    <div id="product-grid" class="product-grid"></div>
  </main>
  ${footer}
  <script>
    ${fs.readFileSync('./product.js', 'utf8')}
    const products = ${JSON.stringify(products)};
    renderProducts(products);
    function filterProducts(query) {
      const filtered = products.filter(p =>
        p.name.includes(query) || p.description.includes(query)
      );
      renderProducts(filtered);
    }
  </script>
</body>
</html>
`;

fs.writeFileSync('index.html', html);
console.log("✅ index.html 页面已生成（模块化结构）");
