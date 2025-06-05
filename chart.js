const prodottiChart = document.getElementById("prodotti-chart");

//Logica chart: siccome ciò che è salvato in localStorage è comune a tutte le pagine, non devo importare dei moduli in questa pagina, dalla index.js.

const localChart = JSON.parse(localStorage.getItem("chart"));
if(localChart.length > 0) {
localChart.forEach((x) => {prodottiChart.innerHTML = `<p>${x.title}</p>`})
}
