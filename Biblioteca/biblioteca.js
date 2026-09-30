// ============================================
// MUSIC HUB — BIBLIOTECA (JS PURO)
// ============================================

// ===== BANCO DE DADOS DE MÚSICAS (MP3) =====
const musicas = {
  'Chico Buarque':           { arquivo: 'audio/chico-buarque.mp3' },
  'Pra sofrer de amor':      { arquivo: 'audio/pra-sofrer-de-amor.mp3' },
  'Antigas':                 { arquivo: 'audio/antigas.mp3' },
  'Tim Maia':                { arquivo: 'audio/tim-maia.mp3' },
  'Meu Trem das 11':         { arquivo: 'audio/meu-trem-das-11.mp3' },
  'Marisa Monte':            { arquivo: 'audio/marisa-monte.mp3' },
  'Jazz pra alma':           { arquivo: 'audio/jazz-pra-alma.mp3' },
  'Academia':                { arquivo: 'audio/academia.mp3' },
  'Trabalha e trabalha':     { arquivo: 'audio/trabalha-e-trabalha.mp3' },
  'Leituras':                { arquivo: 'audio/leituras.mp3' },
  'Pegar trem lotado':       { arquivo: 'audio/pegar-trem-lotado.mp3' },
  'Jogar mine com os crias': { arquivo: 'audio/jogar-mine-crias.mp3' },
  'Rock Brasileiro':         { arquivo: 'audio/rock-brasileiro.mp3' },
  'Indie Brasil':            { arquivo: 'audio/indie-brasil.mp3' },
  'Pink Floyd':              { arquivo: 'audio/pink-floyd.mp3' },
  'Kendrick Lamar':          { arquivo: 'audio/kendrick-lamar.mp3' },
  'Ritmos de Jazz':          { arquivo: 'audio/ritmos-de-jazz.mp3' },
  'Kanye West':              { arquivo: 'audio/kanye-west.mp3' },

  // Músicas da lista de MÚSICAS
  'Construção':              { arquivo: 'audio/construcao.mp3' },
  'Você':                    { arquivo: 'audio/voce.mp3' },
  'Apesar de Você':          { arquivo: 'audio/apesar-de-voce.mp3' },
  'O Descobridor':           { arquivo: 'audio/o-descobridor.mp3' },
  'Trem das Onze':           { arquivo: 'audio/trem-das-onze.mp3' }
};

// ===== ESTADO =====
let audio = new Audio();
let musicaAtual = null;
let timerInterval = null;

// ===== ELEMENTOS DO DOM (PLAYER) =====
const busca = document.querySelector('.busca');
const playerImagem = document.querySelector('.player-info img');
const playerTitulo = document.querySelector('.player-info strong');
const playerSubtitulo = document.querySelector('.player-info span');
const playerBotao = document.querySelector('.play-principal');
const playerAnterior = document.querySelector('.player-controles button:first-child');
const playerProximo = document.querySelector('.player-controles button:last-child');
const barraProgresso = document.querySelector('.player-progresso input');
const tempoAtual = document.querySelector('.player-progresso span:first-child');
const tempoTotal = document.querySelector('.player-progresso span:last-child');
const volumeSlider = document.querySelector('.player-volume input');

// ===== CONTAINER DE RENDERIZAÇÃO =====
const containerConteudo = document.getElementById('conteudo-categoria');

// ===== CONFIGURAÇÃO DE CATEGORIAS =====
const CATEGORIAS_LISTA = ['musicas', 'episodios', 'downloads'];

// ============================================
// RENDERIZAÇÃO
// ============================================

function nomeBonito(cat) {
  const nomes = {
    playlists: 'Playlists',
    musicas: 'Suas músicas',
    podcasts: 'Seus podcasts',
    albuns: 'Seus álbuns',
    downloads: 'Baixadas',
    episodios: 'Episódios salvos'
  };
  return nomes[cat] || cat;
}

function criarCard(item) {
  return `
    <article class="card">
      <img src="${item.img}" alt="${item.titulo}" />
      <h3>${item.titulo}</h3>
      <p>${item.sub}</p>
      <button class="play">▶</button>
    </article>
  `;
}

