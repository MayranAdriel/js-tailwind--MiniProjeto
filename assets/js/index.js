import { loadJSON } from "./jsonModule.js";

var index = localStorage.getItem("index") || 0;
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
var container3 = document.getElementById("container3");
var acertos = 0;
var textoAcertos = document.getElementById("numero-acertos");
var audioAcertou = document.getElementById("audio-acertou");
var audioErrou = document.getElementById("audio-errou");
var botaoTwitter = document.getElementById("botao-twitter");

botaoTwitter.addEventListener("click", () => urlTwitter());

function urlTwitter() {
  console.log(acertos);
  let url = `https://x.com/intent/post?text=Eu+tive+${acertos}+acertos+no+quiz&url=https://mayranadriel.github.io/js-tailwind--MiniProjeto/`;
  window.open(url, "_blank");
}

proximaPergunta.addEventListener("click", () => {
  index++;
  numeroPergunta++;
  proximaPergunta.style.display = "none";
  resultado.style.display = "none";
  bloqueado = false;
  carregarPergunta();
  carregarRespostas();
});

resposta1.addEventListener("click", () => aoClicarNaResposta(0));
resposta2.addEventListener("click", () => aoClicarNaResposta(1));
resposta3.addEventListener("click", () => aoClicarNaResposta(2));
resposta4.addEventListener("click", () => aoClicarNaResposta(3));

document.addEventListener("DOMContentLoaded", () => {
  loadJSON().then((r) => {
    dataJson = r.questions;
    localStorage.clear();
    verificaSeHaMaisPerguntas();
    carregarPergunta();
    carregarRespostas();
  });
});

function aoClicarNaResposta(indexResposta) {
  if (!bloqueado) {
    bloqueado = true;
    verificaAcertou(dataJson[index].answers[indexResposta].isCorrect);
    verificaSeTerminouQuizAtual();
  }
}

function verificaAcertou(seEhErrado) {
  proximaPergunta.style.display = "block";
  resultado.style.display = "block";
  if (seEhErrado) {
    resultado.textContent = "VOCÊ ACERTOU !";
    resultado.style.color = "green";
    audioAcertou.play();
    acertos++;
  } else {
    resultado.textContent = "VOCÊ ERROU !";
    resultado.style.color = "red";
    audioErrou.play();
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

function verificaSeTerminouQuizAtual() {
  if (numeroPergunta === 5) {
    index++;
    localStorage.setItem("index", index);
    atribuirNumeroDeAcertos();
  } else {
    carregarPergunta();
    carregarRespostas();
  }
}

function atribuirNumeroDeAcertos() {
  container.style.display = "none";
  container2.style.display = "block";
  textoAcertos.textContent = `${acertos} de 5`;
}

function verificaSeHaMaisPerguntas() {
  if (index > dataJson.length) {
    container.style.display = "none";
    container2.style.display = "none";
    container3.style.display = "block";
    index = 0;
    localStorage.setItem("index", index);
  }
}
