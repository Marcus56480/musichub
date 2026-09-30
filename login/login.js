const botoes = document.querySelectorAll('.categorias-login button');

botoes.forEach(botao => {
    botao.addEventListener('click', (evento) => {
        evento.preventDefault(); // Evita que a página recarregue

        // Se o botão já estiver ativo, não faz nada
        if (botao.classList.contains('active')) return;

        // 1. ANTES DE ATIVAR O NOVO, VAMOS RESETAR O BOTÃO QUE ESTAVA ATIVO
        const botaoAtivoAnterior = document.querySelector('.categorias-login button.active');
        if (botaoAtivoAnterior) {
            botaoAtivoAnterior.classList.remove('active');
            
            // Volta o ícone do anterior para a imagem preta original
            const imgAnterior = botaoAtivoAnterior.querySelector('img');
            imgAnterior.src = imgAnterior.src.replace('-verde.svg', '.svg');
        }

        // 2. AGORA ATIVAMOS O BOTÃO CLICADO
        botao.classList.add('active');

        // Altera o caminho da imagem atual para a versão verde
        const imgAtual = botao.querySelector('img');
        imgAtual.src = imgAtual.src.replace('.svg', '-verde.svg');
    });
});
