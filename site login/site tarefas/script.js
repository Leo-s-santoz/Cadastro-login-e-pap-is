// Pegar o conteúdo do localStorage
const email = localStorage.getItem("email");

// Verificar se o email foi encontrado no localStorage
if (email !== null) {
  console.log("Email encontrado:", email);
} else {
  // Não foi encontrado nenhum email no localStorage
  console.log("Nenhum email encontrado no localStorage");
}

// Variável global modo
let modo;

// Fazer uma requisição para o backend
fetch("/getId", {
  method: "POST", // Método HTTP para a requisição
  headers: {
    "Content-Type": "application/json", // Tipo de conteúdo da requisição
  },
  body: JSON.stringify({ email: email }), // Corpo da requisição com o email em formato JSON
})
  .then((response) => {
    if (!response.ok) {
      // Verificar se a resposta não foi bem-sucedida
      throw new Error("Erro ao buscar ID do usuário");
    }
    return response.json(); // Converter a resposta em JSON
  })
  .then((data) => {
    // ID do usuário retornado pelo servidor
    const userId = data.userId;
    console.log("ID do usuário:", userId);

    // Define a variável de modo de operação
    modo = userId; // Definindo a variável "modo" como o ID do usuário (1 para soma, 2 para subtração, qualquer outro para divisão)

    // Atualiza o estado dos botões ao carregar a página
    updateButtonState();
  })
  .catch((error) => {
    console.error("Erro ao buscar ID do usuário:", error); // Log de erro
    alert("Ocorreu um erro ao buscar o ID do usuário."); // Alerta de erro
  });

// Função para habilitar o botão correto com base no modo de operação
function updateButtonState() {
  document.getElementById("addBtn").disabled = modo !== 1; // Desabilita o botão de adicionar se modo não for 1
  document.getElementById("subtractBtn").disabled = modo !== 2; // Desabilita o botão de subtrair se modo não for 2
  document.getElementById("divideBtn").disabled = modo === 1 || modo === 2; // Desabilita o botão de dividir se modo for 1 ou 2
  document.getElementById("loadBtn").disabled = modo > 2;
  document.getElementById("saveBtn").disabled = modo > 1;
}

function calculate(operation) {
  const num1 = parseFloat(document.getElementById("num1").value); // Pega o valor do primeiro número e converte para float
  const num2 = parseFloat(document.getElementById("num2").value); // Pega o valor do segundo número e converte para float
  let result;

  if (isNaN(num1) || isNaN(num2)) {
    // Verifica se os números são válidos
    result = "Por favor, insira números válidos.";
  } else {
    switch (operation) {
      case "add":
        if (modo === 1) {
          // Verifica se o modo é 1 (soma)
          result = num1 + num2; // Faz a soma
        } else {
          result = "Operação não permitida."; // Mensagem de operação não permitida
        }
        break;
      case "subtract":
        if (modo === 2) {
          // Verifica se o modo é 2 (subtração)
          result = num1 - num2; // Faz a subtração
        } else {
          result = "Operação não permitida."; // Mensagem de operação não permitida
        }
        break;
      case "divide":
        if (modo !== 1 && modo !== 2) {
          // Verifica se o modo não é 1 nem 2 (divisão permitida)
          if (num2 === 0) {
            // Verifica se o divisor é zero
            result = "Divisão por zero não é permitida."; // Mensagem de erro para divisão por zero
          } else {
            result = num1 / num2; // Faz a divisão
          }
        } else {
          result = "Operação não permitida."; // Mensagem de operação não permitida
        }
        break;
    }
  }

  // Exibe o resultado na página
  document.getElementById("result").innerText = "Resultado: " + result;
}

function loadFile() {
  fetch("/loadFile")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("fileContent").value = data; // Coloca o conteúdo do arquivo na textarea
    })
    .catch((error) => {
      console.error("Erro ao carregar o arquivo:", error);
      alert("Erro ao carregar o arquivo.");
    });
}

function saveFile() {
  const content = document.getElementById("fileContent").value; // Pega o conteúdo da textarea
  fetch("/saveFile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: content }), // Envia o conteúdo como JSON
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao salvar o arquivo");
      }
      alert("Arquivo salvo com sucesso!");
    })
    .catch((error) => {
      console.error("Erro ao salvar o arquivo:", error);
      alert("Erro ao salvar o arquivo.");
    });
}
