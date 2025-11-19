let products = [];

fetch("products.json")
  .then(res => res.json())
  .then(data => {
    products = data;
    loadFilters();
    renderProducts(products);
  })
  .catch(() => {
    document.getElementById("product-list").innerHTML =
      `<p>Error cargando productos.</p>`;
  });

function loadFilters() {
  const categorySelect = document.getElementById("filter-category");
  const brandSelect = document.getElementById("filter-brand");

  const categories = [...new Set(products.map(p => p.category))];
  const brands = [...new Set(products.map(p => p.brand))];

  categorySelect.innerHTML =
    `<option value="">Todas las categorías</option>` +
    categories.map(c => `<option value="${c}">${c}</option>`).join("");

  brandSelect.innerHTML =
    `<option value="">Todas las marcas</option>` +
    brands.map(b => `<option value="${b}">${b}</option>`).join("");

  categorySelect.onchange = filterAndSort;
  brandSelect.onchange = filterAndSort;
  document.getElementById("sort-price").onchange = filterAndSort;
}

function filterAndSort() {
  const category = document.getElementById("filter-category").value;
  const brand = document.getElementById("filter-brand").value;
  const sort = document.getElementById("sort-price").value;

  let filtered = products.filter(p =>
    (!category || p.category === category) &&
    (!brand || p.brand === brand)
  );

  if (sort === "asc") filtered.sort((a, b) => a.price - b.price);
  if (sort === "desc") filtered.sort((a, b) => b.price - a.price);

  renderProducts(filtered);
}

function renderProducts(list) {
  const container = document.getElementById("product-list");
  container.innerHTML = list.map(p => `
    <div class="col-4 mb-3">
      <div class="card p-3">
        <h5>${p.name}</h5>
        <p>${p.category} - ${p.brand}</p>
        <strong>${p.price} €</strong>
      </div>
    </div>
  `).join("");
}
