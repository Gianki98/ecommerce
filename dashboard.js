const user = JSON.parse(localStorage.getItem("user"));

const {
    nome,
    cognome,
    email,
    psw,
    username,
    data
} = user

const h1 = document.createElement("h1");
h1.innerText= `Benvenuto, ${nome}`;
document.body.appendChild(h1);

const h6 = document.createElement("h6");
h6.innerText = `Ecco il riepilogo dei tuoi dati: `;
const div = document.createElement("div");
div.innerHTML= `<p><span> nome: </span> ${nome}</p>
<p><span> cognome: </span> ${cognome}</p>
<p><span> email: </span> ${email}</p>
<p><span> username: </span> ${username}</p>
<p><span> data di nascita: </span> ${data}</p>`;
document.body.appendChild(div);

const logout = document.createElement("button");
logout.innerText = "Logout";
logout.addEventListener("click", () => {
    localStorage.removeItem("user");
    //voglio essere reindirizzato alla pagina iniziale quando faccio il logout
    window.location.href = "http://localhost:5501/login.html"; //localhost è l'host locale dove viene eseguito il nostro server nella nostra macchina perché il sito non è sul web.
})
div.appendChild(logout);

const modificaDati = document.createElement("button");
modificaDati.innerText = "Modifica i tuoi dati";
div.appendChild(modificaDati);
modificaDati.addEventListener("click", () => {
    const form = document.createElement("form");
    form.innerHTML = `
    <label for="nome">Nome:</label>
    <input type="text" name="nome" required id="nome" value="${nome}">
    <label for="cognnome">cognome:</label>
    <input type="text" name="cognome" required id="cognome" value="${cognome}">
    <label for="data">Data di nascita:</label>
    <input type="date" name="data" required id="data" value="${data}">
    <button type="submit">Salva le modifiche</button>
    `
    div.appendChild(form);

    form.addEventListener("submit", () => {
        //non mettere l'eventPreventDefault in questo caso è conveniente e non genera problemi, perché le modifiche effettuate dalla nostra funzione sono sincrone. Se lo mettessi, dovrei refreshare a mano per poter vedere le modifiche.
        const nuoviDati = new FormData(form);
        const dati = Object.fromEntries(nuoviDati.entries());
        const userModificato = {...user, ...dati} //le chiavi con stesso nome vengono sovrascritte nel nuovo oggetto
        localStorage.setItem("user", JSON.stringify(userModificato));

        const users = JSON.parse(localStorage.getItem("users"));

        const trovaUser = users.findIndex((x) => x.email === email);
        users.splice(trovaUser, 1, userModificato);
        localStorage.setItem("users", JSON.stringify(users)); 
    })
})