function criarItemLista(item, mostrarBaixado = false, tipo = '') {
  return `
    <li class="item-lista" data-tipo="${tipo}">
      <img src="${item.img}" alt="${item.titulo}" />
      <div class="info">
        <h3>${item.titulo}</h3>
        <p>${item.sub}</p>
      </div>
      <span class="duracao">${item.duracao || ''}</span>
      ${mostrarBaixado ? '<span class="icone-baixado">✔</span>' : ''}
      <button class="play-lista">▶</button>
    </li>
  `;
}


function criarSecaoCarrossel(secao) {
  return `
    <section class="secao">
      <header class="secao-header">
        <h2>${secao.titulo}</h2>
        <a href="#">Ver tudo</a>
      </header>
      <div class="carrossel">
        ${secao.itens.map(criarCard).join('')}
      </div>
    </section>
  `;
}

function renderizarCategoria(categoria) {
  const conteudo = dados[categoria];

  if (!conteudo || conteudo.length === 0) {
    containerConteudo.innerHTML = `<p class="vazio">Nada por aqui ainda.</p>`;
    return;
  }

  const ehLista = CATEGORIAS_LISTA.includes(categoria);

  if (ehLista) {
    // Lista vertical direta
    const mostrarBaixado = categoria === 'downloads';
    const itensHTML = conteudo.map(i => criarItemLista(i, mostrarBaixado)).join('');

    containerConteudo.innerHTML = `
      <section class="secao">
        <header class="secao-header">
          <h2>${nomeBonito(categoria)}</h2>
        </header>
        <ul class="lista">${itensHTML}</ul>
      </section>
    `;
  } else {
    // Carrossel com múltiplas seções
    const html = conteudo.map(criarSecaoCarrossel).join('');
    containerConteudo.innerHTML = html;
  }

  
  bindarEventos();
}

// ============================================
// EVENTOS
// ============================================

function bindarEventos() {
  // Botões de play (cards e listas)
  document.querySelectorAll('.card .play, .item-lista .play-lista').forEach(botao => {
    botao.addEventListener('click', (e) => {
      e.stopPropagation();

      const container = botao.closest('.card, .item-lista');
      const titulo = container.querySelector('h3').textContent;
      const imagem = container.querySelector('img').src;
      const subtitulo = container.querySelector('p').textContent;

      // Mesma música tocando → pausa
      if (musicaAtual === titulo && !audio.paused) {
        audio.pause();
        botao.textContent = '▶';
        playerBotao.textContent = '▶';
        clearInterval(timerInterval);
        return;
      }

      // Mesma música pausada → retoma
      if (musicaAtual === titulo && audio.paused && audio.src) {
        audio.play();
        botao.textContent = '⏸';
        playerBotao.textContent = '⏸';
        iniciarTimer();
        return;
      }

      // Nova música
      tocarMusica(titulo, imagem, subtitulo);
      botao.textContent = '⏸';
    });
  });

  // Clicar no item também toca
  document.querySelectorAll('.card, .item-lista').forEach(item => {
    item.addEventListener('click', (e) => {
      if (e.target.closest('.play, .play-lista')) return;
      const botao = item.querySelector('.play, .play-lista');
      if (botao) botao.click();
    });
  });
}

// ===== FILTROS =====
const filtros = document.querySelectorAll('.filtro');

filtros.forEach(filtro => {
  filtro.addEventListener('click', () => {
    filtros.forEach(f => f.classList.remove('ativo'));
    filtro.classList.add('ativo');

    const cat = filtro.dataset.filtro;
    renderizarCategoria(cat);
  });
});

// ===== BUSCA EM TEMPO REAL =====
busca.addEventListener('input', (e) => {
  const termo = e.target.value.toLowerCase();

  document.querySelectorAll('.card').forEach(card => {
    const titulo = card.querySelector('h3').textContent.toLowerCase();
    const sub = card.querySelector('p').textContent.toLowerCase();
    card.style.display = (titulo.includes(termo) || sub.includes(termo)) ? '' : 'none';
  });

  document.querySelectorAll('.item-lista').forEach(item => {
    const titulo = item.querySelector('h3').textContent.toLowerCase();
    const sub = item.querySelector('p').textContent.toLowerCase();
    item.style.display = (titulo.includes(termo) || sub.includes(termo)) ? '' : 'none';
  });
});

