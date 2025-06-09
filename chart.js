const prodottiChart = document.getElementById("prodotti-chart");
const total = document.getElementById("total");
let totaleCarrello = 0;

//Logica chart: siccome ciò che è salvato in localStorage è comune a tutte le pagine, non devo importare dei moduli in questa pagina, dalla index.js.

const localChart = JSON.parse(localStorage.getItem("chart"));
if (localChart.length > 0) {
  let arrayProductsQuantity = [];
  console.log(localChart);
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

    img.src = x.image;
    img.alt = x.title;
    title.innerText = x.title;
    price.textContent = `${x.price} $`;
    quantity.innerText = x.quantity;

    divContainer.appendChild(img);
    divContainer.appendChild(title);
    divContainer.appendChild(price);
    divContainer.appendChild(quantity);
    prodottiChart.appendChild(divContainer);
    totaleCarrello += x.price * x.quantity;
  });
  total.innerText = totaleCarrello;
}