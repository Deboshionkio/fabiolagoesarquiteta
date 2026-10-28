/**
 * Fabíola Góes Arquiteta - Scripts Interativos Oficiais
 */

document.addEventListener('DOMContentLoaded', () => {
  // 0. Header que acompanha a rolagem (Sticky / Fixed com Glass Transparente)
  const mainHeader = document.getElementById('mainHeader');
  if (mainHeader) {
    const handleHeaderScroll = () => {
      if (window.scrollY > 30) {
        mainHeader.classList.add('bg-[#1E1917]/75', 'backdrop-blur-md', 'py-3.5', 'border-b', 'border-white/10', 'shadow-xl');
        mainHeader.classList.remove('py-6', 'sm:py-7', 'bg-transparent', 'border-0');
      } else {
        mainHeader.classList.remove('bg-[#1E1917]/75', 'backdrop-blur-md', 'py-3.5', 'border-b', 'border-white/10', 'shadow-xl');
        mainHeader.classList.add('py-6', 'sm:py-7', 'bg-transparent', 'border-0');
      }
    };
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();
  }

  // 1. Menu Mobile
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('hidden');
    });
  }

  if (mobileMenuClose && mobileMenu) {
    mobileMenuClose.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu) mobileMenu.classList.add('hidden');
    });
  });

  // 2. Acordeão de Serviços
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        accordionItems.forEach(other => other.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 3. Filtro de Portfólio / Casos Reais
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-[#64513D]', 'text-white', 'border-[#64513D]');
        b.classList.add('bg-transparent', 'text-stone-300', 'border-stone-700');
      });
      btn.classList.add('bg-[#64513D]', 'text-white', 'border-[#64513D]');
      btn.classList.remove('bg-transparent', 'text-stone-300', 'border-stone-700');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'todos' || category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // 4. Comparador Antes e Depois
  const container = document.getElementById('beforeAfterContainer');
  const overlay = document.getElementById('beforeAfterOverlay');
  const slider = document.getElementById('beforeAfterSlider');

  if (container && overlay && slider) {
    let isDragging = false;

    const setPosition = (x) => {
      const rect = container.getBoundingClientRect();
      let offsetX = x - rect.left;
      if (offsetX < 0) offsetX = 0;
      if (offsetX > rect.width) offsetX = rect.width;
      const percentage = (offsetX / rect.width) * 100;
      overlay.style.width = `${percentage}%`;
      slider.style.left = `${percentage}%`;
    };

    slider.addEventListener('mousedown', () => isDragging = true);
    window.addEventListener('mouseup', () => isDragging = false);
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      setPosition(e.clientX);
    });

    slider.addEventListener('touchstart', () => isDragging = true, { passive: true });
    window.addEventListener('touchend', () => isDragging = false);
    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      if (e.touches && e.touches[0]) {
        setPosition(e.touches[0].clientX);
      }
    }, { passive: true });
  }

  // 5. Formulário de Avaliação Técnica B2B (Slide 22 da Apresentação)
  const b2bForm = document.getElementById('b2bEvaluationForm');
  if (b2bForm) {
    b2bForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nome = document.getElementById('b2bNome')?.value || 'Não informado';
      const empresa = document.getElementById('b2bEmpresa')?.value || 'Não informada';
      const origem = document.getElementById('b2bOrigem')?.value || 'Não informada';
      
      const demandaElem = document.querySelector('input[name="b2bDemanda"]:checked');
      const demanda = demandaElem ? demandaElem.value : 'Licenciamento / Regularização';

      const situacaoElem = document.querySelector('input[name="b2bSituacao"]:checked');
      const situacao = situacaoElem ? situacaoElem.value : 'Em planejamento';

      const prazoElem = document.querySelector('input[name="b2bPrazo"]:checked');
      const prazo = prazoElem ? prazoElem.value : 'Próximos 30 dias';

      const telefone = document.getElementById('b2bTelefone')?.value || '';

      const msg = `*SOLICITAÇÃO DE AVALIAÇÃO TÉCNICA (SITE)*%0A%0A` +
        `👤 *Nome:* ${encodeURIComponent(nome)}%0A` +
        `🏢 *Empresa/Escritório:* ${encodeURIComponent(empresa)}%0A` +
        `📍 *Origem:* ${encodeURIComponent(origem)}%0A` +
        `📋 *Demanda:* ${encodeURIComponent(demanda)}%0A` +
        `🏗️ *Situação do Projeto:* ${encodeURIComponent(situacao)}%0A` +
        `⏱️ *Urgência/Prazo:* ${encodeURIComponent(prazo)}%0A` +
        `📞 *Contato:* ${encodeURIComponent(telefone)}%0A%0A` +
        `Olá Arquiteta Fabíola! Gostaria de agendar uma avaliação técnica preliminar para nossa demanda em Belém.`;

      window.open(`https://wa.me/5591982324820?text=${msg}`, '_blank');
    });
  }

  // 6. Quiz de Diagnóstico Rápido de Regularização
  const quizAnswers = {
    habiteSe: 'Não',
    reforma: 'Sim',
    objetivo: 'Vender'
  };

  const setupQuizButtons = (groupName, key) => {
    const btns = document.querySelectorAll(`[data-quiz-group="${groupName}"]`);
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => {
          b.classList.remove('bg-[#64513D]', 'text-white', 'font-bold');
          b.classList.add('bg-stone-800', 'text-stone-300');
        });
        btn.classList.add('bg-[#64513D]', 'text-white', 'font-bold');
        btn.classList.remove('bg-stone-800', 'text-stone-300');
        quizAnswers[key] = btn.getAttribute('data-value') || btn.innerText.trim();
        updateQuizResult();
      });
    });
  };

  setupQuizButtons('habite-se', 'habiteSe');
  setupQuizButtons('reforma', 'reforma');
  setupQuizButtons('objetivo', 'objetivo');

  const updateQuizResult = () => {
    const titleEl = document.getElementById('quizVerdictTitle');
    const descEl = document.getElementById('quizVerdictDesc');
    const btnWhatsApp = document.getElementById('quizWhatsAppBtn');

    let title = 'Seu imóvel precisa de regularização técnica perante a Prefeitura.';
    let desc = 'Sem habite-se ou com acréscimo não averbado, a venda ou financiamento trava no cartório e na Caixa. A Arquiteta Fabíola Góes analisa seu caso e indica o caminho seguro para aprovação.';

    if (quizAnswers.habiteSe === 'Sim' && quizAnswers.reforma === 'Não') {
      title = 'A documentação aparente do seu imóvel está em dia!';
      desc = 'Com Habite-se regular e sem reformas clandestinas, seu imóvel está apto a transações. Se necessitar de certidões atualizadas ou futuros laudos, conte conosco.';
    } else if (quizAnswers.habiteSe === 'Não sei') {
      title = 'Recomendamos uma Consulta Documental Preliminar.';
      desc = 'Muitos imóveis em Belém possuem escrituras antigas sem baixa ou certidão de conclusão na SEURB. É essencial auditar a matrícula antes de qualquer negociação.';
    }

    if (titleEl) titleEl.innerText = title;
    if (descEl) descEl.innerText = desc;

    const message = `Olá, Arquiteta Fabíola Góes! Realizei o diagnóstico rápido no seu site:%0A%0A` +
      `• *Possui Habite-se:* ${quizAnswers.habiteSe}%0A` +
      `• *Reforma/Ampliação sem projeto aprovado:* ${quizAnswers.reforma}%0A` +
      `• *Objetivo:* ${quizAnswers.objetivo}%0A%0A` +
      `Gostaria de agendar uma consulta para avaliar meu caso em Belém.`;

    if (btnWhatsApp) {
      btnWhatsApp.href = `https://wa.me/5591982324820?text=${message}`;
    }
  };

  updateQuizResult();
});
