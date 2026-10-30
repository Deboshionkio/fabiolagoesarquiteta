/**
 * Fabíola Góes Arquitetura - Script Interativo Principal
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu
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
        // Fecha outros itens
        accordionItems.forEach(other => other.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 3. Filtro de Portfólio
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-white', 'text-black', 'border-white');
        b.classList.add('bg-transparent', 'text-stone-300', 'border-stone-700');
      });
      btn.classList.add('bg-white', 'text-black', 'border-white');
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

    // Touch support for mobile
    slider.addEventListener('touchstart', () => isDragging = true, { passive: true });
    window.addEventListener('touchend', () => isDragging = false);
    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      if (e.touches && e.touches[0]) {
        setPosition(e.touches[0].clientX);
      }
    }, { passive: true });
  }

  // 5. Quiz de Regularização
  const quizAnswers = {
    habiteSe: 'Não',
    reforma: 'Sim',
    objetivo: 'Vender',
    bairro: 'Marco'
  };

  const setupQuizButtons = (groupName, key) => {
    const btns = document.querySelectorAll(`[data-quiz-group="${groupName}"]`);
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => {
          b.classList.remove('bg-stone-100', 'text-black', 'font-semibold');
          b.classList.add('bg-stone-800', 'text-stone-300');
        });
        btn.classList.add('bg-stone-100', 'text-black', 'font-semibold');
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

    let title = 'Seu imóvel provavelmente precisa de regularização.';
    let desc = 'Sem habite-se e com ampliação não averbada, a venda costuma travar em cartório e bancos. A Arquiteta Fabíola Góes analisa o seu caso para destravar o processo.';

    if (quizAnswers.habiteSe === 'Sim' && quizAnswers.reforma === 'Não') {
      title = 'Seu imóvel aparenta estar com a documentação em dia!';
      desc = 'Com Habite-se e sem ampliações clandestinas, você está pronto para averbar ou negociar. Caso queira uma certidão ou reforma futura, podemos avaliar.';
    } else if (quizAnswers.habiteSe === 'Não sei') {
      title = 'Recomendamos um Diagnóstico Documental Técnico.';
      desc = 'Muitos imóveis em Belém possuem apenas recibo de compra ou planta antiga sem baixa na Prefeitura. É fundamental checar na SEURB antes de investir em reformas.';
    }

    if (titleEl) titleEl.innerText = title;
    if (descEl) descEl.innerText = desc;

    // Build WhatsApp URL
    const message = `Olá, Arquiteta Fabíola Góes! Realizei o diagnóstico no seu site:%0A%0A` +
      `• *Possui Habite-se:* ${quizAnswers.habiteSe}%0A` +
      `• *Reforma sem projeto aprovado:* ${quizAnswers.reforma}%0A` +
      `• *Objetivo principal:* ${quizAnswers.objetivo}%0A%0A` +
      `Gostaria de agendar uma consulta para analisar meu imóvel em Belém!`;

    if (btnWhatsApp) {
      btnWhatsApp.href = `https://wa.me/5591982324820?text=${message}`;
    }
  };

  updateQuizResult();

  // 6. Orçamento Guiado
  const orderState = {
    servico: 'Projeto arquitetônico',
    tipo: 'Casa',
    tipoSub: 'Unifamiliar',
    metragem: 180,
    prazo: 'começar em até 3 meses',
    bairro: 'Marco',
    nome: 'Cliente'
  };

  const updatePhoneMockup = () => {
    const previewServico = document.getElementById('wpServico');
    const previewImovel = document.getElementById('wpImovel');
    const previewLocal = document.getElementById('wpLocal');
    const previewPrazo = document.getElementById('wpPrazo');
    const previewNome = document.getElementById('wpNome');
    const finalWhatsAppBtn = document.getElementById('finalOrderWhatsAppBtn');

    if (previewServico) previewServico.innerText = orderState.servico;
    if (previewImovel) previewImovel.innerText = `${orderState.tipo} (${orderState.tipoSub}), ${orderState.metragem} m²`;
    if (previewLocal) previewLocal.innerText = `${orderState.bairro}, Belém`;
    if (previewPrazo) previewPrazo.innerText = orderState.prazo;
    if (previewNome) previewNome.innerText = orderState.nome || 'Visitante';

    const message = `Olá, Fabíola! Vim pelo seu site e montei meu pedido de orçamento:%0A%0A` +
      `• *Serviço:* ${orderState.servico}%0A` +
      `• *Imóvel:* ${orderState.tipo} (${orderState.tipoSub}), ${orderState.metragem} m²%0A` +
      `• *Localização:* ${orderState.bairro}, Belém - PA%0A` +
      `• *Previsão/Prazo:* ${orderState.prazo}%0A` +
      `• *Meu Nome:* ${orderState.nome}%0A%0A` +
      `Poderia me enviar uma proposta ou orientações?`;

    if (finalWhatsAppBtn) {
      finalWhatsAppBtn.href = `https://wa.me/5591982324820?text=${message}`;
    }
  };

  // Buttons tipo de imóvel
  const imovelCards = document.querySelectorAll('.imovel-select-card');
  imovelCards.forEach(card => {
    card.addEventListener('click', () => {
      imovelCards.forEach(c => {
        c.classList.remove('border-stone-900', 'bg-stone-50');
        c.classList.add('border-stone-200', 'bg-white');
      });
      card.classList.add('border-stone-900', 'bg-stone-50');
      card.classList.remove('border-stone-200', 'bg-white');

      orderState.tipo = card.getAttribute('data-tipo') || 'Casa';
      orderState.tipoSub = card.getAttribute('data-sub') || 'Unifamiliar';
      updatePhoneMockup();
    });
  });

  // Slider de metragem
  const areaSlider = document.getElementById('areaSlider');
  const areaDisplay = document.getElementById('areaDisplay');
  if (areaSlider && areaDisplay) {
    areaSlider.addEventListener('input', (e) => {
      orderState.metragem = e.target.value;
      areaDisplay.innerText = `${e.target.value} m²`;
      updatePhoneMockup();
    });
  }

  // Inputs de texto e selects do orçamento
  const serviceSelect = document.getElementById('orderServiceSelect');
  if (serviceSelect) {
    serviceSelect.addEventListener('change', (e) => {
      orderState.servico = e.target.value;
      updatePhoneMockup();
    });
  }

  const prazoSelect = document.getElementById('orderPrazoSelect');
  if (prazoSelect) {
    prazoSelect.addEventListener('change', (e) => {
      orderState.prazo = e.target.value;
      updatePhoneMockup();
    });
  }

  const bairroInput = document.getElementById('orderBairroInput');
  if (bairroInput) {
    bairroInput.addEventListener('input', (e) => {
      orderState.bairro = e.target.value || 'Belém';
      updatePhoneMockup();
    });
  }

  const nameInput = document.getElementById('orderNameInput');
  if (nameInput) {
    nameInput.addEventListener('input', (e) => {
      orderState.nome = e.target.value || 'Cliente';
      updatePhoneMockup();
    });
  }

  updatePhoneMockup();

  // 7. Gaveta de Personalização Interativa para a Fabíola (Demo Customizer)
  const toggleCustomizerBtn = document.getElementById('toggleCustomizerBtn');
  const customizerPanel = document.getElementById('customizerPanel');
  const closeCustomizerBtn = document.getElementById('closeCustomizerBtn');

  if (toggleCustomizerBtn && customizerPanel) {
    toggleCustomizerBtn.addEventListener('click', () => {
      customizerPanel.classList.toggle('closed');
    });
  }

  if (closeCustomizerBtn && customizerPanel) {
    closeCustomizerBtn.addEventListener('click', () => {
      customizerPanel.classList.add('closed');
    });
  }

  // Seção Toggles
  const toggles = [
    { id: 'toggleHero', target: 'inicio' },
    { id: 'toggleServicos', target: 'servicos' },
    { id: 'toggleProjetos', target: 'projetos' },
    { id: 'toggleQuiz', target: 'regularizacao' },
    { id: 'toggleOrcamento', target: 'orcamento' },
    { id: 'toggleComoFunciona', target: 'comofunciona' },
    { id: 'toggleProfissionais', target: 'profissionais' },
    { id: 'toggleSobre', target: 'sobre' },
    { id: 'toggleContato', target: 'contato' },
  ];

  toggles.forEach(({ id, target }) => {
    const checkbox = document.getElementById(id);
    const section = document.getElementById(target);
    if (checkbox && section) {
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          section.style.display = '';
        } else {
          section.style.display = 'none';
        }
      });
    }
  });

  // ==============================================================
  // RASTREAMENTO INTELIGENTE DE EVENTOS DE CONVERSÃO (TRÁFEGO PAGO)
  // ==============================================================
  
  // 1. Rastreamento Global de Qualquer Clique em Link de WhatsApp
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href*="wa.me"], a[href*="whatsapp.com"]');
    if (link) {
      const label = link.getAttribute('aria-label') || link.innerText.trim() || 'WhatsApp Global';
      if (typeof window.trackEvent === 'function') {
        window.trackEvent('Contact', {
          event_category: 'Engajamento',
          event_label: label,
          channel: 'WhatsApp'
        });
      }
    }
  });

  // 2. Rastreamento de Clique no CTA Principal do Header ("Solicitar Orçamento")
  const headerOrcamentoBtn = document.querySelector('header a[href="#orcamento"]');
  if (headerOrcamentoBtn) {
    headerOrcamentoBtn.addEventListener('click', () => {
      if (typeof window.trackEvent === 'function') {
        window.trackEvent('InitiateCheckout', {
          event_category: 'Navegacao',
          event_label: 'Header_Solicitar_Orcamento'
        });
      }
    });
  }

  // 3. Rastreamento de Envio do Orçamento Guiado
  const orderWpBtn = document.getElementById('finalOrderWhatsAppBtn');
  if (orderWpBtn) {
    orderWpBtn.addEventListener('click', () => {
      if (typeof window.trackEvent === 'function') {
        window.trackEvent('Lead', {
          event_category: 'Conversao_Alta',
          event_label: 'Orcamento_Guiado_Enviado',
          servico: currentOrder ? currentOrder.servico : '',
          tipo_imovel: currentOrder ? currentOrder.tipoImovel : '',
          area_m2: currentOrder ? currentOrder.area : '',
          prazo: currentOrder ? currentOrder.prazo : '',
          bairro: currentOrder ? currentOrder.bairro : '',
          value: 1.0,
          currency: 'BRL'
        });
      }
    });
  }

  // 4. Rastreamento de Conclusão do Quiz de Regularização
  const quizWpBtn = document.getElementById('quizWhatsAppBtn');
  if (quizWpBtn) {
    quizWpBtn.addEventListener('click', () => {
      if (typeof window.trackEvent === 'function') {
        window.trackEvent('Lead', {
          event_category: 'Conversao_Media',
          event_label: 'Quiz_Regularizacao_Concluido',
          habite_se: quizAnswers ? quizAnswers.habiteSe : '',
          reforma: quizAnswers ? quizAnswers.reforma : '',
          objetivo: quizAnswers ? quizAnswers.objetivo : '',
          value: 1.0,
          currency: 'BRL'
        });
      }
    });
  }

});
