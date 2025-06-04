let products = [];
const button = document.getElementById("searchButton");
const reset = document.getElementById("resetButton");
const input = document.getElementById("search");
const container = document.getElementById("container");
const select = document.getElementById("category");

let categories = [];

async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const result = await response.json();
    products = result;
    
  } catch (error) {
    console.error(error);
  }
}

fetchProducts().then(()=> renderProducts(products)).then(()=> products.forEach((x)=>{
  if(!categories.includes(x.category)){
    categories.push(x.category);
    const option = document.createElement("option");
    option.innerText= x.category;
    option.value = x.category;
    select.appendChild(option);
  }
  
})).catch((error) => console.error(error));


async function renderProducts(products) {
  try {
    container.innerHTML = "";
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

async function searchProducts (products) {
  try {
    const searchItem = input.value.toLowerCase();
    const productFilter = products.filter((x) => {
     return x.title.toLowerCase().includes(searchItem) //mancava il return e il tolowercase
    })
    
    if(productFilter.length === 0){
      container.innerHTML = "<p>Nessun prodotto disponibile</p>";
      return;
    }

    renderProducts(productFilter);

  } catch (error) {
    console.error(error);
  }
}

button.addEventListener("click", () => {
  searchProducts(products).catch((error) => console.error(error));
})

reset.addEventListener("click", ()=>{
  fetchProducts().then(()=> renderProducts(products)).catch((error) => console.error(error));
});

async function filterByPrice(products) {
  try{
    //creare due campi input di type number e filtrare i prodotti se rientrano nel range minimo e massimo di questi due campi input
  } catch (error){
    console.error(error);
  }
}

select.addEventListener("change", ()=>{
  const selectedCategory = select.value;
  const filteredProduct = products.filter((x)=> x.category === selectedCategory);
  renderProducts(filteredProduct);
})



 


