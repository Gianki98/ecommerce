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
    img.src = x.image;
    img.alt = x.title;
    title.innerText = x.title;
    price.textContent = `${x.price} $`;
    quantity.innerText = x.quantity;
    
    // funzione per aggiornare il localStorage.
    function aggiornaLocalStorage () {
      localStorage.setItem("chart", JSON.stringify(localChart));
    }

    addButton.addEventListener("click", ()=> {
      x.quantity += 1;
      quantity.innerText = x.quantity;

      // al click sul + aggiunge una copia del prodotto aggiunto x in localchart e poi invoco aggiornaLocalStorage così mi riscrive il localStorage con l'array localChart che ora ha un elemento in più.
      localChart.push({ 
        id: x.id,
        title: x.title,
        price: x.price,
        image: x.image
      });

      totaleCarrello += x.price ;
      total.innerText = totaleCarrello;

      //invoco la funzione di aggiornamento del local storage
      aggiornaLocalStorage();
    });


    removeButton.addEventListener("click", ()=> {
      x.quantity -= 1;
      quantity.innerText = x.quantity;

      // Rimuovo un oggetto (prodotto) con lo stesso id dell'elemento deselezionato dall'array localChart
      const rimuoviCopia = localChart.findIndex(k => k.id === x.id); //ottengo un numero tra 0 e localChart.length -1 se trova qualcuno con questo id, sennò trova -1.
      if (rimuoviCopia !== -1) {
        localChart.splice(rimuoviCopia, 1)}; //elimina l'elemento copia in posizione rimuoviCopia

      if(x.quantity === 0){
        prodottiChart.removeChild(divContainer);
      }

      totaleCarrello -= x.price ;
      total.innerText = totaleCarrello;

      //invoco la funzione di aggiornamento del local storage
      aggiornaLocalStorage();
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

} else {
  prodottiChart.innerHTML = "<p>Carrello vuoto</p>";
  button.disabled = true;
}

// La card da inserire deve contenere: img, title, price e quantity.
