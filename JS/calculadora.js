const pantalla = document.getElementById('pantalla');
const botones = document.querySelectorAll('.btn-contenedor button');

// variables para almacenar la operacion actual
let operacionActual = '';
let operadorAnterior = '';
let resultado = null;

botones.forEach((boton) => {
    boton.addEventListener('click', () => {
        const valor = boton.innerText;

        //operaciones especiales

        if (valor === 'AC') {
            operacionActual = '';
            operadorAnterior = '';
            resultado = null;
            pantalla.value = '0';
        } else if (valor === '+/-') {
            operacionActual = operacionActual.startsWith('-')
                ? operacionActual.substring(1)
                : `-${operacionActual}`;
            pantalla.value = operacionActual;
        } else if (valor === '%') {
            operacionActual = (parseFloat(operacionActual) / 100).toString();
            pantalla.value = operacionActual;
        } else if (valor === '=') {
            if (operadorAnterior) {
                calcularResultado();
                pantalla.value = resultado;
                operacionActual = resultado.toString();
                operadorAnterior = '';
            }
        } else if (['+', '-', 'X', '÷'].includes(valor)) {
            if (operadorAnterior) {
                calcularResultado();
            }
            operadorAnterior = valor;
            resultado = parseFloat(operacionActual) || 0;
            operacionActual = '';
        } else {
            if (valor === '.' && operacionActual.includes('.')) return;
            operacionActual += valor;
            pantalla.value = operacionActual;
        }
    });
});

//Funcion para calcular el resultado

function calcularResultado() {
    const actual = parseFloat(operacionActual) || 0;
    switch (operacionActual) {
        case '+':
            resultado += actual;
            break;
            case '-':
                resultado -= actual;
                break;
            case 'X':
                resultado *= actual;
                break;
            case '÷':
                if(actual !== 0){
                    resultado /= actual;
                }else{
                    pantalla.value = 'Error'
                    operacionActual = '';
                    resultado = null;
                    return;
                }
                break;
    }
    operacionActual = resultado.toString();
}