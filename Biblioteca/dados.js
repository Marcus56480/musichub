// ============================================
// MUSIC HUB — BANCO DE DADOS
// ============================================

const dados = {

  // ===== PLAYLISTS (carrossel, com seções) =====
  playlists: [
    {
      titulo: 'Tocadas recentemente',
      itens: [
        { titulo: 'Chico Buarque',       sub: 'Playlist • Chico Buarque',         img: '../imgs/imagens. biblioteca/Carrossel1.Chico-buarque.jpg' },
        { titulo: 'Pra sofrer de amor',  sub: 'Playlist • Pra sofrer de amor',    img: '../imgs/imagens. biblioteca/Carrossel1.Pra-sofrer-de-amor.jpg' },
        { titulo: 'Antigas',             sub: 'Playlist • Sua biblioteca',        img: '../imgs/imagens. biblioteca/Carrossel1.Eu-sou-do-Brasil.jpg' },
        { titulo: 'Tim Maia',            sub: 'Playlist • Tim Maia',              img: '../imgs/imagens. biblioteca/Carrossel1.Tim-maia.jpg' },
        { titulo: 'Meu Trem das 11',     sub: 'Playlist • Meu Trem das 11',       img: '../imgs/imagens. biblioteca/Carrossel1.Meu-trem-das-onzes.jpg' },
        { titulo: 'Marisa Monte',        sub: 'Playlist • Marisa Monte',          img: '../imgs/imagens. biblioteca/Carrossel1.Marisa-monte.jpg' }
      ]
    },
    {
      titulo: 'Rotina',
      itens: [
        { titulo: 'Jazz pra alma',          sub: 'Playlist • Jazz pra alma',          img: '../imgs/imagens. biblioteca/Carrossel2.Jazz-pra-alma.jpg' },
        { titulo: 'Academia',               sub: 'Playlist • Vários',                 img: '../imgs/imagens. biblioteca/Carrossel2.Academia.jpg' },
        { titulo: 'Trabalha e trabalha',    sub: 'Playlist • Trabalha e trabalha',    img: '../imgs/imagens. biblioteca/carrossel2.Traabalha-e-trabalha.gif' },
        { titulo: 'Leituras',               sub: 'Playlist • Sua biblioteca',         img: '../imgs/imagens. biblioteca/Carrossel2.Leitura.jpg' },
        { titulo: 'Pegar trem lotado',      sub: 'Playlist • Pegar trem lotado',      img: '../imgs/imagens. biblioteca/Carrossel2.Pegar-trem-lotado.jpg' },
        { titulo: 'Jogar mine com os crias', sub: 'Playlist • Variados',              img: '../imgs/imagens. biblioteca/Carrossel2. Jogar-mine-com-os-cria.jpg' }
      ]
    },
    {
      titulo: 'Não se esqueça delas',
      itens: [
        { titulo: 'Rock Brasileiro',   sub: 'Playlist • Vários',       img: '../imgs/imagens. biblioteca/Carrossel3.Rock-brasileiro.jpg' },
        { titulo: 'Indie Brasil',      sub: 'Playlist • Vários',       img: '../imgs/imagens. biblioteca/Carrossel3.Indie-Brasil.jpg' },
        { titulo: 'Pink Floyd',        sub: 'Playlist • Variados',     img: '../imgs/imagens. biblioteca/Carrossel3.Floyd-no-pink.jpg' },
        { titulo: 'Kendrick Lamar',    sub: 'Playlist • Vários',       img: '../imgs/imagens. biblioteca/Carrossel3.kendrick-lamar.jpg' },
        { titulo: 'Ritmos de Jazz',    sub: 'Playlist • Vários',       img: '../imgs/imagens. biblioteca/Carrossel3.Ritimos-de-jazz.jpg' },
        { titulo: 'Kanye West',        sub: 'Playlist • Vários',       img: '../imgs/imagens. biblioteca/Carrossel.Kanye-west.jpg' }
      ]
    }
  ],

  // ===== ÁLBUNS (carrossel, com seções) =====
  albuns: [
    {
      titulo: 'Seus álbuns',
      itens: [
        { titulo: 'Construção',         sub: 'Chico Buarque • 1971',      img: '../imgs/imagens. biblioteca/Carrossel1.Chico-buarque.jpg' },
        { titulo: 'Tim Maia 1970',      sub: 'Tim Maia • 1970',           img: '../imgs/imagens. biblioteca/Carrossel1.Tim-maia.jpg' },
        { titulo: 'Elis & Tom',         sub: 'Elis Regina • 1974',        img: '../imgs/imagens. biblioteca/Carrossel1.Marisa-monte.jpg' },
        { titulo: 'Clube da Esquina',   sub: 'Milton Nascimento • 1972',  img: '../imgs/imagens. biblioteca/Carrossel1.Eu-sou-do-Brasil.jpg' }
      ]
    }
  ],

  // ===== PODCASTS (carrossel, com seções) =====
  podcasts: [
    {
      titulo: 'Seus podcasts',
      itens: [
        { titulo: 'Podcast XYZ',        sub: 'Novos episódios • quarta',  img: '../imgs/imagens. biblioteca/Carrossel.Vertical.jpg' },
        { titulo: 'Flow Podcast',       sub: 'Novos episódios • terça',   img: '../imgs/imagens. biblioteca/Carrossel.Vertical (2).jpg' },
        { titulo: 'Inteligência Ltda',  sub: 'Novos episódios • sexta',   img: '../imgs/imagens. biblioteca/Carrossel.Vertical (3).jpg' }
      ]
    }
  ],

  // ===== MÚSICAS (lista vertical) =====
  musicas: [
    { titulo: 'Construção',      sub: 'Chico Buarque',     duracao: '6:32', img: '../imgs/imagens. biblioteca/Carrossel1.Chico-buarque.jpg' },
    { titulo: 'Você',            sub: 'Tim Maia',          duracao: '4:15', img: '../imgs/imagens. biblioteca/Carrossel1.Tim-maia.jpg' },
    { titulo: 'Apesar de Você',  sub: 'Chico Buarque',     duracao: '3:55', img: '../imgs/imagens. biblioteca/Carrossel1.Pra-sofrer-de-amor.jpg' },
    { titulo: 'O Descobridor',   sub: 'Marisa Monte',      duracao: '4:10', img: '../imgs/imagens. biblioteca/Carrossel1.Marisa-monte.jpg' },
    { titulo: 'Trem das Onze',   sub: 'Adoniran Barbosa',  duracao: '3:02', img: '../imgs/imagens. biblioteca/Carrossel1.Meu-trem-das-onzes.jpg' }
  ],

  // ===== EPISÓDIOS (lista vertical) =====
  episodios: [
    { titulo: 'EP 42 — Como aprender a programar', sub: 'Podcast XYZ',   duracao: '48:12',  img: '../imgs/imagens. biblioteca/Carrossel.Vertical.jpg' },
    { titulo: 'EP 41 — Carreira em tecnologia',    sub: 'Podcast XYZ',   duracao: '52:30',  img: '../imgs/imagens. biblioteca/Carrossel.Vertical (2).jpg' },
    { titulo: 'EP 100 — Especial de aniversário',  sub: 'Flow Podcast',  duracao: '1:20:45', img: '../imgs/imagens. biblioteca/Carrossel.Vertical (3).jpg' }
  ],

  // ===== DOWNLOADS (lista vertical) =====
  downloads: [
    { titulo: 'Construção',                         sub: 'Chico Buarque',  duracao: '6:32',  img: '../imgs/imagens. biblioteca/Carrossel1.Chico-buarque.jpg' },
    { titulo: 'EP 42 — Como aprender a programar',  sub: 'Podcast XYZ',   duracao: '48:12', img: '../imgs/imagens. biblioteca/Carrossel.Vertical.jpg' },
    { titulo: 'Você',                               sub: 'Tim Maia',       duracao: '4:15',  img: '../imgs/imagens. biblioteca/Carrossel1.Tim-maia.jpg' }
  ]

};