// ============================================
// MUSIC HUB — CADASTRO
// ============================================

// ===== ELEMENTOS DO DOM =====
const form = document.getElementById('form-cadastro');
const inputNome = document.getElementById('nome');
const inputEmail = document.getElementById('email');
const inputTelefone = document.getElementById('telefone');
const inputCpf = document.getElementById('cpf');
const botao = form.querySelector('button[type="submit"]');

// ============================================
// 1. MÁSCARA DE TELEFONE
// ============================================
// Formato: +55 (11) 99999-9999

inputTelefone.addEventListener('input', (e) => {
  let valor = e.target.value.replace(/\D/g, ''); // só números

  // Remove o "55" do começo se o usuário digitou
  if (valor.startsWith('55')) {
    valor = valor.slice(2);
  }

  // Limita a 11 dígitos (DDD + 9 dígitos)
  valor = valor.slice(0, 11);

  // Formata
  let formatado = '';
  if (valor.length > 0) {
    formatado = '+55 (' + valor.slice(0, 2);
  }
  if (valor.length > 2) {
    formatado += ') ' + valor.slice(2, 7);
  }
  if (valor.length > 7) {
    formatado += '-' + valor.slice(7, 11);
  }

  e.target.value = formatado;
});

// ============================================
// 2. MÁSCARA DE CPF
// ============================================
// Formato: 123.456.789-00

inputCpf.addEventListener('input', (e) => {
  let valor = e.target.value.replace(/\D/g, ''); // só números
  valor = valor.slice(0, 11); // limita a 11 dígitos

  // Formata
  let formatado = '';
  if (valor.length > 0) {
    formatado = valor.slice(0, 3);
  }
  if (valor.length > 3) {
    formatado += '.' + valor.slice(3, 6);
  }
  if (valor.length > 6) {
    formatado += '.' + valor.slice(6, 9);
  }
  if (valor.length > 9) {
    formatado += '-' + valor.slice(9, 11);
  }

  e.target.value = formatado;
});

// ============================================
// 3. VALIDAÇÕES
// ============================================

// Nome: pelo menos 2 palavras (nome + sobrenome)
function validarNome(nome) {
  const partes = nome.trim().split(/\s+/);
  return partes.length >= 2 && partes.every(p => p.length >= 2);
}

// E-mail: formato básico
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Telefone: 11 dígitos
function validarTelefone(telefone) {
  const numeros = telefone.replace(/\D/g, '');
  // Remove o 55 se tiver
  const semPais = numeros.startsWith('55') ? numeros.slice(2) : numeros;
  return semPais.length === 11;
}

// CPF: algoritmo real de validação
function validarCpf(cpf) {
  const numeros = cpf.replace(/\D/g, '');

  // Precisa ter 11 dígitos
  if (numeros.length !== 11) return false;

  // Rejeita CPFs com todos os dígitos iguais (111.111.111-11, etc)
  if (/^(\d)\1{10}$/.test(numeros)) return false;

  // Valida primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(numeros[i]) * (10 - i);
  }
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(numeros[9])) return false;

  // Valida segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(numeros[i]) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(numeros[10])) return false;

  return true;
}

// ============================================
// 4. FEEDBACK VISUAL
// ============================================

function marcarValido(input) {
  input.classList.remove('invalido');
  input.classList.add('valido');
}

function marcarInvalido(input) {
  input.classList.remove('valido');
  input.classList.add('invalido');
}

function limparFeedback(input) {
  input.classList.remove('valido', 'invalido');
}

// ============================================
// 5. VALIDAÇÃO EM TEMPO REAL
// ============================================

inputNome.addEventListener('blur', () => {
  if (inputNome.value.trim() === '') {
    limparFeedback(inputNome);
    return;
  }
  validarNome(inputNome.value) ? marcarValido(inputNome) : marcarInvalido(inputNome);
});

inputEmail.addEventListener('blur', () => {
  if (inputEmail.value.trim() === '') {
    limparFeedback(inputEmail);
    return;
  }
  validarEmail(inputEmail.value) ? marcarValido(inputEmail) : marcarInvalido(inputEmail);
});

inputTelefone.addEventListener('blur', () => {
  if (inputTelefone.value.trim() === '') {
    limparFeedback(inputTelefone);
    return;
  }
  validarTelefone(inputTelefone.value) ? marcarValido(inputTelefone) : marcarInvalido(inputTelefone);
});

inputCpf.addEventListener('blur', () => {
  if (inputCpf.value.trim() === '') {
    limparFeedback(inputCpf);
    return;
  }
  validarCpf(inputCpf.value) ? marcarValido(inputCpf) : marcarInvalido(inputCpf);
});

// Remove o feedback quando o usuário começa a digitar de novo
[inputNome, inputEmail, inputTelefone, inputCpf].forEach(input => {
  input.addEventListener('input', () => {
    limparFeedback(input);
    atualizarBotao();
  });
});

// ============================================
// 6. BOTÃO HABILITADO/DESABILITADO
// ============================================

function formEstaValido() {
  return (
    validarNome(inputNome.value) &&
    validarEmail(inputEmail.value) &&
    validarTelefone(inputTelefone.value) &&
    validarCpf(inputCpf.value)
  );
}

function atualizarBotao() {
  if (formEstaValido()) {
    botao.disabled = false;
    botao.classList.add('pronto');
  } else {
    botao.disabled = true;
    botao.classList.remove('pronto');
  }
}

// Chama a atualização sempre que algo muda
[inputNome, inputEmail, inputTelefone, inputCpf].forEach(input => {
  input.addEventListener('input', atualizarBotao);
  input.addEventListener('blur', atualizarBotao);
});

// Inicializa desabilitado
atualizarBotao();

// ============================================
// 7. ENVIO DO FORMULÁRIO
// ============================================

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Valida tudo de novo (segurança)
  if (!formEstaValido()) {
    alert('Por favor, preencha todos os campos corretamente.');
    return;
  }

  // Monta o objeto com os dados
  const usuario = {
    nome: inputNome.value.trim(),
    email: inputEmail.value.trim(),
    telefone: inputTelefone.value,
    cpf: inputCpf.value,
    criadoEm: new Date().toISOString()
  };
  // Se já existir uma lista de usuários, adiciona nela
  const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  usuarios.push(usuario);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  // Feedback visual
  botao.textContent = 'CADASTRANDO...';
  botao.disabled = true;

  // Simula um delay (como se fosse uma API)
  setTimeout(() => {
    botao.textContent = '✓ CADASTRADO';

    // Redireciona pra biblioteca após 1 segundo
    setTimeout(() => {
     window.location.href = '../../biblioteca/biblioteca.html';  
    }, 1000);
  }, 800);

  // DEBUG: mostra no console
  console.log('Usuário cadastrado:', usuario);
  console.log('Todos os usuários:', usuarios);
});
