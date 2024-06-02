// Seleciona elementos do DOM do HTML por meio de seus IDs
let email = document.getElementById("email");
let password = document.getElementById("password");
let name = document.getElementById("name");
let form = document.querySelector("form");
let textForm = document.getElementById("textForm");
let textPassword = document.getElementById("textPassword");
let textEmail = document.getElementById("textEmail");

// Função para gerar o hash SHA-512 de um valor
function sha512(value) {
  // Utiliza a biblioteca CryptoJS para calcular o hash SHA-512
  let hash = CryptoJS.SHA512(value).toString(CryptoJS.enc.Hex);
  return hash;
}

// Listener de evento para o envio do formulário
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // Verifica se os campos do formulário são válidos
  if (
    validName(name.value) === true &&
    validEmail(email.value) === true &&
    validPassword(password.value) === true
  ) {
    // Se os campos forem válidos, cria um objeto com os dados
    const hashedpassword = sha512(password.value);
    const formData = {
      name: name.value,
      email: email.value,
      password: hashedpassword,
    };
    // Envia os dados para o servidor usando a API Fetch
    fetch("/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.text())
      .catch((error) => {
        console.error("Erro ao enviar dados para o servidor:", error);
      });
    alert("Cadastro Realizado com sucesso!");
  } else {
    console.log("Requisição não atendida");
  }
});

// Listener de evento para validação da senha conforme o usuário digita
password.addEventListener("keyup", () => {
  if (validPassword(password.value) !== true) {
    // Se a senha não for válida, exibe uma mensagem de erro
    textPassword.textContent =
      "A senha precisa conter pelo menos (1) letra minúscula, (1) letra maiúscula, (1) número, e ter no mínimo 5 caracteres";
  } else {
    // Se a senha for válida, limpa a mensagem de erro
    textPassword.textContent = "";
  }
});

// Listener de evento para validação do email conforme o usuário digita
email.addEventListener("keyup", () => {
  if (validEmail(email.value) !== true) {
    // Se o email não for válido, exibe uma mensagem de erro
    textEmail.textContent = "O formato do email deve ser Ex: exemplo@gmail.com";
  } else {
    // Se o email for válido, limpa a mensagem de erro
    textEmail.textContent = "";
  }
});

// Listener de evento para validação do nome conforme o usuário digita
name.addEventListener("keyup", () => {
  if (validName(name.value) !== true) {
    // Se o nome não for válido, exibe uma mensagem de erro
    textForm.textContent = "O campo nome não pode estar vazio";
  } else {
    // Se o nome for válido, limpa a mensagem de erro
    textForm.textContent = "";
  }
});

// Função para validar o formato do email
function validEmail(email) {
  let emailPattern =
    /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  return emailPattern.test(email);
}

// Função para validar a senha
function validPassword(password) {
  //padrão de senhas fraco
  //const passwordPattern = /^(?=.*[0-9])[0-9]{5,}$/;
  //padrão de senhas forte
  const passwordPattern = /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[A-Za-z0-9]{5,}$/;
  return passwordPattern.test(password);
}

// Função para validar o nome
function validName(name) {
  return name.trim() !== "";
}