// ============================================
// PLAYER
// ============================================

function formatarTempo(segundos) {
  if (!segundos || isNaN(segundos)) return '0:00';
  const min = Math.floor(segundos / 60);
  const seg = Math.floor(segundos % 60);
  return `${min}:${seg.toString().padStart(2, '0')}`;
}

function iniciarTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (audio && !audio.paused) {
      const atual = audio.currentTime;
      const total = audio.duration || 0;

      tempoAtual.textContent = formatarTempo(atual);
      if (total > 0) {
        barraProgresso.value = (atual / total) * 100;
      }
    }
  }, 500);
}

function atualizarInterface(titulo, imagemSrc, subtitulo) {
  playerTitulo.textContent = titulo;
  playerImagem.src = imagemSrc;
  playerSubtitulo.textContent = subtitulo;
  musicaAtual = titulo;
}

function tocarMusica(nomeMusica, imagemSrc, subtitulo) {
  audio.pause();
  audio.currentTime = 0;

  const info = musicas[nomeMusica];

  atualizarInterface(nomeMusica, imagemSrc, subtitulo);

  // Se não tem arquivo, modo visual
  if (!info || !info.arquivo) {
    playerBotao.textContent = '⏸';
    return;
  }

  audio.src = info.arquivo;
  audio.volume = volumeSlider.value / 100;

  audio.addEventListener('loadedmetadata', () => {
    tempoTotal.textContent = formatarTempo(audio.duration);
  }, { once: true });

  audio.addEventListener('ended', () => {
    playerBotao.textContent = '▶';
    barraProgresso.value = 0;
    tempoAtual.textContent = '0:00';
    clearInterval(timerInterval);
  }, { once: true });

  audio.play()
    .then(() => {
      playerBotao.textContent = '⏸';
      iniciarTimer();
    })
    .catch(() => {
      console.warn('Áudio não encontrado:', info.arquivo);
      playerBotao.textContent = '⏸';
    });
}

// ============================================
// CONTROLES DO PLAYER
// ============================================

// Play/Pause principal
playerBotao.addEventListener('click', () => {
  if (!musicaAtual) return;

  if (!audio.paused) {
    audio.pause();
    playerBotao.textContent = '▶';
    clearInterval(timerInterval);
  } else {
    audio.play();
    playerBotao.textContent = '⏸';
    iniciarTimer();
  }
});

// Anterior → volta ao início
playerAnterior.addEventListener('click', () => {
  if (!musicaAtual) return;
  audio.currentTime = 0;
  barraProgresso.value = 0;
  tempoAtual.textContent = '0:00';
});

// Próximo → reinicia
playerProximo.addEventListener('click', () => {
  if (!musicaAtual) return;
  audio.currentTime = 0;
  barraProgresso.value = 0;
  tempoAtual.textContent = '0:00';
});

// Barra de progresso → clicar pula
barraProgresso.addEventListener('input', (e) => {
  if (!audio.duration) return;
  const porcento = e.target.value / 100;
  audio.currentTime = porcento * audio.duration;
});

// Volume
volumeSlider.addEventListener('input', (e) => {
  audio.volume = e.target.value / 100;
});

// ============================================
// INICIALIZAÇÃO
// ============================================

// Renderiza a categoria inicial
function renderizarCategoria(categoria) {
  const conteudo = dados[categoria];

  if (!conteudo || conteudo.length === 0) {
    containerConteudo.innerHTML = `<p class="vazio">Nada por aqui ainda.</p>`;
    return;
  }

  const ehLista = CATEGORIAS_LISTA.includes(categoria);

  if (ehLista) {
    // Lista vertical direta
    const mostrarBaixado = categoria === 'downloads';
    const itensHTML = conteudo.map(i => criarItemLista(i, mostrarBaixado, categoria)).join('');   // ✅ com categoria

    containerConteudo.innerHTML = `
      <section class="secao">
        <header class="secao-header">
          <h2>${nomeBonito(categoria)}</h2>
        </header>
        <ul class="lista">${itensHTML}</ul>
      </section>
    `;
  } else {
    // Carrossel com múltiplas seções
    const html = conteudo.map(criarSecaoCarrossel).join('');
    containerConteudo.innerHTML = html;
  }

  bindarEventos();
}