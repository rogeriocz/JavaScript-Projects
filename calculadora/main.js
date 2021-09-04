const botones = [
  ["C", "^", "%", "/"],
  ["7", "8", "9", "*"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["+/-", "0", ".", "="],
];

const calculo = {
  operacion: "",
  memoria: undefined,
  numero: 0,
  resuelto: false,

  agregarDigito: function (n) {
      if(this.resuelto){
          this.resuelto = false;
          this.numero = parseFloat(''.concat(n));
      }else{
          this.numero = parseFloat(''.concat(this.numero,n));
      }
      //console.log(this)
  },
  agregarOperacion: function (op) {
      const { memoria, numero, operacion } = this;

      if(numero == 0 && memoria == undefined) return false;

      if(operacion == ''){
        this.operacion = op;
        this.memoria = numero;
        this.numero = 0;
      }else{
          this.numero = this.resolver();
          this.resuelto = true;
      }
      console.log(this);
  },
  agregarFuncion: function (op) {
      switch(op){
          case '=':
              const resultado = this.resolver();
              this.agregarFuncion('C');
              this.numero = resultado;
              break;
          case 'C':
            this.operacion =  "";
            this.memoria =  undefined;
            this.numero =  0;
            this.resuelto =  true;
              break;
          case '.':
              if(!esFlotante(this.numero)){
                  this.numero = this.numero + '.';
              }
              break;
          case '+/-':
              this.numero = this.numero * - 1;
              break;
      }
      console.log(this)
  },
  resolver: function () {
      switch(this.operacion){
          case '+': return this.suma();
          case '-': return this.resta();
          case '*': return this.multiplicacion();
          case '/': return this.division();
          case '%': return this.porcentaje();
          case '^': return this.exponente();

          default:
              throw new Error('Simbolo no identificado');
      }
  },
  render: function (elemento) {
      elemento.textContent = this.numero;
  },
  suma: function () {
      return this.numero + this.memoria;
  },
  resta: function () {
    return this.memoria - this.numero;
  },
  multiplicacion: function () {
    return this.numero * this.memoria;
  },
  division: function () {
    return this.memoria / this.numero;
  },
  porcentaje: function () {
    return this.memoria % this.numero;
  },
  exponente: function () {
    return this.memoria ** this.numero;
  },
};

const display = $("#display");
const botonesContainer = $("#botones-container");

for (let fila of botones) {
  for (let celda of fila) {
    const boton = document.createElement("button");
    //console.log(celda);
    boton.textContent = celda;
    boton.addEventListener("click", (event) => {
      if (esNumero(celda)) {
        calculo.agregarDigito(celda);
      }else if(esFuncion(celda)){
        calculo.agregarFuncion(celda)
      }else{
          calculo.agregarOperacion(celda);
      }
      calculo.render(display)
    });
    botonesContainer.appendChild(boton);
  }
}

function esNumero(n) {
  return !isNaN(n);
}

function esFlotante(n) {
  if (n.toString().indexOf(".") > -1) {
    return true;
  } else {
    return false;
  }
}

function esFuncion(n){
    const funciones = ['C','=','.','+/-'];
    return funciones.some((caracter) => caracter == n);
}
//esta manera de poner function $(selector) NO ES JQUERY ES JAVAScript
function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}
