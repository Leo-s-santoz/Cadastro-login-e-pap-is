let form = document.querySelector("form");

function sha512(value) {
  let hash = CryptoJS.SHA512(value).toString(CryptoJS.enc.Hex);
  return hash;
}

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Impedir o envio do formulário diretamente pelo navegador

  // Capturar os valores de email e senha no momento em que o formulário é submetido
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  const hashedPassword = sha512(password);
  const formData = {
    email: email,
    password: hashedPassword,
  };

  // Enviar os dados do formulário para o servidor
  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response;
    }) // Converter a resposta em JSON
    .then((data) => {
      alert("Login bem-sucedido!");
      localStorage.setItem("email", email);
      window.location.href = "http://localhost:3036/autenticacao";
    })

    .catch((error) => {
      console.error("Erro ao fazer login:", error);
      alert("Ocorreu um erro ao tentar fazer login.");
    });
});
