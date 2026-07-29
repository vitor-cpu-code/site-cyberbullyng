document.addEventListener("DOMContentLoaded", () => {
  
  // --- 1. Acessibilidade (Modo Escuro e Tamanho da Fonte) ---
  const btnContrast = document.getElementById("btn-contrast");
  const btnFontIncrease = document.getElementById("btn-font-increase");
  const btnFontDecrease = document.getElementById("btn-font-decrease");
  let currentFontSize = 100; // Porcentagem

  btnContrast.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    btnContrast.innerHTML = isDark ? '<i class="fas fa-sun"></i> Modo Claro' : '<i class="fas fa-moon"></i> Modo Escuro';
  });

  btnFontIncrease.addEventListener("click", () => {
    if (currentFontSize < 130) {
      currentFontSize += 10;
      document.documentElement.style.fontSize = `${currentFontSize}%`;
    }
  });

  btnFontDecrease.addEventListener("click", () => {
    if (currentFontSize > 80) {
      currentFontSize -= 10;
      document.documentElement.style.fontSize = `${currentFontSize}%`;
    }
  });

  // --- 2. Botão Voltar ao Topo ---
  const btnTop = document.getElementById("btn-top");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      btnTop.style.display = "block";
    } else {
      btnTop.style.display = "none";
    }
  });

  btnTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // --- 3. Portal de Escuta (Simulação) ---
  const formEscuta = document.getElementById("form-escuta");
  const respostaAcolhimento = document.getElementById("resposta-acolhimento");
  const mensagemResposta = document.getElementById("mensagem-resposta");

  const mensagensAcolhedoras = [
    "Obrigado por compartilhar o que está sentindo. Lembre-se: você nunca está sozinho(a) e seus sentimentos são válidos!",
    "Sua coragem em desabafar é o primeiro passo. Existem pessoas na sua escola e família que se importam de verdade com você.",
    "Não guarde dores ou preconceitos apenas para você. Procurar ajuda é um ato de maturidade e bravura!"
  ];

  formEscuta.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = document.getElementById("nome-aluno").value.trim();
    const textoNome = nome ? nome : "Estudante";
    
    // Escolhe uma mensagem motivacional aleatória
    const msgAleatoria = mensagensAcolhedoras[Math.floor(Math.random() * mensagensAcolhedoras.length)];
    
    mensagemResposta.innerHTML = `<strong>Olá, ${textoNome}!</strong> ${msgAleatoria}`;
    respostaAcolhimento.classList.remove("hidden");
    
    // Limpa os campos do formulário (nenhum dado é salvo)
    formEscuta.reset();
  });

  // --- 4. Quiz Interativo ---
  const quizPerguntas = [
    {
      pergunta: "1. Um colega criou um perfil falso para zombar das fotos de outro estudante. Isso é considerado:",
      opcoes: ["Apenas uma brincadeira inofensiva", "Cyberbullying e uma conduta inaceitável", "Algo normal nas redes sociais"],
      correta: 1
    },
    {
      pergunta: "2. Qual destas opções representa uma senha segura para suas contas digitais?",
      opcoes: ["12345678", "suadata_de_nascimento", "K8#mP!9z$L2"],
      correta: 2
    },
    {
      pergunta: "3. Se você presenciar um ato de preconceito ou humilhação em um grupo de mensagens, o que deve fazer?",
      opcoes: ["Incentivar enviando figurinhas", "Não apoiar a agressão e avisar um adulto de confiança", "Compartilhar com outras pessoas"],
      correta: 1
    },
    {
      pergunta: "4. O que você deve fazer ao receber uma mensagem de um desconhecido pedindo fotos suas?",
      opcoes: ["Enviar se a pessoa for educada", "Bloquear o contato imediatamente e avisar um responsável", "Responder perguntando quem é"],
      correta: 1
    },
    {
      pergunta: "5. A quem você pode recorrer na escola caso esteja passando por problemas virtuais ou bullying?",
      opcoes: ["Professores, pedagogos e direção", "Ninguém, deve resolver sozinho", "Apenas aos comentários da internet"],
      correta: 0
    }
  ];

  let perguntaAtual = 0;
  let pontuacao = 0;

  const quizContainer = document.getElementById("quiz-container");
  const quizResultado = document.getElementById("quiz-resultado");
  const placarFinal = document.getElementById("placar-final");
  const btnReiniciar = document.getElementById("btn-reiniciar-quiz");

  function carregarPergunta() {
    if (perguntaAtual < quizPerguntas.length) {
      const q = quizPerguntas[perguntaAtual];
      quizContainer.innerHTML = `
        <h3>${q.pergunta}</h3>
        <div class="quiz-options">
          ${q.opcoes.map((opcao, index) => `
            <button class="quiz-btn" onclick="verificarResposta(${index})">${opcao}</button>
          `).join('')}
        </div>
      `;
    } else {
      exibirResultado();
    }
  }

  window.verificarResposta = (indiceSelecionado) => {
    if (indiceSelecionado === quizPerguntas[perguntaAtual].correta) {
      pontuacao++;
    }
    perguntaAtual++;
    carregarPergunta();
  };

  function exibirResultado() {
    quizContainer.classList.add("hidden");
    quizResultado.classList.remove("hidden");
    placarFinal.innerText = `Você acertou ${pontuacao} de ${quizPerguntas.length} perguntas! ${pontuacao >= 4 ? '🎉 Parabéns, você é um cidadão digital consciente!' : '💡 Continue aprendendo sobre segurança e respeito na rede!'}`;
  }

  btnReiniciar.addEventListener("click", () => {
    perguntaAtual = 0;
    pontuacao = 0;
    quizResultado.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    carregarPergunta();
  });

  // Inicializa o quiz ao carregar a página
  carregarPergunta();
});