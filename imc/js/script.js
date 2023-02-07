function start() {
    var botaoCalcular = document.querySelector('#botao_calculo')
    botaoCalcular.addEventListener('click', handleButtonClick)

    var inputPeso = document.querySelector('#peso')
    var inputAltura = document.querySelector('#altura')

    inputPeso.addEventListener('input', handleButtonClick)
    inputAltura.addEventListener('input', handleButtonClick)

    handleButtonClick()
}

function calcularImc(peso, altura) {
    return peso / (altura * altura)
}

function handleButtonClick () {
    var inputPeso = document.querySelector('#peso')
    var inputAltura = document.querySelector('#altura')
    var resultatoImc = document.querySelector('#IMC')

    var peso = Number(inputPeso.value)
    var altura = Number(inputAltura.value)

    console.log(peso)
    var imc = calcularImc(peso, altura).toFixed(2).replace('.', ',')
    resultatoImc.textContent = imc
    console.log(imc)
}



start()