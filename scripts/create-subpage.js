// create-subpage.js - 自动构建子仓库页面 from products/{slug}.product.json

const fs = require('fs');
const path = require('path');

function renderProductPage({ name, description, gallery, slug }) {
  const template = fs.readFileSync('./index.template.html', 'utf8');
  const galleryHTML = gallery
    .map(img => `<img src="https://jkjj8899.github.io/product-site/${img}" alt="${name} 展示图">`)
    .join('\n');

  return template
    .replace(/\$\{name\}/g, name)
    .replace(/\$\{description\}/g, description)
    .replace(/\$\{gallery\}/g, galleryHTML);
}

function buildSubRepoPage(slug) {
  const productPath = `./products/${slug}.product.json`;
  if (!fs.existsSync(productPath)) {
    console.error(`❌ 未找到产品文件：${productPath}`);
    process.exit(1);
  }

  const product = JSON.parse(fs.readFileSync(productPath, 'utf8'));
  const html = renderProductPage({
    name: product.name,
    description: product.description,
    gallery: product.gallery || [],
    slug: product.slug || slug
  });

  const outputDir = path.join('..', slug);
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
  fs.writeFileSync(path.join(outputDir, 'index.html'), html);
  console.log(`✅ 已为 ${slug} 生成 index.html`);
}

// CLI 执行：node scripts/create-subpage.js ceshi1
const slug = process.argv[2];
if (!slug) {
  console.error('请提供 slug，例如：node scripts/create-subpage.js ceshi1');
  process.exit(1);
}
buildSubRepoPage(slug);
