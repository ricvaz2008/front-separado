let novoNome = document.getElementById("nomeFuncionario");
let novoID = document.getElementById("idFuncionario");
let novoCargo = document.getElementById("cargoFuncionario");
let novoLogin = document.getElementById("loginFuncionario");
let novaSenha = document.getElementById("senhaFuncionario");
var indexador = JSON.parse(localStorage.getItem("idDetalhe"));
let novoAcesso = document.getElementById("acesso");

encontraItem();

function receberResposta(pedido) {
  const queryParams = new URLSearchParams(pedido).toString();
  const url = `http://localhost:5000/${acao}?${queryParams}`;
  return fetch(url, {
    method: 'GET',
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erro na requisição. Status: ${response.status}`);
    }
    return response.json().catch(() => response.text());
  })
  .then(data => {
    if (data) {
      return data;
    } else {
      throw new Error('Resposta inválida do servidor');
    }
  })
  .catch(error => {
    console.error('Erro:', error);
    throw new Error('Erro ao processar a resposta do servidor');
  });
}

function mudarPedido(pedido) {
  const queryParams = new URLSearchParams(pedido).toString();
  const url = `https://localhost:5000/${acao}?${queryParams}`;
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(pedido)
  });
}

function encontraItem() {
  pedido = {
    action: "localizaFuncionario",
    parametro1: indexador,
  };
  receberResposta(pedido)
    .then(produto => {
      novoNome.value = produto.nome;
      novoID.value = produto.id;
      novoCargo.value = produto.cargo;
      novoLogin.value = produto.login;
      novaSenha.value = produto.senha;
      novoAcesso.value = produto.acesso;
    });
}

function confirmaCadastro() {
  pedido = {
    action: "modificaFuncionario",
    id: indexador,
    nome: novoNome.value,
    cargo: novoCargo.value,
    login: novoLogin.value,
    senha: novaSenha.value,
    acesso: novoAcesso.value
  };
  mudarPedido(pedido)
    .then((resposta) => resposta.json())
    .then(statusCadastro => {

      if (statusCadastro.message == "modificado") {
        location.href = 'adm_funcionarios.html';
      }
    });
}
