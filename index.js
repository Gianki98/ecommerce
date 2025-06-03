async function fetchProducts() {
  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/products");
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

async function renderProducts() {
  try {
    const products = await fetchProducts();
    products.forEach((x) => {
      const h1 = document.createElement("h1");
      h1.innerText = x.title;
      document.body.appendChild(h1);
    });
  } catch (error) {
    console.error(error);
  }
}

renderProducts().catch((error) => console.error(error));
