const botaoLimpar = document.querySelector("#clear");
const botoesNumeros = document.querySelectorAll("#num");
const botoesOperadores = document.querySelectorAll("#operador");
const display = document.querySelector("#displayInput");
const botaoIgual = document.querySelector("#igual");
const botaoPonto = document.querySelector("#ponto");


let opercaoAtual = "";
let operador = null;
let valorAnterior = "";
let calculando = false;

function atualizarDisplay () {
    display.value = opercaoAtual;
}

function clearDisplay() {
    display.value = "0";
    opercaoAtual = "";
    operador = null;
    valorAnterior = "";
    calculando = false;
}

function inserirNumero(event) {
    if (calculando) {
        opercaoAtual = event.target.textContent;
        calculando = false;
    } else { 
        opercaoAtual += event.target.textContent;
    }

    atualizarDisplay();
}

function inserirPonto() {
    if (opercaoAtual.indexOf(".") === -1) {
        opercaoAtual += ".";
        atualizarDisplay();
    }
}

function inserirOperador(event) {
    if(opercaoAtual !== "") {
        if(!calculando) {
            if(operador !== null) {
                calcular();
            }
            valorAnterior = opercaoAtual;
            opercaoAtual = "";
        }
        operador = event.target.textContent;
    }
}

function calcular() {
   let resultado = null;
   const operandoAnterior = parseFloat(valorAnterior)
   const operandoAtual = parseFloat(opercaoAtual)

   switch(operador) {
    case "+":
        resultado = operandoAnterior + operandoAtual;
        break;
   
    case "-":
        resultado = operandoAnterior - operandoAtual;
        break;
   
   case "/":
        resultado = operandoAnterior / operandoAtual;
        break;
   
   case "*":
        resultado = operandoAnterior * operandoAtual;
        break;
   }

    opercaoAtual = String(resultado);
   valorAnterior = opercaoAtual;
   calculando = true;
   atualizarDisplay();
}

botaoLimpar.addEventListener("click", clearDisplay);
botaoPonto.addEventListener("click", inserirPonto);
botoesNumeros.forEach((botao) => botao.addEventListener("click", inserirNumero));
botoesOperadores.forEach((botao) => botao.addEventListener("click", inserirOperador));
botaoIgual.addEventListener("click",calcular);
