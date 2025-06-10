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
h6.innerText = `Ecco il riepilogo dei tuoi dati: `
const div = document.createElement("div");
div.innerHTML= `<p><span> nome: </span> ${nome}</p>
<p><span> cognome: </span> ${cognome}</p>
<p><span> email: </span> ${email}</p>
<p><span> username: </span> ${username}</p>
<p><span> data di nascita: </span> ${data}</p>`;
document.body.appendChild(div);
