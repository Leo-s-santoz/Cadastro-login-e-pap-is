let form = document.querySelector("form");
const email = localStorage.getItem("email");
const codigo = gerarCodigo(6); // Chama a função para gerar um código
localStorage.setItem("codigo", codigo);

const formData = {
  email: email,
  codigo: codigo,
};

// Enviando dados para o backend
fetch("/enviarCodigo", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(formData),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Falha ao enviar o código.");
    }
    return response;
  })
  .catch((error) => {
    console.error("Erro ao enviar dados:", error);
  });

// Manipulador do evento de submit do formulário
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let codDigitado = document.getElementById("code").value;
  if (codDigitado === codigo) {
    alert("Bem vindo!");
    window.location.href = "http://localhost:3036/tarefas"; // Redireciona para a página de tarefas
  } else {
    alert("Código incorreto. Tente novamente.");
  }
});

// Função para gerar um código aleatório
function gerarCodigo(tamanho) {
  const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let resultado = "";
  for (let i = 0; i < tamanho; i++) {
    let indiceAleatorio = Math.floor(Math.random() * caracteres.length);
    resultado += caracteres.charAt(indiceAleatorio);
  }
  return resultado;
}
