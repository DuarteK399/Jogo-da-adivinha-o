// Variáveis do jogo
let numeroSecreto;
let tentativasRestantes;
const MAX_TENTATIVAS = 10;

// Elementos do DOM
const inputPalpite = document.getElementById('palpite');
const btnChutar = document.getElementById('btnChutar');
const btnReiniciar = document.getElementById('btnReiniciar');
const mensagem = document.getElementById('mensagem');
const tentativasDisplay = document.getElementById('tentativas');

// Inicializar o jogo
function iniciarJogo() {
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    tentativasRestantes = MAX_TENTATIVAS;
    
    inputPalpite.value = '';
    inputPalpite.disabled = false;
    btnChutar.disabled = false;
    btnReiniciar.style.display = 'none';
    
    mensagem.textContent = '';
    mensagem.className = 'mensagem';
    tentativasDisplay.textContent = `Tentativas restantes: ${tentativasRestantes}`;
    
    inputPalpite.focus();
    
    console.log('Número secreto:', numeroSecreto); // Para debug (remover em produção)
}

// Validar palpite
function validarPalpite(palpite) {
    if (palpite === '' || isNaN(palpite)) {
        return 'Por favor, digite um número válido!';
    }
    
    const numero = parseInt(palpite);
    
    if (numero < 1 || numero > 100) {
        return 'Digite um número entre 1 e 100!';
    }
    
    return null; // Palpite válido
}

// Processar palpite
function processarPalpite() {
    const palpite = inputPalpite.value;
    
    // Validar
    const erro = validarPalpite(palpite);
    if (erro) {
        mostrarMensagem(erro, 'erro');
        return;
    }
    
    const numero = parseInt(palpite);
    tentativasRestantes--;
    
    // Verificar acerto
    if (numero === numeroSecreto) {
        const tentativasUsadas = MAX_TENTATIVAS - tentativasRestantes;
        mostrarMensagem(
            `🎉 Parabéns! Você acertou em ${tentativasUsadas} tentativa${tentativasUsadas > 1 ? 's' : ''}!`, 
            'sucesso'
        );
        finalizarJogo();
        return;
    }
    
    // Verificar se perdeu
    if (tentativasRestantes === 0) {
        mostrarMensagem(
            ` O número secreto era ${numeroSecreto}.`, 
            'derrota'
        );
        finalizarJogo();
        return;
    }
    
    // Dar dicas
    if (numero < numeroSecreto) {
        mostrarMensagem(' O número secreto é MAIOR!', 'dica');
    } else {
        mostrarMensagem(' O número secreto é MENOR!', 'dica');
    }
    
    // Atualizar tentativas
    tentativasDisplay.textContent = `Tentativas restantes: ${tentativasRestantes}`;
    
    // Alerta se poucas tentativas
    if (tentativasRestantes <= 3) {
        tentativasDisplay.classList.add('alerta');
    }
    
    // Limpar input
    inputPalpite.value = '';
    inputPalpite.focus();
}

// Mostrar mensagem
function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;
}

// Finalizar jogo
function finalizarJogo() {
    inputPalpite.disabled = true;
    btnChutar.disabled = true;
    btnReiniciar.style.display = 'block';
    tentativasDisplay.classList.remove('alerta');
}

// Event Listeners
btnChutar.addEventListener('click', processarPalpite);

inputPalpite.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        processarPalpite();
    }
});

btnReiniciar.addEventListener('click', iniciarJogo);

// Iniciar o jogo ao carregar a página
iniciarJogo();
