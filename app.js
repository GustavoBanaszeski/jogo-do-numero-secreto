let listaDeNumerosSorteados = [];
let limiteDeNumeros = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela (tag, texto){   // função nome (parametro1, parametro2)
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak (texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function mensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto') 
    exibirTextoNaTela ('p',`Escolha um número entre 1 e ${limiteDeNumeros}`) 
}

mensagemInicial()

function verificarChute() {
    let chute = document.querySelector ('input').value;
    console.log (chute == numeroSecreto);
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1? 'tentativas': 'tentativa';
        let mensagemTentativas = `Parabéns, você descobriu o Número Secreto! com ${tentativas} ${palavraTentativa} `;
        exibirTextoNaTela ('p', mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('h1', 'Errou!');
            exibirTextoNaTela ('p', `O número secreto é menor que ${chute}`);
        } else {
            exibirTextoNaTela('h1', 'Errou!');
            exibirTextoNaTela ('p', `O número secreto é maior que ${chute}`);
        }
        tentativas++;
        limparCampo();
    }
}

// função que devolve uma informação
function gerarNumeroAleatorio () { 
    let numeroEscolhido = parseInt (Math.random() * limiteDeNumeros +1);
    let quantidadeElementosLista = listaDeNumerosSorteados.length;

    if (quantidadeElementosLista == limiteDeNumeros) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido))  {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push (numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo (){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
