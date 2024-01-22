let numerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female',
    {rate:1.2});
}
 
function exibirMensagensIniciais() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um número de 1 a ${numeroLimite}`);
}

exibirMensagensIniciais();

function verificarChute(){
    let chute = document.querySelector('input').value;
    if(chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas': 
        'tentativa'; 
        let msgTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', msgTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if(chute > numeroSecreto){
            exibirTextoNaTela('p', `O número é menor que ${chute}.`);
        } else{
            exibirTextoNaTela('p', `O número é maior que ${chute}`);
        }
        tentativas++;
        limparCampo();
    }
} 

function gerarNumeroAleatorio() {
   let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
   let quantidadeDeNumerosEscolhidos = numerosSorteados.length;

    if(quantidadeDeNumerosEscolhidos == numeroLimite ){
        numerosSorteados = [];
    }
   if(numerosSorteados.includes(numeroEscolhido)){
    return gerarNumeroAleatorio();
   }else{
    numerosSorteados.push(numeroEscolhido);
    return numeroEscolhido
   }
   
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagensIniciais();
    document.getElementById('reiniciar').setAttribute('disabled', true); 
}
