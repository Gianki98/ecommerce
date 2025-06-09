// se siamo in un tag form possiamo usare un costruttore che si chiama formData
// Esso costruisce gia' un oggetto con name del campo la chiave e come valore l'input.
// tutto in formato stringa
// esempio name:valore ex: nome:Pippo
const form = document.getElementById("formRegistrazione");
form.addEventListener("submit", (e) => {
  e.preventDefault(); //evito il refresh della pagina
  const formData = new FormData(form);
  const user = Object.fromEntries(formData.entries());
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userExist = users.find(
    (x) => x.username === user.username || x.email === user.email
  );
  if (!userExist) {
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  } else {
    console.error(`L'utente e' gia' registrato!!`);
  }
});
