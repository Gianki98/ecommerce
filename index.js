let products = [];
let chart = [];
const button = document.getElementById("searchButton");
const reset = document.getElementById("resetButton");
const input = document.getElementById("search");
const container = document.getElementById("container");
const select = document.getElementById("category");
const minInput = document.getElementById("minPrice");     // input per prezzo minimo
const maxInput = document.getElementById("maxPrice");     // input per prezzo massimo
const filterPriceButton = document.getElementById("filterPriceButton");   // pulsante per filtrare



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
        chart.push(x);
        localStorage.setItem("chart", JSON.stringify(chart))
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

 //ESERCIZIO PER CASA: creare due campi input di type number e filtrare i prodotti se rientrano nel range minimo e massimo di questi due campi input

async function filterByPrice(products) {
  try{
   
    if (!minInput.value) {
       minInput.value = 0;
    }

    if (!maxInput.value) {
       maxInput.value = 1000;
    }

    //Legge e converte in numero i valori degli input DI DEFAULT SONO STRING ANCHE SE IL TYPE E' NUMBER!!!!!!
    const minValue = parseFloat(minInput.value);
    const maxValue = parseFloat(maxInput.value);

    //Filtra l’array products: mantiene solo quelli con price compreso tra minValue e maxValue
      const filteredProducts = products.filter((x) => {
      const price = parseFloat(x.price); // converte price (string) in numero
      return price >= minValue && price <= maxValue;
    });

    //Se l’array filtrato è vuoto, mostra un messaggio in un tag p
    if (filteredProducts.length === 0) {
      container.innerHTML = "<p>Nessun prodotto nel range di prezzo selezionato</p>";
      return;
    }
    //renderizza i prodotti filtrati se l'array non è vuoto
    renderProducts(filteredProducts);
  } catch (error){
    console.error(error);
  }
}

//Evento che associa il click del pulsante filterPriceButton alla funzione filterByPrice
filterPriceButton.addEventListener("click", () => {
  filterByPrice(products).catch((error) => console.error(error));
});

select.addEventListener("change", ()=>{
  const selectedCategory = select.value;
  const filteredProduct = products.filter((x)=> x.category === selectedCategory);
  renderProducts(filteredProduct);
})

