
const fs = require('fs');
const axios = require('axios');

const GH_TOKEN = process.env.GH_TOKEN;
const USERNAME = process.env.GH_USERNAME;
const headers = {
  Authorization: `token ${GH_TOKEN}`,
  Accept: 'application/vnd.github.v3+json'
};

const products = JSON.parse(fs.readFileSync('products.json', 'utf-8'));

async function repoExists(repo) {
  try {
    await axios.get(`https://api.github.com/repos/${USERNAME}/${repo}`, { headers });
    return true;
  } catch {
    return false;
  }
}

async function createRepo(slug, description) {
  await axios.post(`https://api.github.com/user/repos`, {
    name: slug,
    private: false,
    description
  }, { headers });
}

async function pushFile(repo, path, content, message) {
  const encoded = Buffer.from(content).toString('base64');
  await axios.put(`https://api.github.com/repos/${USERNAME}/${repo}/contents/${path}`, {
    message,
    content: encoded,
    branch: "main"
  }, { headers });
}

async function enablePages(repo) {
  try {
    await axios.post(`https://api.github.com/repos/${USERNAME}/${repo}/pages`, {
      source: {
        branch: "main",
        path: "/"
      }
    }, { headers });
  } catch (e) {
    console.error(`❌ 无法启用 Pages: ${repo}`, e.message);
  }
}

(async () => {
  for (const p of products) {
    const exists = await repoExists(p.slug);
    if (!exists) {
      console.log(`🆕 创建仓库: ${p.slug}`);
      await createRepo(p.slug, p.description);
    } else {
      console.log(`♻️ 仓库已存在: ${p.slug}`);
    }

    const productJson = { ...p };

    const html = "<!DOCTYPE html><html lang='zh'><head><meta charset='UTF-8'>" +
      "<meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
      "<title>" + p.name + "</title>" +
      "<style>body{font-family:sans-serif;padding:2rem;max-width:800px;margin:auto;background:#f9f9f9}" +
      "h1{color:#222}p{color:#555}.gallery{margin-top:1.5rem;display:flex;flex-wrap:wrap;gap:1rem}" +
      ".gallery img{width:100%;max-width:240px;border-radius:8px;box-shadow:0 2px 5px rgba(0,0,0,0.1)}" +
      ".nav{margin-bottom:1.5rem}.nav a{text-decoration:none;color:#003366}" +
      ".contact{margin-top:2rem;padding:1rem;background:#eef3f8;border-radius:8px;font-size:0.95rem}" +
      ".contact a{color:#0b66c3;text-decoration:none;font-weight:bold}</style></head><body>" +
      "<div class='nav'><a href='https://" + USERNAME + ".github.io/product-site/'>← 返回产品列表</a></div>" +
      "<h1 id='title'>加载中...</h1><p id='desc'></p><div class='gallery' id='images'></div>" +
      "<div class='contact'><p>📬 有任何问题或合作意向，欢迎联系我们：</p>" +
      "<a href='https://t.me/sy89899' target='_blank'>👉 Telegram：@sy89899</a></div>" +
      "<script>fetch('product.json').then(res => res.json()).then(data => {" +
      "document.getElementById('title').textContent = data.name;" +
      "document.getElementById('desc').textContent = data.description;" +
      "const container = document.getElementById('images');" +
      "(data.images || []).forEach(url => {" +
      "const img = document.createElement('img');img.src = url;img.alt = data.name;" +
      "container.appendChild(img);});}).catch(() => {" +
      "document.body.innerHTML = '<p style=\"color:red;\">加载失败</p>';});</script></body></html>";

    let sha;
    try {
      const existing = await axios.get(`https://api.github.com/repos/${USERNAME}/${p.slug}/contents/product.json`, { headers });
      sha = existing.data.sha;
    } catch {}

    await axios.put(`https://api.github.com/repos/${USERNAME}/${p.slug}/contents/product.json`, {
      message: "更新 product.json",
      content: Buffer.from(JSON.stringify(productJson, null, 2)).toString("base64"),
      branch: "main",
      ...(sha && { sha })
    }, { headers });

    await pushFile(p.slug, "index.html", html, "init index.html");
    await enablePages(p.slug);
  }
})();
