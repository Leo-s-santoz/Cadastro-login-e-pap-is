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
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email: email }), //muda para string
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

    // usa o ID para definir o modo
    modo = userId;

    // Atualiza o estado dos botões ao carregar a página
    updateButtonState();
  })
  .catch((error) => {
    console.error("Erro ao buscar ID do usuário:", error); // Log de erro
    alert("Ocorreu um erro ao buscar o ID do usuário."); // Alerta de erro
  });

// Função para habilitar o botão correto com base no modo de operação
function updateButtonState() {
  document.getElementById("addBtn").disabled = modo !== 1;
  document.getElementById("subtractBtn").disabled = modo !== 2;
  document.getElementById("divideBtn").disabled = modo === 1 || modo === 2;
  document.getElementById("loadBtn").disabled = modo > 2;
  document.getElementById("saveBtn").disabled = modo > 1;
  document.getElementById("saveBtn2").disabled = modo !== 2;
}

function calculate(operation) {
  //converte valores pra float
  const num1 = parseFloat(document.getElementById("num1").value);
  const num2 = parseFloat(document.getElementById("num2").value);
  let result;

  if (isNaN(num1) || isNaN(num2)) {
    // Verifica se os números são válidos
    result = "Por favor, insira números válidos.";
  } else {
    switch (operation) {
      case "add":
        // Verifica o modo
        if (modo === 1) {
          result = num1 + num2;
        } else {
          result = "Operação não permitida."; //mensagem caso tenha um erro na operação
        }
        break;
      case "subtract":
        if (modo === 2) {
          result = num1 - num2;
        } else {
          result = "Operação não permitida.";
        }
        break;
      case "divide":
        if (modo !== 1 && modo !== 2) {
          // Verifica se o modo não é 1 nem 2
          if (num2 === 0) {
            // Verifica se o divisor é zero
            result = "Divisão por zero não é permitida."; // Mensagem de erro para divisão por zero
          } else {
            result = num1 / num2;
          }
        } else {
          result = "Operação não permitida.";
        }
        break;
    }
  }

  // Exibe o resultado na página
  document.getElementById("result").innerText = "Resultado: " + result;
}

function loadFile() {
  if (modo <= 2) {
    fetch("/loadFile")
      .then((response) => response.text())
      .then((data) => {
        document.getElementById("fileContent").value = data; // Coloca o conteúdo do arquivo na textarea
      })
      .catch((error) => {
        console.error("Erro ao carregar o arquivo:", error);
        alert("Erro ao carregar o arquivo.");
      });
  } else {
    alert("Operação não permitida no modo atual.");
  }
}

function saveFile() {
  if ((modo = 1)) {
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
  } else {
    alert("Operação não permitida no modo atual.");
  }
}

function loadFile2() {
  fetch("/loadFile2")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("fileContent").value = data; // Coloca o conteúdo do arquivo na textarea
    })
    .catch((error) => {
      console.error("Erro ao carregar o arquivo:", error);
      alert("Erro ao carregar o arquivo.");
    });
}

function saveFile2() {
  if ((modo = 2)) {
    const content = document.getElementById("fileContent").value; // Pega o conteúdo da textarea
    fetch("/saveFile2", {
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
  } else {
    alert("Operação não permitida no modo atual.");
  }
}
