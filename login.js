const form = document.getElementById("formLogin");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const users = JSON.parse(localStorage.getItem("users"));
  const formData = new FormData(form);
  const user = Object.fromEntries(formData.entries());
  const userExist = users.find(
    (x) =>
      (x.username === user.usernameEmail || x.email === user.usernameEmail) &&
      x.psw === user.psw
  );
  if (userExist) {
    console.log(`Il Login e' avvenuto con successo.`);
  } else {
    console.error(`Credenziali errate!`);
  }
});
