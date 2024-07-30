var index = 0;
var numeroPergunta = 1;
var quantoFalta = document.getElementById("quantoFalta");
var textoPergunta = document.getElementById("pergunta");
var resposta1 = document.getElementById("resposta1");
var resposta2 = document.getElementById("resposta2");
var resposta3 = document.getElementById("resposta3");
var resposta4 = document.getElementById("resposta4");
var resultado = document.getElementById("resultado");
var proximaPergunta = document.getElementById("proximaPergunta");
var bloqueado = false;
var dataJson;
var container = document.getElementById("container");
var container2 = document.getElementById("container2");
var acertos = 0;
var textoAcertos = document.getElementById("numero-acertos");

proximaPergunta.addEventListener("click", () => {
  index++;
  numeroPergunta++;
  proximaPergunta.style.display = "none";
  resultado.style.display = "none";
  bloqueado = false;
  carregarPergunta();
  carregarRespostas();
});

function atribuiValorDeAcertos() {
  textoAcertos.textContent = `{acertos} de 5`;
}

function verificaSeTerminou() {
  console.log(index);
  if (index + 1 === 5) {
    container.style.display = "none";
    container2.style.display = "block";
    textoAcertos.textContent = `${acertos} de 5`;
  } else {
    carregarPergunta();
    carregarRespostas();
  }
}

resposta1.addEventListener("click", () => {
  if (!bloqueado) {
    bloqueado = true;
    verificaAcertou(dataJson[index].answers[0].isCorrect);
    verificaSeTerminou();
  }
});

resposta2.addEventListener("click", () => {
  if (!bloqueado) {
    bloqueado = true;
    verificaAcertou(dataJson[index].answers[1].isCorrect);
    verificaSeTerminou();
  }
});

resposta3.addEventListener("click", () => {
  if (!bloqueado) {
    bloqueado = true;
    verificaAcertou(dataJson[index].answers[2].isCorrect);
    verificaSeTerminou();
  }
});

resposta4.addEventListener("click", () => {
  if (!bloqueado) {
    bloqueado = true;
    verificaAcertou(dataJson[index].answers[3].isCorrect);
    verificaSeTerminou();
  }
});

function verificaAcertou(parametroJson, numeroResposta) {
  proximaPergunta.style.display = "block";
  resultado.style.display = "block";
  if (parametroJson) {
    resultado.textContent = "VOCÊ ACERTOU !";
    resultado.style.color = "green";
    acertos++;
  } else {
    resultado.textContent = "VOCÊ ERROU !";
    resultado.style.color = "red";
  }
}

function carregarPergunta() {
  quantoFalta.textContent = `Pergunta ${numeroPergunta} de 5`;
  textoPergunta.textContent = dataJson[index].question;
}

function carregarRespostas() {
  let arrayResposta = dataJson[index].answers;
  resposta1.textContent = arrayResposta[0].text;
  resposta2.textContent = arrayResposta[1].text;
  resposta3.textContent = arrayResposta[2].text;
  resposta4.textContent = arrayResposta[3].text;
}

async function loadJSON() {
  try {
    const response = await fetch("../../perguntas.json");

    return await response.json();
  } catch (error) {
    console.error("Houve um problema com a requisição:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadJSON().then((r) => {
    dataJson = r.questions;
    carregarPergunta();
    carregarRespostas();
    console.log("chamado");
  });
});
