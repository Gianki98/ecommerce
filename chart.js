const prodottiChart = document.getElementById("prodotti-chart");
const total = document.getElementById("total");
let totaleCarrello = 0;
const button = document.querySelector("#acquista");

//Logica chart: siccome ciò che è salvato in localStorage è comune a tutte le pagine, non devo importare dei moduli in questa pagina, dalla index.js.

const localChart = JSON.parse(localStorage.getItem("chart"));
if (localChart.length > 0) {
button.disabled = false;
prodottiChart.innerHTML= " ";
  let arrayProductsQuantity = [];
  localChart.forEach((x) => {
    const productsExist = arrayProductsQuantity.find((y) => x.id === y.id);
    if (!productsExist) {
      console.log(`Sono entrato nell'if`);
      const product = { ...x, quantity: 1 };
      arrayProductsQuantity.push(product);
    } else {
      productsExist.quantity += 1;
    }
  });
  console.log(arrayProductsQuantity);
  arrayProductsQuantity.forEach((x) => {
    const divContainer = document.createElement("div");
    const img = document.createElement("image");
    const title = document.createElement("h6");
    const price = document.createElement("p");
    const quantity = document.createElement("p");
    const addButton = document.createElement("button");
    const removeButton = document.createElement("button");

    addButton.innerText = "+";
    removeButton.innerText = "-";
    addButton.addEventListener("click", ()=> {
      x.quantity += 1;
      quantity.innerText = x.quantity;
      totaleCarrello += x.price ;
      total.innerText = totaleCarrello;
    });
    removeButton.addEventListener("click", ()=> {
      x.quantity -= 1;
      quantity.innerText = x.quantity;
      if(x.quantity === 0){
        prodottiChart.removeChild(divContainer);
      }
      totaleCarrello -= x.price ;
      total.innerText = totaleCarrello;
    });
    
    img.src = x.image;
    img.alt = x.title;
    title.innerText = x.title;
    price.textContent = `${x.price} $`;
    quantity.innerText = x.quantity;

    

    divContainer.appendChild(img);
    divContainer.appendChild(title);
    divContainer.appendChild(price);
    divContainer.appendChild(addButton);
    divContainer.appendChild(removeButton);
    divContainer.appendChild(quantity);
    prodottiChart.appendChild(divContainer);
    
    totaleCarrello += x.price * x.quantity;
  });
  total.innerText = totaleCarrello;

}

// La card da inserire deve contenere: img, title, price e quantity.
