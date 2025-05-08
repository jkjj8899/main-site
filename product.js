function renderProducts(products) {
  const container = document.getElementById('product-grid');
  container.innerHTML = products.map(p => `
    <div class="card">
      <img src="${p.icon}" alt="${p.name}">
      <div class="card-content">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <a href="${p.link}" target="_blank">访问产品</a>
      </div>
    </div>
  `).join('');
}
