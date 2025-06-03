const container = document.getElementById("container");
async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
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
      const card = document.createElement("div");
      const title = document.createElement("h6");
      const imageContainer = document.createElement("div");
      const image = document.createElement("img");
      const price = document.createElement("p");
      const buy = document.createElement("button");
      card.className = "card";
      title.textContent = x.title;
      image.alt = x.title;
      image.src = x.image;
      price.textContent = `${x.price} $`;
      buy.textContent = "Buy";
      buy.addEventListener("click", () => {
        localStorage.setItem("chart", JSON.stringify(x))
      });
      imageContainer.appendChild(image);
      card.appendChild(imageContainer);
      card.appendChild(title);
      card.appendChild(price);
      card.appendChild(buy);
      container.appendChild(card);

    });
  } catch (error) {
    console.error(error);
  }
}

renderProducts().catch((error) => console.error(error));
