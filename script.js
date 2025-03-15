let tipoFuncao = null;

function selecionarFuncao(tipo) {
    tipoFuncao = tipo;
    let input = document.getElementById("inputFuncao");

    if (tipo === 1) {
        input.placeholder = "Exemplo: 2x + 3 = 7";
    } else if (tipo === 2) {
        input.placeholder = "Exemplo: x² - 4x + 4 = 0";
    } else {
        input.placeholder = "Exemplo: x³ - 2x² + 3x - 1 = 0";
    }

    input.value = ""; 
    document.getElementById("resultado").innerText = ""; 
}

function calcular() {
    let input = document.getElementById("inputFuncao").value.trim();
    let resultado = document.getElementById("resultado");

    if (!input || tipoFuncao === null) {
        resultado.innerText = "";
        return;
    }

    try {
        let res = resolverFuncao(input, tipoFuncao);
        resultado.innerText = "Resultado: " + res;
    } catch (error) {
        resultado.innerText = "Erro na equação!";
    }
}

function resolverFuncao(equacao, tipo) {
    if (tipo === 1) {
        return resolverPrimeiroGrau(equacao);
    } else if (tipo === 2) {
        return resolverSegundoGrau(equacao);
    } else {
        return "Funções de 3° grau ainda não implementadas.";
    }
}

function resolverPrimeiroGrau(equacao) {
    let match = equacao.match(/(-?\d*)x\s*([\+\-])\s*(\d*)\s*=\s*(-?\d*)/);
    if (!match) return "Formato inválido!";

    let a = parseInt(match[1] || "1");
    let sinal = match[2] === "-" ? -1 : 1;
    let b = parseInt(match[3] || "0") * sinal;
    let c = parseInt(match[4]);

    let x = (c - b) / a;
    return `x = ${x}`;
}

function resolverSegundoGrau(equacao) {
    let match = equacao.match(/(-?\d*)x²\s*([\+\-])\s*(\d*)x\s*([\+\-])\s*(\d*)\s*=\s*0/);
    if (!match) return "Formato inválido!";

    let a = parseInt(match[1] || "1");
    let sinalB = match[2] === "-" ? -1 : 1;
    let b = parseInt(match[3] || "0") * sinalB;
    let sinalC = match[4] === "-" ? -1 : 1;
    let c = parseInt(match[5] || "0") * sinalC;

    let delta = b * b - 4 * a * c;

    if (delta < 0) return "Sem raízes reais!";
    
    let x1 = (-b + Math.sqrt(delta)) / (2 * a);
    let x2 = (-b - Math.sqrt(delta)) / (2 * a);

    return delta === 0 ? `x = ${x1}` : `x1 = ${x1}, x2 = ${x2}`;
}

