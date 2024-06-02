// Pegar o conteúdo do localStorage
const email = localStorage.getItem("email");

// Verificar se o email foi encontrado no localStorage
if (email !== null) {
  console.log("Email encontrado:", email);
} else {
  // Não foi encontrado nenhum email no localStorage
  console.log("Nenhum email encontrado no localStorage");
}

// Fazer uma requisição para o backend
fetch("/getId", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email: email }),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Erro ao buscar ID do usuário");
    }
    return response.json();
  })
  .then((data) => {
    // ID do usuário retornado pelo servidor
    const userId = data.userId;
    console.log("ID do usuário:", userId);

    // Define a variável de modo de operação
    let modo = userId; // 1 para soma, 2 para subtração, qualquer outro para divisão

    // Função para habilitar o botão correto com base no modo de operação
    function updateButtonState() {
      document.getElementById("addBtn").disabled = modo !== 1;
      document.getElementById("subtractBtn").disabled = modo !== 2;
      document.getElementById("divideBtn").disabled = modo === 1 || modo === 2;
    }

    // Atualiza o estado dos botões ao carregar a página
    updateButtonState();
  })
  .catch((error) => {
    console.error("Erro ao buscar ID do usuário:", error);
    alert("Ocorreu um erro ao buscar o ID do usuário.");
  });

function calculate(operation) {
  const num1 = parseFloat(document.getElementById("num1").value);
  const num2 = parseFloat(document.getElementById("num2").value);
  let result;

  if (isNaN(num1) || isNaN(num2)) {
    result = "Por favor, insira números válidos.";
  } else {
    switch (operation) {
      case "add":
        if (modo === 1) {
          result = num1 + num2;
        } else {
          result = "Operação não permitida.";
        }
        break;
      case "subtract":
        if (operationMode === 2) {
          result = num1 - num2;
        } else {
          result = "Operação não permitida.";
        }
        break;
      case "divide":
        if (modo !== 1 && modo !== 2) {
          if (num2 === 0) {
            result = "Divisão por zero não é permitida.";
          } else {
            result = num1 / num2;
          }
        } else {
          result = "Operação não permitida.";
        }
        break;
    }
  }

  document.getElementById("result").innerText = "Resultado: " + result;
}
