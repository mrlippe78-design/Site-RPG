const firebaseConfig = {
  apiKey: "AIzaSyAyCR1Hod1kFemfLkXlPme88ihbRFlXhaM",
  authDomain: "sorteioafinidade.firebaseapp.com",
  projectId: "sorteioafinidade",
  storageBucket: "sorteioafinidade.firebasestorage.app",
  messagingSenderId: "338718810770",
  appId: "1:338718810770:web:7c0cc44fbf70df30b27c4b",
};

const CLOUDINARY_CONFIG = {
  cloudName: "cakvvuqx",
  uploadPreset: "Millenium",
};

const ADMIN_EMAILS = ["mrlippe78@gmail.com"];

const FIREBASE_SCRIPTS = [
  "https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js",
  "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth-compat.js",
  "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore-compat.js",
];

const SEED_VERSION = 5;
const GUILD_CREATE_COST = 1000;
const GUILD_MEMBER_LIMIT = 10;
const CHAT_LIMIT = 60;
const MAX_GACHA_STARS = 7;
const GACHA_ENERGY_MAX = 30;
const GACHA_DIFFICULTIES = [
  { id: "noob", name: "Noob", cost: 1, multiplier: 0.7, risk: 0, minScore: 250 },
  { id: "facil", name: "Fácil", cost: 1, multiplier: 1, risk: 0.02, minScore: 700 },
  { id: "medio", name: "Médio", cost: 2, multiplier: 1.45, risk: 0.06, minScore: 1400 },
  { id: "hard", name: "Hard", cost: 3, multiplier: 2.1, risk: 0.12, minScore: 2400 },
  { id: "pesadelo", name: "Pesadelo", cost: 4, multiplier: 3.2, risk: 0.2, minScore: 3800 },
  { id: "god-slayer", name: "God Slayer", cost: 5, multiplier: 5, risk: 0.34, minScore: 6200 },
];
const GACHA_RARITIES = [
  { id: "broken", name: "Quebrado", weight: 4200, fragment: 2, score: 1, color: "#9b9488" },
  { id: "common", name: "Comum", weight: 3000, fragment: 4, score: 2, color: "#d9d0bc" },
  { id: "uncommon", name: "Incomum", weight: 1700, fragment: 8, score: 3, color: "#77c58d" },
  { id: "epic", name: "Épico", weight: 780, fragment: 18, score: 4, color: "#b889ff" },
  { id: "legendary", name: "Lendário", weight: 250, fragment: 42, score: 5, color: "#ffd36a" },
  { id: "mythic", name: "Mítico", weight: 55, fragment: 90, score: 6, color: "#ff6a8d" },
  { id: "cosmic", name: "Cósmico", weight: 12, fragment: 180, score: 7, color: "#80d8ff" },
  { id: "celestial", name: "Celestial", weight: 2.9, fragment: 320, score: 8, color: "#fff5a8" },
  { id: "secret", name: "Secret", weight: 1, fragment: 700, score: 9, color: "#ffffff" },
];
const IDLE_LIMIT_MS = 10 * 60 * 1000;
const JOIN_ANNOUNCE_COOLDOWN_MS = 10 * 60 * 1000;
const ORACLE_LABEL = "Oráculo";
const CHAT_EMOJIS = ["🔥", "✨", "⚔️", "🛡️", "💰", "👑", "✅", "❌"];
const ATTRIBUTES = [
  { key: "for", label: "Força", short: "FOR" },
  { key: "vel", label: "Velocidade", short: "VEL" },
  { key: "hab", label: "Habilidade", short: "HAB" },
  { key: "res", label: "Resistência", short: "RES" },
  { key: "pod", label: "Poder", short: "POD" },
];

const RARITIES = ["Quebrado", "Comum", "Incomum", "Raro", "Épico", "Lendário", "Mítico", "Cósmica", "Celestial", "Secret"];
const RARE_RARITIES = ["Raro", "Épico", "Lendário", "Mítico", "Cósmica", "Celestial", "Secret"];

function buildDefaultSeasonPass() {
  const free = [
    "50 PO", "Token: Eco Inicial", "2 essências", "Fragmentos do Despertar x20", "Título: Recém-Desperto",
    "75 PO", "Moldura simples", "Ticket de Relíquia", "Fragmentos de Mira x35", "150 PO",
  ];
  const premium = [
    "120 PO + 2 essências", "Token: Primeiro Chamado", "Ticket de Companheiro", "Fragmentos do Despertar x60", "Aura de perfil: Janela Viva",
    "250 PO", "Traje do Despertar I", "Ticket de Relíquia x2", "Ecos de Companheiro x80", "Pet cosmético sazonal",
  ];
  return Array.from({ length: 50 }, (_, index) => {
    const tier = index + 1;
    const milestone = tier % 10 === 0;
    const rarity = tier >= 50 ? "Cósmica" : tier >= 40 ? "Lendário" : tier >= 30 ? "Épico" : tier >= 20 ? "Raro" : tier >= 10 ? "Incomum" : "Comum";
    return {
      id: `despertar-${tier}`,
      name: `Nível ${tier}`,
      tier,
      rarity,
      freeReward: milestone ? free[(tier / 10) - 1] || `${tier * 10} PO` : free[index % free.length],
      premiumReward: milestone ? premium[(tier / 10) - 1] || `${tier * 22} PO + ticket` : premium[index % premium.length],
      description: milestone
        ? "Marco da Temporada do Despertar, com recompensa maior para marcar progresso real."
        : "Recompensa de avanço sazonal para manter cada nível vivo.",
    };
  });
}
const DEFAULT_GUILD_MISSIONS = [
  { id: "cerco-abissal", title: "Cerco Abissal", description: "Reunir uma party para enfrentar ameaça acima do nível da mesa.", rarity: "Épico", reward: "220 PO + 180 XP para cada membro aprovado" },
  { id: "cartografia-proibida", title: "Cartografia Proibida", description: "Mapear ruínas, facções ou território hostil com registro narrativo.", rarity: "Raro", reward: "150 PO + 120 XP por membro" },
  { id: "contrato-de-guerra", title: "Contrato de Guerra", description: "Resolver uma crise entre grupos rivais sem quebrar a aliança da guilda.", rarity: "Lendário", reward: "Título de guilda + 260 PO" },
];

const DEFAULT_CONTENT = {
  settings: {
    seasonName: "Temporada do Despertar",
    seasonNumber: 1,
    defaultAffinityAttempts: 3,
    pityMax: 30,
    levelMax: 99,
    eventActive: false,
    eventName: "",
    bannerRateUp: "",
    rareRateUpChance: 0.3,
    soundEnabled: true,
    theme: "default",
    seasonTheme: "awakening",
    globalNotice: "Bem-vindo ao suporte oficial da mesa Millennium RPG.",
    rulesVersion: "1.0",
    termsText: "Ao entrar na mesa Millennium RPG, você concorda em respeitar os jogadores, seguir as decisões do Oráculo, não abusar de bugs do site, não manipular dados de ficha sem autorização e manter o jogo saudável para todos.",
    maintenanceMode: false,
    gameStarted: false,
    betaGranted: false,
    panicVersion: "",
    lastWeeklyResetKey: "",
    seedVersion: SEED_VERSION,
  },
  races: [
    { id: "humano", name: "Humano", bonus: { for: 1, vel: 1, hab: 1, res: 1, pod: 1 }, passive: "Adaptabilidade: 1x/combate repete um teste que falhou." },
    { id: "elfo", name: "Elfo", bonus: { hab: 3, pod: 2 }, passive: "Sentidos Aguçados: percepção, rastreamento e pontaria x2." },
    { id: "goblin", name: "Goblin", bonus: { hab: 3, vel: 2 }, passive: "Improvisador Nato: 1x/combate usa técnica sem gastar PP." },
    { id: "anjo", name: "Anjo", bonus: { pod: 3, res: 2 }, passive: "Aura Divina: cura, escudo e proteção concedidos x2." },
    { id: "demonio", name: "Demônio", bonus: { for: 3, pod: 2 }, passive: "Fúria Infernal: dano causado abaixo de 50% PV é x2." },
    { id: "vampiro", name: "Vampiro", bonus: { vel: 3, pod: 2 }, passive: "Vampirismo: recuperação de PV por drenagem de vida x2." },
    { id: "zoofolk", name: "Zoofolk", bonus: { for: 2, vel: 2, res: 1 }, passive: "Instinto Bestial: rastreamento, percepção, reflexos e perseguição x2." },
  ],
  classes: [
    { id: "acolito", name: "Acólito", bonus: { pod: 2, res: 1 }, role: "Suporte, cura e proteção." },
    { id: "mago", name: "Mago", bonus: { pod: 3 }, role: "Dano mágico e versatilidade arcana." },
    { id: "guerreiro", name: "Guerreiro", bonus: { for: 2, res: 1 }, role: "Combate corpo a corpo e linha de frente." },
    { id: "ladino", name: "Ladino", bonus: { vel: 2, hab: 1 }, role: "Furtividade, precisão e estratégia." },
  ],
  affinityCategories: [
    { id: "elemental", name: "Elemental", weight: 65, rarity: "Comum", color: "#d8b45d" },
    { id: "sub-elemental", name: "Sub-elemental", weight: 25, rarity: "Incomum", color: "#5b90ca" },
    { id: "espiritual", name: "Espiritual", weight: 10, rarity: "Raro", color: "#8f76c9" },
    { id: "celestial", name: "Celestial", weight: 10, rarity: "Épico", color: "#f3cf7a" },
    { id: "cosmica", name: "Cósmica", weight: 5, rarity: "Cósmica", color: "#c9b9ff" },
  ],
  affinities: [
    { id: "fogo", name: "Fogo", categoryId: "elemental", bonus: { pod: 2 }, passive: "Espírito Ardente: dano de Fogo x2." },
    { id: "agua", name: "Água", categoryId: "elemental", bonus: { res: 1, pod: 1 }, passive: "Fluxo Contínuo: recuperação de PP x2." },
    { id: "terra", name: "Terra", categoryId: "elemental", bonus: { res: 2 }, passive: "Corpo de Pedra: redução de dano x2." },
    { id: "ar", name: "Ar", categoryId: "elemental", bonus: { vel: 2 }, passive: "Vento Favorável: bônus de Esquiva x2." },
    { id: "relampago", name: "Relâmpago", categoryId: "sub-elemental", bonus: { vel: 1, hab: 1 }, passive: "Reflexos Elétricos: Iniciativa x2." },
    { id: "gelo", name: "Gelo", categoryId: "sub-elemental", bonus: { res: 1, hab: 1 }, passive: "Frieza Absoluta: resistir controle x2." },
    { id: "magma", name: "Magma", categoryId: "sub-elemental", bonus: { for: 1, pod: 1 }, passive: "Pele Incandescente: dano refletido x2." },
    { id: "nevoa", name: "Névoa", categoryId: "sub-elemental", bonus: { vel: 1, hab: 1 }, passive: "Forma Nebulosa: Furtividade x2." },
    { id: "veneno", name: "Veneno", categoryId: "sub-elemental", bonus: { pod: 1, res: 1 }, passive: "Toxina Natural: dano contínuo x2." },
    { id: "cristal", name: "Cristal", categoryId: "sub-elemental", bonus: { res: 1, hab: 1 }, passive: "Estrutura Cristalina: resistência de barreiras x2." },
    { id: "metal", name: "Metal", categoryId: "sub-elemental", bonus: { for: 1, res: 1 }, passive: "Corpo Temperado: resistir agarrões e desarmes x2." },
    { id: "natureza", name: "Natureza", categoryId: "sub-elemental", bonus: { res: 1, pod: 1 }, passive: "Vitalidade Natural: recuperação de PV x2." },
    { id: "areia", name: "Areia", categoryId: "sub-elemental", bonus: { pod: 1, hab: 1 }, passive: "Tempestade de Poeira: penalidades de Percepção x2." },
    { id: "espirito", name: "Espírito", categoryId: "espiritual", bonus: { pod: 2 }, passive: "Percepção Espiritual x2." },
    { id: "psiquica", name: "Psíquica", categoryId: "espiritual", bonus: { pod: 1, hab: 1 }, passive: "Mente Serena: contra ilusões e mental x2." },
    { id: "sombras", name: "Sombras", categoryId: "espiritual", bonus: { vel: 1, pod: 1 }, passive: "Caminho Sombrio: bônus no escuro x2." },
    { id: "luz", name: "Luz", categoryId: "espiritual", bonus: { pod: 1, hab: 1 }, passive: "Aura Purificadora: contra maldições e corrupção x2." },
    { id: "sangue", name: "Sangue", categoryId: "espiritual", bonus: { res: 2 }, passive: "Instinto Primordial: bônus abaixo de 50% PV x2." },
    { id: "arcana", name: "Arcana", categoryId: "espiritual", bonus: { pod: 2 }, passive: "Condutor Arcano: redução de custo de PP x2." },
    { id: "celestial", name: "Celestial", categoryId: "celestial", bonus: { pod: 1, res: 1 }, passive: "Bênção Divina: resistir efeitos negativos x2." },
    { id: "lunar", name: "Lunar", categoryId: "celestial", bonus: { vel: 1, pod: 1 }, passive: "Serenidade da Lua: recuperação em descanso x2." },
    { id: "solar", name: "Solar", categoryId: "celestial", bonus: { for: 1, pod: 1 }, passive: "Luz Radiante: penetração de defesa x2." },
    { id: "estelar", name: "Estelar", categoryId: "celestial", bonus: { hab: 1, pod: 1 }, passive: "Guia das Estrelas: Percepção x2." },
    { id: "eter", name: "Éter", categoryId: "cosmica", bonus: { pod: 2 }, passive: "Energia Universal: aumento máximo de PP x2." },
    { id: "gravidade", name: "Gravidade", categoryId: "cosmica", bonus: { for: 1, pod: 1 }, passive: "Peso Esmagador: agarrões e derrubadas x2." },
    { id: "vazio", name: "Vazio", categoryId: "cosmica", bonus: { vel: 1, pod: 1 }, passive: "Presença Inexistente: furtividade e ocultação x2." },
    { id: "meteoro", name: "Meteoro", categoryId: "cosmica", bonus: { for: 1, hab: 1 }, passive: "Impacto Devastador: dano crítico x2." },
    { id: "tempo", name: "Tempo", categoryId: "cosmica", bonus: { vel: 1, hab: 1 }, passive: "Percepção Temporal: Iniciativa x2." },
    { id: "espaco", name: "Espaço", categoryId: "cosmica", bonus: { hab: 1, pod: 1 }, passive: "Dobra Espacial: deslocamento adicional x2." },
  ],
  itemCategories: [
    { id: "arma", name: "Arma" },
    { id: "armadura", name: "Armadura" },
    { id: "escudo", name: "Escudo" },
    { id: "acessorio", name: "Acessório" },
    { id: "consumivel", name: "Consumível" },
    { id: "pet", name: "Pet" },
    { id: "especial", name: "Especial" },
  ],
  items: [
    { id: "adaga", name: "Adaga", categoryId: "arma", price: 20, rarity: "Comum", bonus: { hab: 1 } },
    { id: "espada-longa", name: "Espada Longa", categoryId: "arma", price: 80, rarity: "Comum", bonus: { for: 3 } },
    { id: "cajado-arcano", name: "Cajado Arcano", categoryId: "arma", price: 80, rarity: "Incomum", bonus: { pod: 3 } },
    { id: "armadura-couro", name: "Armadura de Couro", categoryId: "armadura", price: 50, rarity: "Comum", bonus: { def: 2 } },
    { id: "escudo-ferro", name: "Escudo de Ferro", categoryId: "escudo", price: 80, rarity: "Comum", bonus: { def: 3 } },
    { id: "anel-forca", name: "Anel da Força", categoryId: "acessorio", price: 70, rarity: "Incomum", bonus: { for: 2 } },
    { id: "tiara-arcana", name: "Tiara Arcana", categoryId: "acessorio", price: 120, rarity: "Raro", bonus: { pod: 3 } },
    { id: "pocao-vida", name: "Poção de Vida", categoryId: "consumivel", price: 20, rarity: "Comum", bonus: { hp: 20 } },
    { id: "reliquia-millennium", name: "Relíquia Millennium", categoryId: "especial", price: 0, rarity: "Lendário", bonus: { pod: 2, hab: 2 } },
  ],
  gachaPets: [
    { id: "vigia-de-telhado", name: "Vigia de Telhado", rarity: "Quebrado", archetype: "Coletor", element: "Urbano", bonus: { hab: 1 }, td: { damage: 6, range: 70, cooldown: 1.7 }, trait: "Olhos Pequenos: +2% fragmentos em mapas urbanos.", description: "Um companheiro de beco que sobreviveu ao primeiro despertar da interface." },
    { id: "aprendiz-da-nuvem", name: "Aprendiz da Nuvem", rarity: "Quebrado", archetype: "Suporte", element: "Vento", bonus: { vel: 1 }, td: { damage: 5, range: 82, cooldown: 1.9 }, trait: "Passo Leve: reduz levemente o risco em incursões fáceis.", description: "Corre mais do que luta, e isso às vezes basta." },
    { id: "punho-de-bairro", name: "Punho de Bairro", rarity: "Comum", archetype: "Guerreiro", element: "Impacto", bonus: { for: 1 }, td: { damage: 10, range: 62, cooldown: 1.45 }, trait: "Combo Simples: +4% dano contra ondas comuns.", description: "Forjado em brigas pequenas, pronto para lutas maiores." },
    { id: "arauto-do-estilingue", name: "Arauto do Estilingue", rarity: "Comum", archetype: "Atirador", element: "Precisão", bonus: { hab: 1 }, td: { damage: 8, range: 104, cooldown: 1.6 }, trait: "Mira Teimosa: +5% pontuação na Prova da Mira.", description: "Pequeno, rápido e irritantemente preciso." },
    { id: "monge-de-brasa", name: "Monge de Brasa", rarity: "Incomum", archetype: "Mago", element: "Fogo", bonus: { pod: 1, res: 1 }, td: { damage: 13, range: 88, cooldown: 1.7 }, trait: "Brasa Interna: +6% dano contra inimigos resistentes.", description: "Respira como templo, bate como incêndio." },
    { id: "cortadora-de-mar", name: "Cortadora de Mar", rarity: "Incomum", archetype: "Assassino", element: "Água", bonus: { vel: 1, hab: 1 }, td: { damage: 16, range: 58, cooldown: 1.15 }, trait: "Corte Fluido: +4% chance de loot raro em biomas costeiros.", description: "Uma lâmina viva atravessando ondas impossíveis." },
    { id: "general-da-cicatriz", name: "General da Cicatriz", rarity: "Épico", archetype: "Guardião", element: "Aço", bonus: { for: 1, res: 2 }, td: { damage: 20, range: 76, cooldown: 1.75 }, trait: "Linha de Frente: reduz risco de ferimento do pet em 8%.", description: "Carrega marcas suficientes para ensinar sobrevivência." },
    { id: "oraculo-partido", name: "Oráculo Partido", rarity: "Épico", archetype: "Suporte", element: "Sistema", bonus: { pod: 2, hab: 1 }, td: { damage: 14, range: 118, cooldown: 2.1 }, trait: "Janela Aberta: +8% Millennium Coins ao terminar incursões.", description: "Uma falha consciente da interface que decidiu ajudar." },
    { id: "herdeiro-dos-seis-veus", name: "Herdeiro dos Seis Véus", rarity: "Lendário", archetype: "Mago", element: "Espaço", bonus: { pod: 2, vel: 2 }, td: { damage: 30, range: 130, cooldown: 1.8 }, trait: "Campo Infinito: inimigos lentos por alguns segundos ao iniciar ondas.", description: "Vê ângulos que ainda não aconteceram." },
    { id: "rei-das-fendas", name: "Rei das Fendas", rarity: "Lendário", archetype: "Assassino", element: "Sombra", bonus: { for: 2, pod: 2 }, td: { damage: 38, range: 70, cooldown: 1.2 }, trait: "Sorriso de Ruína: +10% dano em God Slayer.", description: "Quando ele aparece, a interface fica em silêncio." },
    { id: "sol-de-batalha", name: "Sol de Batalha", rarity: "Mítico", archetype: "Guerreiro", element: "Solar", bonus: { for: 3, res: 2 }, td: { damage: 46, range: 92, cooldown: 1.35 }, trait: "Ascensão: ganha +1% dano por onda sobrevivida.", description: "Cada derrota antiga virou combustível." },
    { id: "capitao-do-ceu-vermelho", name: "Capitão do Céu Vermelho", rarity: "Mítico", archetype: "Invocador", element: "Vento", bonus: { vel: 2, hab: 2, pod: 1 }, td: { damage: 28, range: 120, cooldown: 1.55 }, trait: "Bando Livre: +12% fragmentos quando há outro pet em atividade.", description: "Sorri diante do impossível, como se já tivesse vencido." },
    { id: "ceifador-da-lua-branca", name: "Ceifador da Lua Branca", rarity: "Cósmica", archetype: "Assassino", element: "Lunar", bonus: { vel: 3, pod: 3 }, td: { damage: 62, range: 108, cooldown: 1.05 }, trait: "Corte Silencioso: chance pequena de eliminar elite instantaneamente.", description: "Uma sombra clara, fria e precisa." },
    { id: "principe-do-trovao-negro", name: "Príncipe do Trovão Negro", rarity: "Cósmica", archetype: "Atirador", element: "Raio", bonus: { hab: 3, pod: 3 }, td: { damage: 58, range: 145, cooldown: 1.25 }, trait: "Raio Encadeado: acerta alvos próximos em mapas densos.", description: "O céu rachado escolheu um nome." },
    { id: "santo-da-promessa", name: "Santo da Promessa", rarity: "Celestial", archetype: "Suporte", element: "Luz", bonus: { res: 4, pod: 4 }, td: { damage: 42, range: 132, cooldown: 1.6 }, trait: "Juramento Vivo: impede uma morte de pet por semana.", description: "Uma benção que caminha ao lado de quem ainda não desistiu." },
    { id: "vazio-que-ri", name: "Vazio que Ri", rarity: "Secret", archetype: "Chefe", element: "Vazio", bonus: { for: 4, vel: 4, pod: 4 }, td: { damage: 88, range: 150, cooldown: 0.95 }, trait: "Erro Primordial: +20% em todos os minigames, mas aumenta o risco em Pesadelo+.", description: "A interface nega sua existência, mas ele continua no cofre." },
  ],
  gachaItems: [
    { id: "pedra-de-retorno", name: "Pedra de Retorno", rarity: "Quebrado", category: "Consumível", bonus: {}, effect: "Permite cancelar uma Hunt mantendo uma pequena parte extra do loot.", description: "Uma pedra rachada que ainda lembra o caminho para casa." },
    { id: "luva-de-treino", name: "Luva de Treino", rarity: "Comum", category: "Equipamento", bonus: { for: 1 }, effect: "+3% pontos em minigames de reflexo.", description: "Simples, gasta, confiável." },
    { id: "lente-de-mira", name: "Lente de Mira", rarity: "Comum", category: "Núcleo", bonus: { hab: 1 }, effect: "+5% alcance no Tower Defense.", description: "Mostra o centro do alvo antes do dedo chegar." },
    { id: "selo-de-descanso", name: "Selo de Descanso", rarity: "Incomum", category: "Amuleto", bonus: { res: 1 }, effect: "Reduz tempo de descanso do pet após incursões.", description: "Acalma o núcleo instável dos companheiros." },
    { id: "mapa-das-ruas-partidas", name: "Mapa das Ruas Partidas", rarity: "Incomum", category: "Relíquia", bonus: { hab: 1, vel: 1 }, effect: "+8% chance de evento em mapas urbanos.", description: "Toda esquina desenhada tem uma fuga possível." },
    { id: "nucleo-de-brasa", name: "Núcleo de Brasa", rarity: "Épico", category: "Núcleo", bonus: { pod: 2 }, effect: "+12% dano elemental no Tower Defense.", description: "Pequeno sol preso em metal ritual." },
    { id: "manto-do-primeiro-horizonte", name: "Manto do Primeiro Horizonte", rarity: "Épico", category: "Cosmético", bonus: { res: 1, pod: 1 }, effect: "Libera moldura do Despertar no perfil.", description: "Borda de luz para quem viu a primeira janela abrir." },
    { id: "relogio-quebrado", name: "Relógio Quebrado", rarity: "Lendário", category: "Relíquia", bonus: { vel: 2, hab: 2 }, effect: "-10% cooldown dos pets no Tower Defense.", description: "Marca segundos que só existem para você." },
    { id: "coroa-do-eco-solar", name: "Coroa do Eco Solar", rarity: "Lendário", category: "Artefato", bonus: { pod: 3 }, effect: "+15% Millennium Coins ao terminar Pesadelo ou maior.", description: "Uma coroa sem rei, procurando cabeça digna." },
    { id: "chave-do-mundo-invertido", name: "Chave do Mundo Invertido", rarity: "Mítico", category: "Artefato", bonus: { hab: 2, pod: 3 }, effect: "Abre encontro raro em Labirinto, Hunt e Tower Defense.", description: "Não abre portas. Abre consequências." },
    { id: "olho-do-sistema", name: "Olho do Sistema", rarity: "Cósmica", category: "Relíquia", bonus: { hab: 3, pod: 3 }, effect: "+0,03% chance Secret em banners de item enquanto equipado.", description: "A interface observa de volta." },
    { id: "fragmento-do-heroi-quebrado", name: "Fragmento do Herói Quebrado", rarity: "Celestial", category: "Coleção", bonus: { for: 2, vel: 2, hab: 2, res: 2, pod: 2 }, effect: "Uma das partes para despertar o Pet Secreto da Temporada.", description: "A lenda não morreu; ela foi espalhada." },
    { id: "contrato-da-primeira-luz", name: "Contrato da Primeira Luz", rarity: "Secret", category: "Artefato", bonus: { for: 4, vel: 4, hab: 4, res: 4, pod: 4 }, effect: "Concede passe premium e título secreto quando usado.", description: "O Oráculo assinou antes de existir tinta." },
  ],
  gachaShardShops: [
    { id: "traje-despertar", name: "Traje do Despertar", shop: "Fragmentos de Mira", cost: 220, rarity: "Épico", type: "Cosmético", description: "Visual sazonal para perfil e cartão de personagem." },
    { id: "moldura-luz-inicial", name: "Moldura Luz Inicial", shop: "Marcas de Caçada", cost: 180, rarity: "Raro", type: "Moldura", description: "Borda dourada da Temporada do Despertar." },
    { id: "pet-heroi-quebrado", name: "Pet do Herói Quebrado", shop: "Fragmentos do Despertar", cost: 1200, rarity: "Celestial", type: "Pet", description: "Companheiro sazonal montado por partes secretas." },
    { id: "ticket-reliquia", name: "Ticket de Relíquia", shop: "Runas Partidas", cost: 90, rarity: "Incomum", type: "Ticket", description: "Uma invocação no banner de itens." },
    { id: "passe-premium-sazonal", name: "Passe Premium", shop: "Fragmentos do Despertar", cost: 2000, rarity: "Lendário", type: "Passe", description: "Liberação alternativa por esforço extremo nos minigames." },
  ],
  towerMaps: [
    { id: "cruzamento-das-cortinas", name: "Cruzamento das Cortinas", theme: "Cidade selada", lanes: 3, difficulty: "Médio", imageUrl: "", description: "Ruas fechadas por energia ritual, vitrines quebradas e ondas surgindo entre semáforos mortos." },
    { id: "aldeia-das-folhas-douradas", name: "Aldeia das Folhas Douradas", theme: "Vila ninja", lanes: 4, difficulty: "Fácil", imageUrl: "", description: "Telhados baixos, árvores antigas e caminhos estreitos para defesa com pets velozes." },
    { id: "arena-das-sete-esferas", name: "Arena das Sete Esferas", theme: "Torneio celestial", lanes: 2, difficulty: "Hard", imageUrl: "", description: "Plataforma aberta onde cada onda bate como duelo de escala absurda." },
    { id: "sociedade-das-laminas", name: "Sociedade das Lâminas", theme: "Distrito espiritual", lanes: 5, difficulty: "Pesadelo", imageUrl: "", description: "Pontes brancas, portões antigos e inimigos com resistência espiritual elevada." },
    { id: "reino-do-pecado-partido", name: "Reino do Pecado Partido", theme: "Castelo amaldiçoado", lanes: 3, difficulty: "God Slayer", imageUrl: "", description: "Um castelo vertical onde toda vitória cobra alguma coisa." },
  ],
  gachaBanners: [
    {
      id: "despertar-companheiros",
      name: "Chamado dos Companheiros",
      type: "pets",
      enabled: true,
      featuredIds: "sol-de-batalha,capitao-do-ceu-vermelho,ceifador-da-lua-branca,principe-do-trovao-negro,santo-da-promessa,vazio-que-ri",
      description: "Banner inaugural da Temporada do Despertar. Os ecos escolhidos recebem rate-up enquanto a interface está aberta.",
    },
    {
      id: "despertar-reliquias",
      name: "Relíquias da Primeira Janela",
      type: "items",
      enabled: true,
      featuredIds: "relogio-quebrado,chave-do-mundo-invertido,olho-do-sistema,fragmento-do-heroi-quebrado,contrato-da-primeira-luz",
      description: "Relíquias que surgiram no instante em que Millennium despertou.",
    },
  ],
  missionPool: [
    { id: "patrulha-fronteira", title: "Patrulha da Fronteira", description: "Concluir uma cena de vigília, escolta ou reconhecimento.", rarity: "Comum", reward: "30 PO" },
    { id: "treino-focado", title: "Treino Focado", description: "Registrar um treino com objetivo claro para o personagem.", rarity: "Comum", reward: "1 essência extra" },
    { id: "resgate-noturno", title: "Resgate Noturno", description: "Participar de uma cena com risco social ou físico para salvar alguém.", rarity: "Raro", reward: "70 PO + título temporário" },
    { id: "eco-antigo", title: "Eco Antigo", description: "Investigar ruínas, documentos ou memórias ligadas à temporada.", rarity: "Épico", reward: "Item raro aprovado pelo Oráculo" },
    { id: "desafio-celeste", title: "Desafio Celeste", description: "Criar uma cena marcante envolvendo sacrifício, pacto ou revelação.", rarity: "Lendário", reward: "Título raro" },
  ],
  biomes: [
    { id: "floresta-viva", name: "Floresta Viva", imageUrl: "", description: "Bosques antigos onde a natureza responde a pactos, sangue e magia.", region: "Terras Verdes" },
    { id: "deserto-de-vidro", name: "Deserto de Vidro", imageUrl: "", description: "Campos de areia vitrificada por guerras arcanas esquecidas.", region: "Sul Escaldante" },
    { id: "abismo-frio", name: "Abismo Frio", imageUrl: "", description: "Fendas congeladas que guardam ruínas e criaturas de eras perdidas.", region: "Norte Branco" },
  ],
  kingdoms: [
    { id: "aurevia", name: "Aurèvia", imageUrl: "", description: "Reino comercial guiado por casas nobres e juramentos de ouro.", ruler: "Conselho Dourado" },
    { id: "noctheryn", name: "Noctheryn", imageUrl: "", description: "Domínio de fortalezas sombrias, pactos antigos e diplomacia perigosa.", ruler: "Coroa Velada" },
  ],
  regions: [
    { id: "porto-millennium", name: "Porto Millennium", imageUrl: "", description: "Cidade de chegada dos aventureiros, mercadores e rumores da temporada.", kingdomId: "aurevia" },
    { id: "ruinas-de-kael", name: "Ruínas de Kael", imageUrl: "", description: "Território de exploração onde missões raras costumam nascer.", kingdomId: "noctheryn" },
  ],
  npcs: [
    { id: "arquivista-eren", name: "Arquivista Eren", imageUrl: "", description: "Guardião de contratos, registros de guilda e segredos de mesa.", role: "Informante" },
    { id: "capita-lyra", name: "Capitã Lyra", imageUrl: "", description: "Responsável por missões semanais e recompensas oficiais.", role: "Comandante" },
  ],
  rulesChapters: [
    { id: "criacao-personagem", name: "Criação de personagem", order: 1, summary: "Defina nome, raça, classe, história, atributos e perfil público antes de começar.", full: "A primeira ficha salva trava raça, classe e atributos base. Depois disso, pontos novos entram apenas por evolução aprovada pelo Oráculo." },
    { id: "atributos-testes", name: "Atributos e testes", order: 2, summary: "FOR, VEL, HAB, RES e POD orientam testes, combate e resistência.", full: "O Oráculo define dificuldade, bônus e consequências. Itens, afinidades, títulos e efeitos temporários podem alterar os totais." },
    { id: "combate", name: "Combate", order: 3, summary: "Combate acontece fora do site, mas ficha, inventário e técnicas ficam registrados aqui.", full: "Use o site como apoio de consulta. Mudanças de poder, técnica, item raro e recompensa dependem de validação do Oráculo." },
    { id: "afinidades", name: "Afinidades", order: 4, summary: "Afinidades vêm da roleta e podem gerar anúncios quando forem raras.", full: "A roleta usa categorias, pesos, pity e eventos configurados pelo Oráculo. XP não vem de giros." },
    { id: "poderes-tecnicas", name: "Poderes e técnicas", order: 5, summary: "Cada player começa com um slot de poder base e cria técnicas a partir dele.", full: "Novos poderes exigem slot liberado pelo Oráculo. Técnicas e poderes podem receber pedido de nerf antes da aprovação." },
    { id: "treino-evolucao", name: "Treino e evolução", order: 6, summary: "XP vem de treinos e missões aprovados.", full: "O player relata treino ou conclui missão. O Oráculo aprova, define XP, PO, essências e recompensas." },
    { id: "missoes-semanais", name: "Missões semanais", order: 7, summary: "Missões resetam segunda 00:00 e podem ser recicladas pelo Oráculo.", full: "O player escolhe a missão, marca conclusão e aguarda validação. Guildas têm missões próprias mais difíceis." },
    { id: "guildas", name: "Guildas", order: 8, summary: "Guildas têm limite, chat, líderes, partys e missões internas.", full: "Criar guilda custa 1.000 PO. O líder controla imagem, descrição, convites, membros e partys de até 4 pessoas." },
    { id: "economia-inventario", name: "Economia, loja e inventário", order: 9, summary: "PO, itens, pets, títulos e recompensas ficam registrados no perfil.", full: "O Oráculo pode adicionar, remover e corrigir inventário. Itens raros podem aparecer no chat global." },
    { id: "conduta", name: "Regras de conduta", order: 10, summary: "Respeito, clareza e jogo saudável vêm primeiro.", full: "Denúncias, bugs e abusos devem ser reportados pelo site. O Oráculo pode advertir, mutar, suspender ou ajustar fichas." },
  ],
  faqEntries: [
    { id: "ganhar-xp", name: "Como ganho XP?", category: "Evolução", answer: "XP vem de missões, treinos e criações aprovadas pelo Oráculo. Girar roleta não dá XP." },
    { id: "conseguir-poder", name: "Como consigo poder?", category: "Poderes", answer: "Envie um poder base em Missões > Poderes e técnicas. Para ter outro poder, o Oráculo precisa liberar um slot." },
    { id: "entrar-guilda", name: "Como entro em guilda?", category: "Guildas", answer: "Abra Guildas, escolha uma na lista e envie pedido de entrada. O líder aprova pelo correio." },
    { id: "perfil-privado", name: "O que perfil privado esconde?", category: "Perfil", answer: "Esconde atributos, itens, história e detalhes, mas mantém foto, nome, título e botão de amizade." },
  ],
  tutorialSteps: [
    { id: "tutorial-ficha", name: "Crie sua ficha", order: 1, description: "Preencha personagem, avatar, raça, classe e atributos. Salvar pela primeira vez trava a base." },
    { id: "tutorial-afinidade", name: "Role afinidade", order: 2, description: "Use essências para sortear afinidade. Raridades altas geram anúncio no chat global." },
    { id: "tutorial-missao", name: "Pegue uma missão", order: 3, description: "Escolha uma missão semanal, conclua fora do site e envie para validação do Oráculo." },
    { id: "tutorial-treino", name: "Relate treino", order: 4, description: "Treinos aprovados rendem XP e podem destravar evolução." },
    { id: "tutorial-guilda", name: "Entre em guilda", order: 5, description: "Junte-se a uma guilda para acessar chat interno, partys e missões de alto risco." },
  ],
  wantedBoard: [
    { id: "sombra-do-porto", name: "Sombra do Porto", rarity: "Raro", description: "Figura procurada por roubo de artefatos no Porto Millennium.", reward: "80 PO + pista de facção" },
  ],
  bestiary: [
    { id: "sentinela-de-vidro", name: "Sentinela de Vidro", rarity: "Raro", region: "Deserto de Vidro", description: "Construto antigo que reflete magia e protege ruínas vitrificadas." },
  ],
  marketListings: [
    { id: "kit-aventureiro", name: "Kit Aventureiro", rarity: "Comum", price: 75, description: "Pacote base de consumíveis e ferramentas. Compra imediata com PO." },
  ],
  playerListings: [],
  marketTrades: [],
  auctionBids: [],
  auctionListings: [
    { id: "lamina-celeste", name: "Lâmina Celeste", rarity: "Épico", minBid: 500, endsAt: "2026-07-12T22:00:00-03:00", description: "Leilão semanal da Interface. O maior lance pode coletar a relíquia após o encerramento." },
  ],
  craftingRecipes: [
    { id: "amuleto-guarda", name: "Amuleto de Guarda", rarity: "Incomum", materials: "Cristal menor + tecido ritual", result: "Acessório defensivo aprovado pelo Oráculo." },
  ],
  techniqueLibrary: [
    { id: "lamina-flamejante", name: "Lâmina Flamejante", rarity: "Comum", powerType: "Fogo", description: "Exemplo de técnica aprovada: dano simples com custo e alcance claros." },
  ],
  achievements: [
    { id: "primeira-missao", name: "Primeira missão", rarity: "Comum", description: "Concluir uma missão aprovada pelo Oráculo." },
    { id: "primeiro-raro", name: "Primeiro raro", rarity: "Raro", description: "Receber item, título ou afinidade rara." },
    { id: "fundador-guilda", name: "Fundador de guilda", rarity: "Épico", description: "Criar uma guilda com 1.000 PO." },
  ],
  seasonPass: buildDefaultSeasonPass(),
  passMissions: [
    { id: "pass-login", name: "Interface inicializada", type: "Diária", xp: 80, description: "Entrar no site e conferir sua ficha durante a temporada." },
    { id: "pass-codex", name: "Ler os sinais do mundo", type: "Semanal", xp: 180, description: "Consultar o Codex e registrar uma memória no diário." },
    { id: "pass-affinity", name: "Eco da afinidade", type: "Semanal", xp: 220, description: "Girar afinidade ou acompanhar um evento de roleta aprovado pelo Oráculo." },
    { id: "pass-guild", name: "Primeiro juramento", type: "Especial", xp: 300, description: "Entrar em uma guilda, criar uma party ou concluir missão de guilda." },
  ],
  reputationFactions: [
    { id: "conselho-dourado", name: "Conselho Dourado", region: "Aurèvia", description: "Facção comercial que valoriza contratos cumpridos e estabilidade.", levels: "Neutro, Aliado, Honrado" },
  ],
};

const CONTENT_COLLECTIONS = Object.keys(DEFAULT_CONTENT).filter((key) => key !== "settings" && key !== "marketTrades");

function defaultContentState() {
  return Object.fromEntries(CONTENT_COLLECTIONS.map((collection) => [collection, [...DEFAULT_CONTENT[collection]]]));
}

const NAVS = {
  player: [
    { id: "player-home", label: "Início", icon: "⌂" },
    { id: "profile", label: "Perfil", icon: "◈" },
    { id: "character", label: "Personagem", icon: "✎" },
    { id: "roulette", label: "Roleta", icon: "✦" },
    { id: "gacha", label: "Invocação", icon: "◇" },
    { id: "minigames", label: "Minigames", icon: "▣" },
    { id: "inventory", label: "Inventário", icon: "◎" },
    { id: "grimoire", label: "Grimório", icon: "✧" },
    { id: "codex", label: "Codex", icon: "✥" },
    { id: "help", label: "Guia", icon: "?" },
    { id: "market", label: "Mercado", icon: "$" },
    { id: "pass", label: "Passe", icon: "◆" },
    { id: "ranking", label: "Ranking", icon: "#" },
    { id: "hall", label: "Hall", icon: "★" },
    { id: "diary", label: "Diário", icon: "✒" },
    { id: "guild", label: "Guilda", icon: "⚔" },
    { id: "chat", label: "Chat", icon: "☷" },
    { id: "missions", label: "Missões", icon: "☰" },
    { id: "reports", label: "Reports", icon: "!" },
  ],
  admin: [
    { id: "admin-home", label: "Controle", icon: "⚙" },
    { id: "admin-users", label: "Usuários", icon: "◈" },
    { id: "admin-content", label: "Forja", icon: "✚" },
    { id: "admin-rewards", label: "Prêmios", icon: "✦" },
    { id: "admin-economy", label: "Economia", icon: "◈" },
    { id: "admin-mail", label: "Correio", icon: "@" },
    { id: "admin-requests", label: "Validações", icon: "✓" },
    { id: "admin-ops", label: "Operações", icon: "◆" },
    { id: "pass", label: "Passe", icon: "◆" },
    { id: "diary", label: "Diário", icon: "✒" },
    { id: "guild", label: "Guildas", icon: "⚔" },
    { id: "admin-chat", label: "Chat", icon: "☷" },
    { id: "admin-missions", label: "Missões", icon: "☰" },
    { id: "admin-settings", label: "Temporada", icon: "◌" },
    { id: "admin-reports", label: "Denúncias", icon: "!" },
  ],
};

const VIEW_TITLES = {
  "player-home": "Suporte do player",
  profile: "Perfil público",
  character: "Ficha do personagem",
  roulette: "Roleta de afinidade",
  gacha: "Invocação dimensional",
  minigames: "Minigames do Oráculo",
  inventory: "Inventário e dinheiro",
  grimoire: "Grimório e títulos",
  codex: "Codex do mundo",
  help: "Guia, regras e tutorial",
  market: "Mercado e crafting",
  pass: "Passe do Despertar",
  ranking: "Ranking da mesa",
  hall: "Hall da Fama",
  diary: "Diário de campanha",
  guild: "Guildas e partys",
  chat: "Chat da comunidade",
  missions: "Missões semanais",
  reports: "Reports e denúncias",
  "admin-home": "Painel de controle",
  "admin-users": "Usuários e fichas",
  "admin-content": "Forja do Oráculo",
  "admin-rewards": "Enviar prêmios",
  "admin-economy": "Economia, cofre e minigames",
  "admin-mail": "Correio místico",
  "admin-requests": "Validações e nerf",
  "admin-ops": "Operações e auditoria",
  "admin-chat": "Chat e sussurros",
  "admin-missions": "Missões semanais",
  "admin-settings": "Temporada, avisos e temas",
  "admin-reports": "Bugs e denúncias",
};

const state = {
  firebaseReady: false,
  demo: false,
  app: null,
  auth: null,
  db: null,
  user: null,
  profile: null,
  role: "player",
  view: "player-home",
  selectedUserId: "",
  selectedPrivateUserId: "",
  contentTab: "race",
  codexTab: "affinities",
  codexSearch: "",
  codexFilter: "all",
  codexSort: "name",
  profileTab: "overview",
  helpTab: "tutorial",
  marketTab: "market",
  rankingTab: "prestige",
  rankingRange: "season",
  gachaTab: "pets",
  vaultTab: "all",
  minigameTab: "hub",
  minigameDifficulty: "facil",
  activeAimSession: null,
  adminRequestFilter: "all",
  epicCollection: "wantedBoard",
  lastRoll: null,
  lastRollResults: [],
  lastGachaResults: [],
  activeGachaReveal: null,
  affinityChoices: [],
  rolling: false,
  musicOn: false,
  musicVolume: 0.16,
  musicNodes: null,
  settings: { ...DEFAULT_CONTENT.settings },
  content: defaultContentState(),
  users: [],
  characters: [],
  character: null,
  weeklyMissions: [],
  diaryEntries: [],
  globalMessages: [],
  directMessages: [],
  privateMessages: [],
  privateChatError: "",
  socialRequests: [],
  guilds: [],
  guildMessages: [],
  guildMissions: [...DEFAULT_GUILD_MISSIONS],
  selectedGuildId: "",
  reports: [],
  progressRequests: [],
  profileViews: [],
  marketTrades: [],
  presenceTimer: null,
  idleTimer: null,
  lastActivityAt: Date.now(),
  sessionAnnounced: false,
  lastPanicVersion: "",
  characterDraft: null,
  adminUserDraft: null,
  unsubs: [],
  privateUnsub: null,
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function slug(value) {
  return String(value || cryptoRandom())
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function cryptoRandom() {
  return window.crypto?.randomUUID?.() || `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function toast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("show");
  window.clearTimeout(toast.timer);
  toast.timer = window.setTimeout(() => el.classList.remove("show"), 2800);
}

function formValues(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error || new Error("Não consegui ler a imagem."));
    reader.readAsDataURL(file);
  });
}

function mediaInput(name, label, value = "", options = {}) {
  const id = `${name}-${cryptoRandom().slice(0, 8)}`;
  const preview = value ? `<img src="${esc(value)}" alt="${esc(label)}" />` : `<span>Prévia</span>`;
  return `
    <label class="media-field">
      <span>${esc(label)}</span>
      <input id="${esc(id)}" name="${esc(name)}" data-media-url="${esc(name)}" value="${esc(value || "")}" placeholder="Cole uma URL ou envie um arquivo" />
      <input type="file" data-media-field="${esc(name)}" accept="${esc(options.accept || "image/*,.gif")}" />
      <div class="media-preview" data-media-preview="${esc(name)}">${preview}</div>
      <small>${esc(options.hint || "Aceita PNG, JPG, WEBP ou GIF. Ao salvar, o arquivo vai para o Cloudinary e a URL fica no Firebase.")}</small>
    </label>
  `;
}

function positionSelect(name, label, selected = "center") {
  const options = [
    ["center", "Centro"],
    ["top", "Topo"],
    ["bottom", "Base"],
    ["left", "Esquerda"],
    ["right", "Direita"],
  ];
  return `
    <label>
      <span>${esc(label)}</span>
      <select name="${esc(name)}">
        ${options.map(([value, text]) => `<option value="${value}" ${selected === value ? "selected" : ""}>${text}</option>`).join("")}
      </select>
    </label>
  `;
}

function objectPosition(value) {
  return {
    top: "center top",
    bottom: "center bottom",
    left: "left center",
    right: "right center",
  }[value] || "center center";
}

async function uploadMediaFile(file, folder = "general") {
  if (!file) return "";
  if (!file.type.startsWith("image/")) throw new Error("Envie apenas imagem ou GIF.");
  if (file.size > 6 * 1024 * 1024) throw new Error("Imagem muito pesada. Use até 6 MB.");
  if (state.demo) return fileToDataUrl(file);
  if (!CLOUDINARY_CONFIG.cloudName || !CLOUDINARY_CONFIG.uploadPreset) {
    throw new Error("Cloudinary não configurado.");
  }
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_CONFIG.uploadPreset);
  formData.append("folder", `millennium/${folder}/${state.user?.uid || "anon"}`);
  formData.append("tags", "millennium,rpg");
  const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/auto/upload`, {
    method: "POST",
    body: formData,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.secure_url) {
    throw new Error(data.error?.message || "Cloudinary recusou o upload. Confira o upload preset unsigned.");
  }
  return data.secure_url;
}

function mediaFolderForForm(type) {
  if (type === "character") return "characters";
  if (type?.startsWith("content-")) return `forja/${type.replace(/^content-/, "")}`;
  if (type === "create-guild" || type === "guild-settings") return "guilds";
  return "general";
}

async function resolveFormMedia(form, folder = "general") {
  const fileInputs = Array.from(form.querySelectorAll("input[type='file'][data-media-field]"));
  for (const input of fileInputs) {
    const file = input.files?.[0];
    if (!file) continue;
    const field = input.dataset.mediaField;
    const urlInput = form.querySelector(`[name="${CSS.escape(field)}"]`);
    toast("Enviando imagem...");
    const url = await uploadMediaFile(file, folder);
    if (urlInput) urlInput.value = url;
  }
}

async function previewMediaInput(input) {
  const file = input.files?.[0];
  if (!file) return;
  const field = input.dataset.mediaField;
  const preview = input.closest("form")?.querySelector(`[data-media-preview="${CSS.escape(field)}"]`);
  if (!preview) return;
  const url = await fileToDataUrl(file);
  preview.innerHTML = `<img src="${esc(url)}" alt="Prévia de imagem" />`;
}

function nowValue() {
  if (state.firebaseReady && state.db) return firebase.firestore.FieldValue.serverTimestamp();
  return new Date().toISOString();
}

function tsText(value) {
  if (!value) return "";
  if (typeof value === "string") return new Date(value).toLocaleString("pt-BR");
  if (typeof value.toDate === "function") return value.toDate().toLocaleString("pt-BR");
  return "";
}

function timeValue(value) {
  if (!value) return 0;
  if (typeof value === "string") return new Date(value).getTime() || 0;
  if (typeof value.toMillis === "function") return value.toMillis();
  if (typeof value.toDate === "function") return value.toDate().getTime();
  return 0;
}

function sortByName(items) {
  return [...items].sort((a, b) => String(a.name || a.title || a.displayName || "").localeCompare(String(b.name || b.title || b.displayName || ""), "pt-BR"));
}

function sortByOrder(items) {
  return [...items].sort((a, b) => Number(a.order || a.tier || 0) - Number(b.order || b.tier || 0) || String(a.name || a.title || "").localeCompare(String(b.name || b.title || ""), "pt-BR"));
}

function sortByTier(items) {
  return [...items].sort((a, b) => Number(a.tier || 0) - Number(b.tier || 0) || String(a.name || a.title || "").localeCompare(String(b.name || b.title || ""), "pt-BR"));
}

function normalize(value) {
  return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function bonusToText(bonus = {}) {
  const labels = { for: "FOR", vel: "VEL", hab: "HAB", res: "RES", pod: "POD", def: "DEF", hp: "PV", pp: "PP" };
  const parts = Object.entries(bonus)
    .filter(([, value]) => Number(value) !== 0)
    .map(([key, value]) => `+${value} ${labels[key] || key.toUpperCase()}`);
  return parts.length ? parts.join(", ") : "Sem bônus";
}

function parseBonus(raw) {
  try {
    const parsed = JSON.parse(raw || "{}");
    return Object.fromEntries(Object.entries(parsed).map(([key, value]) => [key, Number(value) || 0]));
  } catch {
    throw new Error("Bônus inválido. Use JSON, exemplo: {\"pod\":2}");
  }
}

function optionList(items, selected = "", label = "name") {
  return sortByName(items)
    .map((item) => `<option value="${esc(item.id)}" ${item.id === selected ? "selected" : ""}>${esc(item[label] || item.name)}</option>`)
    .join("");
}

function draftValue(draft, name, fallback = "") {
  return draft && Object.prototype.hasOwnProperty.call(draft, name) ? draft[name] : fallback;
}

function getCategory(id) {
  return state.content.affinityCategories.find((item) => item.id === id) || state.content.affinityCategories[0];
}

function getRace(id) {
  return state.content.races.find((item) => item.id === id) || state.content.races[0] || {};
}

function getClass(id) {
  return state.content.classes.find((item) => item.id === id) || state.content.classes[0] || {};
}

function getAffinity(id) {
  return state.content.affinities.find((item) => item.id === id) || null;
}

function affinityOwnerCount(affinityId) {
  return state.characters.filter((character) => character.affinityId === affinityId).length;
}

function categoryOwnerCount(categoryId) {
  const ids = new Set(state.content.affinities.filter((affinity) => affinity.categoryId === categoryId).map((affinity) => affinity.id));
  return state.characters.filter((character) => ids.has(character.affinityId)).length;
}

function getItem(id) {
  return state.content.items.find((item) => item.id === id) || null;
}

function defaultCharacter(uid, displayName = "") {
  return {
    id: uid,
    ownerId: uid,
    displayName,
    profilePublic: true,
    playerName: displayName,
    characterName: "",
    characterAge: "",
    characterDescription: "",
    creationLocked: false,
    bannerUrl: "",
    raceId: "humano",
    classId: "guerreiro",
    affinityId: "",
    affinityAttempts: Number(state.settings.defaultAffinityAttempts || 3),
    pityCounter: 0,
    totalRolls: 0,
    totalRares: 0,
    prestige: 0,
    base: { for: 0, vel: 0, hab: 0, res: 0, pod: 0 },
    xp: 0,
    level: 1,
    freePoints: 0,
    gold: 100,
    millenniumCoins: 250,
    gachaEnergy: GACHA_ENERGY_MAX,
    gachaEnergyUpdatedAt: new Date().toISOString(),
    gachaFragments: {},
    gachaVault: [],
    gachaHistory: [],
    activeActivities: [],
    minigameStats: {},
    activeTitleId: "",
    pendingGift: null,
    activeMissions: [],
    premiumPassUnlocked: false,
    rollHistory: [],
    titles: [],
    tokens: [],
    pets: [],
    inventory: [],
    power: { name: "", description: "" },
    powers: [],
    powerSlots: 1,
    techniques: [{ name: "", description: "" }],
    story: "",
    personality: "",
    avatarUrl: "",
    avatarPosition: "center",
    bannerPosition: "center",
    createdAt: nowValue(),
    updatedAt: nowValue(),
  };
}

function currentCharacter() {
  if (state.character) return state.character;
  const fallback = defaultCharacter(state.user?.uid || "demo", state.profile?.displayName || "");
  state.character = fallback;
  return fallback;
}

function getUserName(uid) {
  if (uid === state.user?.uid) return state.profile?.displayName || state.user?.email || "Você";
  return state.users.find((user) => user.id === uid)?.displayName || state.characters.find((char) => char.ownerId === uid)?.displayName || "Player";
}

function getCharacterFor(uid) {
  if (uid === state.user?.uid && state.character) return state.character;
  return state.characters.find((char) => char.ownerId === uid || char.id === uid) || defaultCharacter(uid, getUserName(uid));
}

function findCharacter(uid) {
  if (uid === state.user?.uid && state.character) return state.character;
  return state.characters.find((char) => char.ownerId === uid || char.id === uid) || null;
}

function equippedItems(character = currentCharacter()) {
  return (character.inventory || []).filter((item) => item.equipped);
}

function addBonuses(...bonuses) {
  const total = { for: 0, vel: 0, hab: 0, res: 0, pod: 0, def: 0, hp: 0, pp: 0 };
  bonuses.forEach((bonus = {}) => {
    Object.keys(total).forEach((key) => {
      total[key] += Number(bonus[key] || 0);
    });
  });
  return total;
}

function getTotals(character = currentCharacter()) {
  const race = getRace(character.raceId);
  const klass = getClass(character.classId);
  const affinity = getAffinity(character.affinityId);
  const title = activeTitle(character);
  const equipmentBonus = addBonuses(...equippedItems(character).map((item) => item.bonus || {}));
  const gachaBonus = addBonuses(...equippedGachaBonuses(character));
  const raw = addBonuses(character.base, race.bonus, klass.bonus, affinity?.bonus, equipmentBonus, gachaBonus);
  const hpMax = Math.max(0, raw.res * 5 + raw.hp);
  const ppMax = Math.max(0, raw.pod * 5 + raw.pp);
  const def = Math.ceil(raw.res / 2) + raw.def;
  return { ...raw, hpMax, ppMax, def };
}

function isRareReward(rarity) {
  return RARE_RARITIES.includes(rarity);
}

function rarityKey(rarity) {
  const key = String(rarity || "Comum")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  if (key.includes("secret")) return "secret";
  if (key.includes("celestial")) return "celestial";
  if (key.includes("cosm")) return "cosmic";
  if (key.includes("mitic") || key.includes("mythic")) return "mythic";
  if (key.includes("lend")) return "legendary";
  if (key.includes("pico")) return "epic";
  if (key.includes("raro")) return "rare";
  if (key.includes("incomum")) return "uncommon";
  if (key.includes("quebrado")) return "broken";
  return "common";
}

function rarityClass(rarity) {
  return `rarity-${rarityKey(rarity)}`;
}

function rarityScore(rarity) {
  return { broken: 0.5, common: 1, uncommon: 2, rare: 3, epic: 4, legendary: 5, mythic: 6, cosmic: 7, celestial: 8, secret: 9 }[rarityKey(rarity)] || 1;
}

function activeTitle(character = currentCharacter()) {
  const titles = character.titles || [];
  return titles.find((title) => title.id && title.id === character.activeTitleId) || titles.find((title) => title.equipped) || titles[0] || null;
}

function titleTextFor(uid) {
  const title = activeTitle(findCharacter(uid) || getCharacterFor(uid));
  return title?.name || "";
}

function displayNameWithTitle(uid, fallback = "") {
  const name = uid ? getUserName(uid) : fallback || "Sistema";
  const title = uid ? titleTextFor(uid) : "";
  return title ? `${name} · ${title}` : name;
}

function dateFromValue(value) {
  if (!value) return null;
  if (typeof value === "string") return new Date(value);
  if (typeof value.toDate === "function") return value.toDate();
  return null;
}

function dateTimeLocalValue(value) {
  const date = dateFromValue(value);
  if (!date || Number.isNaN(date.getTime())) return "";
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

function isUserOnline(user) {
  if (!user?.online) return false;
  const lastSeen = dateFromValue(user.lastSeen);
  if (!lastSeen) return true;
  return Date.now() - lastSeen.getTime() < 1000 * 60 * 3;
}

function socialRequestsFor(uid = state.user?.uid) {
  return state.socialRequests.filter((request) => (request.participants || []).includes(uid));
}

function pendingIncomingRequests(uid = state.user?.uid) {
  return socialRequestsFor(uid).filter((request) => request.toId === uid && request.status === "pendente");
}

function friendIds(uid = state.user?.uid) {
  return socialRequestsFor(uid)
    .filter((request) => request.type === "friend" && request.status === "aceito")
    .map((request) => request.fromId === uid ? request.toId : request.fromId)
    .filter(Boolean);
}

function areFriends(uid, otherId) {
  return friendIds(uid).includes(otherId);
}

function pendingFriendRequestWith(otherId) {
  return state.socialRequests.find((request) => (
    request.type === "friend"
    && request.status === "pendente"
    && (request.participants || []).includes(state.user?.uid)
    && (request.participants || []).includes(otherId)
  ));
}

function myGuilds(uid = state.user?.uid) {
  if (state.role === "admin") return state.guilds;
  return state.guilds.filter((guild) => (guild.memberIds || []).includes(uid));
}

function currentGuild() {
  const mine = guildForUser();
  if (!state.selectedGuildId && mine) state.selectedGuildId = mine.id;
  if (!state.selectedGuildId && state.guilds.length) state.selectedGuildId = state.guilds[0].id;
  return state.guilds.find((guild) => guild.id === state.selectedGuildId) || mine || state.guilds[0] || null;
}

function isGuildLeader(guild, uid = state.user?.uid) {
  return state.role === "admin" || guild?.leaderId === uid;
}

function guildMembers(guild) {
  return (guild?.memberIds || []).map((uid) => ({ uid, user: state.users.find((user) => user.id === uid), character: findCharacter(uid) })).filter((item) => item.user || item.character);
}

function guildForUser(uid = state.user?.uid) {
  return state.guilds.find((guild) => (guild.memberIds || []).includes(uid)) || null;
}

function isGuildMember(guild, uid = state.user?.uid) {
  return Boolean(guild && (guild.memberIds || []).includes(uid));
}

function pendingGuildRequest(guildId, uid = state.user?.uid) {
  return state.socialRequests.find((request) => (
    request.status === "pendente"
    && request.guildId === guildId
    && (request.type === "guildInvite" || request.type === "guildJoinRequest")
    && (request.participants || []).includes(uid)
  ));
}

function isCharacterBanned(character = currentCharacter()) {
  return Number(character.bannedUntil || 0) > Date.now();
}

function playSound(kind) {
  if (state.settings.soundEnabled === false) return;
  if (kind === "click") {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = playSound.ctx || new AudioCtx();
      playSound.ctx = ctx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = 520;
      gain.gain.value = 0.025;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.045);
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // noop
    }
    return;
  }
  const src = { rolling: "medieval/rolling.mp3", rare: "medieval/raro.mp3", fail: "medieval/fail.mp3" }[kind];
  if (!src) return;
  try {
    const audio = new Audio(src);
    audio.volume = kind === "rolling" ? 0.34 : 0.56;
    audio.play().catch(() => {});
  } catch {
    // Audio can be blocked until the first user gesture.
  }
}

function updateMusicButton() {
  const button = $("#musicToggle");
  if (!button) return;
  button.classList.toggle("active", state.musicOn);
  button.textContent = state.musicOn ? "♪" : "♫";
  button.title = state.musicOn ? "Desligar música ambiente" : "Ligar música ambiente";
  button.setAttribute("aria-label", button.title);
  button.dataset.state = state.musicOn ? "ligada" : "desligada";
  const volume = $("#musicVolume");
  if (volume) volume.value = String(Math.round(state.musicVolume * 100));
}

function setAmbientVolume(value) {
  const volume = Math.max(0, Math.min(1, Number(value) / 100));
  state.musicVolume = volume;
  if (state.musicNodes?.master && state.musicNodes?.ctx) {
    state.musicNodes.master.gain.setTargetAtTime(Math.max(0.0001, volume), state.musicNodes.ctx.currentTime, 0.06);
  }
  localStorage.setItem("millenniumMusicVolume", String(volume));
  updateMusicButton();
}

function ambientContext() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;
  const ctx = playSound.ctx || new AudioCtx();
  playSound.ctx = ctx;
  return ctx;
}

async function startAmbientMusic() {
  if (state.musicNodes) return;
  const ctx = ambientContext();
  if (!ctx) {
    toast("Este navegador bloqueou o áudio ambiente.");
    return;
  }
  await ctx.resume?.().catch(() => {});
  const master = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  const notes = [110, 164.81, 220, 329.63];
  const oscillators = notes.map((freq, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = index % 2 ? "sine" : "triangle";
    osc.frequency.value = freq;
    gain.gain.value = 0.018 / (index + 1);
    osc.connect(gain);
    gain.connect(filter);
    osc.start();
    return { osc, gain };
  });
  filter.type = "lowpass";
  filter.frequency.value = 720;
  filter.Q.value = 0.7;
  lfo.type = "sine";
  lfo.frequency.value = 0.035;
  lfoGain.gain.value = 220;
  lfo.connect(lfoGain);
  lfoGain.connect(filter.frequency);
  filter.connect(master);
  master.gain.value = Math.max(0.0001, state.musicVolume);
  master.connect(ctx.destination);
  lfo.start();
  const melody = [220, 246.94, 261.63, 329.63, 392, 329.63, 261.63, 246.94];
  let melodyIndex = 0;
  const melodyTimer = window.setInterval(() => {
    if (!state.musicOn) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const note = melody[melodyIndex % melody.length] * (melodyIndex % 5 === 0 ? 0.5 : 1);
    melodyIndex += 1;
    osc.type = "triangle";
    osc.frequency.value = note;
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.026, ctx.currentTime + 0.018);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.45);
    osc.connect(gain);
    gain.connect(master);
    osc.start();
    osc.stop(ctx.currentTime + 1.5);
  }, 2850);
  state.musicNodes = { ctx, master, filter, lfo, lfoGain, oscillators, timers: [melodyTimer] };
  state.musicOn = true;
  localStorage.setItem("millenniumMusic", "on");
  updateMusicButton();
}

function stopAmbientMusic() {
  const nodes = state.musicNodes;
  if (!nodes) {
    state.musicOn = false;
    updateMusicButton();
    return;
  }
  nodes.master.gain.setTargetAtTime(0.0001, nodes.ctx.currentTime, 0.08);
  window.setTimeout(() => {
    nodes.oscillators.forEach(({ osc }) => {
      try { osc.stop(); } catch {}
    });
    (nodes.timers || []).forEach((timer) => window.clearInterval(timer));
    try { nodes.lfo.stop(); } catch {}
    try { nodes.master.disconnect(); } catch {}
  }, 260);
  state.musicNodes = null;
  state.musicOn = false;
  localStorage.setItem("millenniumMusic", "off");
  updateMusicButton();
}

async function toggleAmbientMusic() {
  if (state.musicOn) {
    stopAmbientMusic();
    return;
  }
  await startAmbientMusic();
}

function delay(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function localDayKey(date = new Date()) {
  return date.toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" });
}

function weightedPick(items, weightKey = "weight") {
  const pool = items.filter((item) => Number(item[weightKey] || 0) > 0);
  const total = pool.reduce((sum, item) => sum + Number(item[weightKey] || 0), 0);
  if (!pool.length || total <= 0) return items[0] || null;
  let cursor = Math.random() * total;
  for (const item of pool) {
    cursor -= Number(item[weightKey] || 0);
    if (cursor <= 0) return item;
  }
  return pool[pool.length - 1];
}

function pickRollCategory(forceRare = false) {
  const categories = state.content.affinityCategories.filter((cat) => Number(cat.weight || 0) > 0);
  const banner = categories.find((cat) => cat.id === state.settings.bannerRateUp);
  if (state.settings.eventActive && banner && Math.random() < Number(state.settings.rareRateUpChance ?? 0.3)) return banner;

  if (forceRare) {
    const rareCategories = categories.filter((cat) => isRareReward(cat.rarity) || Number(cat.weight || 0) <= 10);
    return weightedPick(rareCategories.length ? rareCategories : categories);
  }

  return weightedPick(categories);
}

function pickAffinityForCategory(category) {
  const categoryPool = state.content.affinities.filter((affinity) => affinity.categoryId === category?.id);
  const pool = categoryPool.length ? categoryPool : state.content.affinities;
  return pool[Math.floor(Math.random() * pool.length)] || null;
}

function buildRollResult(pityCounter = 0) {
  const pityMax = Math.max(1, Number(state.settings.pityMax || 30));
  const forceRare = pityCounter + 1 >= pityMax;
  const category = pickRollCategory(forceRare);
  const affinity = pickAffinityForCategory(category);
  if (!affinity) return null;
  const finalCategory = category || getCategory(affinity.categoryId);
  const rare = isRareReward(finalCategory?.rarity) || Number(finalCategory?.weight || 0) <= 10;
  return {
    id: cryptoRandom(),
    affinity,
    category: finalCategory,
    rare,
    forced: forceRare && rare,
    pityAfter: rare ? 0 : pityCounter + 1,
    createdAt: new Date().toISOString(),
  };
}

function gachaRarityMeta(rarity) {
  return GACHA_RARITIES.find((item) => item.name === rarity || item.id === rarityKey(rarity)) || GACHA_RARITIES[1];
}

function gachaPool(type = "pets") {
  return type === "items" ? (state.content.gachaItems || []) : (state.content.gachaPets || []);
}

function stableNumber(seed) {
  return String(seed).split("").reduce((sum, char) => ((sum * 31) + char.charCodeAt(0)) % 2147483647, 7);
}

function pickRotating(items, count, seed) {
  if (!items.length) return [];
  const picked = [];
  let cursor = stableNumber(seed) % items.length;
  while (picked.length < Math.min(count, items.length)) {
    const item = items[cursor % items.length];
    if (!picked.some((entry) => entry.id === item.id)) picked.push(item);
    cursor += 1 + (stableNumber(`${seed}-${picked.length}`) % Math.max(1, items.length - 1));
  }
  return picked;
}

function activeGachaBanner(type = "pets") {
  const pool = gachaPool(type);
  const hour = Math.floor(Date.now() / 3600000);
  const configured = (state.content.gachaBanners || []).find((banner) => {
    if (!banner.enabled || banner.type !== type) return false;
    const startsAt = dateFromValue(banner.startsAt)?.getTime() || 0;
    const endsAt = dateFromValue(banner.endsAt)?.getTime() || Number.MAX_SAFE_INTEGER;
    return Date.now() >= startsAt && Date.now() <= endsAt;
  });
  if (configured) {
    const featuredIds = Array.isArray(configured.featuredIds)
      ? configured.featuredIds
      : String(configured.featuredIds || "").split(",").map((id) => id.trim()).filter(Boolean);
    const featured = featuredIds
      .map((id) => pool.find((item) => item.id === id))
      .filter(Boolean);
    if (featured.length) {
      return {
        type,
        hour,
        name: configured.name || "Banner do Oráculo",
        description: configured.description || "Rate-up configurado pelo Oráculo.",
        featured,
        endsAt: dateFromValue(configured.endsAt) || new Date((hour + 1) * 3600000),
        configured: true,
      };
    }
  }
  const byRarity = (rarity) => pool.filter((item) => rarityKey(item.rarity) === rarityKey(rarity));
  const featured = [
    ...pickRotating(byRarity("Mítico"), 3, `${type}-mythic-${hour}`),
    ...pickRotating(byRarity("Cósmica"), 1, `${type}-cosmic-${hour}`),
    ...pickRotating(byRarity("Celestial"), 1, `${type}-celestial-${hour}`),
    ...pickRotating(byRarity("Secret"), 1, `${type}-secret-${hour}`),
  ];
  return {
    type,
    hour,
    name: "Rate-up rotativo",
    description: "Destaques automáticos alternam a cada hora.",
    featured,
    endsAt: new Date((hour + 1) * 3600000),
  };
}

function pickGachaRarity(type = "pets") {
  const pool = gachaPool(type);
  const available = new Set(pool.map((item) => rarityKey(item.rarity)));
  const banner = activeGachaBanner(type);
  const featuredRarities = new Set(banner.featured.map((item) => rarityKey(item.rarity)));
  const weights = GACHA_RARITIES
    .filter((rarity) => available.has(rarity.id))
    .map((rarity) => {
      const rateUp = featuredRarities.has(rarity.id);
      const multiplier = rarity.id === "secret" && rateUp ? 10 : rateUp ? 2.8 : 1;
      return { ...rarity, weight: rarity.weight * multiplier };
    });
  return weightedPick(weights) || GACHA_RARITIES[1];
}

function pickGachaReward(type = "pets", rarity = "Comum") {
  const pool = gachaPool(type);
  const rarityPool = pool.filter((item) => rarityKey(item.rarity) === rarityKey(rarity));
  const fallback = rarityPool.length ? rarityPool : pool;
  const bannerItems = activeGachaBanner(type).featured.filter((item) => rarityKey(item.rarity) === rarityKey(rarity));
  if (bannerItems.length && Math.random() < 0.68) return bannerItems[Math.floor(Math.random() * bannerItems.length)];
  return fallback[Math.floor(Math.random() * fallback.length)] || null;
}

function shinyChanceFor(rarity) {
  const key = rarityKey(rarity);
  return { broken: 0.025, common: 0.022, uncommon: 0.018, epic: 0.012, legendary: 0.008, mythic: 0.005, cosmic: 0.003, celestial: 0.002, secret: 0.001 }[key] || 0.015;
}

function buildGachaInstance(source, type = "pets") {
  const shiny = Math.random() < shinyChanceFor(source.rarity);
  return {
    instanceId: cryptoRandom(),
    sourceId: source.id,
    kind: type === "items" ? "item" : "pet",
    name: `${shiny ? "Radiante " : ""}${source.name}`,
    baseName: source.name,
    rarity: source.rarity || "Comum",
    stars: 1,
    shiny,
    locked: false,
    equipped: false,
    status: "Livre",
    activityId: "",
    imageUrl: source.imageUrl || "",
    archetype: source.archetype || source.category || "",
    element: source.element || "",
    category: source.category || "",
    bonus: source.bonus || {},
    td: source.td || {},
    trait: source.trait || source.effect || "",
    description: source.description || "",
    obtainedAt: new Date().toISOString(),
  };
}

function instancePower(instance) {
  const rarity = rarityScore(instance.rarity);
  const stars = Math.max(1, Number(instance.stars || 1));
  const shiny = instance.shiny ? 1.18 : 1;
  return Math.round((rarity * 100 + stars * 42) * (1 + (stars - 1) * 0.22) * shiny);
}

function scaledBonus(instance) {
  const stars = Math.max(1, Number(instance.stars || 1));
  const scale = (1 + (stars - 1) * 0.28) * (instance.shiny ? 1.12 : 1);
  return Object.fromEntries(Object.entries(instance.bonus || {}).map(([key, value]) => [key, Math.max(0, Math.round(Number(value || 0) * scale))]));
}

function equippedGachaBonuses(character = currentCharacter()) {
  return (character.gachaVault || [])
    .filter((item) => item.equipped && (item.kind === "item" || item.kind === "pet"))
    .map((item) => scaledBonus(item));
}

function gachaFragmentName(instanceOrType = "pets") {
  const kind = typeof instanceOrType === "string" ? instanceOrType : instanceOrType.kind;
  return kind === "item" || kind === "items" ? "Ecos de Relíquia" : "Ecos de Companheiro";
}

function fragmentGainFor(instance) {
  const meta = gachaRarityMeta(instance.rarity);
  const stars = Math.max(1, Number(instance.stars || 1));
  return Math.max(1, Math.round(meta.fragment * stars * (instance.shiny ? 1.5 : 1)));
}

function withFragments(character, name, amount) {
  return {
    ...(character.gachaFragments || {}),
    [name]: Number(character.gachaFragments?.[name] || 0) + Number(amount || 0),
  };
}

function refreshGachaEnergy(character = currentCharacter()) {
  const last = dateFromValue(character.gachaEnergyUpdatedAt);
  const lastKey = last ? localDayKey(last) : "";
  const todayKey = localDayKey();
  if (lastKey !== todayKey) {
    return { gachaEnergy: GACHA_ENERGY_MAX, gachaEnergyUpdatedAt: new Date().toISOString() };
  }
  return {};
}

function currentGachaEnergy(character = currentCharacter()) {
  const refreshed = refreshGachaEnergy(character);
  return Object.prototype.hasOwnProperty.call(refreshed, "gachaEnergy") ? refreshed.gachaEnergy : Number(character.gachaEnergy ?? GACHA_ENERGY_MAX);
}

function petBusy(instance) {
  return instance.status && !["Livre", "Equipado"].includes(instance.status);
}

function petRecoveryCost(instance) {
  const status = instance?.status || "Livre";
  const power = Math.max(1, Math.round(instancePower(instance || {}) / 260));
  if (status === "Morto") return 60 + power * 20;
  if (status === "Ferido") return 18 + power * 8;
  if (status === "Descansando") return 8 + power * 4;
  return 0;
}

function prestigeFor(character) {
  return Math.floor(
    Number(character.prestige || 0)
    || Number(character.totalRolls || 0) * 10
    + Number(character.totalRares || 0) * 250
    + Number(character.level || 1) * 20
    + Number(character.gold || 0) / 10
  );
}

function levelFromXp(xp = 0) {
  return Math.max(1, Math.min(Number(state.settings.levelMax || 99), 1 + Math.floor(Number(xp || 0) / 100)));
}

function pendingProgressRequests(uid = state.user?.uid) {
  return state.progressRequests.filter((request) => request.uid === uid && request.status === "pendente");
}

function syncPrivateMessages() {
  if (!state.selectedPrivateUserId) {
    state.privateMessages = [];
    return;
  }
  state.privateMessages = state.directMessages
    .filter((message) => (message.participants || []).includes(state.user.uid) && (message.participants || []).includes(state.selectedPrivateUserId))
    .sort((a, b) => timeValue(a.createdAt) - timeValue(b.createdAt));
}

function profileViewsFor(uid = state.user?.uid) {
  return state.profileViews?.filter((view) => view.targetId === uid).length || 0;
}

function recentNews() {
  return state.globalMessages
    .filter((message) => ["system", "rare", "admin-alert", "join"].includes(message.type))
    .slice(-8);
}

function approvedPowerCount(character = currentCharacter()) {
  const powers = character.powers || [];
  if (powers.length) return powers.filter((power) => power.status !== "reprovado").length;
  return character.power?.name ? 1 : 0;
}

function progressTypeLabel(type) {
  return {
    training: "Treino",
    mission: "Missão",
    guildMission: "Missão de guilda",
    power: "Poder",
    technique: "Técnica",
    premiumPass: "Passe premium",
  }[type] || "Solicitação";
}

function defaultXpForRequest(type, rarity = "Comum") {
  const byRarity = { Comum: 40, Incomum: 60, Raro: 90, "Épico": 130, Lendário: 180, Cósmica: 240 };
  if (type === "training") return 30;
  if (type === "power" || type === "technique" || type === "premiumPass") return 0;
  return byRarity[rarity] || 50;
}

function requestRewardHint(request) {
  const parts = [];
  if (request.xp) parts.push(`${request.xp} XP`);
  if (request.reward) parts.push(request.reward);
  return parts.join(" · ") || "Oráculo define na aprovação";
}

function leaderboard() {
  return [...state.characters]
    .filter((char) => state.role === "admin" || char.profilePublic !== false || char.ownerId === state.user?.uid)
    .sort((a, b) => prestigeFor(b) - prestigeFor(a) || Number(b.totalRares || 0) - Number(a.totalRares || 0) || Number(b.level || 1) - Number(a.level || 1));
}

function renderPityBar(value, max) {
  const pct = Math.max(0, Math.min(100, (Number(value || 0) / Math.max(1, Number(max || 1))) * 100));
  return `<div class="pity-bar" aria-label="Pity ${Number(value || 0)} de ${Number(max || 1)}"><span style="width:${pct}%"></span></div>`;
}

function mondayResetKey(date = new Date()) {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  const dayFromMonday = (copy.getDay() + 6) % 7;
  copy.setDate(copy.getDate() - dayFromMonday);
  return copy.toISOString().slice(0, 10);
}

function showAuth() {
  $("#authScreen").hidden = false;
  $("#appShell").hidden = true;
  updateMusicButton();
  $("#demoActions").hidden = false;
  $("#authNote").hidden = false;
  $("#authNote").textContent = state.firebaseReady
    ? "Modo demo local disponível para testar a interface sem alterar contas reais."
    : "Firebase não carregou nesta sessão. Use o modo demo local para testar a interface.";
}

function isConfiguredAdminEmail(email) {
  return ADMIN_EMAILS.includes(String(email || "").trim().toLowerCase());
}

function firebaseErrorMessage(error) {
  const code = error?.code || "";
  const messages = {
    "auth/email-already-in-use": "Esse email já tem conta. Use Entrar em vez de Criar conta.",
    "auth/invalid-email": "Email inválido.",
    "auth/invalid-credential": "Email ou senha incorretos.",
    "auth/user-not-found": "Conta não encontrada. Crie a conta primeiro.",
    "auth/wrong-password": "Senha incorreta.",
    "auth/weak-password": "A senha precisa ter pelo menos 6 caracteres.",
    "auth/configuration-not-found": "Firebase Authentication ainda não está configurado nesse projeto. No Firebase Console, vá em Authentication, clique em Get started e ative Email/Password.",
    "auth/operation-not-allowed": "Ative Email/Senha em Firebase Authentication > Sign-in method.",
    "auth/unauthorized-domain": "Domínio não autorizado no Firebase. Adicione 127.0.0.1 e localhost em Authentication > Settings > Authorized domains.",
    "auth/network-request-failed": "Não consegui conectar ao Firebase agora. Verifique internet, bloqueios do navegador ou tente recarregar.",
    "permission-denied": "Permissão negada no Firestore. Publique as regras atualizadas do arquivo firestore.rules.",
  };
  return messages[code] || error?.message || "Não foi possível concluir a ação.";
}

function loadScript(src, timeoutMs = 1800) {
  return new Promise((resolve) => {
    if ([...document.scripts].some((script) => script.src === src)) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    const timer = window.setTimeout(() => {
      script.remove();
      resolve(false);
    }, timeoutMs);
    script.src = src;
    script.onload = () => {
      window.clearTimeout(timer);
      resolve(true);
    };
    script.onerror = () => {
      window.clearTimeout(timer);
      resolve(false);
    };
    document.head.appendChild(script);
  });
}

async function loadFirebaseScripts() {
  if (window.firebase?.initializeApp && window.firebase?.auth && window.firebase?.firestore) return true;

  for (const src of FIREBASE_SCRIPTS) {
    const loaded = await loadScript(src);
    if (!loaded) return false;
  }

  return Boolean(window.firebase?.initializeApp && window.firebase?.auth && window.firebase?.firestore);
}

function cleanupListeners() {
  state.unsubs.forEach((unsub) => {
    try {
      unsub();
    } catch {
      // noop
    }
  });
  state.unsubs = [];
  if (state.privateUnsub) state.privateUnsub();
  state.privateUnsub = null;
  if (state.presenceTimer) window.clearInterval(state.presenceTimer);
  state.presenceTimer = null;
  if (state.idleTimer) window.clearInterval(state.idleTimer);
  state.idleTimer = null;
}

async function setPresence(online) {
  if (!state.user) return;
  const payload = {
    online,
    lastSeen: state.demo ? new Date().toISOString() : nowValue(),
  };
  if (state.demo) {
    writeDemo("users", state.user.uid, payload);
    return;
  }
  if (!state.db) return;
  await state.db.collection("users").doc(state.user.uid).set(payload, { merge: true }).catch(() => {});
}

function startPresence() {
  touchActivity();
  setPresence(true);
  if (state.presenceTimer) window.clearInterval(state.presenceTimer);
  state.presenceTimer = window.setInterval(() => setPresence(true), 45000);
  if (state.idleTimer) window.clearInterval(state.idleTimer);
  state.idleTimer = window.setInterval(checkIdleTimeout, 30000);
}

function touchActivity() {
  state.lastActivityAt = Date.now();
}

async function checkIdleTimeout() {
  if (!state.user || state.role === "admin") return;
  if (Date.now() - state.lastActivityAt < IDLE_LIMIT_MS) return;
  toast("Sessão encerrada por inatividade.");
  await setPresence(false);
  cleanupListeners();
  if (state.firebaseReady && state.auth?.currentUser) await state.auth.signOut().catch(() => {});
  state.user = null;
  state.demo = false;
  showAuth();
}

async function initFirebase() {
  state.firebaseReady = await loadFirebaseScripts();
  if (!state.firebaseReady) {
    showAuth();
    return;
  }

  state.app = firebase.apps?.length ? firebase.app() : firebase.initializeApp(firebaseConfig);
  state.auth = firebase.auth();
  state.db = firebase.firestore();
  await state.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(() => {});

  state.auth.onAuthStateChanged(async (user) => {
    cleanupListeners();
    if (!user) {
      state.user = null;
      state.profile = null;
      showAuth();
      return;
    }

    state.user = user;
    await ensureUserProfile(user);
    await seedDefaultsIfNeeded();
    subscribeCore();
  });
}

async function ensureUserProfile(user) {
  const ref = state.db.collection("users").doc(user.uid);
  const snap = await ref.get();
  const adminByEmail = isConfiguredAdminEmail(user.email);

  if (snap.exists) {
    const profile = { id: user.uid, ...snap.data() };
    if (adminByEmail && profile.role !== "admin") {
      try {
        await ref.set({
          email: user.email,
          role: "admin",
          displayName: profile.displayName || user.email?.split("@")[0] || ORACLE_LABEL,
          updatedAt: nowValue(),
        }, { merge: true });
      } catch (error) {
        console.warn("Não consegui gravar o papel do Oráculo ainda. Publique firestore.rules.", error);
      }
      profile.role = "admin";
    }
    state.profile = profile;
    return;
  }

  let firstUser = false;
  try {
    const first = await state.db.collection("users").limit(1).get();
    firstUser = first.empty;
  } catch {
    firstUser = false;
  }

  const profile = {
    id: user.uid,
    email: user.email,
    displayName: user.email?.split("@")[0] || "Player",
    role: adminByEmail || firstUser ? "admin" : "player",
    createdAt: nowValue(),
  };
  await ref.set(profile, { merge: true });
  await state.db.collection("characters").doc(user.uid).set(defaultCharacter(user.uid, profile.displayName), { merge: true });
  state.profile = profile;
}

async function seedDefaultsIfNeeded() {
  if (!state.db) return;
  try {
    const settingsRef = state.db.collection("settings").doc("system");
    const snap = await settingsRef.get();
    if (snap.exists && Number(snap.data().seedVersion || 0) >= SEED_VERSION) return;

    const batch = state.db.batch();
    batch.set(settingsRef, DEFAULT_CONTENT.settings, { merge: true });
    CONTENT_COLLECTIONS.forEach((collection) => {
      DEFAULT_CONTENT[collection].forEach((item) => {
        batch.set(state.db.collection(collection).doc(item.id), item, { merge: true });
      });
    });
    await batch.commit();
  } catch (error) {
    console.warn("Seed skipped:", error);
  }
}

function subscribeDoc(path, id, cb) {
  const unsub = state.db.collection(path).doc(id).onSnapshot((snap) => cb(snap.exists ? { id: snap.id, ...snap.data() } : null));
  state.unsubs.push(unsub);
}

function subscribeCollection(path, cb, queryBuilder = null) {
  const base = state.db.collection(path);
  const query = queryBuilder ? queryBuilder(base) : base;
  const unsub = query.onSnapshot(
    (snap) => cb(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))),
    (error) => {
      console.error(error);
      if (path === "directMessages") {
        state.privateChatError = "O Firestore bloqueou o chat direto. Publique as regras novas e recarregue o site.";
        render();
      }
    },
  );
  state.unsubs.push(unsub);
}

function subscribeCore() {
  subscribeDoc("users", state.user.uid, (profile) => {
    state.profile = profile || state.profile;
    state.role = state.profile?.role === "admin" ? "admin" : "player";
    if (!NAVS[state.role].some((item) => item.id === state.view)) state.view = NAVS[state.role][0].id;
    render();
  });

  subscribeDoc("settings", "system", (settings) => {
    const previousPanic = state.lastPanicVersion;
    state.settings = { ...DEFAULT_CONTENT.settings, ...(settings || {}) };
    if (!state.lastPanicVersion) state.lastPanicVersion = state.settings.panicVersion || "";
    if (
      previousPanic
      && state.settings.panicVersion
      && state.settings.panicVersion !== previousPanic
      && state.role !== "admin"
    ) {
      toast(`Atualização emergencial iniciada pelo ${ORACLE_LABEL}. Você será desconectado.`);
      setPresence(false);
      cleanupListeners();
      state.auth?.signOut?.();
      state.user = null;
      state.demo = false;
      showAuth();
      return;
    }
    state.lastPanicVersion = state.settings.panicVersion || "";
    document.body.className = [
      state.settings.theme && state.settings.theme !== "default" ? `theme-${state.settings.theme}` : "",
      state.settings.seasonTheme ? `season-theme-${state.settings.seasonTheme}` : "season-theme-awakening",
      `season-${Number(state.settings.seasonNumber || 1)}`,
    ].filter(Boolean).join(" ");
    maybeResetWeeklyMissions();
    render();
  });

  subscribeDoc("characters", state.user.uid, async (character) => {
    if (!character) {
      await state.db.collection("characters").doc(state.user.uid).set(defaultCharacter(state.user.uid, state.profile?.displayName), { merge: true });
      return;
    }
    state.character = character;
    render();
  });

  CONTENT_COLLECTIONS.forEach((collection) => {
    subscribeCollection(collection, (items) => {
      state.content[collection] = items.length ? items : DEFAULT_CONTENT[collection];
      render();
    });
  });

  subscribeCollection("users", (users) => {
    state.users = users;
    render();
  });

  subscribeCollection("characters", (characters) => {
    state.characters = characters;
    render();
  });

  subscribeCollection("weeklyMissions", (missions) => {
    state.weeklyMissions = missions;
    render();
  }, (q) => q.orderBy("createdAt", "desc"));

  subscribeCollection("campaignDiary", (entries) => {
    state.diaryEntries = entries.reverse();
    render();
  }, (q) => q.orderBy("createdAt", "desc").limit(80));

  subscribeCollection("globalMessages", (messages) => {
    state.globalMessages = messages.reverse();
    render();
  }, (q) => q.orderBy("createdAt", "desc").limit(80));

  subscribeCollection("directMessages", (messages) => {
    state.directMessages = messages.sort((a, b) => timeValue(a.createdAt) - timeValue(b.createdAt));
    syncPrivateMessages();
    render();
  }, (q) => q.where("participants", "array-contains", state.user.uid).limit(200));

  subscribeCollection("profileViews", (views) => {
    state.profileViews = views;
    render();
  }, (q) => q.limit(500));

  subscribeCollection("reports", (reports) => {
    state.reports = reports;
    render();
  }, (q) => state.profile?.role === "admin"
    ? q.orderBy("createdAt", "desc").limit(100)
    : q.where("reporterId", "==", state.user.uid).limit(40));

  subscribeCollection("progressRequests", (requests) => {
    state.progressRequests = requests;
    render();
  }, (q) => state.profile?.role === "admin"
    ? q.orderBy("createdAt", "desc").limit(160)
    : q.where("uid", "==", state.user.uid).limit(80));

  subscribeCollection("socialRequests", (requests) => {
    state.socialRequests = requests;
    render();
  }, (q) => q.where("participants", "array-contains", state.user.uid).limit(120));

  subscribeCollection("guilds", (guilds) => {
    state.guilds = guilds;
    render();
  }, (q) => q.limit(80));

  subscribeCollection("guildMessages", (messages) => {
    state.guildMessages = messages.sort((a, b) => timeValue(a.createdAt) - timeValue(b.createdAt));
    render();
  }, (q) => state.profile?.role === "admin"
    ? q.limit(120)
    : q.where("memberIds", "array-contains", state.user.uid).limit(120));

  subscribeCollection("guildMissions", (missions) => {
    state.guildMissions = missions.length ? missions : [...DEFAULT_GUILD_MISSIONS];
    render();
  }, (q) => q.limit(20));

  subscribeCollection("marketTrades", (trades) => {
    state.marketTrades = trades.sort((a, b) => timeValue(b.createdAt) - timeValue(a.createdAt));
    render();
  }, (q) => state.role === "admin"
    ? q.orderBy("createdAt", "desc").limit(160)
    : q.where("participants", "array-contains", state.user.uid).limit(120));

  $("#authScreen").hidden = true;
  $("#appShell").hidden = false;
  startPresence();
  announceSessionEntry();
  render();
}

function enterDemo(role) {
  state.demo = true;
  state.user = { uid: `demo-${role}`, email: `${role}@demo.local` };
  state.profile = {
    id: state.user.uid,
    email: state.user.email,
    displayName: role === "admin" ? "Oráculo Demo" : "Player Demo",
    role,
    acceptedTermsVersion: state.settings.rulesVersion || "1.0",
    online: true,
    lastSeen: new Date().toISOString(),
  };
  state.role = role;
  state.view = NAVS[role][0].id;
  state.settings = { ...DEFAULT_CONTENT.settings };
  state.content = defaultContentState();
  const playerChar = {
    ...defaultCharacter("demo-player", "Player Demo"),
    characterName: "Ariadne Vesper",
    base: { for: 3, vel: 4, hab: 5, res: 4, pod: 4 },
    gold: 180,
    titles: [{ id: "arquivo-vivo", name: "Arquivo Vivo", rarity: "Raro" }],
    pets: [{ id: "luma", name: "Luma", imageUrl: "" }],
  };
  state.users = [
    { id: "demo-player", displayName: "Player Demo", email: "player@demo.local", role: "player" },
    { id: "demo-admin", displayName: "Oráculo Demo", email: "admin@demo.local", role: "admin" },
  ];
  state.characters = [playerChar, defaultCharacter("demo-admin", "Oráculo Demo")];
  state.character = role === "player" ? playerChar : defaultCharacter("demo-admin", "Oráculo Demo");
  state.weeklyMissions = DEFAULT_CONTENT.missionPool.slice(0, 3).map((mission) => ({ ...mission, createdAt: new Date().toISOString() }));
  state.globalMessages = [{ id: "welcome", senderName: "Sistema", text: "Chat global iniciado.", type: "system", createdAt: new Date().toISOString() }];
  $("#authScreen").hidden = true;
  $("#appShell").hidden = false;
  startPresence();
  render();
}

async function writeDoc(collection, id, data) {
  if (state.demo) {
    writeDemo(collection, id, data);
    render();
    return;
  }
  await state.db.collection(collection).doc(id).set({ ...data, updatedAt: nowValue() }, { merge: true });
}

async function addDoc(collection, data) {
  if (state.demo) {
    const id = cryptoRandom();
    writeDemo(collection, id, { id, ...data });
    render();
    return id;
  }
  const ref = await state.db.collection(collection).add({ ...data, createdAt: nowValue() });
  return ref.id;
}

async function deleteDoc(collection, id) {
  if (!id) return;
  if (state.demo) {
    if (collection === "globalMessages") state.globalMessages = state.globalMessages.filter((item) => item.id !== id);
    if (collection === "directMessages") state.directMessages = state.directMessages.filter((item) => item.id !== id);
    if (collection === "guildMessages") state.guildMessages = state.guildMessages.filter((item) => item.id !== id);
    syncPrivateMessages();
    render();
    return;
  }
  await state.db.collection(collection).doc(id).delete();
}

function writeDemo(collection, id, data) {
  if (collection === "settings") state.settings = { ...state.settings, ...data };
  if (collection === "characters") {
    const next = { ...getCharacterFor(id), ...data, id, ownerId: id };
    state.characters = state.characters.filter((item) => item.ownerId !== id && item.id !== id).concat(next);
    if (id === state.user.uid) state.character = next;
  }
  if (collection === "users") {
    const current = state.users.find((item) => item.id === id) || {};
    state.users = state.users.filter((item) => item.id !== id).concat({ ...current, ...data, id });
    if (id === state.user.uid) state.profile = { ...state.profile, ...data };
  }
  if (Object.keys(state.content).includes(collection)) {
    state.content[collection] = state.content[collection].filter((item) => item.id !== id).concat({ ...data, id });
  }
  if (collection === "weeklyMissions") state.weeklyMissions = state.weeklyMissions.filter((item) => item.id !== id).concat({ ...data, id });
  if (collection === "campaignDiary") state.diaryEntries = state.diaryEntries.filter((item) => item.id !== id).concat({ ...data, id });
  if (collection === "globalMessages") state.globalMessages.push({ ...data, id });
  if (collection === "directMessages") {
    state.directMessages = state.directMessages.filter((item) => item.id !== id).concat({ ...data, id });
    syncPrivateMessages();
  }
  if (collection === "socialRequests") {
    const current = state.socialRequests.find((item) => item.id === id) || {};
    state.socialRequests = state.socialRequests.filter((item) => item.id !== id).concat({ ...current, ...data, id });
  }
  if (collection === "guilds") {
    const current = state.guilds.find((item) => item.id === id) || {};
    state.guilds = state.guilds.filter((item) => item.id !== id).concat({ ...current, ...data, id });
  }
  if (collection === "guildMessages") state.guildMessages.push({ ...data, id });
  if (collection === "guildMissions") state.guildMissions = state.guildMissions.filter((item) => item.id !== id).concat({ ...data, id });
  if (collection === "reports") state.reports.unshift({ ...data, id });
  if (collection === "progressRequests") state.progressRequests = state.progressRequests.filter((item) => item.id !== id).concat({ ...data, id });
}

async function pruneMessages(collection, messages, predicate = () => true) {
  const scoped = [...messages]
    .filter(predicate)
    .filter((message) => message.id && timeValue(message.createdAt) > 0)
    .sort((a, b) => timeValue(a.createdAt) - timeValue(b.createdAt));
  const overflow = scoped.slice(0, Math.max(0, scoped.length - CHAT_LIMIT));
  await Promise.all(overflow.map((message) => deleteDoc(collection, message.id).catch(() => {})));
}

async function updateCharacter(uid, patch) {
  await writeDoc("characters", uid, { ...patch, ownerId: uid });
}

async function addGlobalMessage(data) {
  await addDoc("globalMessages", {
    senderId: data.senderId || state.user.uid,
    senderName: data.senderName || state.profile?.displayName || "Player",
    text: data.text,
    type: data.type || "global",
    targetId: data.targetId || "",
    targetName: data.targetName || "",
    rarity: data.rarity || "",
    createdAt: state.demo ? new Date().toISOString() : nowValue(),
  });
  await pruneMessages("globalMessages", state.globalMessages);
}

async function announceSessionEntry() {
  if (state.sessionAnnounced || !state.user || state.demo) return;
  state.sessionAnnounced = true;
  const lastAnnouncedAt = timeValue(state.profile?.lastAnnouncedAt);
  if (lastAnnouncedAt && Date.now() - lastAnnouncedAt < JOIN_ANNOUNCE_COOLDOWN_MS) return;
  const character = currentCharacter();
  const title = activeTitle(character);
  const name = displayNameWithTitle(state.user.uid, state.profile?.displayName || state.user.email);
  await addGlobalMessage({
    senderId: "system",
    senderName: "Sistema",
    type: state.role === "admin" ? "admin-alert" : "join",
    text: state.role === "admin"
      ? `ALERTA: ${ORACLE_LABEL} ${name} entrou na interface.`
      : `${name}${title ? ` (${title.name})` : ""} entrou no servidor.`,
  }).catch(() => {});
  await writeDoc("users", state.user.uid, { lastAnnouncedAt: state.demo ? new Date().toISOString() : nowValue() }).catch(() => {});
}

async function announceRareReward(uid, rewardName, rarity, type = "prêmio") {
  if (!isRareReward(rarity)) return;
  const name = getUserName(uid);
  await addGlobalMessage({
    senderId: "system",
    senderName: "Sistema",
    type: "rare",
    rarity,
    text: `${name} conquistou ${type} raro: ${rewardName} (${rarity}).`,
  });
}

function render() {
  if (!state.user) {
    showAuth();
    return;
  }

  $("#authScreen").hidden = true;
  $("#appShell").hidden = false;
  updateMusicButton();
  const nav = NAVS[state.role];
  if (!nav.some((item) => item.id === state.view)) state.view = nav[0].id;
  $("#roleLabel").textContent = state.role === "admin" ? ORACLE_LABEL : "Player";
  $("#seasonLabel").textContent = state.settings.seasonName || `Temporada ${state.settings.seasonNumber || 1}`;
  $("#contextLabel").textContent = state.role === "admin" ? "Oráculo da interface" : "Suporte do personagem";
  $("#viewTitle").textContent = VIEW_TITLES[state.view] || "Painel";
  $("#navList").innerHTML = nav.map((item) => `
    <button class="nav-item ${state.view === item.id ? "active" : ""}" type="button" data-nav="${item.id}">
      <span class="nav-icon">${item.icon}</span>
      <span>${item.label}</span>
    </button>
  `).join("");

  const character = currentCharacter();
  $("#moneyPill").hidden = state.role === "admin";
  $("#moneyPill strong").textContent = Number(character.gold || 0);
  $("#quickStatus").innerHTML = renderQuickStatus(character);
  const notifications = notificationCount();
  $("#notifyCount").hidden = notifications < 1;
  $("#notifyCount").textContent = notifications;
  $("#mobileBottomNav").innerHTML = renderMobileBottomNav(nav);
  $("#globalNotice").classList.toggle("show", Boolean(state.settings.globalNotice));
  $("#globalNotice").textContent = state.settings.globalNotice || "";

  if (state.role !== "admin" && state.profile?.status === "suspended") {
    $("#viewHost").innerHTML = renderSuspendedGate();
    return;
  }
  if (state.role !== "admin" && state.settings.maintenanceMode) {
    $("#viewHost").innerHTML = renderMaintenanceGate();
    return;
  }
  if (state.role !== "admin" && !hasAcceptedTerms()) {
    $("#viewHost").innerHTML = renderTermsGate();
    return;
  }

  const renderer = VIEW_RENDERERS[state.view] || renderPlayerHome;
  $("#viewHost").innerHTML = renderer();
}

function renderStat(label, value) {
  return `<div class="stat"><span>${esc(label)}</span><strong>${esc(value)}</strong></div>`;
}

function notificationCount() {
  const character = currentCharacter();
  return pendingIncomingRequests().length
    + (character.pendingGift ? 1 : 0)
    + pendingProgressRequests().length;
}

function hasAcceptedTerms() {
  return state.profile?.acceptedTermsVersion === (state.settings.rulesVersion || "1.0");
}

function renderQuickStatus(character) {
  if (state.role === "admin") {
    const online = state.users.filter((user) => user.role !== "admin" && isUserOnline(user)).length;
    return `
      <span>Online ${online}</span>
      <span>Validações ${state.progressRequests.filter((request) => request.status === "pendente").length}</span>
      <span>Reports ${state.reports.filter((report) => report.status !== "resolvido").length}</span>
    `;
  }
  return `
    <span>Nv ${Number(character.level || levelFromXp(character.xp || 0))}</span>
    <span>Ess ${Number(character.affinityAttempts ?? state.settings.defaultAffinityAttempts ?? 0)}</span>
    <span>MC ${Number(character.millenniumCoins || 0)}</span>
    <span>Energia ${currentGachaEnergy(character)}/${GACHA_ENERGY_MAX}</span>
    <span>Online ${state.users.filter((user) => user.role !== "admin" && isUserOnline(user)).length}</span>
  `;
}

function renderMobileBottomNav(nav) {
  const preferred = state.role === "admin"
    ? ["admin-home", "admin-users", "admin-economy", "admin-requests", "admin-reports"]
    : ["player-home", "profile", "gacha", "chat", "missions"];
  const quick = preferred.map((id) => nav.find((item) => item.id === id)).filter(Boolean);
  return [
    ...quick.map((item) => `<button class="${state.view === item.id ? "active" : ""}" type="button" data-nav="${item.id}"><span>${item.icon}</span><small>${item.label}</small></button>`),
    `<button class="${quick.some((item) => item.id === state.view) ? "" : "active"}" type="button" data-action="open-more-nav"><span>☰</span><small>Mais</small></button>`,
  ].join("");
}

function openMoreNav() {
  const nav = NAVS[state.role] || NAVS.player;
  $("#modalContent").innerHTML = `
    <p class="eyebrow">Navegação</p>
    <h2>Escolha uma área</h2>
    <div class="more-nav-grid">
      ${nav.map((item) => `<button class="nav-item ${state.view === item.id ? "active" : ""}" type="button" data-nav="${item.id}"><span class="nav-icon">${item.icon}</span><span>${item.label}</span></button>`).join("")}
    </div>
  `;
  $("#modal").hidden = false;
}

function renderMaintenanceGate() {
  return `
    <div class="grid">
      <article class="panel span-12 center-panel">
        <p class="eyebrow">Modo manutenção</p>
        <h2>O Oráculo está ajustando a interface</h2>
        <p>Players ficam temporariamente bloqueados para evitar perda de dados durante correções e atualizações.</p>
      </article>
    </div>
  `;
}

function renderSuspendedGate() {
  return `
    <div class="grid">
      <article class="panel span-12 center-panel danger-zone">
        <p class="eyebrow">Conta suspensa</p>
        <h2>Seu acesso foi pausado pelo Oráculo</h2>
        <p>Entre em contato com o Oráculo da mesa pelo canal combinado para entender a decisão.</p>
      </article>
    </div>
  `;
}

function renderTermsGate() {
  return `
    <div class="grid">
      <article class="panel span-12 terms-gate">
        <p class="eyebrow">Termo de acordo</p>
        <h2>Antes de entrar na mesa</h2>
        <p>${esc(state.settings.termsText || DEFAULT_CONTENT.settings.termsText)}</p>
        <div class="content-grid">${renderRulesCards(state.content.rulesChapters.slice(0, 4))}</div>
        <form class="form-stack" data-form="terms-accept">
          <label class="checkbox-line"><input name="accepted" type="checkbox" value="true" required /> <span>Li e aceito as regras da mesa, convivência, punições e uso do site.</span></label>
          <button class="primary-button" type="submit">Aceitar e entrar</button>
        </form>
      </article>
    </div>
  `;
}

function renderPlayerHome() {
  const character = currentCharacter();
  const totals = getTotals(character);
  const affinity = getAffinity(character.affinityId);
  const title = activeTitle(character);
  const pityMax = Number(state.settings.pityMax || 30);
  const pity = Number(character.pityCounter || 0);
  const pending = character.pendingGift;
  const onlinePlayers = state.users.filter((user) => user.role !== "admin" && isUserOnline(user));
  const topRank = leaderboard().slice(0, 5);
  const news = recentNews();
  const nextSteps = playerNextSteps(character);
  return `
    <div class="grid">
      <article class="panel span-12 news-ticker">
        <span>Notícias</span>
        <div><p>${news.map((item) => esc(item.text || item.senderName || "Movimento registrado")).join(" • ") || "Nenhuma notícia recente da mesa."}</p></div>
      </article>
      <article class="panel span-12">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Próximos passos</p>
            <h2>Seu painel de ação</h2>
          </div>
          <button class="ghost-button" type="button" data-nav="help">Tutorial</button>
        </div>
        <div class="next-step-grid">
          ${nextSteps.map(renderNextStep).join("")}
        </div>
      </article>
      ${pending ? `
        <article class="gift-panel span-12">
          <div>
            <p class="eyebrow">Correio místico</p>
            <h2>Você recebeu um presente do Oráculo</h2>
            <p>${esc(pending.message || "Recompensa entregue. Abra seu perfil para ver os novos registros.")}</p>
            <div class="tag-row">${(pending.rewards || []).map((reward) => `<span class="tag">${esc(reward)}</span>`).join("")}</div>
          </div>
          <button class="primary-button" type="button" data-action="claim-gift">Recebido</button>
        </article>
      ` : ""}
      <article class="panel span-7">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Resumo</p>
            <h2>${esc(character.characterName || "Personagem sem nome")}</h2>
          </div>
          <span class="tag">${title ? esc(title.name) : (character.profilePublic ? "Perfil público" : "Perfil privado")}</span>
        </div>
        <div class="stat-grid">
          ${renderStat("PO", character.gold || 0)}
          ${renderStat("XP", character.xp || 0)}
          ${renderStat("Nível", character.level || levelFromXp(character.xp || 0))}
          ${renderStat("Essências", character.affinityAttempts ?? state.settings.defaultAffinityAttempts)}
          ${renderStat("Prestígio", prestigeFor(character))}
          ${renderStat("Raros", character.totalRares || 0)}
          ${renderStat("PV máx.", totals.hpMax)}
          ${renderStat("PP máx.", totals.ppMax)}
          ${renderStat("Views", profileViewsFor(state.user.uid))}
        </div>
        <div class="meter-block">
          <div class="panel-heading compact">
            <span>Pity da roleta</span>
            <strong>${pity}/${pityMax}</strong>
          </div>
          ${renderPityBar(pity, pityMax)}
        </div>
      </article>
      <article class="panel span-5 affinity-mini">
        <p class="eyebrow">Afinidade</p>
        <h3>${esc(affinity?.name || "Não sorteada")}</h3>
        <p>${affinity ? `${esc(getCategory(affinity.categoryId)?.name)} · ${esc(bonusToText(affinity.bonus))}` : "Use a roleta quando tiver essências disponíveis."}</p>
        <div class="action-row">
          <button class="ghost-button" type="button" data-nav="roulette">Roleta</button>
          <button class="ghost-button" type="button" data-nav="codex">Codex</button>
        </div>
      </article>
      <article class="panel span-4">
        <div class="panel-heading"><div><p class="eyebrow">Online agora</p><h3>${onlinePlayers.length} player(s)</h3></div></div>
        <div class="online-strip">
          ${onlinePlayers.slice(0, 8).map((user) => `<button class="online-pill" type="button" data-action="open-user-profile" data-user-id="${esc(user.id)}"><span></span>${esc(displayNameWithTitle(user.id, user.displayName || user.email))}</button>`).join("") || `<div class="empty-state compact">Ninguém online agora.</div>`}
        </div>
      </article>
      <article class="panel span-4">
        <div class="panel-heading"><div><p class="eyebrow">Ranking</p><h3>Top 5</h3></div></div>
        <div class="mini-rank">
          ${topRank.map((char, index) => `<button class="ranking-row compact" type="button" data-action="open-user-profile" data-user-id="${esc(char.ownerId)}"><strong>#${index + 1}</strong><span>${esc(char.characterName || getUserName(char.ownerId))}</span><b>${prestigeFor(char)}</b></button>`).join("") || `<div class="empty-state compact">Sem ranking ainda.</div>`}
        </div>
      </article>
      <article class="panel span-4">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Missões</p>
            <h3>Semana atual</h3>
          </div>
          <button class="ghost-button" type="button" data-nav="missions">Ver missões</button>
        </div>
        <div class="list">${renderMissionList(state.weeklyMissions.slice(0, 3))}</div>
      </article>
      <article class="panel span-8">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Chat</p>
            <h3>Conquistas recentes</h3>
          </div>
          <button class="ghost-button" type="button" data-nav="chat">Abrir chat</button>
        </div>
        <div class="list">${renderMessages(state.globalMessages.filter((msg) => msg.type === "rare").slice(-3))}</div>
      </article>
    </div>
  `;
}

function playerNextSteps(character) {
  const pending = pendingProgressRequests();
  const hasActiveMission = (character.activeMissions || []).length > 0;
  const hasGuild = Boolean(guildForUser());
  return [
    {
      title: character.creationLocked ? "Ficha base salva" : "Finalize sua ficha",
      text: character.creationLocked ? "Raça, classe e atributos base já estão protegidos." : "Salve nome, raça, classe e atributos para liberar a jornada.",
      nav: "character",
      done: character.creationLocked,
    },
    {
      title: getAffinity(character.affinityId) ? "Afinidade registrada" : "Role sua afinidade",
      text: getAffinity(character.affinityId) ? getAffinity(character.affinityId).name : "Use essências na roleta. XP vem de missões e treinos, não de giros.",
      nav: "roulette",
      done: Boolean(getAffinity(character.affinityId)),
    },
    {
      title: hasActiveMission ? "Missão em andamento" : "Escolha uma missão",
      text: hasActiveMission ? `${(character.activeMissions || []).length} missão(ões) ativa(s).` : "Pegue uma missão semanal e envie conclusão ao Oráculo.",
      nav: "missions",
      done: hasActiveMission,
    },
    {
      title: pending.length ? "Validação pendente" : "Relate treino ou criação",
      text: pending.length ? `${pending.length} pedido(s) aguardando análise.` : "Treinos, poderes e técnicas passam pelo Oráculo.",
      nav: "missions",
      done: pending.length > 0,
    },
    {
      title: hasGuild ? "Guilda ativa" : "Entre em uma guilda",
      text: hasGuild ? guildForUser().name : "Guildas liberam chat interno e missões em party.",
      nav: "guild",
      done: hasGuild,
    },
  ];
}

function renderNextStep(step) {
  return `
    <button class="next-step ${step.done ? "done" : ""}" type="button" data-nav="${esc(step.nav)}">
      <span>${step.done ? "✓" : "!"}</span>
      <strong>${esc(step.title)}</strong>
      <small>${esc(step.text)}</small>
    </button>
  `;
}

function renderProfile() {
  const character = currentCharacter();
  const totals = getTotals(character);
  const race = getRace(character.raceId);
  const klass = getClass(character.classId);
  const affinity = getAffinity(character.affinityId);
  const title = activeTitle(character);
  const tabs = [
    ["overview", "Visão"],
    ["inventory", "Itens"],
    ["pets", "Pets"],
    ["powers", "Poderes"],
    ["history", "Histórico"],
    ["achievements", "Conquistas"],
  ];
  return `
    <div class="grid">
      <article class="panel span-12 profile-card-social">
        ${character.bannerUrl ? `<img class="profile-banner" style="object-position:${esc(objectPosition(character.bannerPosition))}" src="${esc(character.bannerUrl)}" alt="Banner do personagem" />` : ""}
        <div class="profile-grid">
          <div class="avatar-frame ${rarityClass(title?.rarity || "Comum")}" title="Moldura da raridade do título equipado">
            <img class="avatar" style="object-position:${esc(objectPosition(character.avatarPosition))}" src="${esc(character.avatarUrl || placeholderAvatar())}" alt="Avatar do personagem" />
            <span class="profile-online-dot ${isUserOnline(state.profile || {}) ? "online" : ""}" aria-label="${isUserOnline(state.profile || {}) ? "Online" : "Offline"}"></span>
          </div>
          <div>
            <div class="panel-heading">
              <div>
                <p class="eyebrow">${isUserOnline(state.profile || {}) ? "Online agora" : "Offline"} · ${esc(state.profile?.displayName || "Player")}</p>
                <h2>${esc(character.characterName || "Personagem sem nome")}</h2>
                <strong class="profile-title-line ${rarityClass(title?.rarity || "Comum")}">${esc(title?.name || "Sem título equipado")}</strong>
              </div>
              <div class="action-row">
                <button class="ghost-button" type="button" data-action="preview-profile-card">Prévia pública</button>
                <button class="ghost-button" type="button" data-action="copy-profile-card">Copiar cartão</button>
                <button class="ghost-button" type="button" data-action="toggle-profile-public">
                  ${character.profilePublic ? "Deixar privado" : "Deixar público"}
                </button>
              </div>
            </div>
            <p>${esc(race?.name)} · ${esc(klass?.name)} · ${esc(affinity?.name || "Sem afinidade")}</p>
            <p class="profile-description">${esc(character.characterDescription || "Sem descrição pública ainda.")}</p>
            <div class="profile-mini-stats">
              <span>PO ${Number(character.gold || 0).toLocaleString("pt-BR")}</span>
              <span>MC ${Number(character.millenniumCoins || 0).toLocaleString("pt-BR")}</span>
              <span>Energia ${currentGachaEnergy(character)}/${GACHA_ENERGY_MAX}</span>
              <span>Views ${state.profileViews.filter((view) => view.targetId === state.user?.uid).length}</span>
            </div>
            <div class="profile-social-line">
              <span>${(character.gachaVault || []).filter((item) => item.kind === "pet").length} companheiro(s) no cofre</span>
              <span>${(character.achievements || derivedAchievementIds(character).size)} conquista(s)</span>
              <span>${character.profilePublic ? "Cartão público" : "Cartão privado"}</span>
            </div>
            <div class="tag-row">
              ${(character.titles || []).map((title) => `<span class="tag">${esc(title.name)} · ${esc(title.rarity || "Título")}</span>`).join("") || `<span class="tag">Sem títulos</span>`}
            </div>
            <div class="token-row">${renderTokens(character.tokens || [])}</div>
          </div>
        </div>
      </article>
      <article class="panel span-12">
        <div class="tabs profile-tabs">
          ${tabs.map(([id, label]) => `<button class="tab ${state.profileTab === id ? "active" : ""}" type="button" data-action="profile-tab" data-tab="${id}">${label}</button>`).join("")}
        </div>
      </article>
      ${renderProfileTab(character, totals)}
      <article class="panel span-12">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Correio</p>
            <h3>Pedidos, presentes e convites</h3>
          </div>
          <span class="tag">${pendingIncomingRequests().length + (character.pendingGift ? 1 : 0)} pendente(s)</span>
        </div>
        <div class="mailbox-list">${renderMailbox()}</div>
      </article>
    </div>
  `;
}

function renderProfileTab(character, totals) {
  const tab = state.profileTab || "overview";
  if (tab === "inventory") {
    return `<article class="panel span-12"><div class="inventory-grid">${renderInventoryItems(character.inventory || [], true)}</div></article>`;
  }
  if (tab === "pets") {
    return `<article class="panel span-12"><div class="pet-grid">${renderPets(character.pets || [])}</div></article>`;
  }
  if (tab === "powers") {
    const powers = character.powers?.length ? character.powers : (character.power?.name ? [character.power] : []);
    return `
      <article class="panel span-6"><p class="eyebrow">Poderes</p><div class="list">${renderPowerRows(powers, "Nenhum poder aprovado.")}</div></article>
      <article class="panel span-6"><p class="eyebrow">Técnicas</p><div class="list">${renderPowerRows(character.techniques || [], "Nenhuma técnica aprovada.")}</div></article>
    `;
  }
  if (tab === "history") {
    const rewards = rewardHistoryFor(character).slice(0, 20);
    return `
      <article class="panel span-6"><p class="eyebrow">Giros recentes</p><div class="grimoire-list">${(character.rollHistory || []).slice(-12).reverse().map((roll) => `<div class="grimoire-row"><div><span>${esc(roll.rarity || "Comum")}</span><strong>${esc(roll.affinityName || roll.name || "Afinidade")}</strong><p>${esc(tsText(roll.createdAt))}</p></div></div>`).join("") || `<div class="empty-state">Sem histórico de giros.</div>`}</div></article>
      <article class="panel span-6"><p class="eyebrow">Recompensas</p><div class="grimoire-list">${rewards.map((item) => `<div class="grimoire-row"><div><span>${esc(item.type)}</span><strong>${esc(item.name)}</strong><p>${esc(item.detail)}</p></div></div>`).join("") || `<div class="empty-state">Sem recompensas registradas.</div>`}</div></article>
    `;
  }
  if (tab === "achievements") {
    return `<article class="panel span-12"><div class="achievement-grid">${renderAchievements(character)}</div></article>`;
  }
  return `
    <article class="panel span-4">
      <p class="eyebrow">Atributos</p>
      <div class="attribute-grid">${ATTRIBUTES.map((attr) => renderStat(attr.short, totals[attr.key])).join("")}${renderStat("DEF", totals.def)}</div>
    </article>
    <article class="panel span-4">
      <p class="eyebrow">História</p>
      <p>${esc(character.story || "Nenhuma história registrada.")}</p>
    </article>
    <article class="panel span-4">
      <p class="eyebrow">Personalidade</p>
      <p>${esc(character.personality || "Nenhuma personalidade registrada.")}</p>
    </article>
  `;
}

function renderPowerRows(items, emptyText) {
  return items.filter((item) => item?.name || item?.description).map((item) => `
    <div class="item-row">
      <span>${esc(item.status || "Aprovado")}</span>
      <strong>${esc(item.name || "Sem nome")}</strong>
      <p>${esc(item.description || "")}</p>
    </div>
  `).join("") || `<div class="empty-state">${emptyText}</div>`;
}

function rewardHistoryFor(character) {
  return [
    ...(character.titles || []).map((item) => ({ type: "Título", name: item.name, detail: item.rarity || "Título" })),
    ...(character.inventory || []).map((item) => ({ type: "Item", name: item.name, detail: item.rarity || "Comum" })),
    ...(character.pets || []).map((item) => ({ type: "Pet", name: item.name, detail: item.rarity || "Pet" })),
  ];
}

function derivedAchievementIds(character) {
  const approved = state.progressRequests.filter((request) => request.uid === character.ownerId && request.status === "aprovado");
  return new Set([
    approved.some((request) => request.type === "mission") ? "primeira-missao" : "",
    Number(character.totalRares || 0) > 0 || (character.inventory || []).some((item) => isRareReward(item.rarity)) || (character.titles || []).some((item) => isRareReward(item.rarity)) ? "primeiro-raro" : "",
    state.guilds.some((guild) => guild.leaderId === character.ownerId) ? "fundador-guilda" : "",
  ].filter(Boolean));
}

function renderAchievements(character) {
  const earned = derivedAchievementIds(character);
  return state.content.achievements.map((achievement) => `
    <div class="achievement-card ${earned.has(achievement.id) ? "earned" : ""}">
      <span>${earned.has(achievement.id) ? "Conquistado" : "Bloqueado"} · ${esc(achievement.rarity || "Comum")}</span>
      <strong>${esc(achievement.name)}</strong>
      <p>${esc(achievement.description || "")}</p>
    </div>
  `).join("") || `<div class="empty-state">Nenhuma conquista cadastrada.</div>`;
}

function renderMailbox() {
  const character = currentCharacter();
  const requests = pendingIncomingRequests();
  const gift = character.pendingGift;
  const rows = [];
  if (gift) {
    rows.push(`
      <div class="mail-row gift">
        <div>
          <span>Presente do Oráculo</span>
          <strong>${esc(gift.message || "Você recebeu uma recompensa.")}</strong>
          <p>${(gift.rewards || []).map(esc).join(" · ")}</p>
        </div>
        <button class="primary-button" type="button" data-action="claim-gift">Recebido</button>
      </div>
    `);
  }
  requests.forEach((request) => {
    const fromName = displayNameWithTitle(request.fromId, request.fromName || "Player");
    const requestLabel = request.type === "guildInvite" ? "Convite de guilda" : request.type === "guildJoinRequest" ? "Pedido para guilda" : "Pedido de amizade";
    const requestTitle = request.type === "guildInvite"
      ? `${fromName} convidou você para ${request.guildName || "uma guilda"}`
      : request.type === "guildJoinRequest"
        ? `${fromName} quer entrar em ${request.guildName || "sua guilda"}`
        : `${fromName} quer adicionar você`;
    rows.push(`
      <div class="mail-row">
        <div>
          <span>${esc(requestLabel)}</span>
          <strong>${esc(requestTitle)}</strong>
          <p>${esc(request.message || "")}</p>
        </div>
        <div class="action-row">
          <button class="primary-button" type="button" data-action="accept-social-request" data-request-id="${esc(request.id)}">Aceitar</button>
          <button class="ghost-button" type="button" data-action="decline-social-request" data-request-id="${esc(request.id)}">Recusar</button>
        </div>
      </div>
    `);
  });
  return rows.join("") || `<div class="empty-state">Nenhum pedido pendente.</div>`;
}

function renderCharacterForm() {
  const character = currentCharacter();
  const draft = state.characterDraft || null;
  const locked = character.creationLocked || Boolean(character.characterName && character.raceId && character.classId);
  const visibleBase = Object.fromEntries(ATTRIBUTES.map((attr) => [attr.key, Number(draftValue(draft, `base_${attr.key}`, character.base?.[attr.key] || 0))]));
  const spent = ATTRIBUTES.reduce((sum, attr) => sum + Number(visibleBase[attr.key] || 0), 0);
  const totalPoints = 20 + Number(character.freePoints || 0);
  const remaining = totalPoints - spent;
  return `
    <form class="grid" data-form="character">
      <article class="panel span-12">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Ficha editável pelo Player</p>
            <h2>Identidade</h2>
          </div>
          <span class="tag">${locked ? "Base travada" : "Primeiro salvamento trava a base"}</span>
          <button class="primary-button" type="submit">Salvar ficha</button>
        </div>
        <div class="form-grid">
          <label><span>Nome do player</span><input name="playerName" value="${esc(draftValue(draft, "playerName", character.playerName || ""))}" /></label>
          <label><span>Nome do personagem</span><input name="characterName" value="${esc(draftValue(draft, "characterName", character.characterName || ""))}" /></label>
          <label><span>Idade do personagem</span><input name="characterAge" type="number" inputmode="numeric" min="0" step="1" value="${esc(draftValue(draft, "characterAge", character.characterAge || ""))}" /></label>
          ${mediaInput("avatarUrl", "Avatar ou GIF do personagem", draftValue(draft, "avatarUrl", character.avatarUrl || ""), { hint: "A imagem aparece circular no perfil público." })}
          ${mediaInput("bannerUrl", "Banner animado do perfil", draftValue(draft, "bannerUrl", character.bannerUrl || ""), { hint: "Use imagem larga ou GIF para o topo do perfil." })}
          ${positionSelect("avatarPosition", "Enquadramento do avatar", draftValue(draft, "avatarPosition", character.avatarPosition || "center"))}
          ${positionSelect("bannerPosition", "Enquadramento do banner", draftValue(draft, "bannerPosition", character.bannerPosition || "center"))}
          <label><span>Raça</span><select name="raceId" ${locked ? "disabled" : ""}>${optionList(state.content.races, draftValue(draft, "raceId", character.raceId))}</select>${locked ? `<input type="hidden" name="raceId" value="${esc(character.raceId)}" />` : ""}</label>
          <label><span>Classe</span><select name="classId" ${locked ? "disabled" : ""}>${optionList(state.content.classes, draftValue(draft, "classId", character.classId))}</select>${locked ? `<input type="hidden" name="classId" value="${esc(character.classId)}" />` : ""}</label>
          <label class="wide"><span>Descrição do personagem</span><textarea name="characterDescription" rows="4">${esc(draftValue(draft, "characterDescription", character.characterDescription || ""))}</textarea></label>
          <label class="wide"><span>História</span><textarea name="story" rows="5">${esc(draftValue(draft, "story", character.story || ""))}</textarea></label>
          <label class="wide"><span>Personalidade</span><textarea name="personality" rows="4">${esc(draftValue(draft, "personality", character.personality || ""))}</textarea></label>
        </div>
      </article>
      <article class="panel span-6">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Atributos livres</p>
            <h3>${remaining} ponto(s) restante(s)</h3>
          </div>
        </div>
        ${locked ? `<p class="hint">Atributos travados contra redução. Ao upar, você só adiciona os novos pontos.</p>` : ""}
        <div class="form-grid">
          ${ATTRIBUTES.map((attr) => `
            <label>
              <span>${attr.label} (${attr.short})</span>
              <input name="base_${attr.key}" type="number" min="${locked ? Number(character.base?.[attr.key] || 0) : 0}" value="${Number(visibleBase[attr.key] || 0)}" />
            </label>
          `).join("")}
        </div>
      </article>
      <article class="panel span-6">
        <p class="eyebrow">Poder e técnica aprovados</p>
        <div class="list">
          <div class="item-row">
            <span>Poder</span>
            <strong>${esc(character.power?.name || "Nenhum poder aprovado")}</strong>
            <p>${esc(character.power?.description || "Envie uma criação pela aba Missões para o Oráculo analisar.")}</p>
          </div>
          <div class="item-row">
            <span>Técnica</span>
            <strong>${esc(character.techniques?.[0]?.name || "Nenhuma técnica aprovada")}</strong>
            <p>${esc(character.techniques?.[0]?.description || "Técnicas novas também passam por análise e nerf.")}</p>
          </div>
          <button class="ghost-button" type="button" data-nav="missions">Enviar criação para análise</button>
        </div>
      </article>
    </form>
  `;
}

function renderRoulette() {
  const character = currentCharacter();
  const attempts = Number(character.affinityAttempts ?? state.settings.defaultAffinityAttempts ?? 0);
  const affinity = getAffinity(character.affinityId);
  const category = affinity ? getCategory(affinity.categoryId) : null;
  const rollText = state.rolling ? "Girando..." : state.lastRoll?.name || affinity?.name || "?";
  const pityMax = Number(state.settings.pityMax || 30);
  const pity = Number(character.pityCounter || 0);
  const canRollOne = !state.rolling && attempts >= 1;
  const canRollTen = !state.rolling && attempts >= 10;
  const results = state.lastRollResults || [];
  const choices = state.affinityChoices || [];
  return `
    <div class="grid">
      <article class="panel span-12">
        <div class="roulette-stage">
          ${state.settings.eventActive ? `
            <div class="event-banner">
              <span>Evento ativo</span>
              <strong>${esc(state.settings.eventName || "Banner especial")}</strong>
              <small>${esc(state.content.affinityCategories.find((cat) => cat.id === state.settings.bannerRateUp)?.name || "Rate-up configurável")}</small>
            </div>
          ` : ""}
          <div class="stat-grid roulette-stats">
            ${renderStat("Essências", attempts)}
            ${renderStat("Pity", `${pity}/${pityMax}`)}
            ${renderStat("Giros", character.totalRolls || 0)}
            ${renderStat("Prestígio", prestigeFor(character))}
          </div>
          <div class="meter-block roulette-meter">${renderPityBar(pity, pityMax)}</div>
          <div class="roulette-ring ${state.rolling ? "spinning" : ""}">
            <div class="roulette-core" id="rouletteCore">${esc(rollText)}</div>
          </div>
          <div class="roulette-actions">
            <button class="primary-button" type="button" data-action="roll-affinity" data-qty="1" ${canRollOne ? "" : "disabled"}>Girar 1x</button>
            <button class="primary-button intense" type="button" data-action="roll-affinity" data-qty="10" ${canRollTen ? "" : "disabled"}>Girar 10x</button>
          </div>
          <div class="roulette-card ${state.lastRoll ? (isRareReward(getCategory(state.lastRoll.categoryId)?.rarity) ? "rare" : "good") : ""}">
            <p class="eyebrow">Resultado atual</p>
            <h2>${esc(affinity?.name || "Nenhuma afinidade definida")}</h2>
            <p>${affinity ? `${esc(category?.name)} · ${esc(category?.rarity)} · ${esc(bonusToText(affinity.bonus))}` : "A afinidade só aparece depois do giro."}</p>
            <p>${esc(affinity?.passive || "")}</p>
          </div>
          ${choices.length ? `
            <div class="choice-panel">
              <div>
                <p class="eyebrow">Escolha de afinidade</p>
                <h3>Você tirou opções da mesma raridade</h3>
                <p>Escolha qual afinidade ficará registrada na sua ficha. Nada menor substitui algo mais raro.</p>
              </div>
              <div class="choice-grid">
                ${choices.map((choice) => `
                  <button class="choice-card" type="button" data-action="choose-affinity" data-affinity-id="${esc(choice.affinityId)}">
                    <span class="${rarityClass(choice.rarity)}">${esc(choice.rarity || "Comum")}${choice.current ? " · atual" : ""}</span>
                    <strong>${esc(choice.name)}</strong>
                    <small>${esc(choice.categoryName || "Categoria")} · ${esc(choice.bonus || "Sem bônus")}</small>
                  </button>
                `).join("")}
              </div>
            </div>
          ` : ""}
          <div class="roll-results">
            ${results.length ? results.map((result) => `
              <div class="result-card ${result.rare ? "rare" : ""}">
                <span class="${rarityClass(result.category?.rarity)}">${esc(result.category?.rarity || "Comum")}${result.forced ? " · pity" : ""}</span>
                <strong>${esc(result.affinity?.name || "Afinidade")}</strong>
                <p>${esc(result.category?.name || "Categoria")} · ${esc(bonusToText(result.affinity?.bonus || {}))}</p>
              </div>
            `).join("") : `<div class="empty-state">Os resultados do próximo giro aparecem aqui.</div>`}
          </div>
        </div>
      </article>
    </div>
  `;
}

function gachaCost(type = "pets", qty = 1) {
  const one = type === "items" ? 120 : 100;
  return qty >= 10 ? one * 9 : one;
}

function renderGacha() {
  const character = currentCharacter();
  const type = state.gachaTab === "items" ? "items" : "pets";
  const banner = activeGachaBanner(type);
  const costOne = gachaCost(type, 1);
  const costTen = gachaCost(type, 10);
  const coins = Number(character.millenniumCoins || 0);
  return `
    <div class="grid gacha-view">
      <article class="panel span-12 gacha-hero">
        <div>
          <p class="eyebrow">Invocação dimensional</p>
          <h2>${type === "pets" ? "Companheiros do Despertar" : "Relíquias do Oráculo"}</h2>
          <p>Essência fica apenas para afinidade. Pets, itens e cosméticos usam Millennium Coins, sem pity, com estrelas, Radiante e fragmentos para tudo continuar valendo.</p>
          <div class="tag-row">
            <span class="tag">${coins.toLocaleString("pt-BR")} Millennium Coins</span>
            <span class="tag">Banner muda ${esc(banner.endsAt.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }))}</span>
            <span class="tag">Secret rate-up: 0,10%</span>
          </div>
        </div>
        <div class="gacha-orb ${state.rolling ? "spinning" : ""}">
          <span>${state.rolling ? "Invocando" : "Oráculo"}</span>
        </div>
      </article>

      <article class="panel span-12">
        <div class="tabs">
          <button class="tab ${type === "pets" ? "active" : ""}" type="button" data-action="gacha-tab" data-tab="pets">Pets</button>
          <button class="tab ${type === "items" ? "active" : ""}" type="button" data-action="gacha-tab" data-tab="items">Itens</button>
        </div>
        <div class="gacha-actions">
          <button class="primary-button intense" type="button" data-action="invoke-gacha" data-kind="${esc(type)}" data-qty="1" ${coins >= costOne && !state.rolling ? "" : "disabled"}>Invocar 1x · ${costOne}</button>
          <button class="primary-button" type="button" data-action="invoke-gacha" data-kind="${esc(type)}" data-qty="10" ${coins >= costTen && !state.rolling ? "" : "disabled"}>Invocar 10x · ${costTen}</button>
        </div>
      </article>

      <article class="panel span-5">
        <div class="panel-heading"><div><p class="eyebrow">Rate-up da hora</p><h3>Destaques do banner</h3></div></div>
        <div class="featured-gacha">
          ${banner.featured.map((item) => `
            <div class="featured-card ${rarityClass(item.rarity)}">
              <span>${esc(item.rarity)}</span>
              <strong>${esc(item.name)}</strong>
              <p>${esc(item.trait || item.effect || item.description || "")}</p>
            </div>
          `).join("") || `<div class="empty-state">Sem destaques desta raridade ainda.</div>`}
        </div>
      </article>

      <article class="panel span-7">
        <div class="panel-heading"><div><p class="eyebrow">Resultado</p><h3>Últimas invocações</h3></div></div>
        <div class="gacha-results">
          ${(state.lastGachaResults || []).map((item) => `
            <div class="result-card ${rarityClass(item.rarity)} ${item.shiny ? "shiny" : ""}">
              <span>${esc(item.rarity)}${item.shiny ? " · Radiante" : ""}</span>
              <strong>${esc(item.name)}</strong>
              <p>${"★".repeat(Number(item.stars || 1))} · Poder ${instancePower(item)} · ${esc(item.trait || item.description || "")}</p>
            </div>
          `).join("") || `<div class="empty-state">A próxima invocação aparece aqui com cor, raridade e estrelas.</div>`}
        </div>
      </article>

      <article class="panel span-12">
        <div class="panel-heading"><div><p class="eyebrow">Cofre dimensional</p><h3>Sua coleção invocada</h3></div><span class="tag">${(character.gachaVault || []).length} registro(s)</span></div>
        <div class="gacha-vault">${renderGachaVault(character.gachaVault || [])}</div>
      </article>
    </div>
  `;
}

function difficultyById(id) {
  return GACHA_DIFFICULTIES.find((item) => item.id === id) || GACHA_DIFFICULTIES[1];
}

function freePetsForActivity(character = currentCharacter()) {
  return (character.gachaVault || []).filter((item) => item.kind === "pet" && !petBusy(item));
}

function renderDifficultyTabs() {
  return `<div class="difficulty-row">${GACHA_DIFFICULTIES.map((difficulty) => `
    <button class="difficulty-chip ${state.minigameDifficulty === difficulty.id ? "active" : ""}" type="button" data-action="minigame-difficulty" data-difficulty="${esc(difficulty.id)}">
      ${esc(difficulty.name)} <small>${difficulty.cost} energia</small>
    </button>
  `).join("")}</div>`;
}

function renderActivities(character = currentCharacter()) {
  const activities = character.activeActivities || [];
  if (!activities.length) return `<div class="empty-state">Nenhum pet em atividade. Envie um companheiro para uma incursão ou partida.</div>`;
  return activities.map((activity) => {
    const remaining = Math.max(0, dateFromValue(activity.endsAt)?.getTime() - Date.now());
    const ready = remaining <= 0;
    return `
      <div class="activity-card ${ready ? "ready" : ""}">
        <div>
          <span>${esc(activity.type)} · ${esc(activity.difficultyName)}</span>
          <strong>${esc(activity.petName)}</strong>
          <p>${esc(activity.mapName || activity.biome || "Campo aberto")} · ${ready ? "Pronto para coleta" : `Restam ${Math.ceil(remaining / 60000)} min`} · Risco ${Math.round(Number(activity.risk || 0) * 100)}% · Loot parcial: ${(activity.loot || []).join(", ") || "em busca"}</p>
        </div>
        <div class="action-row">
          <button class="primary-button" type="button" data-action="collect-activity" data-activity-id="${esc(activity.id)}" ${ready ? "" : "disabled"}>Coletar</button>
          <button class="ghost-button" type="button" data-action="cancel-activity" data-activity-id="${esc(activity.id)}">Retornar agora</button>
        </div>
      </div>
    `;
  }).join("");
}

function renderMinigames() {
  const character = currentCharacter();
  const energy = currentGachaEnergy(character);
  const difficulty = difficultyById(state.minigameDifficulty);
  const freePets = freePetsForActivity(character);
  const petOptions = freePets.map((pet) => `<option value="${esc(pet.instanceId)}">${esc(pet.name)} · ${esc(pet.rarity)} · ${"★".repeat(Number(pet.stars || 1))}</option>`).join("");
  const recentRuns = (character.minigameHistory || []).slice(0, 6);
  return `
    <div class="grid minigame-view">
      <article class="panel span-12 minigame-hero">
        <div>
          <p class="eyebrow">Jogos do Oráculo</p>
          <h2>Esforço sempre avança</h2>
          <p>Minigames usam energia diária, têm dificuldades próprias, ranking por modo e drops de temporada. Sorte pode acelerar; dedicação nunca volta vazia.</p>
        </div>
        <div class="stat-grid compact-stat-grid">
          ${renderStat("Energia", `${energy}/${GACHA_ENERGY_MAX}`)}
          ${renderStat("Coins", character.millenniumCoins || 0)}
          ${renderStat("Pets livres", freePets.length)}
          ${renderStat("Atividades", (character.activeActivities || []).length)}
        </div>
      </article>

      <article class="panel span-12">
        ${renderDifficultyTabs()}
      </article>

      <article class="panel span-4">
        <div class="panel-heading"><div><p class="eyebrow">Skill</p><h3>Prova da Mira</h3></div></div>
        <p>Alvos rápidos, bônus raros, congelamento e pontuação por reflexo. Ideal para mobile e PC.</p>
        <button class="primary-button intense" type="button" data-action="start-aim-game" data-difficulty="${esc(difficulty.id)}" ${energy >= difficulty.cost ? "" : "disabled"}>Jogar · ${difficulty.cost} energia</button>
      </article>

      <article class="panel span-4">
        <div class="panel-heading"><div><p class="eyebrow">Estratégia</p><h3>Pet Hunt</h3></div></div>
        <p class="risk-line">Risco atual: ${Math.round(difficulty.risk * 100)}% · Duração base: ${Math.round(8 + difficulty.cost * 7)} min · pets raros reduzem perigo.</p>
        <form class="form-stack compact-form" data-form="pet-hunt">
          <label><span>Pet</span><select name="petId" ${freePets.length ? "" : "disabled"}>${petOptions || `<option>Nenhum pet livre</option>`}</select></label>
          <label><span>Destino</span><select name="biome">${(state.content.biomes || []).map((biome) => `<option value="${esc(biome.id)}">${esc(biome.name)}</option>`).join("")}</select></label>
          <input type="hidden" name="difficulty" value="${esc(difficulty.id)}" />
          <button class="primary-button" ${energy >= difficulty.cost && freePets.length ? "" : "disabled"}>Enviar Hunt · ${difficulty.cost} energia</button>
        </form>
      </article>

      <article class="panel span-4">
        <div class="panel-heading"><div><p class="eyebrow">Tático</p><h3>Tower Defense</h3></div></div>
        <p class="risk-line">Protótipo tático: pontua por dano, alcance, estrelas, mapa e dificuldade enquanto a versão jogável é preparada.</p>
        <form class="form-stack compact-form" data-form="tower-defense">
          <label><span>Pet</span><select name="petId" ${freePets.length ? "" : "disabled"}>${petOptions || `<option>Nenhum pet livre</option>`}</select></label>
          <label><span>Mapa</span><select name="mapId">${(state.content.towerMaps || []).map((map) => `<option value="${esc(map.id)}">${esc(map.name)} · ${esc(map.difficulty)}</option>`).join("")}</select></label>
          <input type="hidden" name="difficulty" value="${esc(difficulty.id)}" />
          <button class="primary-button" ${energy >= difficulty.cost && freePets.length ? "" : "disabled"}>Iniciar partida · ${difficulty.cost} energia</button>
        </form>
      </article>

      <article class="panel span-7">
        <div class="panel-heading"><div><p class="eyebrow">Companheiros em campo</p><h3>Atividades simultâneas</h3></div></div>
        <div class="activity-list">${renderActivities(character)}</div>
      </article>

      <article class="panel span-5">
        <div class="panel-heading"><div><p class="eyebrow">Lojas de fragmentos</p><h3>Temporada do Despertar</h3></div></div>
        <div class="shop-list">
          ${(state.content.gachaShardShops || []).map((item) => `
            <div class="shop-card ${rarityClass(item.rarity)}">
              <span>${esc(item.shop)} · ${Number(item.cost || 0)}</span>
              <strong>${esc(item.name)}</strong>
              <p>${esc(item.type || "Recompensa")} · ${esc(item.description || "")}</p>
              <button class="ghost-button" type="button" data-action="redeem-shard-shop" data-shop-id="${esc(item.id)}">Trocar fragmentos</button>
            </div>
          `).join("") || `<div class="empty-state">Nenhuma loja publicada.</div>`}
        </div>
      </article>
      <article class="panel span-12">
        <div class="panel-heading"><div><p class="eyebrow">Histórico</p><h3>Últimas runs</h3></div><span class="tag">Rank por desempenho</span></div>
        <div class="run-history">
          ${recentRuns.map((run) => `
            <div class="run-card">
              <span>${esc(run.difficultyName || run.difficultyId)} · ${esc(run.mode)}</span>
              <strong>Rank ${esc(run.grade || "-")} · ${Number(run.score || 0)} pts</strong>
              <p>${Number(run.coins || 0)} MC · ${Number(run.fragments || 0)} ${esc(run.fragmentName || "fragmentos")}</p>
            </div>
          `).join("") || `<div class="empty-state compact">Jogue uma partida para registrar seu primeiro resultado.</div>`}
        </div>
      </article>
    </div>
  `;
}

function renderInventory() {
  const character = currentCharacter();
  const energy = currentGachaEnergy(character);
  return `
    <div class="grid">
      <article class="panel span-12">
        <div class="stat-grid">
          ${renderStat("Peças de Ouro", character.gold || 0)}
          ${renderStat("Millennium Coins", character.millenniumCoins || 0)}
          ${renderStat("Energia", `${energy}/${GACHA_ENERGY_MAX}`)}
          ${renderStat("Essências", character.affinityAttempts ?? state.settings.defaultAffinityAttempts)}
          ${renderStat("XP", character.xp || 0)}
          ${renderStat("Nível", character.level || levelFromXp(character.xp || 0))}
          ${renderStat("Cofre", (character.gachaVault || []).length)}
          ${renderStat("Títulos", (character.titles || []).length)}
        </div>
      </article>
      <article class="panel span-7">
        <div class="panel-heading"><div><p class="eyebrow">Inventário</p><h3>Itens do personagem</h3></div></div>
        <div class="inventory-grid">${renderInventoryItems(character.inventory || [], true)}</div>
      </article>
      <article class="panel span-5">
        <p class="eyebrow">Cofre invocado</p>
        <div class="tabs compact-tabs">
          ${["all", "pet", "item"].map((tab) => `<button class="tab ${state.vaultTab === tab ? "active" : ""}" type="button" data-action="vault-tab" data-tab="${tab}">${tab === "all" ? "Todos" : tab === "pet" ? "Pets" : "Itens"}</button>`).join("")}
        </div>
        <div class="gacha-vault compact">${renderGachaVault((character.gachaVault || []).filter((item) => state.vaultTab === "all" || item.kind === state.vaultTab), { compact: true })}</div>
      </article>
      <article class="panel span-12">
        <p class="eyebrow">Títulos e pets exibidos no perfil</p>
        <div class="list">
          ${(character.titles || []).map((title) => `<div class="item-row"><strong>${esc(title.name)}</strong><span>${esc(title.rarity || "Título")}</span></div>`).join("") || `<div class="empty-state">Sem títulos.</div>`}
          ${renderPets(character.pets || [])}
        </div>
      </article>
    </div>
  `;
}

function renderInventoryItems(items, withEquip) {
  if (!items.length) return `<div class="empty-state">Nenhum item registrado.</div>`;
  return items.map((item) => `
    <div class="item-row">
      <span>${esc(item.rarity || "Comum")}</span>
      <strong>${esc(item.name)}</strong>
      <p>${esc(bonusToText(item.bonus || {}))}</p>
      ${withEquip ? `<div class="action-row"><button class="ghost-button" type="button" data-action="compare-item" data-item-instance="${esc(item.instanceId || item.id)}">Comparar</button><button class="ghost-button" type="button" data-action="toggle-equip" data-item-instance="${esc(item.instanceId || item.id)}">${item.equipped ? "Desequipar" : "Equipar"}</button></div>` : ""}
    </div>
  `).join("");
}

function renderPets(pets) {
  if (!pets.length) return `<div class="empty-state">Nenhum pet exibido.</div>`;
  return pets.map((pet) => `
    <div class="pet-card ${rarityClass(pet.rarity)}">
      ${pet.imageUrl ? `<img class="pet-image" src="${esc(pet.imageUrl)}" alt="${esc(pet.name)}" />` : `<div class="pet-image placeholder">PET</div>`}
      <strong>${esc(pet.name)}</strong>
      <p>${esc(pet.rarity || "Pet")} ${pet.stars ? `· ${"★".repeat(Math.min(MAX_GACHA_STARS, Number(pet.stars || 1)))}` : ""}</p>
    </div>
  `).join("");
}

function renderGachaVault(items, options = {}) {
  if (!items.length) return `<div class="empty-state">Nada no cofre ainda. Faça invocações para encher esta coleção.</div>`;
  return items.map((item) => {
    const busy = petBusy(item);
    const recoveryCost = petRecoveryCost(item);
    return `
      <article class="vault-card ${rarityClass(item.rarity)} ${item.shiny ? "shiny" : ""}">
        <div class="vault-art">${item.imageUrl ? `<img src="${esc(item.imageUrl)}" alt="${esc(item.name)}" />` : `<span>${esc(item.kind === "pet" ? "PET" : "ITEM")}</span>`}</div>
        <div class="vault-body">
          <span>${esc(item.rarity || "Comum")} ${item.shiny ? "· Radiante" : ""}</span>
          <h3>${esc(item.name)}</h3>
          <p>${esc(item.trait || item.description || "Sem efeito registrado.")}</p>
          <div class="tag-row">
            <span class="tag">${"★".repeat(Math.max(1, Math.min(MAX_GACHA_STARS, Number(item.stars || 1))))}</span>
            <span class="tag">Poder ${instancePower(item)}</span>
            <span class="tag">${esc(item.status || "Livre")}</span>
          </div>
          ${options.compact ? "" : `<small>${esc(bonusToText(scaledBonus(item)))} · ${esc(item.archetype || item.category || "Coleção")}</small>`}
          <div class="action-row">
            <button class="ghost-button" type="button" data-action="toggle-vault-equip" data-instance-id="${esc(item.instanceId)}" ${busy ? "disabled" : ""}>${item.equipped ? "Desequipar" : "Equipar"}</button>
            <button class="ghost-button" type="button" data-action="fuse-vault-item" data-instance-id="${esc(item.instanceId)}" ${Number(item.stars || 1) >= MAX_GACHA_STARS || busy ? "disabled" : ""}>Fundir</button>
            <button class="ghost-button" type="button" data-action="send-vault-main" data-instance-id="${esc(item.instanceId)}" ${item.exported ? "disabled" : ""}>Inventário</button>
            ${item.kind === "pet" && recoveryCost ? `<button class="ghost-button" type="button" data-action="recover-pet" data-instance-id="${esc(item.instanceId)}">Recuperar · ${recoveryCost} MC</button>` : ""}
            <button class="ghost-button danger" type="button" data-action="shard-vault-item" data-instance-id="${esc(item.instanceId)}" ${item.locked || busy ? "disabled" : ""}>Desfazer</button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function renderTokens(tokens) {
  if (!tokens.length) return `<span class="token-chip muted">Sem tokens</span>`;
  return tokens.map((token) => `
    <span class="token-chip ${rarityClass(token.rarity)}" title="${esc(token.description || token.name)}">
      ${token.imageUrl ? `<img src="${esc(token.imageUrl)}" alt="${esc(token.name)}" />` : `<b>${esc(token.icon || String(token.name || "T").slice(0, 1))}</b>`}
      <small>${esc(token.name)}</small>
    </span>
  `).join("");
}

function renderGrimoire() {
  const character = currentCharacter();
  const title = activeTitle(character);
  const history = [...(character.rollHistory || [])].slice(-30).reverse();
  return `
    <div class="grid">
      <article class="panel span-12">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Arquivo pessoal</p>
            <h2>${esc(character.characterName || "Personagem sem nome")}</h2>
          </div>
          <span class="tag">${title ? `Título ativo: ${esc(title.name)}` : "Sem título ativo"}</span>
        </div>
        <div class="stat-grid">
          ${renderStat("Prestígio", prestigeFor(character))}
          ${renderStat("Títulos", (character.titles || []).length)}
          ${renderStat("Raros", character.totalRares || 0)}
          ${renderStat("Giros", character.totalRolls || 0)}
        </div>
      </article>
      <article class="panel span-6">
        <div class="panel-heading"><div><p class="eyebrow">Títulos</p><h3>Escolha o destaque do perfil</h3></div></div>
        <div class="grimoire-list">
          ${(character.titles || []).map((item) => `
            <div class="grimoire-row ${item.id === character.activeTitleId ? "active" : ""}">
              <div>
                <span class="${rarityClass(item.rarity)}">${esc(item.rarity || "Título")}</span>
                <strong>${esc(item.name)}</strong>
              </div>
              <button class="ghost-button" type="button" data-action="equip-title" data-title-id="${esc(item.id || slug(item.name))}">${item.id === character.activeTitleId ? "Ativo" : "Equipar"}</button>
            </div>
          `).join("") || `<div class="empty-state">Nenhum título recebido ainda.</div>`}
        </div>
      </article>
      <article class="panel span-6">
        <div class="panel-heading"><div><p class="eyebrow">Histórico</p><h3>Últimos giros</h3></div></div>
        <div class="grimoire-list">
          ${history.map((roll) => `
            <div class="grimoire-row ${roll.rare ? "rare" : ""}">
              <div>
                <span class="${rarityClass(roll.rarity)}">${esc(roll.rarity || "Comum")}</span>
                <strong>${esc(roll.affinityName || roll.name || "Afinidade")}</strong>
                <p>${esc(roll.categoryName || "Categoria")} · ${esc(tsText(roll.createdAt))}</p>
              </div>
            </div>
          `).join("") || `<div class="empty-state">Nenhum giro registrado neste grimório.</div>`}
        </div>
      </article>
      <article class="panel span-6">
        <p class="eyebrow">Pets</p>
        <div class="list">${renderPets(character.pets || [])}</div>
      </article>
      <article class="panel span-6">
        <p class="eyebrow">Itens em vitrine</p>
        <div class="inventory-grid">${renderInventoryItems((character.inventory || []).slice(0, 6), false)}</div>
      </article>
    </div>
  `;
}

function renderRanking() {
  const tabs = [
    ["prestige", "Prestígio"],
    ["level", "Nível"],
    ["gold", "PO"],
    ["coins", "Millennium"],
    ["affinity", "Afinidades"],
    ["missions", "Missões"],
    ["rolls", "Giros"],
    ["aim", "Mira"],
    ["hunt", "Pet Hunt"],
    ["tower", "Tower"],
    ["pets", "Pets"],
    ["items", "Itens"],
    ["guilds", "Guildas"],
    ["views", "Perfis"],
    ["achievements", "Conquistas"],
    ["pass", "Passe"],
    ["collection", "Coleções"],
    ["secrets", "Secret+"],
  ];
  const tab = state.rankingTab || "prestige";
  const range = state.rankingRange || "season";
  const rows = rankRows(tab, range).slice(0, 30);
  return `
    <div class="grid">
      <article class="panel span-12">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Ranking</p>
            <h2>Ranks vivos de Millennium</h2>
          </div>
          <span class="tag">${range === "daily" ? "Últimas 24h" : range === "weekly" ? "Últimos 7 dias" : range === "all" ? "Todos os tempos" : "Temporada atual"}</span>
        </div>
        <div class="tabs codex-tabs">${tabs.map(([id, label]) => `<button class="tab ${tab === id ? "active" : ""}" type="button" data-action="ranking-tab" data-tab="${id}">${label}</button>`).join("")}</div>
        <div class="ranking-range-row" role="group" aria-label="Período do ranking">
          ${[["daily", "Diário"], ["weekly", "Semanal"], ["season", "Temporada"], ["all", "Todos"]].map(([id, label]) => `<button class="range-chip ${range === id ? "active" : ""}" type="button" data-action="ranking-range" data-range="${id}">${label}</button>`).join("")}
        </div>
        <div class="ranking-list">
          ${rows.map((row, index) => {
            const char = row.character || {};
            const title = activeTitle(char);
            const affinity = getAffinity(char.affinityId);
            return `
              <div class="ranking-row ${row.uid === state.user?.uid || char.ownerId === state.user?.uid ? "self" : ""}">
                <strong class="ranking-place">#${index + 1}</strong>
                <div>
                  <h3>${esc(row.name || char.characterName || char.displayName || getUserName(char.ownerId || row.uid))}</h3>
                  <p>${esc(row.detail || `${title ? title.name : "Sem título"} · ${affinity?.name || "Sem afinidade"}`)}</p>
                </div>
                <div class="ranking-score">
                  <strong>${esc(row.scoreText || row.score)}</strong>
                  <span>${esc(row.sub || "pontos")}</span>
                </div>
              </div>
            `;
          }).join("") || `<div class="empty-state">Nenhum personagem público no ranking.</div>`}
        </div>
      </article>
    </div>
  `;
}

function rankingRangeStart(range) {
  if (range === "daily") return Date.now() - 24 * 60 * 60 * 1000;
  if (range === "weekly") return Date.now() - 7 * 24 * 60 * 60 * 1000;
  return 0;
}

function isWithinRankingRange(item, range, field = "createdAt") {
  const start = rankingRangeStart(range);
  return !start || timeValue(item?.[field]) >= start;
}

function rankRows(tab, range = "season") {
  const chars = [...state.characters].filter((char) => char.profilePublic !== false);
  const byChar = (score, sub = "pontos", detailFn = null) => chars
    .map((character) => ({
      uid: character.ownerId,
      character,
      name: character.characterName || character.displayName || getUserName(character.ownerId),
      score: Math.round(Number(score(character) || 0)),
      scoreText: Math.round(Number(score(character) || 0)).toLocaleString("pt-BR"),
      sub,
      detail: detailFn ? detailFn(character) : "",
    }))
    .filter((row) => row.score > 0 || ["prestige", "level"].includes(tab))
    .sort((a, b) => b.score - a.score);

  const runs = (char, mode) => (char.minigameHistory || []).filter((run) => run.mode === mode && isWithinRankingRange(run, range));
  const bestRun = (char, mode) => Math.max(0, ...runs(char, mode).map((run) => Number(run.score || 0)));
  const approved = (char) => state.progressRequests.filter((request) => request.uid === char.ownerId && request.status === "aprovado" && isWithinRankingRange(request, range, "reviewedAt"));
  const rollCount = (char) => [...(char.rollHistory || []), ...(char.gachaHistory || [])].filter((roll) => isWithinRankingRange(roll, range)).length;
  const collectionItems = (char) => (char.gachaVault || []).filter((item) => isWithinRankingRange(item, range, "obtainedAt"));

  if (tab === "level") return byChar((char) => Number(char.level || levelFromXp(char.xp || 0)), "nível");
  if (tab === "gold") return byChar((char) => Number(char.gold || 0), "PO");
  if (tab === "coins") return byChar((char) => Number(char.millenniumCoins || 0), "MC");
  if (tab === "affinity") return byChar((char) => rarityScore(getCategory(getAffinity(char.affinityId)?.categoryId)?.rarity || "Quebrado"), "raridade", (char) => getAffinity(char.affinityId)?.name || "Sem afinidade");
  if (tab === "missions") return byChar((char) => approved(char).filter((request) => ["mission", "guildMission", "training"].includes(request.type)).length, "aprovações", (char) => `${approved(char).length} validação(ões) no período`);
  if (tab === "rolls") return byChar(rollCount, "giros", (char) => `${Number(char.totalRares || 0)} raros registrados`);
  if (tab === "aim") return byChar((char) => range === "all" || range === "season" ? Number(char.minigameStats?.aim?.bestScore || 0) : bestRun(char, "aim"), "melhor score");
  if (tab === "hunt") return byChar((char) => range === "all" || range === "season" ? Number(char.minigameStats?.hunt?.bestScore || 0) : bestRun(char, "hunt"), "melhor score");
  if (tab === "tower") return byChar((char) => range === "all" || range === "season" ? Number(char.minigameStats?.tower?.bestScore || 0) : bestRun(char, "tower"), "melhor score");
  if (tab === "pets") return byChar((char) => Math.max(0, ...(char.gachaVault || []).filter((item) => item.kind === "pet").map(instancePower)), "poder pet");
  if (tab === "items") return byChar((char) => Math.max(0, ...(char.gachaVault || []).filter((item) => item.kind === "item").map(instancePower)), "poder item");
  if (tab === "views") return byChar((char) => state.profileViews.filter((view) => view.targetId === char.ownerId).length, "visualizações");
  if (tab === "achievements") return byChar((char) => derivedAchievementIds(char).size, "conquistas");
  if (tab === "pass") return byChar((char) => Number(char.level || levelFromXp(char.xp || 0)), "níveis do passe", (char) => char.premiumPassUnlocked ? "Premium ativo" : "Trilha Free");
  if (tab === "collection") return byChar((char) => collectionItems(char).length || (range === "all" || range === "season" ? (char.gachaVault || []).length : 0), "registros no cofre");
  if (tab === "secrets") return byChar((char) => collectionItems(char).filter((item) => rarityScore(item.rarity) >= rarityScore("Celestial")).length || ((range === "all" || range === "season") ? (char.gachaVault || []).filter((item) => rarityScore(item.rarity) >= rarityScore("Celestial")).length : 0), "Celestial/Secret");
  if (tab === "guilds") {
    return [...state.guilds].map((guild) => ({
      uid: guild.leaderId,
      name: guild.name,
      score: Number(guild.level || 1) * 100 + Number(guild.xp || 0) + (guild.memberIds || []).length * 25,
      scoreText: (Number(guild.level || 1) * 100 + Number(guild.xp || 0) + (guild.memberIds || []).length * 25).toLocaleString("pt-BR"),
      sub: `${(guild.memberIds || []).length}/${GUILD_MEMBER_LIMIT} membros`,
      detail: guild.description || "Guilda ativa",
    })).sort((a, b) => b.score - a.score);
  }
  return byChar(prestigeFor, "prestígio", (char) => `${Number(char.totalRares || 0)} raros · ${Number(char.totalRolls || 0)} giros`);
}

function renderCodex() {
  const tabs = [
    ["affinities", "Afinidades"],
    ["categories", "Raridades"],
    ["races", "Raças"],
    ["classes", "Classes"],
    ["biomes", "Biomas"],
    ["kingdoms", "Reinos"],
    ["regions", "Regiões"],
    ["npcs", "NPCs"],
    ["wanted", "Procurados"],
    ["bestiary", "Bestiário"],
    ["reputation", "Facções"],
  ];
  const tab = state.codexTab || "affinities";
  const renderCodexCards = (items, detail) => {
    const visible = filterCodexItems(items);
    return `
    <div class="codex-grid">
      ${visible.map((item) => `
        <article class="codex-card">
          ${item.imageUrl ? `<img src="${esc(item.imageUrl)}" alt="${esc(item.name || item.title || item.id)}" />` : `<div class="codex-mark">${esc(String(item.name || item.title || "?").slice(0, 1))}</div>`}
          <div>
            <span>${esc(item.rarity || item.region || item.role || item.ruler || item.id)}</span>
            <h3>${esc(item.name || item.title || item.id)}</h3>
            <p>${esc(detail(item))}</p>
          </div>
        </article>
      `).join("") || `<div class="empty-state">Nada cadastrado nesta aba.</div>`}
    </div>
  `;
  };
  const views = {
    affinities: () => renderCodexCards(state.content.affinities, (item) => {
      const category = getCategory(item.categoryId);
      return `${category?.name || "Sem categoria"} · ${category?.rarity || "Comum"} · ${bonusToText(item.bonus)} · ${affinityOwnerCount(item.id)} player(s) · ${item.passive || item.description || ""}`;
    }),
    categories: () => renderCodexCards(state.content.affinityCategories, (item) => `Peso ${item.weight || 0} · ${item.rarity || "Comum"} · ${state.content.affinities.filter((affinity) => affinity.categoryId === item.id).length} afinidade(s) · ${categoryOwnerCount(item.id)} player(s) · ${item.description || "Categoria de roleta e balanceamento."}`),
    races: () => renderCodexCards(state.content.races, (item) => `${bonusToText(item.bonus)} · ${item.passive || ""} ${item.description || ""}`),
    classes: () => renderCodexCards(state.content.classes, (item) => `${bonusToText(item.bonus)} · ${item.role || ""} ${item.description || ""}`),
    biomes: () => renderCodexCards(state.content.biomes, (item) => `${item.region || "Mundo"} · ${item.description || ""}`),
    kingdoms: () => renderCodexCards(state.content.kingdoms, (item) => `${item.ruler || "Sem governante"} · ${item.description || ""}`),
    regions: () => renderCodexCards(state.content.regions, (item) => `${state.content.kingdoms.find((kingdom) => kingdom.id === item.kingdomId)?.name || "Independente"} · ${item.description || ""}`),
    npcs: () => renderCodexCards(state.content.npcs, (item) => `${item.role || "NPC importante"} · ${item.description || ""}`),
    wanted: () => renderCodexCards(state.content.wantedBoard, (item) => `${item.reward || "Recompensa a definir"} · ${item.description || ""}`),
    bestiary: () => renderCodexCards(state.content.bestiary, (item) => `${item.region || "Região desconhecida"} · ${item.description || ""}`),
    reputation: () => renderCodexCards(state.content.reputationFactions, (item) => `${item.region || "Mundo"} · ${item.levels || ""} · ${item.description || ""}`),
  };
  return `
    <div class="grid">
      <article class="panel span-12">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Biblioteca viva</p>
            <h2>Codex Millennium</h2>
          </div>
          <span class="tag">Atualizado pela Forja</span>
        </div>
        <div class="tabs codex-tabs">
          ${tabs.map(([id, label]) => `<button class="tab ${tab === id ? "active" : ""}" type="button" data-action="codex-tab" data-tab="${id}">${label}</button>`).join("")}
        </div>
        <div class="codex-controls">
          <input data-action="codex-search" placeholder="Buscar no Codex..." value="${esc(state.codexSearch)}" />
          <select data-action="codex-filter">
            <option value="all" ${state.codexFilter === "all" ? "selected" : ""}>Todos</option>
            ${RARITIES.map((rarity) => `<option value="${rarity}" ${state.codexFilter === rarity ? "selected" : ""}>${rarity}</option>`).join("")}
          </select>
          <select data-action="codex-sort">
            <option value="name" ${state.codexSort === "name" ? "selected" : ""}>Nome</option>
            <option value="rarity" ${state.codexSort === "rarity" ? "selected" : ""}>Raridade</option>
            <option value="owners" ${state.codexSort === "owners" ? "selected" : ""}>Mais players</option>
          </select>
        </div>
      </article>
      <article class="panel span-12">
        ${views[tab]?.() || views.affinities()}
      </article>
    </div>
  `;
}

function filterCodexItems(items) {
  const search = normalize(state.codexSearch || "");
  const filter = state.codexFilter || "all";
  const ranked = [...items].filter((item) => {
    const text = normalize(`${item.name || ""} ${item.title || ""} ${item.description || ""} ${item.passive || ""} ${item.role || ""} ${item.region || ""} ${item.rarity || ""}`);
    const rarity = item.rarity || getCategory(item.categoryId)?.rarity || "";
    return (!search || text.includes(search)) && (filter === "all" || rarity === filter);
  });
  if (state.codexSort === "rarity") return ranked.sort((a, b) => RARITIES.indexOf(a.rarity || getCategory(a.categoryId)?.rarity || "Comum") - RARITIES.indexOf(b.rarity || getCategory(b.categoryId)?.rarity || "Comum"));
  if (state.codexSort === "owners") return ranked.sort((a, b) => affinityOwnerCount(b.id) - affinityOwnerCount(a.id));
  return sortByName(ranked);
}

function renderRulesCards(chapters) {
  return sortByOrder(chapters).map((chapter) => `
    <article class="rule-card">
      <span>Capítulo ${Number(chapter.order || 0)}</span>
      <h3>${esc(chapter.name)}</h3>
      <p>${esc(chapter.summary || "")}</p>
      <details><summary>Versão completa</summary><p>${esc(chapter.full || "")}</p></details>
    </article>
  `).join("") || `<div class="empty-state">Nenhum capítulo cadastrado.</div>`;
}

function renderHelpCenter() {
  const tabs = [
    ["tutorial", "Tutorial"],
    ["rules", "Livro de regras"],
    ["faq", "FAQ"],
    ["terms", "Termo"],
    ["search", "Busca"],
  ];
  const tab = state.helpTab || "tutorial";
  const views = {
    tutorial: () => `
      <article class="panel span-12">
        <div class="timeline-list">
          ${sortByOrder(state.content.tutorialSteps).map((step) => `<div class="timeline-step"><span>${Number(step.order || 0)}</span><div><h3>${esc(step.name)}</h3><p>${esc(step.description || "")}</p></div></div>`).join("")}
        </div>
      </article>
    `,
    rules: () => `<article class="panel span-12"><div class="content-grid">${renderRulesCards(state.content.rulesChapters)}</div></article>`,
    faq: () => `
      <article class="panel span-12">
        <div class="faq-list">
          ${sortByName(state.content.faqEntries).map((faq) => `<details class="faq-item"><summary>${esc(faq.name)}</summary><p>${esc(faq.answer || "")}</p><span>${esc(faq.category || "FAQ")}</span></details>`).join("") || `<div class="empty-state">Nenhuma pergunta cadastrada.</div>`}
        </div>
      </article>
    `,
    terms: () => `
      <article class="panel span-12 terms-gate">
        <p class="eyebrow">Versão ${esc(state.settings.rulesVersion || "1.0")}</p>
        <h2>Termo de acordo da mesa</h2>
        <p>${esc(state.settings.termsText || DEFAULT_CONTENT.settings.termsText)}</p>
        <span class="tag">${hasAcceptedTerms() ? "Aceito por você" : "Aceite pendente"}</span>
      </article>
    `,
    search: () => renderGlobalSearchPanel(),
  };
  return `
    <div class="grid">
      <article class="panel span-12">
        <div class="panel-heading">
          <div><p class="eyebrow">Central do player</p><h2>Guia, regras e ajuda rápida</h2></div>
          <span class="tag">Versão ${esc(state.settings.rulesVersion || "1.0")}</span>
        </div>
        <div class="tabs codex-tabs">
          ${tabs.map(([id, label]) => `<button class="tab ${tab === id ? "active" : ""}" type="button" data-action="help-tab" data-tab="${id}">${label}</button>`).join("")}
        </div>
      </article>
      ${views[tab]?.() || views.tutorial()}
    </div>
  `;
}

function renderGlobalSearchPanel() {
  const query = normalize(state.codexSearch || "");
  const pools = [
    ["Afinidade", state.content.affinities],
    ["Raça", state.content.races],
    ["Classe", state.content.classes],
    ["Missão", state.content.missionPool],
    ["Regra", state.content.rulesChapters],
    ["FAQ", state.content.faqEntries],
    ["NPC", state.content.npcs],
    ["Item", state.content.items],
  ];
  const results = pools.flatMap(([type, items]) => items.map((item) => ({ type, item })))
    .filter(({ item }) => !query || normalize(`${item.name || item.title || ""} ${item.description || ""} ${item.summary || ""} ${item.answer || ""}`).includes(query))
    .slice(0, 40);
  return `
    <article class="panel span-12">
      <div class="codex-controls">
        <input data-action="codex-search" placeholder="Buscar fogo, guerreiro, missão, regra..." value="${esc(state.codexSearch)}" />
      </div>
      <div class="content-grid">
        ${results.map(({ type, item }) => `<div class="content-card"><span>${esc(type)}</span><h3>${esc(item.name || item.title || item.id)}</h3><p>${esc(item.description || item.summary || item.answer || item.passive || "")}</p></div>`).join("") || `<div class="empty-state">Digite algo para buscar no site.</div>`}
      </div>
    </article>
  `;
}

function renderMarket() {
  const character = currentCharacter();
  const tabs = [
    ["market", "Destaques"],
    ["bazaar", "Bazar"],
    ["pass", "Passe"],
    ["cosmetics", "Cosméticos"],
    ["fragments", "Fragmentos"],
    ["gacha", "Invocação"],
    ["guild", "Guilda"],
    ["auction", "Leilão"],
    ["crafting", "Crafting"],
    ["vault", "Cofre"],
  ];
  const tab = state.marketTab || "market";
  const allCosmetics = [
    ...(state.content.gachaItems || []).filter((item) => normalize(`${item.category || ""} ${item.effect || ""}`).match(/cosmet|moldura|banner|efeito|perfil/)),
    ...(state.content.gachaShardShops || []).filter((item) => normalize(`${item.type || ""} ${item.name || ""}`).match(/cosmet|moldura|banner|token|titulo/)),
  ];
  const petBanner = activeGachaBanner("pets");
  const itemBanner = activeGachaBanner("items");
  const cards = {
    market: () => marketCards(state.content.marketListings, (item) => `${Number(item.price || 0)} PO · ${item.description || ""}`, "PO"),
    bazaar: () => renderPlayerBazaar(character),
    cosmetics: () => marketCards(allCosmetics, (item) => `${item.type || item.category || "Cosmético"} · ${item.description || item.effect || "Coleção visual para o perfil."}`, "Coleção"),
    fragments: () => (state.content.gachaShardShops || []).map((item) => `
      <div class="content-card market-card ${rarityClass(item.rarity)}">
        ${item.imageUrl ? `<img class="content-image" src="${esc(item.imageUrl)}" alt="${esc(item.name)}" />` : ""}
        <span>${esc(item.shop)} · ${Number(item.cost || 0)}</span>
        <h3>${esc(item.name)}</h3>
        <p>${esc(item.type || "Recompensa")} · ${esc(item.description || "")}</p>
        <button class="primary-button" type="button" data-action="redeem-shard-shop" data-shop-id="${esc(item.id)}">Trocar agora</button>
      </div>
    `).join("") || `<div class="empty-state">Nenhuma troca de fragmentos publicada.</div>`,
    pass: () => renderSeasonPass(),
    gacha: () => `
      <div class="gacha-market-grid">
        ${[petBanner, itemBanner].map((banner) => `
          <section class="gacha-market-card">
            <span>${banner.type === "pets" ? "Companheiros" : "Relíquias"} · ${banner.configured ? "rate-up do Oráculo" : "rotação horária"}</span>
            <h3>${esc(banner.name || "Banner dimensional")}</h3>
            <p>${esc(banner.description || "Destaques com chance elevada nesta janela.")}</p>
            <div class="tag-row">${banner.featured.slice(0, 4).map((item) => `<span class="tag ${rarityClass(item.rarity)}">${esc(item.name)}</span>`).join("") || `<span class="tag">Sem destaques</span>`}</div>
            <button class="primary-button" type="button" data-nav="gacha">Abrir invocação</button>
          </section>
        `).join("")}
      </div>
    `,
    guild: () => {
      const guild = guildForUser();
      return `
        <div class="guild-market-card">
          <span>Economia coletiva</span>
          <h3>${esc(guild?.name || "Salão de guildas")}</h3>
          <p>${guild ? "Use o cofre, missões de party e a reputação do grupo para conquistar recompensas que não cabem em um inventário só." : "Entre em uma guilda para liberar missões de party, mural, chat interno e futuras melhorias coletivas."}</p>
          <button class="primary-button" type="button" data-nav="guild">${guild ? "Abrir minha guilda" : "Ver guildas"}</button>
        </div>
      `;
    },
    auction: () => renderAuctionMarket(),
    crafting: () => marketCards(state.content.craftingRecipes, (item) => `${item.materials || "Materiais a definir"} → ${item.result || ""}`, "Crafting"),
    vault: () => `<article class="panel span-12"><div class="stat-grid">${renderStat("PO", character.gold || 0)}${renderStat("Millennium Coins", character.millenniumCoins || 0)}${renderStat("Fragmentos", Object.values(character.gachaFragments || {}).reduce((sum, value) => sum + Number(value || 0), 0))}${renderStat("Cofre dimensional", (character.gachaVault || []).length)}</div><p class="hint">O cofre dimensional guarda pets e itens invocados. Você pode equipar, fundir, recuperar pets, desfazer por fragmentos ou enviar para o inventário/perfil.</p>${renderGachaVault(character.gachaVault || [], { compact: true })}</article>`,
  };
  return `
    <div class="grid">
      <article class="panel span-12 market-hero">
        <div class="panel-heading"><div><p class="eyebrow">Economia da Interface</p><h2>Mercado, passe, invocação e cofre</h2></div><span class="tag">Sem dinheiro real</span></div>
        <div class="stat-grid compact-stat-grid">
          ${renderStat("PO", character.gold || 0)}
          ${renderStat("Millennium Coins", character.millenniumCoins || 0)}
          ${renderStat("Energia", `${currentGachaEnergy(character)}/${GACHA_ENERGY_MAX}`)}
          ${renderStat("Fragmentos", Object.values(character.gachaFragments || {}).reduce((sum, value) => sum + Number(value || 0), 0))}
        </div>
        <div class="tabs codex-tabs">${tabs.map(([id, label]) => `<button class="tab ${tab === id ? "active" : ""}" type="button" data-action="market-tab" data-tab="${id}">${label}</button>`).join("")}</div>
      </article>
      ${tab === "vault" ? cards.vault() : `<article class="panel span-12"><div class="content-grid">${cards[tab]?.() || cards.market()}</div></article>`}
    </div>
  `;
}

function marketCards(items, detail, currency = "PO") {
  return sortByName(items).map((item) => `
    <div class="content-card market-card">
      ${item.imageUrl ? `<img class="content-image" src="${esc(item.imageUrl)}" alt="${esc(item.name)}" />` : ""}
      <span>${esc(item.rarity || item.category || "Mercado")}</span>
      <h3>${esc(item.name)}</h3>
      <p>${esc(detail(item))}</p>
      <div class="action-row">
        <button class="primary-button" type="button" data-action="${currency === "PO" ? "buy-market-item" : "request-market-item"}" data-market-id="${esc(item.id)}" data-market-currency="${esc(currency)}">${currency === "PO" ? "Comprar agora" : currency === "Coleção" ? "Ver coleção" : "Solicitar"}</button>
        <button class="ghost-button" type="button" data-action="open-help-text" data-title="${esc(item.name)}" data-text="${esc(currency === "PO" ? "Itens oficiais com preço em PO entram imediatamente no inventário. Itens especiais, leilões e crafting podem ter regras próprias." : currency === "Coleção" ? "Este item aparece na sua coleção, no cofre ou em trocas de fragmentos. O Oráculo pode liberar versões especiais por evento." : "A solicitação vai para a fila do Oráculo com contexto de compra, lance ou crafting.")}">Como usar?</button>
      </div>
    </div>
  `).join("") || `<div class="empty-state">Nada publicado aqui ainda.</div>`;
}

function renderPlayerBazaar(character) {
  const listings = (state.content.playerListings || []).filter((listing) => listing.status === "active");
  const ownItems = (character.inventory || []).filter((item) => !item.marketListed);
  const ownTrades = (state.marketTrades || []).filter((trade) => trade.buyerId === state.user.uid || trade.sellerId === state.user.uid);
  return `
    <section class="bazaar-layout">
      <div class="bazaar-intro">
        <span>Comércio entre escolhidos</span>
        <h3>Bazar de Millennium</h3>
        <p>Você anuncia um item, o comprador coloca a moeda em garantia e ambos concluem a troca sem fila do Oráculo. O histórico permanece disponível para auditoria em caso de conflito.</p>
      </div>
      <form class="form-stack bazaar-form" data-form="player-listing">
        <p class="eyebrow">Anunciar item</p>
        <label><span>Item do inventário</span><select name="itemInstance">${ownItems.map((item) => `<option value="${esc(item.instanceId || item.id)}">${esc(item.name)} · ${esc(item.rarity || "Comum")}</option>`).join("") || `<option value="">Nenhum item disponível</option>`}</select></label>
        <label><span>Preço</span><input name="price" type="number" min="1" value="50" /></label>
        <label><span>Moeda</span><select name="currency"><option value="gold">PO</option><option value="coins">Millennium Coins</option></select></label>
        <button class="primary-button" type="submit" ${ownItems.length ? "" : "disabled"}>Publicar anúncio</button>
      </form>
      <div class="bazaar-listing-grid">
        ${listings.map((listing) => `
          <article class="bazaar-listing ${rarityClass(listing.itemSnapshot?.rarity || "Comum")}">
            ${listing.itemSnapshot?.imageUrl ? `<img class="content-image" src="${esc(listing.itemSnapshot.imageUrl)}" alt="${esc(listing.itemSnapshot.name)}" />` : ""}
            <span>${esc(listing.itemSnapshot?.rarity || "Comum")} · ${esc(listing.currency === "coins" ? "Millennium Coins" : "PO")}</span>
            <h3>${esc(listing.itemSnapshot?.name || listing.name || "Item")}</h3>
            <p>Vendido por ${esc(getUserName(listing.sellerId))} · ${Number(listing.price || 0).toLocaleString("pt-BR")}</p>
            ${listing.sellerId === state.user.uid ? `<span class="tag">Seu anúncio</span>` : `<button class="primary-button" type="button" data-action="fund-market-trade" data-listing-id="${esc(listing.id)}">Reservar com garantia</button>`}
          </article>
        `).join("") || `<div class="empty-state">Nenhum anúncio ativo. O primeiro item da praça pode ser o seu.</div>`}
      </div>
      <div class="bazaar-trade-panel">
        <p class="eyebrow">Minhas negociações</p>
        <div class="trade-list">
          ${ownTrades.map((trade) => {
            const isSeller = trade.sellerId === state.user.uid;
            const label = isSeller ? `Compra de ${getUserName(trade.buyerId)}` : `Venda de ${getUserName(trade.sellerId)}`;
            const action = trade.status === "funded" && isSeller
              ? `<button class="primary-button" type="button" data-action="accept-market-trade" data-trade-id="${esc(trade.id)}">Entregar e receber</button><button class="ghost-button" type="button" data-action="decline-market-trade" data-trade-id="${esc(trade.id)}">Recusar</button>`
              : trade.status === "ready" && !isSeller
                ? `<button class="primary-button" type="button" data-action="collect-market-trade" data-trade-id="${esc(trade.id)}">Coletar item</button>`
                : trade.status === "rejected" && !isSeller
                  ? `<button class="ghost-button" type="button" data-action="refund-market-trade" data-trade-id="${esc(trade.id)}">Reaver garantia</button>`
                  : "";
            return `<div class="trade-row"><div><span>${esc(trade.status === "funded" ? "Garantia depositada" : trade.status === "ready" ? "Item pronto para coleta" : trade.status === "completed" ? "Troca concluída" : trade.status === "rejected" ? "Venda recusada" : trade.status)}</span><strong>${esc(trade.itemSnapshot?.name || "Item")}</strong><p>${esc(label)} · ${Number(trade.price || 0)} ${trade.currency === "coins" ? "MC" : "PO"}</p></div><div class="action-row">${action}</div></div>`;
          }).join("") || `<div class="empty-state compact">Nenhuma negociação em andamento.</div>`}
        </div>
      </div>
    </section>
  `;
}

function auctionHighestBid(auctionId) {
  return [...(state.content.auctionBids || [])]
    .filter((bid) => bid.auctionId === auctionId)
    .sort((a, b) => Number(b.amount || 0) - Number(a.amount || 0) || timeValue(b.createdAt) - timeValue(a.createdAt))[0] || null;
}

function renderAuctionMarket() {
  return (state.content.auctionListings || []).map((auction) => {
    const highest = auctionHighestBid(auction.id);
    const end = dateFromValue(auction.endsAt);
    const ended = Boolean(end && Date.now() >= end.getTime());
    const winner = highest?.bidderId === state.user.uid;
    const claimed = highest?.status === "claimed";
    return `
      <article class="content-card market-card auction-card ${rarityClass(auction.rarity)}">
        ${auction.imageUrl ? `<img class="content-image" src="${esc(auction.imageUrl)}" alt="${esc(auction.name)}" />` : ""}
        <span>${esc(auction.rarity || "Leilão")} · ${ended ? "Encerrado" : "Aberto"}</span>
        <h3>${esc(auction.name)}</h3>
        <p>${esc(auction.description || "")}</p>
        <div class="auction-bid-line"><small>Lance mínimo</small><strong>${Number(auction.minBid || 0).toLocaleString("pt-BR")} PO</strong></div>
        <div class="auction-bid-line"><small>Maior lance</small><strong>${highest ? `${Number(highest.amount || 0).toLocaleString("pt-BR")} PO · ${esc(getUserName(highest.bidderId))}` : "Sem lances"}</strong></div>
        <p class="hint">${end ? `${ended ? "Encerrado em" : "Encerra em"} ${end.toLocaleString("pt-BR")}` : "Defina uma data ISO na Forja para liberar a coleta automática."}</p>
        <div class="action-row">
          ${!ended ? `<button class="primary-button" type="button" data-action="open-auction-bid" data-auction-id="${esc(auction.id)}">Dar lance</button>` : winner && !claimed ? `<button class="primary-button" type="button" data-action="claim-auction" data-auction-id="${esc(auction.id)}">Coletar vitória</button>` : `<span class="tag">${claimed ? "Coletado" : winner ? "Aguardando coleta" : "Resultado definido"}</span>`}
        </div>
      </article>
    `;
  }).join("") || `<div class="empty-state">Nenhum leilão ativo nesta temporada.</div>`;
}

function renderSeasonPass() {
  const character = currentCharacter();
  const level = Number(character.level || levelFromXp(character.xp || 0));
  const hasPremium = character.premiumPassUnlocked === true;
  const claims = character.passClaims || { free: [], premium: [] };
  const pendingPremium = pendingProgressRequests().some((request) => request.type === "premiumPass");
  const canRequest = !hasPremium && !pendingPremium && Number(character.gold || 0) >= 1000;
  return `
    <div class="season-pass-board">
      <div class="pass-header">
        <div>
          <p class="eyebrow">Temporada do Despertar</p>
          <h3>Passe Free e Premium</h3>
          <p>Recompensas até o nível 50. O Premium custa 1.000 PO e também é concedido automaticamente aos Testadores Beta quando o Oráculo inicia o RPG.</p>
        </div>
        <div class="pass-status">
          <span class="tag">${hasPremium ? "Premium ativo" : pendingPremium ? "Premium em análise" : "Premium 1.000 PO"}</span>
          ${hasPremium ? "" : `<button class="primary-button" type="button" data-action="request-premium-pass" ${canRequest ? "" : "disabled"}>${pendingPremium ? "Pedido enviado" : "Solicitar Premium"}</button>`}
        </div>
      </div>
      <div class="pass-track">
        ${sortByTier(state.content.seasonPass).map((item) => {
          const reached = level >= Number(item.tier || 0);
          const freeClaimed = (claims.free || []).includes(item.id);
          const premiumClaimed = (claims.premium || []).includes(item.id);
          return `
            <div class="pass-tier ${reached ? "reached" : ""}">
              <div class="pass-tier-top">
                <span class="pass-tier-level">${Number(item.tier || 0)}</span>
                <div>
                  <span class="${rarityClass(item.rarity)}">${esc(item.rarity || "Temporada")}</span>
                  <strong>${esc(item.name || `Nível ${item.tier || "?"}`)}</strong>
                </div>
              </div>
              <div class="pass-rewards">
                <div><small>Free</small><b>${esc(item.freeReward || item.reward || "Recompensa a definir")}</b><button class="pass-claim-button" type="button" data-action="claim-pass-reward" data-tier-id="${esc(item.id)}" data-track="free" ${reached && !freeClaimed ? "" : "disabled"}>${freeClaimed ? "Coletado" : reached ? "Coletar" : "Bloqueado"}</button></div>
                <div class="${hasPremium ? "premium-open" : "premium-locked"}"><small>Premium</small><b>${esc(item.premiumReward || "Recompensa premium a definir")}</b><button class="pass-claim-button" type="button" data-action="claim-pass-reward" data-tier-id="${esc(item.id)}" data-track="premium" ${reached && hasPremium && !premiumClaimed ? "" : "disabled"}>${premiumClaimed ? "Coletado" : hasPremium && reached ? "Coletar" : "Bloqueado"}</button></div>
              </div>
              <p>${esc(item.description || "")}</p>
            </div>
          `;
        }).join("") || `<div class="empty-state">Nenhum passe publicado.</div>`}
      </div>
    </div>
  `;
}

function renderSeasonPassView() {
  const character = currentCharacter();
  return `
    <div class="grid pass-view">
      <article class="pass-hero panel span-12">
        <div class="pass-hero-copy">
          <p class="eyebrow">Temporada I</p>
          <h2>Despertar dos Heróis</h2>
          <p>A interface de Millennium abriu os olhos. Suba níveis, complete missões do passe e desbloqueie molduras, tokens, títulos e recompensas cosméticas.</p>
          <div class="tag-row">
            <span class="tag">Nível ${Number(character.level || levelFromXp(character.xp || 0))}</span>
            <span class="tag">${character.premiumPassUnlocked ? "Premium ativo" : "Premium bloqueado"}</span>
            <span class="tag">${Number(character.gold || 0).toLocaleString("pt-BR")} PO</span>
          </div>
        </div>
        <div class="pass-feature-card">
          <span>Recompensa destaque</span>
          <strong>Interface Viva</strong>
          <p>Token cósmico da temporada para quem alcançar o marco final.</p>
        </div>
      </article>
      <article class="panel span-12">
        ${renderSeasonPass()}
      </article>
      <article class="panel span-12">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Missões do passe</p>
            <h3>XP visual da temporada</h3>
          </div>
          <span class="tag">Validação narrativa</span>
        </div>
        <div class="pass-mission-grid">
          ${sortByName(state.content.passMissions || []).map((mission) => `
            <div class="pass-mission">
              <span>${esc(mission.type || "Missão")}</span>
              <strong>${esc(mission.name || mission.title || "Missão do passe")}</strong>
              <p>${esc(mission.description || "")}</p>
              <b>+${Number(mission.xp || 0)} XP do passe</b>
            </div>
          `).join("") || `<div class="empty-state">Nenhuma missão do passe cadastrada.</div>`}
        </div>
      </article>
    </div>
  `;
}

function renderHallOfFame() {
  const byPrestige = leaderboard().slice(0, 5);
  const byLevel = [...state.characters].sort((a, b) => Number(b.level || levelFromXp(b.xp || 0)) - Number(a.level || levelFromXp(a.xp || 0))).slice(0, 5);
  const byRares = [...state.characters].sort((a, b) => Number(b.totalRares || 0) - Number(a.totalRares || 0)).slice(0, 5);
  const guilds = [...state.guilds].sort((a, b) => guildScore(b) - guildScore(a)).slice(0, 5);
  return `
    <div class="grid">
      <article class="panel span-12"><div class="panel-heading"><div><p class="eyebrow">Legado</p><h2>Hall da Fama</h2></div><span class="tag">Temporada ${Number(state.settings.seasonNumber || 1)}</span></div></article>
      ${hallPanel("Prestígio", byPrestige, (char) => `${prestigeFor(char)} pontos · ${activeTitle(char)?.name || "sem título"}`)}
      ${hallPanel("Maiores níveis", byLevel, (char) => `Nível ${Number(char.level || levelFromXp(char.xp || 0))} · ${Number(char.xp || 0)} XP`)}
      ${hallPanel("Mais raros", byRares, (char) => `${Number(char.totalRares || 0)} raros · ${Number(char.totalRolls || 0)} giros`)}
      <article class="panel span-6"><p class="eyebrow">Guildas lendárias</p><div class="ranking-list">${guilds.map((guild, index) => `<div class="ranking-row compact"><strong>#${index + 1}</strong><span>${esc(guild.name)} · ${guildScore(guild)} pts</span><b>${(guild.memberIds || []).length}/${GUILD_MEMBER_LIMIT}</b></div>`).join("") || `<div class="empty-state">Sem guildas ainda.</div>`}</div></article>
    </div>
  `;
}

function hallPanel(title, characters, detail) {
  return `
    <article class="panel span-6">
      <p class="eyebrow">${esc(title)}</p>
      <div class="ranking-list">
        ${characters.map((char, index) => `<button class="ranking-row compact" type="button" data-action="open-user-profile" data-user-id="${esc(char.ownerId)}"><strong>#${index + 1}</strong><span>${esc(char.characterName || getUserName(char.ownerId))}</span><b>${esc(detail(char))}</b></button>`).join("") || `<div class="empty-state">Sem dados.</div>`}
      </div>
    </article>
  `;
}

function guildScore(guild) {
  const missionScore = state.progressRequests.filter((request) => request.guildId === guild.id && request.status === "aprovado").length * 100;
  return missionScore + (guild.memberIds || []).length * 10;
}

function renderAdminOps() {
  const totalGold = state.characters.reduce((sum, char) => sum + Number(char.gold || 0), 0);
  const totalItems = state.characters.reduce((sum, char) => sum + (char.inventory || []).length, 0);
  const totalEssences = state.characters.reduce((sum, char) => sum + Number(char.affinityAttempts || 0), 0);
  const accepted = state.users.filter((user) => user.acceptedTermsVersion === (state.settings.rulesVersion || "1.0")).length;
  const affinityRows = sortByName(state.content.affinities).map((affinity) => ({ name: affinity.name, count: affinityOwnerCount(affinity.id) })).sort((a, b) => b.count - a.count).slice(0, 8);
  return `
    <div class="grid">
      <article class="panel span-12">
        <div class="panel-heading"><div><p class="eyebrow">Operações</p><h2>Auditoria, economia e manutenção</h2></div><span class="tag">${accepted}/${state.users.length} aceitaram termos</span></div>
        <div class="stat-grid">
          ${renderStat("PO total", totalGold)}
          ${renderStat("Itens", totalItems)}
          ${renderStat("Essências", totalEssences)}
          ${renderStat("Guildas", state.guilds.length)}
          ${renderStat("Online", state.users.filter(isUserOnline).length)}
        </div>
      </article>
      <article class="panel span-6">
        <p class="eyebrow">Balanceamento</p>
        <div class="ranking-list">${affinityRows.map((row, index) => `<div class="ranking-row compact"><strong>#${index + 1}</strong><span>${esc(row.name)}</span><b>${row.count} player(s)</b></div>`).join("") || `<div class="empty-state">Sem afinidades distribuídas.</div>`}</div>
      </article>
      <article class="panel span-6">
        <p class="eyebrow">Auditoria recente</p>
        <div class="scroll-list">${renderAuditRows()}</div>
      </article>
      <article class="panel span-12">
        <p class="eyebrow">Modo manutenção e termo</p>
        <form class="form-grid" data-form="admin-ops">
          <label><span>Modo manutenção</span><select name="maintenanceMode"><option value="false" ${!state.settings.maintenanceMode ? "selected" : ""}>Desligado</option><option value="true" ${state.settings.maintenanceMode ? "selected" : ""}>Ligado</option></select></label>
          <label><span>Versão do termo</span><input name="rulesVersion" value="${esc(state.settings.rulesVersion || "1.0")}" /></label>
          <label class="wide"><span>Texto do termo</span><textarea name="termsText" rows="5">${esc(state.settings.termsText || "")}</textarea></label>
          <button class="primary-button wide" type="submit">Salvar operações</button>
        </form>
      </article>
    </div>
  `;
}

function renderAuditRows() {
  const rows = [
    ...state.progressRequests.map((item) => ({ at: item.reviewedAt || item.createdAt, label: `Validação ${item.status || "pendente"}`, text: `${item.title || "Solicitação"} · ${getUserName(item.uid)}` })),
    ...state.reports.map((item) => ({ at: item.createdAt, label: `Report ${item.status || "aberto"}`, text: item.title || item.description || "Report" })),
    ...state.globalMessages.filter((item) => ["rare", "admin-alert", "system"].includes(item.type)).map((item) => ({ at: item.createdAt, label: item.type, text: item.text })),
  ].sort((a, b) => timeValue(b.at) - timeValue(a.at)).slice(0, 20);
  return rows.map((row) => `<div class="item-row"><span>${esc(row.label)} · ${esc(tsText(row.at))}</span><strong>${esc(row.text)}</strong></div>`).join("") || `<div class="empty-state">Nada auditado ainda.</div>`;
}

function renderDiary() {
  const isAdminView = state.role === "admin";
  return `
    <div class="grid">
      <article class="panel span-5">
        <p class="eyebrow">${isAdminView ? "Diário do mestre" : "Memória do personagem"}</p>
        <h3>${isAdminView ? "Registrar evento da campanha" : "Adicionar memória"}</h3>
        <form class="form-stack" data-form="diary-entry">
          <input type="hidden" name="type" value="${isAdminView ? "event" : "memory"}" />
          <label><span>Título</span><input name="title" required /></label>
          <label><span>Texto</span><textarea name="text" rows="7" required></textarea></label>
          ${isAdminView ? `
            <label><span>Destaque</span><select name="featured"><option value="false">Normal</option><option value="true">Marco importante</option></select></label>
          ` : ""}
          <button class="primary-button" type="submit">Publicar no diário</button>
        </form>
      </article>
      <article class="panel span-7">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Arquivo vivo</p>
            <h2>Diário de Campanha</h2>
          </div>
          <span class="tag">${state.diaryEntries.length} registro(s)</span>
        </div>
        <div class="diary-list">
          ${state.diaryEntries.map((entry) => `
            <div class="diary-entry ${entry.featured ? "featured" : ""}">
              <span>${entry.type === "event" ? "Evento" : "Memória"} · ${esc(tsText(entry.createdAt))}</span>
              <h3>${esc(entry.title)}</h3>
              <p>${esc(entry.text)}</p>
              <button class="link-button" type="button" data-action="open-user-profile" data-user-id="${esc(entry.authorId || "")}">${esc(displayNameWithTitle(entry.authorId, entry.authorName || "Sistema"))}</button>
            </div>
          `).join("") || `<div class="empty-state">O diário ainda não tem registros.</div>`}
        </div>
      </article>
    </div>
  `;
}

function renderGuild() {
  const character = currentCharacter();
  const guild = currentGuild();
  const ownGuild = guildForUser();
  const canCreate = state.role !== "admin" && !ownGuild;
  const createDisabled = !canCreate || Number(character.gold || 0) < GUILD_CREATE_COST;
  const guildBrowser = `
    <article class="panel span-4 guild-browser">
      <div class="panel-heading"><div><p class="eyebrow">Guildas</p><h2>Salões da temporada</h2></div></div>
      ${state.role !== "admin" ? `
        <form class="form-stack compact-form" data-form="create-guild">
          <label><span>Nome da guilda</span><input name="name" required ${canCreate ? "" : "disabled"} /></label>
          <label><span>Imagem / brasão por URL</span><input name="imageUrl" ${canCreate ? "" : "disabled"} /></label>
          <label><span>Descrição</span><textarea name="description" rows="3" ${canCreate ? "" : "disabled"}></textarea></label>
          <button class="primary-button" type="submit" ${createDisabled ? "disabled" : ""}>Criar por ${GUILD_CREATE_COST.toLocaleString("pt-BR")} PO</button>
          ${ownGuild ? `<p class="hint">Você já pertence a uma guilda. Para fundar outra, fale com o Oráculo.</p>` : Number(character.gold || 0) < GUILD_CREATE_COST ? `<p class="hint">Você precisa de ${GUILD_CREATE_COST.toLocaleString("pt-BR")} PO para fundar uma guilda.</p>` : ""}
        </form>
      ` : ""}
      <div class="guild-list scroll-list">
        ${state.guilds.map((item) => {
          const count = (item.memberIds || []).length;
          const pending = pendingGuildRequest(item.id);
          const joined = isGuildMember(item);
          return `
            <div class="guild-card ${guild?.id === item.id ? "active" : ""}">
              <button class="guild-card-main" type="button" data-action="select-guild" data-guild-id="${esc(item.id)}">
                ${item.imageUrl ? `<img src="${esc(item.imageUrl)}" alt="${esc(item.name)}" />` : `<span class="guild-emblem">G</span>`}
                <span>
                  <strong>${esc(item.name)}</strong>
                  <small>${count}/${GUILD_MEMBER_LIMIT} membros · Líder ${esc(getUserName(item.leaderId))}</small>
                </span>
              </button>
              ${state.role !== "admin" && !joined && !ownGuild ? `<button class="ghost-button" type="button" data-action="request-guild-join" data-guild-id="${esc(item.id)}" ${(pending || count >= GUILD_MEMBER_LIMIT) ? "disabled" : ""}>${pending ? "Pedido enviado" : count >= GUILD_MEMBER_LIMIT ? "Lotada" : "Pedir entrada"}</button>` : joined ? `<span class="tag">Sua guilda</span>` : ""}
            </div>
          `;
        }).join("") || `<div class="empty-state">Nenhuma guilda fundada ainda.</div>`}
      </div>
    </article>
  `;

  if (!guild) {
    return `<div class="grid">${guildBrowser}<article class="panel span-8"><div class="empty-state">Crie a primeira guilda ou aguarde novas fundações.</div></article></div>`;
  }

  const leader = isGuildLeader(guild);
  const members = guildMembers(guild);
  const memberCount = (guild.memberIds || []).length;
  const selectedMember = isGuildMember(guild) || state.role === "admin";
  const availableUsers = state.users.filter((user) => user.id !== state.user.uid && !(guild.memberIds || []).includes(user.id) && !guildForUser(user.id));
  const messages = state.guildMessages.filter((message) => message.guildId === guild.id);
  const activeMission = guild.activeMission || null;
  const selectedPending = pendingGuildRequest(guild.id);
  const selectedFull = memberCount >= GUILD_MEMBER_LIMIT;
  const score = guildScore(guild);
  const guildLevel = Math.max(1, Math.floor(score / 100) + 1);
  return `
    <div class="grid">
      ${guildBrowser}
      <article class="panel span-8 guild-hero">
        ${guild.imageUrl ? `<img src="${esc(guild.imageUrl)}" alt="${esc(guild.name)}" />` : `<div class="guild-emblem big">G</div>`}
        <div>
          <p class="eyebrow">Guilda</p>
          <h2>${esc(guild.name)}</h2>
          <p>${esc(guild.description || "Sem descrição.")}</p>
          <div class="tag-row">
            <span class="tag">${memberCount}/${GUILD_MEMBER_LIMIT} membro(s)</span>
            <span class="tag">Nível ${guildLevel}</span>
            <span class="tag">${score} reputação</span>
            <span class="tag">Líder: ${esc(getUserName(guild.leaderId))}</span>
            ${selectedMember ? `<span class="tag">Acesso liberado</span>` : `<span class="tag">Prévia pública</span>`}
          </div>
          ${!selectedMember && state.role !== "admin" ? `
            <div class="action-row" style="margin-top:14px">
              <button class="primary-button" type="button" data-action="request-guild-join" data-guild-id="${esc(guild.id)}" ${(ownGuild || selectedPending || selectedFull) ? "disabled" : ""}>${ownGuild ? "Você já tem guilda" : selectedPending ? "Pedido enviado" : selectedFull ? "Guilda lotada" : "Pedir entrada"}</button>
            </div>
          ` : ""}
        </div>
      </article>
      ${!selectedMember ? `
        <article class="panel span-8">
          <div class="empty-state">Entre na guilda para liberar chat interno, missões de party e painel de membros.</div>
        </article>
      ` : ""}
      ${selectedMember && leader ? `
        <article class="panel span-5">
          <p class="eyebrow">Liderança</p>
          <h3>Editar guilda</h3>
          <form class="form-stack" data-form="guild-settings">
            <input type="hidden" name="guildId" value="${esc(guild.id)}" />
            <label><span>Nome</span><input name="name" value="${esc(guild.name)}" required /></label>
            <label><span>Imagem / brasão</span><input name="imageUrl" value="${esc(guild.imageUrl || "")}" /></label>
            <label><span>Descrição</span><textarea name="description" rows="4">${esc(guild.description || "")}</textarea></label>
            <label><span>Mural</span><textarea name="mural" rows="4">${esc(guild.mural || "")}</textarea></label>
            <button class="primary-button" type="submit">Salvar guilda</button>
          </form>
          <form class="form-stack" data-form="guild-invite">
            <input type="hidden" name="guildId" value="${esc(guild.id)}" />
            <label><span>Convidar player</span><select name="uid">${availableUsers.map((user) => `<option value="${esc(user.id)}">${esc(displayNameWithTitle(user.id, user.displayName || user.email))}</option>`).join("")}</select></label>
            <button class="ghost-button" type="submit" ${(availableUsers.length && memberCount < GUILD_MEMBER_LIMIT) ? "" : "disabled"}>${memberCount >= GUILD_MEMBER_LIMIT ? "Guilda lotada" : "Enviar convite"}</button>
          </form>
        </article>
      ` : ""}
      ${selectedMember ? `<article class="panel ${leader ? "span-7" : "span-8"}">
        <div class="panel-heading"><div><p class="eyebrow">Membros</p><h3>Salão da guilda</h3></div></div>
        <div class="guild-members">
          ${members.map((member) => `
            <div class="guild-member">
              <button class="link-button" type="button" data-action="open-user-profile" data-user-id="${esc(member.uid)}">${esc(displayNameWithTitle(member.uid, member.user?.displayName || member.character?.displayName || "Player"))}</button>
              <span>${member.uid === guild.leaderId ? "Líder" : isUserOnline(member.user) ? "Online" : "Offline"}</span>
              ${leader && member.uid !== guild.leaderId ? `<button class="danger-button" type="button" data-action="guild-remove-member" data-guild-id="${esc(guild.id)}" data-user-id="${esc(member.uid)}">Remover</button>` : ""}
            </div>
          `).join("")}
        </div>
      </article>` : ""}
      ${selectedMember ? `<article class="panel span-12 guild-mural">
        <div class="panel-heading"><div><p class="eyebrow">Mural da guilda</p><h3>Recados, reputação e objetivos</h3></div><span class="tag">Nível ${guildLevel}</span></div>
        <p>${esc(guild.mural || "Use este espaço como mural narrativo da guilda. O líder pode editar no painel de liderança.")}</p>
      </article>` : ""}
      ${selectedMember ? `<article class="panel span-6">
        <div class="panel-heading"><div><p class="eyebrow">Chat da guilda</p><h3>Canal interno</h3></div></div>
        <div class="scroll-list">${renderMessages(messages, { source: "guild", reportable: true })}</div>
        <form class="form-stack" data-form="guild-chat">
          <input type="hidden" name="guildId" value="${esc(guild.id)}" />
          <textarea name="text" rows="3" required placeholder="Mensagem da guilda..."></textarea>
          ${renderEmojiBar()}
          <button class="primary-button" type="submit">Enviar para guilda</button>
        </form>
      </article>
      <article class="panel span-6">
        <div class="panel-heading"><div><p class="eyebrow">Missões de guilda</p><h3>Partys até 4 membros</h3></div></div>
        ${activeMission ? `
          <div class="mission weekly">
            <span>Em andamento</span>
            <h3>${esc(activeMission.title)}</h3>
            <p>Party: ${(activeMission.partyIds || []).map((uid) => esc(getUserName(uid))).join(" · ")}</p>
            ${leader ? `<button class="primary-button" type="button" data-action="finish-guild-mission" data-guild-id="${esc(guild.id)}">Enviar conclusão ao Oráculo</button>` : ""}
          </div>
        ` : leader ? `
          <form class="form-stack" data-form="start-guild-mission">
            <input type="hidden" name="guildId" value="${esc(guild.id)}" />
            <label><span>Missão</span><select name="missionId">${state.guildMissions.map((mission) => `<option value="${esc(mission.id)}">${esc(mission.title)} · ${esc(mission.rarity)}</option>`).join("")}</select></label>
            <div class="checkbox-grid">
              ${members.map((member) => `<label><input type="checkbox" name="party_${esc(member.uid)}" ${member.uid === state.user.uid ? "checked" : ""} /> <span>${esc(getUserName(member.uid))}</span></label>`).join("")}
            </div>
            <button class="primary-button" type="submit">Formar party</button>
          </form>
        ` : `<div class="empty-state">Aguardando o líder formar a próxima party.</div>`}
        <div class="content-grid" style="margin-top:14px">
          ${state.guildMissions.map((mission) => `
            <div class="mission weekly">
              <span>${esc(mission.rarity || "Raro")}</span>
              <h3>${esc(mission.title)}</h3>
              <p>${esc(mission.description)}</p>
              <strong>${esc(mission.reward)}</strong>
            </div>
          `).join("")}
        </div>
      </article>` : ""}
    </div>
  `;
}

function renderChatView() {
  const recipients = state.users.filter((user) => user.id !== state.user.uid);
  const globalMessages = state.globalMessages.filter((message) => message.type !== "whisper");
  const onlineUsers = recipients.filter((user) => isUserOnline(user));
  const friends = friendIds().map((uid) => state.users.find((user) => user.id === uid)).filter(Boolean);
  const directList = friends.length ? friends : recipients;
  return `
    <div class="grid">
      <article class="panel span-6">
        <div class="panel-heading"><div><p class="eyebrow">Global</p><h3>Chat e anúncios raros</h3></div></div>
        <div class="scroll-list">${renderMessages(globalMessages, { source: "global", reportable: true })}</div>
        <form class="form-stack" data-form="global-chat">
          <textarea name="text" rows="3" placeholder="Escreva no chat global..." required></textarea>
          ${renderEmojiBar()}
          <button class="primary-button" type="submit">Enviar global</button>
        </form>
      </article>
      <article class="panel span-6">
        <div class="panel-heading"><div><p class="eyebrow">Direto</p><h3>Mensagens diretas</h3></div></div>
        <div class="direct-layout">
          <div class="direct-list">
            <span>Online agora</span>
            ${onlineUsers.map((user) => `<button class="direct-contact ${state.selectedPrivateUserId === user.id ? "active" : ""}" type="button" data-action="select-direct-user" data-user-id="${esc(user.id)}"><span class="online-dot"></span>${esc(displayNameWithTitle(user.id, user.displayName || user.email))}</button>`).join("") || `<div class="empty-state compact">Ninguém online.</div>`}
            <span>${friends.length ? "Amigos" : "Jogadores"}</span>
            ${directList.map((user) => `<button class="direct-contact ${state.selectedPrivateUserId === user.id ? "active" : ""}" type="button" data-action="select-direct-user" data-user-id="${esc(user.id)}"><span class="${isUserOnline(user) ? "online-dot" : "offline-dot"}"></span>${esc(displayNameWithTitle(user.id, user.displayName || user.email))}</button>`).join("") || `<div class="empty-state compact">Adicione amigos pelo perfil.</div>`}
          </div>
          <div class="direct-chat">
            <div class="direct-chat-head">
              <strong>${state.selectedPrivateUserId ? esc(displayNameWithTitle(state.selectedPrivateUserId, getUserName(state.selectedPrivateUserId))) : "Selecione uma conversa"}</strong>
              ${state.selectedPrivateUserId ? `<button class="link-button" type="button" data-action="open-user-profile" data-user-id="${esc(state.selectedPrivateUserId)}">Perfil</button>` : ""}
            </div>
            <div class="scroll-list direct-messages">${state.privateChatError ? `<div class="empty-state">${esc(state.privateChatError)}</div>` : renderMessages(state.privateMessages, { source: "private", reportable: true })}</div>
            <form class="form-stack" data-form="private-chat">
              <textarea name="text" rows="3" placeholder="Mensagem direta..." ${state.selectedPrivateUserId ? "" : "disabled"} required></textarea>
              ${renderEmojiBar()}
              <button class="primary-button" type="submit" ${state.selectedPrivateUserId ? "" : "disabled"}>Enviar direto</button>
            </form>
          </div>
        </div>
      </article>
    </div>
  `;
}

function renderEmojiBar() {
  return `<div class="emoji-bar">${CHAT_EMOJIS.map((emoji) => `<button type="button" data-action="add-emoji" data-emoji="${esc(emoji)}" aria-label="Emoji ${esc(emoji)}">${esc(emoji)}</button>`).join("")}</div>`;
}

function renderMessages(messages, options = {}) {
  if (!messages.length) return `<div class="empty-state">Nada por aqui ainda.</div>`;
  return messages.map((message) => `
    <div class="message ${esc(message.type || "")} ${message.type === "rare" ? "rare" : ""}">
      <div class="message-meta">
        ${message.senderId && message.senderId !== "system" ? `
          <button class="link-button message-author" type="button" data-action="open-user-profile" data-user-id="${esc(message.senderId)}">${esc(displayNameWithTitle(message.senderId, message.senderName || "Player"))}</button>
        ` : `<span>${esc(message.senderName || "Sistema")}</span>`}
        ${message.rarity ? `<span>${esc(message.rarity)}</span>` : ""}
      </div>
      <p>${esc(message.text)}</p>
      <div class="message-actions">
        <small>${esc(tsText(message.createdAt))}</small>
        ${options.reportable && message.senderId && message.senderId !== "system" && message.senderId !== state.user?.uid ? `
          <button class="link-button danger-link" type="button" data-action="report-message" data-message-id="${esc(message.id)}" data-message-source="${esc(options.source || "global")}">Denunciar mensagem</button>
        ` : ""}
      </div>
    </div>
  `).join("");
}

function renderMissions() {
  const character = currentCharacter();
  if (!state.settings.gameStarted && state.role !== "admin") {
    return `
      <div class="grid">
        <article class="panel span-12 center-panel">
          <p class="eyebrow">Pré-lançamento</p>
          <h2>O chamado ainda não começou</h2>
          <p>Por enquanto, você pode criar ficha, falar nos chats, ver perfis e girar sua afinidade. Missões, treinos e criações serão liberados quando o ${ORACLE_LABEL} iniciar a Temporada do Despertar.</p>
        </article>
      </div>
    `;
  }
  const activeIds = new Set(character.activeMissions || []);
  const pending = pendingProgressRequests();
  const powerSlots = Math.max(1, Number(character.powerSlots || 1));
  const usedPowers = approvedPowerCount(character);
  return `
    <div class="grid">
      <article class="panel span-12">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Reset semanal</p>
            <h2>Missões da semana</h2>
          </div>
          <span class="tag">Reseta segunda 00:00</span>
        </div>
        <div class="content-grid">${renderPlayerMissionList(state.weeklyMissions, activeIds, pending)}</div>
      </article>
      <article class="panel span-6">
        <p class="eyebrow">Treino</p>
        <h3>Relatar treino para XP</h3>
        <form class="form-stack" data-form="training-request">
          <label><span>Título do treino</span><input name="title" required placeholder="Ex: Controle de mana sob pressão" /></label>
          <label><span>O que foi feito?</span><textarea name="description" rows="5" required></textarea></label>
          <button class="primary-button" type="submit">Enviar treino ao Oráculo</button>
        </form>
      </article>
      <article class="panel span-6">
        <p class="eyebrow">Nerf e aprovação</p>
        <h3>Poderes e técnicas novas</h3>
        <p class="muted-text">Poderes liberados: ${usedPowers}/${powerSlots}. Técnicas dependem de um poder base aprovado.</p>
        <form class="form-stack" data-form="creation-request">
          <label><span>Tipo</span><select name="type"><option value="power">Poder</option><option value="technique">Técnica</option></select></label>
          <label><span>Nome</span><input name="title" required /></label>
          <label><span>Descrição completa</span><textarea name="description" rows="5" required></textarea></label>
          <button class="primary-button" type="submit">Enviar para análise</button>
        </form>
      </article>
      <article class="panel span-12">
        <div class="panel-heading"><div><p class="eyebrow">Fila pessoal</p><h3>Solicitações enviadas</h3></div></div>
        <div class="content-grid">${renderProgressRequests(state.progressRequests.filter((request) => request.uid === state.user.uid).slice(0, 12), false)}</div>
      </article>
    </div>
  `;
}

function renderPlayerMissionList(missions, activeIds, pending) {
  if (!missions.length) return `<div class="empty-state">Nenhuma missão semanal publicada.</div>`;
  return missions.map((mission) => {
    const pendingMission = pending.find((request) => request.type === "mission" && request.missionId === mission.id);
    const active = activeIds.has(mission.id);
    return `
      <div class="mission weekly">
        <span class="mission-rarity">${missionIcon(mission.rarity)} ${esc(mission.rarity || "Comum")}</span>
        <h3>${esc(mission.title)}</h3>
        <p>${esc(mission.description)}</p>
        <strong>${esc(mission.reward || "Recompensa a definir")}</strong>
        <div class="action-row">
          ${pendingMission ? `<span class="tag">Aguardando Oráculo</span>` : active
            ? `<button class="primary-button" type="button" data-action="finish-mission" data-mission-id="${esc(mission.id)}">Marcar concluída</button>`
            : `<button class="ghost-button" type="button" data-action="start-mission" data-mission-id="${esc(mission.id)}">Quero fazer</button>`}
        </div>
      </div>
    `;
  }).join("");
}

function renderMissionList(missions) {
  if (!missions.length) return `<div class="empty-state">Nenhuma missão semanal publicada.</div>`;
  return missions.map((mission) => `
    <div class="mission weekly">
      <span class="mission-rarity">${missionIcon(mission.rarity)} ${esc(mission.rarity || "Comum")}</span>
      <h3>${esc(mission.title)}</h3>
      <p>${esc(mission.description)}</p>
      <strong>${esc(mission.reward || "Recompensa a definir")}</strong>
    </div>
  `).join("");
}

function missionIcon(rarity = "Comum") {
  const icons = {
    Comum: "◇",
    Incomum: "◆",
    Raro: "✦",
    "Épico": "✧",
    "Lendário": "★",
    "Cósmica": "✹",
  };
  return icons[rarity] || "◇";
}

function renderProgressRequests(requests, adminMode = false) {
  if (!requests.length) return `<div class="empty-state">Nenhuma solicitação nessa fila.</div>`;
  return requests.map((request) => `
    <div class="request-card ${request.status === "pendente" ? "pending" : ""}">
      <span>${esc(progressTypeLabel(request.type))} · ${esc(request.status || "pendente")}</span>
      <h3>${esc(request.title || "Solicitação")}</h3>
      <p>${esc(request.description || "")}</p>
      <p>${esc(requestRewardHint(request))}</p>
      ${request.adminNote ? `<p><strong>Nota do Oráculo:</strong> ${esc(request.adminNote)}</p>` : ""}
      ${adminMode && request.status === "pendente" ? `
        <div class="action-row">
          <button class="ghost-button" type="button" data-action="quick-approve" data-request-id="${esc(request.id)}">Aprovar rápido</button>
        </div>
        <form class="form-grid compact-form" data-form="review-request">
          <input type="hidden" name="requestId" value="${esc(request.id)}" />
          <label><span>XP</span><input name="xp" type="number" min="0" value="${Number(request.xp || defaultXpForRequest(request.type, request.rarity))}" /></label>
          <label><span>PO</span><input name="gold" type="number" min="0" value="0" /></label>
          <label><span>Essências</span><input name="essences" type="number" min="0" value="0" /></label>
          <label><span>Status</span><select name="decision"><option value="approved">Aprovar</option><option value="nerf">Pedir nerf</option><option value="rejected">Reprovar</option></select></label>
          <label class="wide"><span>Nota / Nerf necessário</span><textarea name="adminNote" rows="3" placeholder="Ex: reduzir alcance, custo ou dano antes de aprovar."></textarea></label>
          <button class="primary-button wide" type="submit">Finalizar análise</button>
        </form>
      ` : ""}
    </div>
  `).join("");
}

function renderReports() {
  return `
    <div class="grid">
      <article class="panel span-6">
        <p class="eyebrow">Bug</p>
        <h3>Reportar problema do site</h3>
        <form class="form-stack" data-form="bug-report">
          <label><span>Título</span><input name="title" required /></label>
          <label><span>Descrição</span><textarea name="description" rows="5" required></textarea></label>
          <button class="primary-button" type="submit">Enviar bug</button>
        </form>
      </article>
      <article class="panel span-6">
        <p class="eyebrow">Denúncia</p>
        <h3>Denunciar player</h3>
        <form class="form-stack" data-form="player-report">
          <label><span>Player denunciado</span><select name="targetId">${state.users.filter((user) => user.id !== state.user.uid).map((user) => `<option value="${esc(user.id)}">${esc(user.displayName || user.email)}</option>`).join("")}</select></label>
          <label><span>Motivo</span><textarea name="description" rows="5" required></textarea></label>
          <button class="danger-button" type="submit">Enviar denúncia</button>
        </form>
      </article>
    </div>
  `;
}

function renderAdminHome() {
  const players = state.users.filter((user) => user.role !== "admin");
  const reportsOpen = state.reports.filter((report) => report.status !== "resolvido").length;
  const pendingRequests = state.progressRequests.filter((request) => request.status === "pendente").length;
  const totalRolls = state.characters.reduce((sum, char) => sum + Number(char.totalRolls || 0), 0);
  const totalRares = state.characters.reduce((sum, char) => sum + Number(char.totalRares || 0), 0);
  const totalCoins = state.characters.reduce((sum, char) => sum + Number(char.millenniumCoins || 0), 0);
  const activePets = state.characters.reduce((sum, char) => sum + (char.activeActivities || []).length, 0);
  return `
    <div class="grid">
      <article class="panel span-12">
        <div class="stat-grid">
          ${renderStat("Players", players.length)}
          ${renderStat("Fichas", state.characters.length)}
          ${renderStat("Reports abertos", reportsOpen)}
          ${renderStat("Validações", pendingRequests)}
          ${renderStat("Giros totais", totalRolls)}
          ${renderStat("Raros", totalRares)}
          ${renderStat("Missões semanais", state.weeklyMissions.length)}
          ${renderStat("MC na mesa", totalCoins)}
          ${renderStat("Pets em campo", activePets)}
        </div>
      </article>
      <article class="panel span-7">
        <div class="panel-heading"><div><p class="eyebrow">Observação</p><h3>Roleta e prestígio</h3></div></div>
        <div class="scroll-list">
          ${players.map((user) => {
            const character = getCharacterFor(user.id);
            return `<div class="user-row">
              <strong>${esc(user.displayName || user.email)}</strong>
              <p>${esc(character.characterName || "Sem personagem")} · ${Number(character.affinityAttempts || 0)} essência(s) · pity ${Number(character.pityCounter || 0)}/${Number(state.settings.pityMax || 30)}</p>
              <span>${Number(character.totalRolls || 0)} giros · ${Number(character.totalRares || 0)} raros · ${prestigeFor(character)} prestígio</span>
            </div>`;
          }).join("") || `<div class="empty-state">Nenhum player cadastrado.</div>`}
        </div>
      </article>
      <article class="panel span-5">
        <div class="panel-heading"><div><p class="eyebrow">Eventos</p><h3>Ganhos raros</h3></div></div>
        <div class="scroll-list">${renderMessages(state.globalMessages.filter((message) => message.type === "rare").slice(-8))}</div>
      </article>
    </div>
  `;
}

function renderAdminEconomy() {
  const players = state.users.filter((user) => user.role !== "admin");
  const characters = players.map((user) => ({ user, character: getCharacterFor(user.id) }));
  const totalCoins = characters.reduce((sum, entry) => sum + Number(entry.character.millenniumCoins || 0), 0);
  const totalEnergy = characters.reduce((sum, entry) => sum + currentGachaEnergy(entry.character), 0);
  const totalFragments = characters.reduce((sum, entry) => sum + Object.values(entry.character.gachaFragments || {}).reduce((inner, amount) => inner + Number(amount || 0), 0), 0);
  const vaultItems = characters.flatMap((entry) => entry.character.gachaVault || []);
  const injured = vaultItems.filter((item) => item.status === "Ferido" || item.status === "Morto").length;
  const activeActivities = characters.flatMap((entry) => entry.character.activeActivities || []);
  const recentRuns = characters.flatMap(({ user, character }) => (character.minigameHistory || []).map((run) => ({ ...run, player: user.displayName || user.email, uid: user.id }))).sort((a, b) => timeValue(b.createdAt) - timeValue(a.createdAt)).slice(0, 12);
  return `
    <div class="grid">
      <article class="panel span-12 economy-hero">
        <div class="panel-heading"><div><p class="eyebrow">Economia viva</p><h2>Millennium Coins, cofre e esforço</h2></div><span class="tag">Visão do Oráculo</span></div>
        <div class="stat-grid compact-stat-grid">
          ${renderStat("Millennium Coins", totalCoins.toLocaleString("pt-BR"))}
          ${renderStat("Energia na mesa", `${totalEnergy}/${Math.max(1, players.length) * GACHA_ENERGY_MAX}`)}
          ${renderStat("Fragmentos", totalFragments.toLocaleString("pt-BR"))}
          ${renderStat("Cofres", vaultItems.length)}
          ${renderStat("Pets feridos", injured)}
          ${renderStat("Atividades", activeActivities.length)}
        </div>
      </article>
      <article class="panel span-7">
        <div class="panel-heading"><div><p class="eyebrow">Jogadores</p><h3>Quem precisa de atenção</h3></div><span class="tag">Clique para abrir a ficha</span></div>
        <div class="economy-player-list">
          ${characters.map(({ user, character }) => {
            const vault = character.gachaVault || [];
            const hurt = vault.filter((item) => item.status === "Ferido" || item.status === "Morto").length;
            return `
              <button class="economy-player-row" type="button" data-action="open-admin-user" data-user-id="${esc(user.id)}">
                <span class="online-dot ${isUserOnline(user) ? "online" : ""}"></span>
                <div><strong>${esc(character.characterName || user.displayName || user.email)}</strong><small>${esc(user.displayName || user.email)} · ${vault.length} registro(s) no cofre</small></div>
                <div><b>${Number(character.millenniumCoins || 0)} MC</b><small>${currentGachaEnergy(character)}/${GACHA_ENERGY_MAX} energia · ${hurt ? `${hurt} pet(s) ferido(s)` : "cofre estável"}</small></div>
              </button>
            `;
          }).join("") || `<div class="empty-state">Nenhum player para observar.</div>`}
        </div>
      </article>
      <article class="panel span-5">
        <div class="panel-heading"><div><p class="eyebrow">Runs recentes</p><h3>Auditoria de minigames</h3></div></div>
        <div class="run-history">
          ${recentRuns.map((run) => `<div class="run-card"><span>${esc(run.player)} · ${esc(run.mode)} · ${esc(run.difficultyName || run.difficultyId)}</span><strong>Rank ${esc(run.grade || "-")} · ${Number(run.score || 0)} pts</strong><p>${Number(run.coins || 0)} MC · ${Number(run.fragments || 0)} ${esc(run.fragmentName || "fragmentos")}</p></div>`).join("") || `<div class="empty-state">Nenhuma run registrada ainda.</div>`}
        </div>
      </article>
      <article class="panel span-12">
        <div class="panel-heading"><div><p class="eyebrow">Incursões em andamento</p><h3>Pets fora do cofre</h3></div></div>
        <div class="content-grid">
          ${activeActivities.map((activity) => `<div class="content-card"><span>${esc(activity.difficultyName)} · ${esc(activity.type)}</span><h3>${esc(activity.petName)}</h3><p>${esc(activity.biome || activity.mapName || "Sem destino")} · risco ${Math.round(Number(activity.risk || 0) * 100)}%</p><button class="ghost-button" type="button" data-action="open-admin-user" data-user-id="${esc(characters.find((entry) => (entry.character.activeActivities || []).some((entryActivity) => entryActivity.id === activity.id))?.user.id || "")}">Abrir ficha</button></div>`).join("") || `<div class="empty-state">Nenhuma atividade em andamento.</div>`}
        </div>
      </article>
    </div>
  `;
}

function renderAdminUsers() {
  const selectedId = state.selectedUserId || state.users.find((user) => user.role !== "admin")?.id || state.users[0]?.id || "";
  state.selectedUserId = selectedId;
  const selectedUser = state.users.find((user) => user.id === selectedId);
  const character = selectedId ? getCharacterFor(selectedId) : null;
  const draft = state.adminUserDraft?.uid === selectedId ? state.adminUserDraft.values : null;
  const affinityOptions = `<option value="">Sem afinidade</option>${optionList(state.content.affinities, draftValue(draft, "affinityId", character?.affinityId || ""))}`;
  return `
    <div class="grid">
      <article class="panel span-4">
        <div class="panel-heading"><div><p class="eyebrow">Players</p><h3>Lista da mesa</h3></div></div>
        <div class="scroll-list">
          ${state.users.map((user) => `
            <button class="user-row ${selectedId === user.id ? "active" : ""}" type="button" data-action="select-user" data-user-id="${esc(user.id)}">
              <strong>${esc(user.displayName || user.email)}</strong>
              <span>${esc(user.role || "player")} · ${esc(user.status || "active")} · ${isUserOnline(user) ? "online" : "offline"}</span>
            </button>
          `).join("")}
        </div>
      </article>
      <article class="panel span-8">
        ${selectedUser && character ? `
          <div class="panel-heading">
            <div>
              <p class="eyebrow">Vasculhar ficha</p>
              <h2>${esc(character.characterName || selectedUser.displayName || selectedUser.email)}</h2>
            </div>
            <span class="tag">${esc(selectedUser.role || "player")}</span>
          </div>
          <form class="form-grid" data-form="admin-user-edit">
            <input type="hidden" name="uid" value="${esc(selectedId)}" />
            <label><span>Nome exibido</span><input name="displayName" value="${esc(draftValue(draft, "displayName", selectedUser.displayName || ""))}" /></label>
            <label><span>Papel</span><select name="role"><option value="player" ${draftValue(draft, "role", selectedUser.role) !== "admin" ? "selected" : ""}>Player</option><option value="admin" ${draftValue(draft, "role", selectedUser.role) === "admin" ? "selected" : ""}>Oráculo</option></select></label>
            <label><span>Status</span><select name="status"><option value="active" ${draftValue(draft, "status", selectedUser.status || "active") === "active" ? "selected" : ""}>Ativo</option><option value="muted" ${draftValue(draft, "status", selectedUser.status || "active") === "muted" ? "selected" : ""}>Mutado</option><option value="suspended" ${draftValue(draft, "status", selectedUser.status || "active") === "suspended" ? "selected" : ""}>Suspenso</option></select></label>
            <label><span>PO</span><input name="gold" type="number" value="${Number(draftValue(draft, "gold", character.gold || 0))}" /></label>
            <label><span>Millennium Coins</span><input name="millenniumCoins" type="number" value="${Number(draftValue(draft, "millenniumCoins", character.millenniumCoins || 0))}" /></label>
            <label><span>Energia diária</span><input name="gachaEnergy" type="number" min="0" max="${GACHA_ENERGY_MAX}" value="${Number(draftValue(draft, "gachaEnergy", currentGachaEnergy(character)))}" /></label>
            <label><span>Fragmentos do Despertar</span><input name="awakeningFragments" type="number" min="0" value="${Number(draftValue(draft, "awakeningFragments", character.gachaFragments?.["Fragmentos do Despertar"] || 0))}" /></label>
            <label><span>Essências de roleta</span><input name="affinityAttempts" type="number" value="${Number(draftValue(draft, "affinityAttempts", character.affinityAttempts || 0))}" /></label>
            <label><span>Pity atual</span><input name="pityCounter" type="number" min="0" value="${Number(draftValue(draft, "pityCounter", character.pityCounter || 0))}" /></label>
            <label><span>Prestígio</span><input name="prestige" type="number" min="0" value="${Number(draftValue(draft, "prestige", prestigeFor(character)))}" /></label>
            <label><span>Slots de poder</span><input name="powerSlots" type="number" min="1" value="${Number(draftValue(draft, "powerSlots", character.powerSlots || 1))}" /></label>
            <label><span>Raça</span><select name="raceId">${optionList(state.content.races, draftValue(draft, "raceId", character.raceId))}</select></label>
            <label><span>Classe</span><select name="classId">${optionList(state.content.classes, draftValue(draft, "classId", character.classId))}</select></label>
            <label><span>Afinidade</span><select name="affinityId">${affinityOptions}</select></label>
            <label><span>Perfil público</span><select name="profilePublic"><option value="true" ${draftValue(draft, "profilePublic", String(character.profilePublic !== false)) === "true" ? "selected" : ""}>Público</option><option value="false" ${draftValue(draft, "profilePublic", String(character.profilePublic !== false)) === "false" ? "selected" : ""}>Privado</option></select></label>
            <button class="primary-button wide" type="submit">Salvar alterações do player</button>
          </form>
           <div class="grid" style="margin-top:18px">
            <div class="panel span-6">
              <p class="eyebrow">Adicionar item</p>
              <form class="form-stack" data-form="admin-add-item">
                <input type="hidden" name="uid" value="${esc(selectedId)}" />
                <select name="itemId">${optionList(state.content.items)}</select>
                <button class="primary-button" type="submit">Colocar item</button>
              </form>
            </div>
            <div class="panel span-6">
              <p class="eyebrow">Itens atuais</p>
              <div class="scroll-list">
                ${(character.inventory || []).map((item) => `
                  <div class="item-row">
                    <strong>${esc(item.name)}</strong>
                    <span>${esc(item.rarity || "Comum")}</span>
                    <button class="danger-button" type="button" data-action="admin-remove-item" data-user-id="${esc(selectedId)}" data-item-instance="${esc(item.instanceId || item.id)}">Remover</button>
                  </div>
                `).join("") || `<div class="empty-state">Sem itens.</div>`}
              </div>
             </div>
           </div>
           <div class="grid admin-vault-grid" style="margin-top:18px">
             <div class="panel span-7">
               <div class="panel-heading"><div><p class="eyebrow">Cofre dimensional</p><h3>Pets, itens e cosméticos invocados</h3></div><span class="tag">${(character.gachaVault || []).length} registro(s)</span></div>
               <div class="admin-vault-list">
                 ${(character.gachaVault || []).map((item) => `
                   <div class="admin-vault-row ${rarityClass(item.rarity)}">
                     <div><span>${esc(item.kind === "pet" ? "Pet" : "Item")} · ${esc(item.rarity || "Comum")}${item.shiny ? " · Radiante" : ""}</span><strong>${esc(item.name)}</strong><p>${"★".repeat(Math.max(1, Number(item.stars || 1)))} · ${esc(item.status || "Livre")} · Poder ${instancePower(item)}</p></div>
                     <div class="action-row">
                       <button class="ghost-button" type="button" data-action="admin-vault-star" data-user-id="${esc(selectedId)}" data-instance-id="${esc(item.instanceId)}" ${Number(item.stars || 1) >= MAX_GACHA_STARS ? "disabled" : ""}>+ estrela</button>
                       <button class="ghost-button" type="button" data-action="admin-vault-radiant" data-user-id="${esc(selectedId)}" data-instance-id="${esc(item.instanceId)}" ${item.shiny ? "disabled" : ""}>Radiante</button>
                       ${(item.status === "Ferido" || item.status === "Morto") ? `<button class="primary-button" type="button" data-action="admin-vault-heal" data-user-id="${esc(selectedId)}" data-instance-id="${esc(item.instanceId)}">Curar</button>` : ""}
                       <button class="danger-button" type="button" data-action="admin-vault-remove" data-user-id="${esc(selectedId)}" data-instance-id="${esc(item.instanceId)}">Remover</button>
                     </div>
                   </div>
                 `).join("") || `<div class="empty-state">Cofre vazio.</div>`}
               </div>
             </div>
             <div class="panel span-5">
               <div class="panel-heading"><div><p class="eyebrow">Atividades</p><h3>Incursões e descansos</h3></div></div>
               <div class="scroll-list">
                 ${(character.activeActivities || []).map((activity) => `<div class="item-row"><span>${esc(activity.type)} · ${esc(activity.difficultyName)}</span><strong>${esc(activity.petName)}</strong><p>${esc(activity.biome || activity.mapName || "Sem destino")}</p><button class="ghost-button" type="button" data-action="admin-clear-activity" data-user-id="${esc(selectedId)}" data-activity-id="${esc(activity.id)}">Liberar pet</button></div>`).join("") || `<div class="empty-state">Nenhuma atividade ativa.</div>`}
                 ${(character.gachaVault || []).filter((item) => item.status === "Ferido" || item.status === "Morto").map((item) => `<div class="item-row"><span>${esc(item.status)}</span><strong>${esc(item.name)}</strong><p>${item.status === "Morto" ? "Pet precisa de recuperação antes de voltar ao cofre." : "Pet ferido não pode entrar em uma incursão."}</p><button class="primary-button" type="button" data-action="admin-vault-heal" data-user-id="${esc(selectedId)}" data-instance-id="${esc(item.instanceId)}">Restaurar</button></div>`).join("")}
               </div>
             </div>
           </div>
         ` : `<div class="empty-state">Selecione um usuário.</div>`}
      </article>
    </div>
  `;
}

function renderAdminContent() {
  return `
    <div class="grid">
      <article class="panel span-12">
        <div class="tabs">
          ${[
            ["race", "Raças"],
            ["class", "Classes"],
            ["category", "Categorias de afinidade"],
            ["affinity", "Afinidades"],
            ["itemCategory", "Categorias de item"],
            ["item", "Itens"],
            ["biome", "Biomas"],
            ["kingdom", "Reinos"],
            ["region", "Regiões"],
            ["npc", "NPCs"],
            ["rules", "Regras"],
            ["faq", "FAQ"],
            ["tutorial", "Tutorial"],
            ["gacha", "Gacha e mapas"],
            ["epic", "Épicos"],
          ].map(([id, label]) => `<button class="tab ${state.contentTab === id ? "active" : ""}" type="button" data-action="content-tab" data-tab="${id}">${label}</button>`).join("")}
        </div>
      </article>
      ${renderContentEditor()}
    </div>
  `;
}

const VISUAL_FORGE_COLLECTIONS = new Set(["gachaPets", "gachaItems", "gachaShardShops", "towerMaps", "gachaBanners", "marketListings", "auctionListings", "craftingRecipes"]);

function forgeBonusInputs(item = {}) {
  const bonus = item.bonus || {};
  return `
    <div class="forge-bonus-grid">
      ${ATTRIBUTES.map((attribute) => `<label><span>${attribute.short}</span><input name="bonus_${attribute.key}" type="number" value="${Number(bonus[attribute.key] || 0)}" /></label>`).join("")}
      <label><span>DEF</span><input name="bonus_def" type="number" value="${Number(bonus.def || 0)}" /></label>
    </div>
  `;
}

function forgeRaritySelect(value = "Comum") {
  return `<select name="rarity">${RARITIES.map((rarity) => `<option value="${rarity}" ${value === rarity ? "selected" : ""}>${rarity}</option>`).join("")}</select>`;
}

function forgeVisualFields(collection, item = {}) {
  const common = `
    <label><span>Nome</span><input name="name" value="${esc(item.name || "")}" required /></label>
    ${mediaInput("imageUrl", "Imagem exibida", item.imageUrl || "", { hint: "Anexe imagem, GIF ou cole um link. A prévia mostra o enquadramento usado no site." })}
    <label><span>Raridade</span>${forgeRaritySelect(item.rarity || "Comum")}</label>
  `;
  if (collection === "gachaPets") {
    return `${common}
      <label><span>Arquétipo</span><input name="archetype" value="${esc(item.archetype || "")}" placeholder="Ex: Guardião" /></label>
      <label><span>Elemento</span><input name="element" value="${esc(item.element || "")}" placeholder="Ex: Solar" /></label>
      <label class="wide"><span>Passiva / traço</span><textarea name="trait" rows="3">${esc(item.trait || "")}</textarea></label>
      <fieldset class="forge-fieldset wide"><legend>Bônus de atributo</legend>${forgeBonusInputs(item)}</fieldset>
      <fieldset class="forge-fieldset wide"><legend>Tower Defense</legend><div class="forge-bonus-grid"><label><span>Dano</span><input name="td_damage" type="number" min="0" value="${Number(item.td?.damage || 10)}" /></label><label><span>Alcance</span><input name="td_range" type="number" min="0" value="${Number(item.td?.range || 80)}" /></label><label><span>Cooldown</span><input name="td_cooldown" type="number" min="0.1" step="0.1" value="${Number(item.td?.cooldown || 1.5)}" /></label></div></fieldset>
      <label class="wide"><span>Descrição</span><textarea name="description" rows="4">${esc(item.description || "")}</textarea></label>`;
  }
  if (collection === "gachaItems") {
    return `${common}
      <label><span>Categoria</span><select name="category"><option value="Equipamento" ${item.category === "Equipamento" ? "selected" : ""}>Equipamento</option><option value="Relíquia" ${item.category === "Relíquia" ? "selected" : ""}>Relíquia</option><option value="Cosmético" ${item.category === "Cosmético" ? "selected" : ""}>Cosmético</option><option value="Moldura" ${item.category === "Moldura" ? "selected" : ""}>Moldura</option><option value="Banner" ${item.category === "Banner" ? "selected" : ""}>Banner</option><option value="Artefato" ${item.category === "Artefato" ? "selected" : ""}>Artefato</option></select></label>
      <label class="wide"><span>Efeito no sistema</span><textarea name="effect" rows="3">${esc(item.effect || "")}</textarea></label>
      <fieldset class="forge-fieldset wide"><legend>Bônus de atributo</legend>${forgeBonusInputs(item)}</fieldset>
      <label class="wide"><span>Descrição</span><textarea name="description" rows="4">${esc(item.description || "")}</textarea></label>`;
  }
  if (collection === "gachaShardShops") {
    return `${common}
      <label><span>Moeda de fragmento</span><select name="shop"><option value="Fragmentos de Mira" ${item.shop === "Fragmentos de Mira" ? "selected" : ""}>Fragmentos de Mira</option><option value="Marcas de Caçada" ${item.shop === "Marcas de Caçada" ? "selected" : ""}>Marcas de Caçada</option><option value="Runas Partidas" ${item.shop === "Runas Partidas" ? "selected" : ""}>Runas Partidas</option><option value="Fragmentos do Despertar" ${item.shop === "Fragmentos do Despertar" ? "selected" : ""}>Fragmentos do Despertar</option></select></label>
      <label><span>Custo</span><input name="cost" type="number" min="1" value="${Number(item.cost || 100)}" /></label>
      <label><span>Entrega</span><select name="type"><option value="Cosmético" ${item.type === "Cosmético" ? "selected" : ""}>Cosmético</option><option value="Moldura" ${item.type === "Moldura" ? "selected" : ""}>Moldura</option><option value="Token" ${item.type === "Token" ? "selected" : ""}>Token</option><option value="Título" ${item.type === "Título" ? "selected" : ""}>Título</option><option value="Passe" ${item.type === "Passe" ? "selected" : ""}>Passe</option><option value="Item" ${item.type === "Item" ? "selected" : ""}>Item</option></select></label>
      <label class="wide"><span>Descrição</span><textarea name="description" rows="4">${esc(item.description || "")}</textarea></label>`;
  }
  if (collection === "towerMaps") {
    return `${common}
      <label><span>Tema do mapa</span><input name="theme" value="${esc(item.theme || "")}" placeholder="Ex: Cidade selada" /></label>
      <label><span>Rotas</span><input name="lanes" type="number" min="1" max="8" value="${Number(item.lanes || 3)}" /></label>
      <label><span>Dificuldade indicada</span><select name="difficulty">${GACHA_DIFFICULTIES.map((difficulty) => `<option value="${difficulty.name}" ${item.difficulty === difficulty.name ? "selected" : ""}>${difficulty.name}</option>`).join("")}</select></label>
      <label class="wide"><span>Descrição do cenário</span><textarea name="description" rows="5">${esc(item.description || "")}</textarea></label>`;
  }
  if (collection === "gachaBanners") {
    const type = item.type || "pets";
    const selected = new Set(Array.isArray(item.featuredIds) ? item.featuredIds : String(item.featuredIds || "").split(",").map((id) => id.trim()));
    const pool = type === "items" ? state.content.gachaItems : state.content.gachaPets;
    return `
      <label><span>Nome do banner</span><input name="name" value="${esc(item.name || "")}" required /></label>
      <label><span>Tipo</span><select name="bannerType"><option value="pets" ${type === "pets" ? "selected" : ""}>Pets</option><option value="items" ${type === "items" ? "selected" : ""}>Itens</option></select></label>
      <label><span>Estado</span><select name="enabled"><option value="true" ${item.enabled !== false ? "selected" : ""}>Ativo</option><option value="false" ${item.enabled === false ? "selected" : ""}>Pausado</option></select></label>
      <label><span>Início (opcional)</span><input name="startsAt" type="datetime-local" value="${esc(dateTimeLocalValue(item.startsAt))}" /></label>
      <label><span>Fim (opcional)</span><input name="endsAt" type="datetime-local" value="${esc(dateTimeLocalValue(item.endsAt))}" /></label>
      <fieldset class="forge-fieldset wide"><legend>Destaques em rate-up</legend><div class="forge-choice-grid">${pool.map((entry) => `<label><input data-featured-choice type="checkbox" value="${esc(entry.id)}" ${selected.has(entry.id) ? "checked" : ""} /> <span>${esc(entry.name)} · ${esc(entry.rarity)}</span></label>`).join("") || "<p>Cadastre pets ou itens antes de criar o banner.</p>"}</div></fieldset>
      <label class="wide"><span>Texto do banner</span><textarea name="description" rows="4">${esc(item.description || "")}</textarea></label>`;
  }
  if (collection === "marketListings" || collection === "auctionListings" || collection === "craftingRecipes") {
    const auction = collection === "auctionListings";
    const crafting = collection === "craftingRecipes";
    return `${common}
      ${auction ? `<label><span>Lance mínimo (PO)</span><input name="minBid" type="number" min="0" value="${Number(item.minBid || 0)}" /></label><label><span>Encerra em</span><input name="endsAt" type="datetime-local" value="${esc(dateTimeLocalValue(item.endsAt))}" /></label>` : crafting ? `<label class="wide"><span>Materiais</span><input name="materials" value="${esc(item.materials || "")}" /></label><label class="wide"><span>Resultado</span><input name="result" value="${esc(item.result || "")}" /></label>` : `<label><span>Preço (PO)</span><input name="price" type="number" min="0" value="${Number(item.price || 0)}" /></label>`}
      <label class="wide"><span>Descrição</span><textarea name="description" rows="4">${esc(item.description || "")}</textarea></label>`;
  }
  return common;
}

function renderVisualForge(collection) {
  const labels = { gachaPets: "Pet de gacha", gachaItems: "Item de gacha", gachaShardShops: "Loja de fragmentos", towerMaps: "Mapa Tower Defense", gachaBanners: "Banner e rate-up", marketListings: "Oferta do mercado", auctionListings: "Leilão", craftingRecipes: "Receita de crafting" };
  return `
    <article class="panel span-5 forge-visual-panel">
      <p class="eyebrow">Forja visual</p>
      <h3>${esc(labels[collection] || "Novo conteúdo")}</h3>
      <p class="hint">Campos guiados: sem JSON, com imagem, prévia e parâmetros do sistema organizados.</p>
      <form class="form-stack" data-form="content-forge-visual">
        <input type="hidden" name="collection" value="${esc(collection)}" />
        ${forgeVisualFields(collection)}
        <button class="primary-button" type="submit">Criar na Forja</button>
      </form>
    </article>
    <article class="panel span-7">
      <div class="content-grid">${contentCards(state.content[collection] || [], (item) => `${item.rarity || item.theme || item.shop || ""} · ${item.description || item.trait || item.effect || item.result || ""}`, collection)}</div>
    </article>
  `;
}

function renderContentEditor() {
  const tab = state.contentTab;
  if (tab === "race") {
    return `
      <article class="panel span-5">${contentForm("content-race", "Nova raça", `
        <label><span>Nome</span><input name="name" required /></label>
        ${mediaInput("imageUrl", "Imagem da raça")}
        <label><span>Bônus JSON</span><input name="bonus" value='{"for":1}' required /></label>
        <label><span>Passiva</span><textarea name="passive" rows="4"></textarea></label>
        <label><span>Descrição</span><textarea name="description" rows="4"></textarea></label>
      `)}</article>
      <article class="panel span-7"><div class="content-grid">${contentCards(state.content.races, (item) => `${bonusToText(item.bonus)} · ${item.passive}`, "races")}</div></article>
    `;
  }
  if (tab === "class") {
    return `
      <article class="panel span-5">${contentForm("content-class", "Nova classe", `
        <label><span>Nome</span><input name="name" required /></label>
        ${mediaInput("imageUrl", "Imagem da classe")}
        <label><span>Bônus JSON</span><input name="bonus" value='{"pod":2}' required /></label>
        <label><span>Papel</span><textarea name="role" rows="4"></textarea></label>
        <label><span>Descrição</span><textarea name="description" rows="4"></textarea></label>
      `)}</article>
      <article class="panel span-7"><div class="content-grid">${contentCards(state.content.classes, (item) => `${bonusToText(item.bonus)} · ${item.role}`, "classes")}</div></article>
    `;
  }
  if (tab === "category") {
    return `
      <article class="panel span-5">${contentForm("content-affinity-category", "Nova categoria", `
        <label><span>Nome</span><input name="name" required /></label>
        <label><span>Peso da roleta</span><input name="weight" type="number" min="0" value="10" required /></label>
        <label><span>Raridade</span><select name="rarity">${RARITIES.map((r) => `<option value="${r}">${r}</option>`).join("")}</select></label>
        <label><span>Cor</span><input name="color" value="#d8b45d" /></label>
        ${mediaInput("imageUrl", "Imagem da categoria")}
        <label><span>Descrição / regra de nerf</span><textarea name="description" rows="4"></textarea></label>
      `)}</article>
      <article class="panel span-7"><div class="content-grid">${contentCards(state.content.affinityCategories, (item) => `Peso ${item.weight} · ${item.rarity} · ${state.content.affinities.filter((affinity) => affinity.categoryId === item.id).length} afinidade(s) · ${categoryOwnerCount(item.id)} player(s)`, "affinityCategories")}</div></article>
    `;
  }
  if (tab === "affinity") {
    return `
      <article class="panel span-5">${contentForm("content-affinity", "Nova afinidade", `
        <label><span>Nome</span><input name="name" required /></label>
        <label><span>Categoria</span><select name="categoryId">${optionList(state.content.affinityCategories)}</select></label>
        ${mediaInput("imageUrl", "Imagem da afinidade")}
        <label><span>Bônus JSON</span><input name="bonus" value='{"pod":2}' required /></label>
        <label><span>Passiva</span><textarea name="passive" rows="4"></textarea></label>
        <label><span>Descrição / ajuste de balanceamento</span><textarea name="description" rows="4"></textarea></label>
      `)}</article>
      <article class="panel span-7"><div class="content-grid">${contentCards(state.content.affinities, (item) => `${getCategory(item.categoryId)?.name} · ${bonusToText(item.bonus)} · ${affinityOwnerCount(item.id)} player(s) · ${item.passive}`, "affinities")}</div></article>
    `;
  }
  if (tab === "itemCategory") {
    return `
      <article class="panel span-5">${contentForm("content-item-category", "Nova categoria de item", `<label><span>Nome</span><input name="name" required /></label>`)}</article>
      <article class="panel span-7"><div class="content-grid">${contentCards(state.content.itemCategories, () => "Categoria de inventário", "itemCategories")}</div></article>
    `;
  }
  if (tab === "biome") {
    return `
      <article class="panel span-5">${contentForm("content-biome", "Novo bioma", `
        <label><span>Nome</span><input name="name" required /></label>
        ${mediaInput("imageUrl", "Imagem do bioma")}
        <label><span>Região maior</span><input name="region" /></label>
        <label><span>Descrição</span><textarea name="description" rows="5"></textarea></label>
      `)}</article>
      <article class="panel span-7"><div class="content-grid">${contentCards(state.content.biomes, (item) => `${item.region || "Mundo"} · ${item.description || ""}`, "biomes")}</div></article>
    `;
  }
  if (tab === "kingdom") {
    return `
      <article class="panel span-5">${contentForm("content-kingdom", "Novo reino", `
        <label><span>Nome</span><input name="name" required /></label>
        ${mediaInput("imageUrl", "Imagem do reino")}
        <label><span>Governante / facção</span><input name="ruler" /></label>
        <label><span>Descrição</span><textarea name="description" rows="5"></textarea></label>
      `)}</article>
      <article class="panel span-7"><div class="content-grid">${contentCards(state.content.kingdoms, (item) => `${item.ruler || "Sem governante"} · ${item.description || ""}`, "kingdoms")}</div></article>
    `;
  }
  if (tab === "region") {
    return `
      <article class="panel span-5">${contentForm("content-region", "Nova região", `
        <label><span>Nome</span><input name="name" required /></label>
        ${mediaInput("imageUrl", "Imagem da região")}
        <label><span>Reino</span><select name="kingdomId"><option value="">Independente</option>${optionList(state.content.kingdoms)}</select></label>
        <label><span>Descrição</span><textarea name="description" rows="5"></textarea></label>
      `)}</article>
      <article class="panel span-7"><div class="content-grid">${contentCards(state.content.regions, (item) => `${state.content.kingdoms.find((kingdom) => kingdom.id === item.kingdomId)?.name || "Independente"} · ${item.description || ""}`, "regions")}</div></article>
    `;
  }
  if (tab === "npc") {
    return `
      <article class="panel span-5">${contentForm("content-npc", "Novo NPC importante", `
        <label><span>Nome</span><input name="name" required /></label>
        ${mediaInput("imageUrl", "Imagem do NPC")}
        <label><span>Função</span><input name="role" /></label>
        <label><span>Descrição</span><textarea name="description" rows="5"></textarea></label>
      `)}</article>
      <article class="panel span-7"><div class="content-grid">${contentCards(state.content.npcs, (item) => `${item.role || "NPC"} · ${item.description || ""}`, "npcs")}</div></article>
    `;
  }
  if (tab === "rules") {
    return `
      <article class="panel span-5">${contentForm("content-rule", "Novo capítulo de regra", `
        <label><span>Título</span><input name="name" required /></label>
        <label><span>Ordem</span><input name="order" type="number" value="1" /></label>
        <label><span>Resumo</span><textarea name="summary" rows="4"></textarea></label>
        <label><span>Versão completa</span><textarea name="full" rows="7"></textarea></label>
      `)}</article>
      <article class="panel span-7"><div class="content-grid">${contentCards(state.content.rulesChapters, (item) => `${item.summary || ""} ${item.full || ""}`, "rulesChapters")}</div></article>
    `;
  }
  if (tab === "faq") {
    return `
      <article class="panel span-5">${contentForm("content-faq", "Nova pergunta frequente", `
        <label><span>Pergunta</span><input name="name" required /></label>
        <label><span>Categoria</span><input name="category" /></label>
        <label><span>Resposta</span><textarea name="answer" rows="6"></textarea></label>
      `)}</article>
      <article class="panel span-7"><div class="content-grid">${contentCards(state.content.faqEntries, (item) => `${item.category || "FAQ"} · ${item.answer || ""}`, "faqEntries")}</div></article>
    `;
  }
  if (tab === "tutorial") {
    return `
      <article class="panel span-5">${contentForm("content-tutorial", "Novo passo de tutorial", `
        <label><span>Título</span><input name="name" required /></label>
        <label><span>Ordem</span><input name="order" type="number" value="1" /></label>
        <label><span>Descrição</span><textarea name="description" rows="6"></textarea></label>
      `)}</article>
      <article class="panel span-7"><div class="content-grid">${contentCards(state.content.tutorialSteps, (item) => `${item.order || 0} · ${item.description || ""}`, "tutorialSteps")}</div></article>
    `;
  }
  if (tab === "gacha") {
    const collections = [
      ["gachaPets", "Pets"],
      ["gachaItems", "Itens"],
      ["gachaShardShops", "Fragmentos"],
      ["towerMaps", "Mapas Tower"],
      ["gachaBanners", "Banners"],
      ["marketListings", "Mercado"],
      ["auctionListings", "Leilão"],
      ["craftingRecipes", "Crafting"],
    ];
    const selected = VISUAL_FORGE_COLLECTIONS.has(state.epicCollection) ? state.epicCollection : "gachaPets";
    return `
      <article class="panel span-12">
        <div class="panel-heading"><div><p class="eyebrow">Sistemas de invocação</p><h3>Gacha, lojas, banners e mapas sem JSON</h3></div><span class="tag">Forja visual</span></div>
        <div class="tabs codex-tabs">${collections.map(([id, label]) => `<button class="tab ${selected === id ? "active" : ""}" type="button" data-action="epic-collection" data-collection="${id}">${label}</button>`).join("")}</div>
      </article>
      ${renderVisualForge(selected)}
    `;
  }
  if (tab === "epic") {
    const collections = [
      ["wantedBoard", "Quadro de procurados"],
      ["bestiary", "Bestiário"],
      ["marketListings", "Mercado"],
      ["auctionListings", "Leilão"],
      ["craftingRecipes", "Crafting"],
      ["techniqueLibrary", "Biblioteca de técnicas"],
      ["achievements", "Conquistas"],
      ["seasonPass", "Passe de temporada"],
      ["passMissions", "Missões do passe"],
      ["gachaPets", "Pets de gacha"],
      ["gachaItems", "Itens de gacha"],
      ["gachaShardShops", "Lojas de fragmentos"],
      ["towerMaps", "Mapas Tower Defense"],
      ["reputationFactions", "Reputações/facções"],
    ];
    const selected = state.epicCollection || "wantedBoard";
    return `
      <article class="panel span-5">
        <p class="eyebrow">Forja épica</p>
        <h3>Criar qualquer módulo</h3>
        <form class="form-stack" data-form="content-generic">
          <label><span>Coleção</span><select name="collection">${collections.map(([id, label]) => `<option value="${id}" ${selected === id ? "selected" : ""}>${label}</option>`).join("")}</select></label>
          <label><span>JSON</span><textarea name="json" rows="14" required>{
  "name": "Novo registro",
  "rarity": "Comum",
  "description": "Descrição editável pelo Oráculo."
}</textarea></label>
          <button class="primary-button" type="submit">Salvar módulo</button>
        </form>
      </article>
      <article class="panel span-7">
        <div class="tabs codex-tabs">${collections.map(([id, label]) => `<button class="tab ${selected === id ? "active" : ""}" type="button" data-action="epic-collection" data-collection="${id}">${label}</button>`).join("")}</div>
        <div class="content-grid">${contentCards(state.content[selected] || [], (item) => `${item.rarity || item.category || item.region || ""} · ${item.description || item.reward || item.result || item.answer || ""}`, selected)}</div>
      </article>
    `;
  }
  return `
    <article class="panel span-5">${contentForm("content-item", "Novo item", `
      <label><span>Nome</span><input name="name" required /></label>
      <label><span>Categoria</span><select name="categoryId">${optionList(state.content.itemCategories)}</select></label>
      ${mediaInput("imageUrl", "Imagem do item")}
      <label><span>Preço</span><input name="price" type="number" value="0" /></label>
      <label><span>Raridade</span><select name="rarity">${RARITIES.map((r) => `<option value="${r}">${r}</option>`).join("")}</select></label>
      <label><span>Bônus JSON</span><input name="bonus" value='{}' /></label>
    `)}</article>
    <article class="panel span-7"><div class="content-grid">${contentCards(state.content.items, (item) => `${item.rarity} · ${bonusToText(item.bonus)} · ${item.price || 0} PO`, "items")}</div></article>
  `;
}

function contentForm(formName, title, fields) {
  return `
    <p class="eyebrow">Adicionar pelo painel</p>
    <h3>${title}</h3>
    <form class="form-stack" data-form="${formName}">
      ${fields}
      <button class="primary-button" type="submit">Salvar</button>
    </form>
  `;
}

function contentCards(items, detail, collection = "") {
  if (!items.length) return `<div class="empty-state">Nada cadastrado.</div>`;
  return sortByName(items).map((item) => `
    <div class="content-card">
      ${item.imageUrl ? `<img class="content-image" src="${esc(item.imageUrl)}" alt="${esc(item.name || item.title || item.id)}" />` : ""}
      <span>${esc(item.id)}</span>
      <h3>${esc(item.name || item.title || item.id)}</h3>
      <p>${esc(detail(item))}</p>
      ${collection ? `<button class="ghost-button" type="button" data-action="edit-content" data-collection="${esc(collection)}" data-id="${esc(item.id)}">Editar</button>` : ""}
    </div>
  `).join("");
}

function renderAdminRewards() {
  const players = state.users.filter((user) => user.role !== "admin");
  return `
    <div class="grid">
      <article class="panel span-6">
        <p class="eyebrow">Prêmios</p>
        <h3>Enviar para player</h3>
        <form class="form-stack" data-form="admin-reward">
          <label><span>Player</span><select name="uid">${players.map((user) => `<option value="${esc(user.id)}">${esc(user.displayName || user.email)}</option>`).join("")}</select></label>
          <label><span>Tipo</span><select name="type">
            <option value="gold">PO</option>
            <option value="coins">Millennium Coins</option>
            <option value="energy">Energia diária</option>
            <option value="fragments">Fragmentos do Despertar</option>
            <option value="item">Item</option>
            <option value="gachaPet">Pet de cofre</option>
            <option value="gachaItem">Item de cofre</option>
            <option value="title">Título</option>
            <option value="token">Token</option>
            <option value="affinity">Afinidade</option>
            <option value="pet">Pet</option>
            <option value="attempts">Essências de roleta</option>
          </select></label>
          <label><span>Quantidade</span><input name="amount" type="number" value="0" /></label>
          <label><span>Item</span><select name="itemId"><option value="">Nenhum</option>${optionList(state.content.items)}</select></label>
          <label><span>Pet/Item de gacha</span><select name="gachaId"><option value="">Nenhum</option>${[...(state.content.gachaPets || []), ...(state.content.gachaItems || [])].map((item) => `<option value="${esc(item.id)}">${esc(item.name)} · ${esc(item.rarity)}</option>`).join("")}</select></label>
          <label><span>Afinidade</span><select name="affinityId"><option value="">Nenhuma</option>${optionList(state.content.affinities)}</select></label>
          <label><span>Nome do título ou pet</span><input name="customName" /></label>
          <label><span>Imagem do pet</span><input name="petImageUrl" /></label>
          <label><span>Raridade</span><select name="rarity">${RARITIES.map((r) => `<option value="${r}">${r}</option>`).join("")}</select></label>
          <button class="primary-button" type="submit">Enviar prêmio</button>
        </form>
      </article>
      <article class="panel span-6">
        <p class="eyebrow">Aviso automático</p>
        <h3>Quando anuncia no global?</h3>
        <p>Prêmios de raridade Raro, Épico, Lendário, Cósmica ou afinidades de categoria rara aparecem no chat global como conquista do Sistema.</p>
        <div class="list">${renderMessages(state.globalMessages.filter((message) => message.type === "rare").slice(-6))}</div>
      </article>
    </div>
  `;
}

function renderAdminMail() {
  const players = state.users.filter((user) => user.role !== "admin");
  return `
    <div class="grid">
      <article class="panel span-7">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Correio místico</p>
            <h2>Enviar pacote para players</h2>
          </div>
          <span class="tag">Aparece na home do player</span>
        </div>
        <form class="form-grid" data-form="admin-mail">
          <label><span>Destino</span><select name="uid">
            <option value="all">Todos os players</option>
            ${players.map((user) => `<option value="${esc(user.id)}">${esc(user.displayName || user.email)}</option>`).join("")}
          </select></label>
          <label><span>Essências</span><input name="essences" type="number" min="0" value="0" /></label>
          <label><span>Título</span><input name="titleName" placeholder="Ex: Herdeiro do Eclipse" /></label>
          <label><span>Raridade do título</span><select name="rarity">${RARITIES.map((r) => `<option value="${r}">${r}</option>`).join("")}</select></label>
          <label><span>Item</span><select name="itemId"><option value="">Nenhum</option>${optionList(state.content.items)}</select></label>
          <label><span>Afinidade</span><select name="affinityId"><option value="">Nenhuma</option>${optionList(state.content.affinities)}</select></label>
          <label class="wide"><span>Mensagem</span><textarea name="message" rows="4" placeholder="Mensagem que o player verá ao entrar."></textarea></label>
          <button class="primary-button wide" type="submit">Enviar correio</button>
        </form>
      </article>
      <article class="panel span-5">
        <p class="eyebrow">Fila recente</p>
        <h3>Presentes pendentes</h3>
        <div class="scroll-list">
          ${players.map((user) => {
            const character = getCharacterFor(user.id);
            return character.pendingGift ? `
              <div class="item-row">
                <span>${esc(user.displayName || user.email)}</span>
                <strong>${esc(character.pendingGift.message || "Presente pendente")}</strong>
                <p>${(character.pendingGift.rewards || []).map(esc).join(" · ")}</p>
              </div>
            ` : "";
          }).join("") || `<div class="empty-state">Nenhum presente pendente agora.</div>`}
        </div>
      </article>
    </div>
  `;
}

function renderAdminRequests() {
  const filter = state.adminRequestFilter || "all";
  const pending = state.progressRequests.filter((request) => request.status === "pendente" && (filter === "all" || request.type === filter));
  const done = state.progressRequests.filter((request) => request.status !== "pendente").slice(0, 16);
  const filters = [
    ["all", "Todos"],
    ["mission", "Missões"],
    ["training", "Treinos"],
    ["power", "Poderes"],
    ["technique", "Técnicas"],
    ["guildMission", "Guilda"],
    ["premiumPass", "Passe"],
  ];
  return `
    <div class="grid">
      <article class="panel span-12">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Validações</p>
            <h2>XP, recompensas e nerf</h2>
          </div>
          <span class="tag">${pending.length} pendente(s)</span>
        </div>
        <div class="stat-grid">
          ${renderStat("Pendentes", pending.length)}
          ${renderStat("Missões", pending.filter((item) => item.type === "mission").length)}
          ${renderStat("Treinos", pending.filter((item) => item.type === "training").length)}
          ${renderStat("Nerfs", pending.filter((item) => item.type === "power" || item.type === "technique").length)}
        </div>
        <div class="tabs codex-tabs">
          ${filters.map(([id, label]) => `<button class="tab ${filter === id ? "active" : ""}" type="button" data-action="request-filter" data-filter="${id}">${label}</button>`).join("")}
        </div>
      </article>
      <article class="panel span-8">
        <div class="panel-heading"><div><p class="eyebrow">Fila principal</p><h3>Aguardando análise</h3></div></div>
        <div class="request-list">${renderProgressRequests(pending, true)}</div>
      </article>
      <article class="panel span-4">
        <div class="panel-heading"><div><p class="eyebrow">Histórico</p><h3>Últimas decisões</h3></div></div>
        <div class="request-list">${renderProgressRequests(done, false)}</div>
      </article>
    </div>
  `;
}

function renderAdminMissions() {
  return `
    <div class="grid">
      <article class="panel span-12">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Reset segunda 00:00</p>
            <h2>Missões semanais</h2>
          </div>
          <div class="action-row">
            <button class="primary-button" type="button" data-action="reset-missions">Gerar semana</button>
            <button class="ghost-button" type="button" data-action="recycle-missions">Reciclar variações</button>
          </div>
        </div>
        <div class="content-grid">${renderMissionList(state.weeklyMissions)}</div>
      </article>
      <article class="panel span-5">
        <p class="eyebrow">Banco de missões</p>
        <h3>Adicionar missão base</h3>
        <form class="form-stack" data-form="content-mission">
          <label><span>Título</span><input name="title" required /></label>
          <label><span>Descrição</span><textarea name="description" rows="4" required></textarea></label>
          <label><span>Raridade</span><select name="rarity">${RARITIES.map((r) => `<option value="${r}">${r}</option>`).join("")}</select></label>
          <label><span>Recompensa</span><input name="reward" value="50 PO" /></label>
          <button class="primary-button" type="submit">Salvar missão base</button>
        </form>
      </article>
      <article class="panel span-7">
        <p class="eyebrow">Pool</p>
        <div class="content-grid">${contentCards(state.content.missionPool, (mission) => `${mission.rarity || "Comum"} · ${mission.reward || "Sem recompensa"} · ${mission.description || ""}`, "missionPool")}</div>
      </article>
    </div>
  `;
}

function renderAdminSettings() {
  return `
    <div class="grid">
      <article class="panel span-6">
        <p class="eyebrow">Configuração global</p>
        <h3>Temporada, tema e aviso</h3>
        <form class="form-stack" data-form="admin-settings">
          <label><span>Nome da temporada</span><input name="seasonName" value="${esc(state.settings.seasonName || "")}" /></label>
          <label><span>Número da temporada</span><input name="seasonNumber" type="number" value="${Number(state.settings.seasonNumber || 1)}" /></label>
          <label><span>Essências padrão da roleta</span><input name="defaultAffinityAttempts" type="number" min="1" value="${Number(state.settings.defaultAffinityAttempts || 3)}" /></label>
          <label><span>Pity garantido</span><input name="pityMax" type="number" min="1" value="${Number(state.settings.pityMax || 30)}" /></label>
          <label><span>Nível máximo</span><input name="levelMax" type="number" min="1" value="${Number(state.settings.levelMax || 99)}" /></label>
          <label><span>Sons da roleta</span><select name="soundEnabled">
            <option value="true" ${state.settings.soundEnabled !== false ? "selected" : ""}>Ativados</option>
            <option value="false" ${state.settings.soundEnabled === false ? "selected" : ""}>Desativados</option>
          </select></label>
          <label><span>Evento de roleta</span><select name="eventActive">
            <option value="false" ${!state.settings.eventActive ? "selected" : ""}>Desativado</option>
            <option value="true" ${state.settings.eventActive ? "selected" : ""}>Ativado</option>
          </select></label>
          <label><span>Nome do evento</span><input name="eventName" value="${esc(state.settings.eventName || "")}" /></label>
          <label><span>Categoria rate-up</span><select name="bannerRateUp"><option value="">Sem rate-up</option>${optionList(state.content.affinityCategories, state.settings.bannerRateUp || "")}</select></label>
          <label><span>Chance do rate-up</span><input name="rareRateUpChance" type="number" min="0" max="1" step="0.01" value="${Number(state.settings.rareRateUpChance ?? 0.3)}" /></label>
          <label><span>Tema de cores</span><select name="theme">
            <option value="default" ${state.settings.theme === "default" ? "selected" : ""}>Dourado</option>
            <option value="arcane" ${state.settings.theme === "arcane" ? "selected" : ""}>Arcano</option>
            <option value="blood" ${state.settings.theme === "blood" ? "selected" : ""}>Sangue</option>
            <option value="forest" ${state.settings.theme === "forest" ? "selected" : ""}>Natureza</option>
            <option value="ocean" ${state.settings.theme === "ocean" ? "selected" : ""}>Oceano</option>
            <option value="void" ${state.settings.theme === "void" ? "selected" : ""}>Vazio</option>
            <option value="ember" ${state.settings.theme === "ember" ? "selected" : ""}>Brasa</option>
            <option value="frost" ${state.settings.theme === "frost" ? "selected" : ""}>Geada</option>
          </select></label>
          <label><span>Tema visual da temporada</span><select name="seasonTheme">
            <option value="awakening" ${state.settings.seasonTheme === "awakening" ? "selected" : ""}>Despertar dos Heróis</option>
            <option value="void" ${state.settings.seasonTheme === "void" ? "selected" : ""}>Vazio Cósmico</option>
            <option value="blood" ${state.settings.seasonTheme === "blood" ? "selected" : ""}>Sangue e Pactos</option>
            <option value="frost" ${state.settings.seasonTheme === "frost" ? "selected" : ""}>Geada Eterna</option>
            <option value="ember" ${state.settings.seasonTheme === "ember" ? "selected" : ""}>Brasa da Forja</option>
            <option value="forest" ${state.settings.seasonTheme === "forest" ? "selected" : ""}>Raízes Vivas</option>
          </select></label>
          <label><span>Aviso global</span><textarea name="globalNotice" rows="5">${esc(state.settings.globalNotice || "")}</textarea></label>
          <button class="primary-button" type="submit">Publicar mudanças</button>
        </form>
      </article>
      <article class="panel span-6">
        <p class="eyebrow">Pesos da roleta</p>
        <h3>Categorias de afinidade</h3>
        <div class="list">
          ${sortByName(state.content.affinityCategories).map((cat) => `
            <div class="item-row">
              <strong>${esc(cat.name)}</strong>
              <p>Peso ${Number(cat.weight || 0)} · ${esc(cat.rarity)}</p>
            </div>
          `).join("")}
        </div>
      </article>
      <article class="panel span-12 panic-panel">
        <div>
          <p class="eyebrow">Operação</p>
          <h3>Atualização emergencial</h3>
          <p>Desconecta todos os players online e força recarregamento de sessão. O Oráculo continua no painel.</p>
        </div>
        <div class="action-row">
          <button class="danger-button" type="button" data-action="panic-refresh">Botão de pânico</button>
          <button class="ghost-button" type="button" data-action="toggle-maintenance" data-mode="${state.settings.maintenanceMode ? "false" : "true"}">${state.settings.maintenanceMode ? "Abrir interface" : "Fechar interface"}</button>
          <button class="primary-button" type="button" data-action="start-rpg" ${state.settings.gameStarted ? "disabled" : ""}>Começar RPG</button>
        </div>
      </article>
    </div>
  `;
}

function renderAdminReports() {
  return `
    <div class="grid">
      <article class="panel span-12">
        <div class="panel-heading"><div><p class="eyebrow">Moderação</p><h2>Bugs e denúncias</h2></div></div>
        <div class="scroll-list">
          ${state.reports.map((report) => `
            <div class="report-row">
              <span>${esc(report.type)} · ${esc(report.status || "aberto")} · ${esc(tsText(report.createdAt))}</span>
              <strong>${esc(report.title || "Denúncia")}</strong>
              <p>${esc(report.description)}</p>
              <p>Autor: ${esc(getUserName(report.reporterId))}${report.targetId ? ` · Alvo: ${esc(getUserName(report.targetId))}` : ""}</p>
              <div class="action-row">
                <button class="ghost-button" type="button" data-action="mark-report" data-report-id="${esc(report.id)}" data-status="em análise">Em análise</button>
                <button class="primary-button" type="button" data-action="mark-report" data-report-id="${esc(report.id)}" data-status="resolvido">Resolvido</button>
              </div>
            </div>
          `).join("") || `<div class="empty-state">Nenhum report enviado.</div>`}
        </div>
      </article>
    </div>
  `;
}

const VIEW_RENDERERS = {
  "player-home": renderPlayerHome,
  profile: renderProfile,
  character: renderCharacterForm,
  roulette: renderRoulette,
  gacha: renderGacha,
  minigames: renderMinigames,
  inventory: renderInventory,
  grimoire: renderGrimoire,
  codex: renderCodex,
  help: renderHelpCenter,
  market: renderMarket,
  pass: renderSeasonPassView,
  ranking: renderRanking,
  hall: renderHallOfFame,
  diary: renderDiary,
  guild: renderGuild,
  chat: renderChatView,
  missions: renderMissions,
  reports: renderReports,
  "admin-home": renderAdminHome,
  "admin-users": renderAdminUsers,
  "admin-content": renderAdminContent,
  "admin-rewards": renderAdminRewards,
  "admin-economy": renderAdminEconomy,
  "admin-mail": renderAdminMail,
  "admin-requests": renderAdminRequests,
  "admin-ops": renderAdminOps,
  "admin-chat": renderChatView,
  "admin-missions": renderAdminMissions,
  "admin-settings": renderAdminSettings,
  "admin-reports": renderAdminReports,
};

function placeholderAvatar() {
  return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240' viewBox='0 0 240 240'%3E%3Crect width='240' height='240' fill='%23181714'/%3E%3Cpath d='M120 44 174 88v64l-54 44-54-44V88z' fill='%23d8b45d' opacity='.35'/%3E%3Ctext x='120' y='132' text-anchor='middle' font-family='serif' font-size='68' fill='%23f3cf7a'%3EM%3C/text%3E%3C/svg%3E";
}

async function handleLogin(form) {
  const values = formValues(form);
  if (!state.firebaseReady) {
    toast("Firebase não carregou. Use o modo demo.");
    return;
  }
  await state.auth.signInWithEmailAndPassword(values.email, values.password);
}

async function handleRegister() {
  if (!state.firebaseReady) {
    toast("Firebase não carregou. Use o modo demo.");
    return;
  }
  const form = document.querySelector('[data-form="login"]');
  const values = formValues(form);
  if (!values.email || !values.password) {
    toast("Informe email e senha para criar conta.");
    return;
  }
  await state.auth.createUserWithEmailAndPassword(values.email, values.password);
}

async function saveCharacter(form) {
  const values = formValues(form);
  const current = currentCharacter();
  const locked = current.creationLocked || Boolean(current.characterName && current.raceId && current.classId);
  const base = {};
  ATTRIBUTES.forEach((attr) => {
    const previous = Number(current.base?.[attr.key] || 0);
    const next = Math.max(0, Number(values[`base_${attr.key}`] || 0));
    base[attr.key] = locked ? Math.max(previous, next) : next;
  });
  const spent = Object.values(base).reduce((sum, value) => sum + value, 0);
  const max = 20 + Number(current.freePoints || 0);
  if (spent > max) {
    toast(`Você distribuiu ${spent} pontos, mas só tem ${max}.`);
    return;
  }
  await updateCharacter(state.user.uid, {
    playerName: values.playerName,
    displayName: values.playerName || state.profile?.displayName,
    characterName: values.characterName,
    characterAge: values.characterAge === "" ? "" : Math.max(0, Number(values.characterAge || 0)),
    characterDescription: values.characterDescription || "",
    avatarUrl: values.avatarUrl,
    bannerUrl: values.bannerUrl || "",
    avatarPosition: values.avatarPosition || "center",
    bannerPosition: values.bannerPosition || "center",
    raceId: locked ? current.raceId : values.raceId,
    classId: locked ? current.classId : values.classId,
    creationLocked: true,
    base,
    story: values.story,
    personality: values.personality,
  });
  await writeDoc("users", state.user.uid, { displayName: values.playerName || state.profile?.displayName || state.user.email });
  state.characterDraft = null;
  toast("Ficha salva.");
}

async function rollAffinity(qty = 1) {
  const character = currentCharacter();
  const amount = Math.max(1, Math.min(10, Number(qty || 1)));
  const attempts = Number(character.affinityAttempts ?? state.settings.defaultAffinityAttempts ?? 0);
  if (state.rolling) return;
  if (isCharacterBanned(character)) {
    toast("Esta ficha está bloqueada temporariamente pelo Oráculo.");
    return;
  }
  if (!state.content.affinities.length) {
    toast("Cadastre afinidades na Forja do Oráculo antes de girar.");
    return;
  }
  if (attempts < amount) {
    playSound("fail");
    toast(`Você precisa de ${amount} essência(s) para este giro.`);
    return;
  }

  state.rolling = true;
  state.lastRoll = null;
  state.lastRollResults = [];
  state.affinityChoices = [];
  render();
  playSound("rolling");

  const core = $("#rouletteCore");
  const names = state.content.affinities.map((item) => item.name);
  let ticks = 0;
  const interval = window.setInterval(() => {
    ticks += 1;
    if (core) core.textContent = names[Math.floor(Math.random() * names.length)] || "?";
  }, amount > 1 ? 58 : 74);

  try {
    let pity = Number(character.pityCounter || 0);
    const results = [];
    for (let index = 0; index < amount; index += 1) {
      const result = buildRollResult(pity);
      if (result) {
        results.push(result);
        pity = result.pityAfter;
      }
    }

    await delay(amount > 1 ? 3300 : 2200);
    window.clearInterval(interval);

    if (!results.length) {
      playSound("fail");
      toast("Não encontrei afinidades para sortear.");
      return;
    }

    const rareResults = results.filter((result) => result.rare);
    const currentAffinity = getAffinity(character.affinityId);
    const currentCategory = currentAffinity ? getCategory(currentAffinity.categoryId) : null;
    const currentScore = currentAffinity ? rarityScore(currentCategory?.rarity) : 0;
    const bestScore = Math.max(...results.map((result) => rarityScore(result.category?.rarity)), currentScore);
    const bestResults = results
      .filter((result) => rarityScore(result.category?.rarity) === bestScore)
      .filter((result, index, list) => list.findIndex((item) => item.affinity.id === result.affinity.id) === index);
    const resultChoice = (result, current = false) => ({
      affinityId: result.affinity.id,
      name: result.affinity.name,
      categoryName: result.category?.name || "",
      rarity: result.category?.rarity || "Comum",
      bonus: bonusToText(result.affinity.bonus || {}),
      current,
    });
    const currentChoice = currentAffinity ? {
      affinityId: currentAffinity.id,
      name: currentAffinity.name,
      categoryName: currentCategory?.name || "",
      rarity: currentCategory?.rarity || "Comum",
      bonus: bonusToText(currentAffinity.bonus || {}),
      current: true,
    } : null;
    const hasNewBest = bestResults.some((result) => result.affinity.id !== currentAffinity?.id);
    const shouldChoose = amount >= 10 && bestScore >= currentScore && bestResults.length > 0
      && (bestResults.length > 1 || (currentChoice && bestScore === currentScore && hasNewBest));
    const choices = shouldChoose
      ? [
        ...(currentChoice && bestScore === currentScore ? [currentChoice] : []),
        ...bestResults.map((result) => resultChoice(result)).filter((choice) => choice.affinityId !== currentChoice?.affinityId),
      ]
      : [];
    const chosenResult = choices.length
      ? null
      : bestScore >= currentScore
        ? (bestResults.find((result) => result.affinity.id !== currentAffinity?.id) || bestResults[0] || null)
        : null;
    const displayBest = bestResults[0] || results.slice().sort((a, b) => rarityScore(b.category?.rarity) - rarityScore(a.category?.rarity))[0];
    const totalRolls = Number(character.totalRolls || 0) + results.length;
    const totalRares = Number(character.totalRares || 0) + rareResults.length;
    const level = Number(character.level || levelFromXp(character.xp || 0));
    const prestige = totalRolls * 10 + totalRares * 250 + level * 20 + Math.floor(Number(character.gold || 0) / 10);
    const history = [
      ...(character.rollHistory || []),
      ...results.map((result) => ({
        id: result.id,
        affinityId: result.affinity.id,
        affinityName: result.affinity.name,
        categoryId: result.category?.id || "",
        categoryName: result.category?.name || "",
        rarity: result.category?.rarity || "Comum",
        rare: result.rare,
        forced: result.forced,
        createdAt: result.createdAt,
      })),
    ].slice(-60);

    state.lastRoll = chosenResult?.affinity || displayBest.affinity;
    state.lastRollResults = results;
    state.affinityChoices = choices;

    const patch = {
      affinityAttempts: attempts - results.length,
      pityCounter: pity,
      totalRolls,
      totalRares,
      prestige,
      rollHistory: history,
    };
    if (chosenResult) {
      patch.affinityId = chosenResult.affinity.id;
      patch.affinitySnapshot = { ...chosenResult.affinity, categoryName: chosenResult.category?.name || "", rarity: chosenResult.category?.rarity || "" };
    }
    await updateCharacter(state.user.uid, patch);

    if (chosenResult && isRareReward(chosenResult.category?.rarity)) {
      playSound("rare");
      await announceRareReward(state.user.uid, chosenResult.affinity.name, chosenResult.category?.rarity, "afinidade");
    } else if (rareResults.length || choices.some((choice) => isRareReward(choice.rarity))) {
      playSound("rare");
    }

    if (choices.length) {
      toast("Giro 10x concluído. Escolha qual afinidade da melhor raridade ficará na ficha.");
    } else if (chosenResult) {
      toast(`${results.length} giro(s): afinidade definida como ${chosenResult.affinity.name} (${chosenResult.category?.rarity || "Comum"}).`);
    } else {
      toast(`${results.length} giro(s): ${displayBest.affinity.name} saiu, mas sua afinidade atual é mais rara e foi mantida.`);
    }
  } finally {
    window.clearInterval(interval);
    state.rolling = false;
    render();
  }
}

async function chooseAffinity(affinityId) {
  const choices = state.affinityChoices || [];
  const choice = choices.find((item) => item.affinityId === affinityId);
  if (!choice) return;
  if (choice.current) {
    state.affinityChoices = [];
    toast("Afinidade atual mantida.");
    render();
    return;
  }
  const affinity = getAffinity(affinityId);
  if (!affinity) return;
  const category = getCategory(affinity.categoryId);
  await updateCharacter(state.user.uid, {
    affinityId: affinity.id,
    affinitySnapshot: { ...affinity, categoryName: category?.name || "", rarity: category?.rarity || "" },
  });
  state.affinityChoices = [];
  state.lastRoll = affinity;
  if (isRareReward(category?.rarity)) {
    playSound("rare");
    await announceRareReward(state.user.uid, affinity.name, category?.rarity, "afinidade");
  }
  toast(`Afinidade escolhida: ${affinity.name}.`);
  render();
}

async function toggleProfilePublic() {
  const character = currentCharacter();
  await updateCharacter(state.user.uid, { profilePublic: !character.profilePublic });
}

async function equipTitle(titleId) {
  const character = currentCharacter();
  const titles = (character.titles || []).map((title) => {
    const id = title.id || slug(title.name);
    return { ...title, id, equipped: id === titleId };
  });
  await updateCharacter(state.user.uid, { titles, activeTitleId: titleId });
  toast("Título equipado.");
}

async function claimPendingGift() {
  await updateCharacter(state.user.uid, { pendingGift: null });
  toast("Presente marcado como recebido.");
}

async function toggleEquip(instanceId) {
  const character = currentCharacter();
  const inventory = (character.inventory || []).map((item) => (
    (item.instanceId || item.id) === instanceId ? { ...item, equipped: !item.equipped } : item
  ));
  await updateCharacter(state.user.uid, { inventory });
}

async function invokeGacha(type = "pets", qty = 1) {
  const character = currentCharacter();
  const kind = type === "items" ? "items" : "pets";
  const amount = Math.max(1, Math.min(10, Number(qty || 1)));
  const cost = gachaCost(kind, amount);
  if (state.rolling) return;
  if (Number(character.millenniumCoins || 0) < cost) {
    toast("Millennium Coins insuficientes para esta invocação.");
    return;
  }
  if (!gachaPool(kind).length) {
    toast("O Oráculo ainda não publicou recompensas para este banner.");
    return;
  }
  state.rolling = true;
  state.lastGachaResults = [];
  render();
  playSound("rolling");
  await delay(amount >= 10 ? 2600 : 1600);
  const results = [];
  for (let index = 0; index < amount; index += 1) {
    const rarity = pickGachaRarity(kind);
    const source = pickGachaReward(kind, rarity.name);
    if (source) results.push(buildGachaInstance(source, kind));
  }
  const history = [
    ...(character.gachaHistory || []),
    ...results.map((item) => ({
      id: item.instanceId,
      kind: item.kind,
      name: item.name,
      rarity: item.rarity,
      shiny: item.shiny,
      stars: item.stars,
      createdAt: new Date().toISOString(),
    })),
  ].slice(-120);
  await updateCharacter(state.user.uid, {
    millenniumCoins: Number(character.millenniumCoins || 0) - cost,
    gachaVault: [...(character.gachaVault || []), ...results],
    gachaHistory: history,
  });
  state.lastGachaResults = results;
  state.rolling = false;
  const rare = results.find((item) => rarityScore(item.rarity) >= rarityScore("Mítico") || item.shiny);
  if (rare) {
    playSound("rare");
    await announceRareReward(state.user.uid, rare.name, rare.rarity, rare.kind === "pet" ? "pet invocado" : "item invocado");
  }
  toast(`${results.length} invocação(ões) concluída(s).`);
  render();
}

async function toggleVaultEquip(instanceId) {
  const character = currentCharacter();
  const vault = (character.gachaVault || []).map((item) => {
    if (item.instanceId !== instanceId || petBusy(item)) return item;
    return { ...item, equipped: !item.equipped, status: item.equipped ? "Livre" : "Equipado" };
  });
  await updateCharacter(state.user.uid, { gachaVault: vault });
}

async function fuseVaultItem(instanceId) {
  const character = currentCharacter();
  const vault = [...(character.gachaVault || [])];
  const item = vault.find((entry) => entry.instanceId === instanceId);
  if (!item || petBusy(item)) return;
  if (Number(item.stars || 1) >= MAX_GACHA_STARS) {
    toast("Este registro já está no máximo de estrelas.");
    return;
  }
  const duplicate = vault.find((entry) => entry.instanceId !== instanceId
    && entry.sourceId === item.sourceId
    && entry.kind === item.kind
    && !entry.locked
    && !petBusy(entry));
  if (!duplicate) {
    toast("Você precisa de uma duplicata livre para fundir.");
    return;
  }
  const next = vault
    .filter((entry) => entry.instanceId !== duplicate.instanceId)
    .map((entry) => entry.instanceId === instanceId ? { ...entry, stars: Math.min(MAX_GACHA_STARS, Number(entry.stars || 1) + 1) } : entry);
  await updateCharacter(state.user.uid, { gachaVault: next });
  toast(`${item.name} subiu para ${Number(item.stars || 1) + 1} estrela(s).`);
}

async function shardVaultItem(instanceId) {
  const character = currentCharacter();
  const item = (character.gachaVault || []).find((entry) => entry.instanceId === instanceId);
  if (!item || item.locked || petBusy(item)) return;
  const fragmentName = gachaFragmentName(item);
  const amount = fragmentGainFor(item);
  await updateCharacter(state.user.uid, {
    gachaVault: (character.gachaVault || []).filter((entry) => entry.instanceId !== instanceId),
    gachaFragments: withFragments(character, fragmentName, amount),
  });
  toast(`${item.name} virou ${amount} ${fragmentName}.`);
}

async function sendVaultMain(instanceId) {
  const character = currentCharacter();
  const item = (character.gachaVault || []).find((entry) => entry.instanceId === instanceId);
  if (!item) return;
  const vault = (character.gachaVault || []).map((entry) => entry.instanceId === instanceId ? { ...entry, exported: true } : entry);
  if (item.kind === "pet") {
    await updateCharacter(state.user.uid, {
      pets: [...(character.pets || []), { ...item, id: item.instanceId, source: "Cofre dimensional" }],
      gachaVault: vault,
    });
    toast("Pet enviado para a vitrine do perfil.");
    return;
  }
  await updateCharacter(state.user.uid, {
    inventory: [...(character.inventory || []), {
      ...item,
      instanceId: cryptoRandom(),
      categoryId: "especial",
      source: "Cofre dimensional",
      equipped: false,
    }],
    gachaVault: vault,
  });
  toast("Item enviado para o inventário principal.");
}

async function recoverPet(instanceId) {
  const character = currentCharacter();
  const item = (character.gachaVault || []).find((entry) => entry.instanceId === instanceId && entry.kind === "pet");
  const cost = petRecoveryCost(item);
  if (!item || !cost) return;
  if (Number(character.millenniumCoins || 0) < cost) {
    toast(`Você precisa de ${cost} Millennium Coins para recuperar este pet.`);
    return;
  }
  const vault = (character.gachaVault || []).map((entry) => entry.instanceId === instanceId
    ? { ...entry, status: "Livre", activityId: "", injuredAt: "", recoveredAt: new Date().toISOString() }
    : entry);
  await updateCharacter(state.user.uid, {
    millenniumCoins: Number(character.millenniumCoins || 0) - cost,
    gachaVault: vault,
  });
  toast(`${item.name} voltou a ficar livre.`);
}

async function redeemShardShop(shopId) {
  const character = currentCharacter();
  const shopItem = (state.content.gachaShardShops || []).find((item) => item.id === shopId);
  if (!shopItem) return;
  const fragmentName = shopItem.shop || "Fragmentos do Despertar";
  const cost = Number(shopItem.cost || 0);
  const balance = Number(character.gachaFragments?.[fragmentName] || 0);
  if (balance < cost) {
    toast(`Você precisa de ${cost} ${fragmentName}.`);
    return;
  }
  const fragments = { ...(character.gachaFragments || {}), [fragmentName]: balance - cost };
  const rewardType = String(shopItem.type || "").toLowerCase();
  const patch = {
    gachaFragments: fragments,
    shopHistory: [
      {
        id: cryptoRandom(),
        name: shopItem.name,
        shop: fragmentName,
        cost,
        type: shopItem.type || "Recompensa",
        createdAt: new Date().toISOString(),
      },
      ...(character.shopHistory || []),
    ].slice(0, 30),
  };
  if (rewardType.includes("passe")) {
    patch.premiumPassUnlocked = true;
  } else if (rewardType.includes("título") || rewardType.includes("titulo")) {
    patch.titles = [...(character.titles || []), { id: cryptoRandom(), name: shopItem.name, rarity: shopItem.rarity || "Comum", description: shopItem.description || "Obtido na loja de fragmentos." }];
  } else if (rewardType.includes("token")) {
    patch.tokens = [...(character.tokens || []), { id: cryptoRandom(), name: shopItem.name, rarity: shopItem.rarity || "Comum", description: shopItem.description || "Obtido na loja de fragmentos." }];
  } else {
    patch.inventory = [...(character.inventory || []), {
      id: shopItem.id,
      instanceId: cryptoRandom(),
      name: shopItem.name,
      rarity: shopItem.rarity || "Comum",
      categoryId: "sazonal",
      description: shopItem.description || "",
      source: fragmentName,
      equipped: false,
    }];
  }
  await updateCharacter(state.user.uid, patch);
  toast(`${shopItem.name} resgatado.`);
}

function minigameGrade(score, difficulty) {
  const ratio = Number(score || 0) / Math.max(1, Number(difficulty.minScore || 1));
  if (ratio >= 1.6) return { id: "s", label: "S", multiplier: 1.45, passed: true };
  if (ratio >= 1.15) return { id: "a", label: "A", multiplier: 1.22, passed: true };
  if (ratio >= 0.75) return { id: "b", label: "B", multiplier: 1, passed: true };
  if (ratio >= 0.42) return { id: "c", label: "C", multiplier: 0.72, passed: false };
  return { id: "d", label: "D", multiplier: 0.42, passed: false };
}

function minigameReward(difficultyId, score = 0, mode = "aim") {
  const difficulty = difficultyById(difficultyId);
  const grade = minigameGrade(score, difficulty);
  const passed = grade.passed;
  const baseCoins = Math.max(1, Math.round((4 + score / 280) * difficulty.multiplier * grade.multiplier));
  const fragmentName = mode === "hunt" ? "Marcas de Caçada" : mode === "tower" ? "Runas Partidas" : "Fragmentos de Mira";
  const fragments = Math.max(1, Math.round((passed ? 4 : 2) * difficulty.multiplier * grade.multiplier));
  const rareDrop = passed && Math.random() < 0.012 * difficulty.multiplier * grade.multiplier;
  const loot = [`${baseCoins} Millennium Coins`, `${fragments} ${fragmentName}`];
  if (rareDrop) loot.push("Fragmento do Herói Quebrado");
  return { passed, grade: grade.label, coins: baseCoins, fragmentName, fragments, loot, rareDrop };
}

function stopActiveAimGame() {
  const session = state.activeAimSession;
  if (!session) return;
  session.finished = true;
  (session.timers || []).forEach((timer) => window.clearTimeout(timer));
  state.activeAimSession = null;
}

async function spendGachaEnergy(cost) {
  const character = currentCharacter();
  const refresh = refreshGachaEnergy(character);
  const energy = Object.prototype.hasOwnProperty.call(refresh, "gachaEnergy") ? refresh.gachaEnergy : Number(character.gachaEnergy ?? GACHA_ENERGY_MAX);
  if (energy < cost) {
    toast("Energia insuficiente para este desafio.");
    return null;
  }
  return { ...refresh, gachaEnergy: energy - cost, gachaEnergyUpdatedAt: new Date().toISOString() };
}

async function applyMinigameReward(mode, difficultyId, score = 0, extraPatch = {}) {
  const character = currentCharacter();
  const difficulty = difficultyById(difficultyId);
  const energyPatch = await spendGachaEnergy(difficulty.cost);
  if (!energyPatch) return null;
  const reward = minigameReward(difficultyId, score, mode);
  const fragments = withFragments(character, reward.fragmentName, reward.fragments);
  if (reward.rareDrop) fragments["Fragmentos do Despertar"] = Number(fragments["Fragmentos do Despertar"] || 0) + 1;
  await updateCharacter(state.user.uid, {
    ...energyPatch,
    millenniumCoins: Number(character.millenniumCoins || 0) + reward.coins,
    gachaFragments: fragments,
    minigameStats: {
      ...(character.minigameStats || {}),
      [mode]: {
        bestScore: Math.max(Number(character.minigameStats?.[mode]?.bestScore || 0), score),
        plays: Number(character.minigameStats?.[mode]?.plays || 0) + 1,
        [`${difficulty.id}Best`]: Math.max(Number(character.minigameStats?.[mode]?.[`${difficulty.id}Best`] || 0), score),
      },
    },
    minigameHistory: [
      {
        id: cryptoRandom(),
        mode,
        difficultyId: difficulty.id,
        difficultyName: difficulty.name,
        score,
        grade: reward.grade,
        coins: reward.coins,
        fragments: reward.fragments,
        fragmentName: reward.fragmentName,
        rareDrop: reward.rareDrop,
        createdAt: new Date().toISOString(),
      },
      ...(character.minigameHistory || []),
    ].slice(0, 30),
    ...extraPatch,
  });
  if (reward.rareDrop) await announceRareReward(state.user.uid, "Fragmento do Herói Quebrado", "Celestial", "drop secreto");
  toast(`${reward.passed ? "Desafio concluído" : "Falha parcial"} · Rank ${reward.grade}: ${reward.loot.join(" · ")}`);
  return reward;
}

function startAimGame(difficultyId) {
  const difficulty = difficultyById(difficultyId);
  if (currentGachaEnergy() < difficulty.cost) {
    toast("Energia insuficiente para a Prova da Mira.");
    return;
  }
  stopActiveAimGame();
  const seconds = 35;
  let score = 0;
  let remaining = seconds;
  let streak = 0;
  const session = { timers: [], finished: false };
  state.activeAimSession = session;
  $("#modalContent").innerHTML = `
    <p class="eyebrow">Prova da Mira · ${esc(difficulty.name)}</p>
    <h2>Acerte os ecos antes que sumam</h2>
    <div class="aim-hud"><span data-aim-score>0 pontos</span><span data-aim-combo>Combo 0</span><span data-aim-time>${seconds}s</span></div>
    <div class="aim-arena" data-aim-arena></div>
    <div class="hint">Alvo dourado pontua. Alvo branco vale mais. Alvo azul congela o tempo por alguns segundos.</div>
    <button class="ghost-button" type="button" data-action="close-modal">Encerrar sem recompensa</button>
  `;
  $("#modal").hidden = false;
  const arena = $("[data-aim-arena]");
  const scoreEl = $("[data-aim-score]");
  const comboEl = $("[data-aim-combo]");
  const timeEl = $("[data-aim-time]");
  const finish = async () => {
    if (session.finished) return;
    session.finished = true;
    session.timers.forEach((timerId) => window.clearTimeout(timerId));
    await applyMinigameReward("aim", difficulty.id, score);
    state.activeAimSession = null;
    closeModal();
  };
  const addTarget = () => {
    if (!arena || session.finished) return;
    const roll = Math.random();
    const type = roll < 0.08 ? "freeze" : roll < 0.2 ? "rare" : "normal";
    const target = document.createElement("button");
    target.type = "button";
    target.className = `aim-target ${type}`;
    target.style.left = `${Math.random() * 82 + 4}%`;
    target.style.top = `${Math.random() * 74 + 8}%`;
    target.textContent = type === "freeze" ? "⌁" : type === "rare" ? "✦" : "•";
    target.addEventListener("pointerdown", () => {
      streak += 1;
      const streakBonus = Math.min(2.2, 1 + streak * 0.04);
      if (type === "freeze") {
        remaining = Math.min(seconds, remaining + 4);
        score += Math.round(95 * difficulty.multiplier * streakBonus);
      } else {
        score += Math.round((type === "rare" ? 230 : 75) * difficulty.multiplier * streakBonus);
      }
      scoreEl.textContent = `${score} pontos`;
      comboEl.textContent = `Combo ${streak}`;
      timeEl.textContent = `${remaining}s`;
      target.remove();
    }, { once: true });
    arena.appendChild(target);
    const life = type === "rare" ? 760 : type === "freeze" ? 650 : 1150;
    const removeTimer = window.setTimeout(() => {
      if (target.isConnected) {
        streak = 0;
        comboEl.textContent = "Combo 0";
        target.remove();
      }
    }, life);
    session.timers.push(removeTimer);
  };
  const timer = window.setInterval(() => {
    if (session.finished) return;
    remaining -= 1;
    timeEl.textContent = `${remaining}s`;
    if (remaining <= 0) finish();
  }, 1000);
  const spawn = window.setInterval(addTarget, Math.max(230, 880 - difficulty.multiplier * 110));
  session.timers.push(timer, spawn);
}

async function startPetHunt(form) {
  const values = formValues(form);
  const character = currentCharacter();
  const difficulty = difficultyById(values.difficulty || state.minigameDifficulty);
  const energyPatch = await spendGachaEnergy(difficulty.cost);
  if (!energyPatch) return;
  const pet = (character.gachaVault || []).find((item) => item.instanceId === values.petId && item.kind === "pet");
  if (!pet || petBusy(pet)) {
    toast("Escolha um pet livre para a Hunt.");
    return;
  }
  const biome = (state.content.biomes || []).find((item) => item.id === values.biome) || state.content.biomes?.[0] || {};
  const duration = Math.round((8 + difficulty.cost * 7) * 60000);
  const risk = difficulty.risk * Math.max(0.18, 1.15 - rarityScore(pet.rarity) * 0.08 - Number(pet.stars || 1) * 0.035);
  const activity = {
    id: cryptoRandom(),
    type: "Pet Hunt",
    petId: pet.instanceId,
    petName: pet.name,
    difficultyId: difficulty.id,
    difficultyName: difficulty.name,
    biome: biome.name || "Campo desconhecido",
    risk,
    startedAt: new Date().toISOString(),
    endsAt: new Date(Date.now() + duration).toISOString(),
    loot: ["rastros", difficulty.id === "god-slayer" ? "chance secreta" : "materiais"],
  };
  const vault = (character.gachaVault || []).map((item) => item.instanceId === pet.instanceId ? { ...item, status: "Em Hunt", activityId: activity.id, equipped: false } : item);
  await updateCharacter(state.user.uid, {
    ...energyPatch,
    gachaVault: vault,
    activeActivities: [...(character.activeActivities || []), activity],
  });
  form.reset();
  toast(`${pet.name} partiu para ${activity.biome}.`);
}

async function completeActivity(activityId, cancelled = false) {
  const character = currentCharacter();
  const activity = (character.activeActivities || []).find((item) => item.id === activityId);
  if (!activity) return;
  const ready = Date.now() >= (dateFromValue(activity.endsAt)?.getTime() || 0);
  const difficulty = difficultyById(activity.difficultyId);
  const pet = (character.gachaVault || []).find((item) => item.instanceId === activity.petId);
  const score = Math.round((instancePower(pet || {}) * (cancelled ? 0.35 : ready ? 1 : 0.55)) * difficulty.multiplier);
  const reward = minigameReward(activity.difficultyId, score, "hunt");
  const danger = Number(activity.risk || difficulty.risk);
  const deathRisk = cancelled ? danger * 0.08 : danger * (difficulty.id === "god-slayer" ? 0.34 : difficulty.id === "pesadelo" ? 0.18 : 0.08);
  const injuryRisk = cancelled ? danger * 0.25 : danger;
  const died = Math.random() < deathRisk && ["hard", "pesadelo", "god-slayer"].includes(difficulty.id);
  const fell = !died && Math.random() < injuryRisk && difficulty.id !== "noob";
  const status = died ? "Morto" : fell ? "Ferido" : "Livre";
  const fragments = withFragments(character, reward.fragmentName, reward.fragments + (cancelled ? 0 : 2));
  if (reward.rareDrop) fragments["Fragmentos do Despertar"] = Number(fragments["Fragmentos do Despertar"] || 0) + 1;
  const vault = (character.gachaVault || []).map((item) => item.instanceId === activity.petId ? { ...item, status, activityId: "", injuredAt: fell ? new Date().toISOString() : item.injuredAt || "" } : item);
  await updateCharacter(state.user.uid, {
    gachaVault: vault,
    activeActivities: (character.activeActivities || []).filter((item) => item.id !== activityId),
    millenniumCoins: Number(character.millenniumCoins || 0) + (cancelled ? Math.floor(reward.coins * 0.35) : reward.coins),
    gachaFragments: fragments,
  });
  if (reward.rareDrop) await announceRareReward(state.user.uid, "Fragmento do Herói Quebrado", "Celestial", "drop secreto");
  toast(`${activity.petName} voltou${died ? " morto" : fell ? " ferido" : ""}: ${reward.loot.join(" · ")}`);
}

async function startTowerDefense(form) {
  const values = formValues(form);
  const character = currentCharacter();
  const pet = (character.gachaVault || []).find((item) => item.instanceId === values.petId && item.kind === "pet");
  if (!pet || petBusy(pet)) {
    toast("Escolha um pet livre para a partida.");
    return;
  }
  const map = (state.content.towerMaps || []).find((item) => item.id === values.mapId) || {};
  const difficulty = difficultyById(values.difficulty || state.minigameDifficulty);
  const td = pet.td || {};
  const score = Math.round((Number(td.damage || 10) * 80 + Number(td.range || 80) * 8) * difficulty.multiplier * (1 + (Number(pet.stars || 1) - 1) * 0.22));
  const reward = await applyMinigameReward("tower", difficulty.id, score);
  form.reset();
  $("#modalContent").innerHTML = `
    <p class="eyebrow">Tower Defense · ${esc(difficulty.name)}</p>
    <h2>${esc(pet.name)} defendeu ${esc(map.name || "o mapa")}</h2>
    <div class="tower-report">
      <div>${renderStat("Score", score)}</div>
      <div>${renderStat("Ondas", Math.max(3, Math.round(difficulty.multiplier * 3)))}</div>
      <div>${renderStat("Rotas", map.lanes || 3)}</div>
      <div>${renderStat("Rank", reward?.grade || "-")}</div>
    </div>
    <p>${esc(map.description || "A defesa foi calculada pelo poder tático do pet enquanto o modo jogável é preparado.")}</p>
    <p class="hint">${esc((reward?.loot || []).join(" · "))}</p>
  `;
  $("#modal").hidden = false;
  toast(`${pet.name} defendeu ${map.name || "o mapa"} com ${score} pontos.`);
}

function passRewardPatch(character, rewardText, tier) {
  const reward = String(rewardText || "Recompensa do passe");
  const patch = {};
  const gold = Number(reward.match(/(\d+)\s*PO/i)?.[1] || 0);
  const essences = Number(reward.match(/(\d+)\s*ess[eê]ncias?/i)?.[1] || 0);
  const awakening = Number(reward.match(/Fragmentos do Despertar\s*x?(\d+)/i)?.[1] || 0);
  const aimFragments = Number(reward.match(/Fragmentos de Mira\s*x?(\d+)/i)?.[1] || 0);
  const companionFragments = Number(reward.match(/Ecos de Companheiro\s*x?(\d+)/i)?.[1] || 0);
  if (gold) patch.gold = Number(character.gold || 0) + gold;
  if (essences) patch.affinityAttempts = Number(character.affinityAttempts || 0) + essences;
  if (awakening || aimFragments || companionFragments) {
    const fragments = { ...(character.gachaFragments || {}) };
    if (awakening) fragments["Fragmentos do Despertar"] = Number(fragments["Fragmentos do Despertar"] || 0) + awakening;
    if (aimFragments) fragments["Fragmentos de Mira"] = Number(fragments["Fragmentos de Mira"] || 0) + aimFragments;
    if (companionFragments) fragments["Ecos de Companheiro"] = Number(fragments["Ecos de Companheiro"] || 0) + companionFragments;
    patch.gachaFragments = fragments;
  }
  const token = reward.match(/Token:\s*([^+]+)/i)?.[1]?.trim();
  const title = reward.match(/T[ií]tulo:\s*([^+]+)/i)?.[1]?.trim();
  const isCosmetic = /moldura|aura|traje|ticket|pet cosm[eé]tico/i.test(reward);
  if (token) patch.tokens = [...(character.tokens || []), { id: cryptoRandom(), name: token, rarity: tier.rarity || "Comum", description: `Recompensa do Passe do Despertar - nível ${tier.tier}.` }];
  if (title) patch.titles = [...(character.titles || []), { id: cryptoRandom(), name: title, rarity: tier.rarity || "Comum", description: `Recompensa do Passe do Despertar - nível ${tier.tier}.` }];
  if (isCosmetic) {
    const cosmetic = { id: `passe-${tier.id}-${cryptoRandom()}`, instanceId: cryptoRandom(), name: reward, rarity: tier.rarity || "Comum", categoryId: "sazonal", bonus: {}, equipped: false, source: "Passe do Despertar", description: "Recompensa coletada automaticamente pelo passe." };
    patch.inventory = [...(character.inventory || []), cosmetic];
  }
  return patch;
}

async function claimPassReward(tierId, track) {
  const character = currentCharacter();
  const tier = (state.content.seasonPass || []).find((item) => item.id === tierId);
  if (!tier || !["free", "premium"].includes(track)) return;
  const level = Number(character.level || levelFromXp(character.xp || 0));
  const claims = character.passClaims || { free: [], premium: [] };
  if (level < Number(tier.tier || 0)) {
    toast("Alcance esse nível antes de coletar a recompensa.");
    return;
  }
  if (track === "premium" && !character.premiumPassUnlocked) {
    toast("Esta recompensa pertence à trilha Premium.");
    return;
  }
  if ((claims[track] || []).includes(tierId)) {
    toast("Essa recompensa já foi coletada.");
    return;
  }
  const rewardText = track === "premium" ? tier.premiumReward : (tier.freeReward || tier.reward);
  const patch = passRewardPatch(character, rewardText, tier);
  const nextClaims = { free: [...(claims.free || [])], premium: [...(claims.premium || [])] };
  nextClaims[track].push(tierId);
  patch.passClaims = nextClaims;
  patch.prestige = prestigeFor({ ...character, ...patch });
  await updateCharacter(state.user.uid, patch);
  if (isRareReward(tier.rarity)) await announceRareReward(state.user.uid, rewardText, tier.rarity, "recompensa do passe");
  toast(`Recompensa ${track === "premium" ? "Premium" : "Free"} coletada: ${rewardText}.`);
}

async function requestPremiumPass() {
  const character = currentCharacter();
  if (character.premiumPassUnlocked) {
    toast("Seu passe premium já está ativo.");
    return;
  }
  if (pendingProgressRequests().some((request) => request.type === "premiumPass")) {
    toast("Seu pedido de passe premium já está aguardando o Oráculo.");
    return;
  }
  if (Number(character.gold || 0) < 1000) {
    toast("Você precisa de 1.000 PO para solicitar o passe premium.");
    return;
  }
  await addDoc("progressRequests", {
    uid: state.user.uid,
    playerName: state.profile?.displayName || state.user.email,
    characterName: character.characterName || "",
    type: "premiumPass",
    status: "pendente",
    title: "Passe Premium - Temporada do Despertar",
    description: "Solicitação para liberar o passe premium por 1.000 PO.",
    goldCost: 1000,
    xp: 0,
    createdAt: state.demo ? new Date().toISOString() : nowValue(),
  });
  toast("Pedido de passe premium enviado ao Oráculo.");
}

async function requestMarketItem(itemId, currency = "PO") {
  const pools = [
    ...(state.content.marketListings || []),
    ...(state.content.auctionListings || []),
    ...(state.content.craftingRecipes || []),
    ...(state.content.gachaItems || []),
  ];
  const item = pools.find((entry) => entry.id === itemId);
  if (!item) return;
  const alreadyPending = pendingProgressRequests().some((request) => request.type === "market" && request.marketId === itemId);
  if (alreadyPending) {
    toast("Essa solicitação de mercado já está aguardando o Oráculo.");
    return;
  }
  await addDoc("progressRequests", {
    uid: state.user.uid,
    playerName: state.profile?.displayName || state.user.email,
    characterName: currentCharacter().characterName || "",
    type: "market",
    status: "pendente",
    marketId: item.id,
    title: `Mercado - ${item.name}`,
    description: `Pedido de ${item.name}. Moeda sugerida: ${currency}. ${item.description || item.result || ""}`,
    rarity: item.rarity || item.category || "Mercado",
    reward: item.name,
    xp: 0,
    createdAt: state.demo ? new Date().toISOString() : nowValue(),
  });
  toast("Pedido enviado ao Oráculo.");
}

async function buyOfficialMarketItem(itemId) {
  const listing = (state.content.marketListings || []).find((item) => item.id === itemId);
  if (!listing) return;
  const character = currentCharacter();
  const price = Math.max(0, Number(listing.price || 0));
  if (Number(character.gold || 0) < price) {
    toast("PO insuficiente para esta compra.");
    return;
  }
  const item = {
    id: listing.id,
    instanceId: cryptoRandom(),
    name: listing.name,
    rarity: listing.rarity || "Comum",
    categoryId: listing.categoryId || "especial",
    description: listing.description || "Compra oficial do Mercado Millennium.",
    bonus: listing.bonus || {},
    equipped: false,
    source: "Mercado Millennium",
  };
  await updateCharacter(state.user.uid, {
    gold: Number(character.gold || 0) - price,
    inventory: [...(character.inventory || []), item],
    marketHistory: [{ id: cryptoRandom(), type: "compra oficial", name: item.name, price, currency: "PO", createdAt: new Date().toISOString() }, ...(character.marketHistory || [])].slice(0, 50),
  });
  if (isRareReward(item.rarity)) await announceRareReward(state.user.uid, item.name, item.rarity, "compra do mercado");
  toast(`${item.name} entrou no seu inventário.`);
}

async function publishPlayerListing(form) {
  const values = formValues(form);
  const character = currentCharacter();
  const item = (character.inventory || []).find((entry) => (entry.instanceId || entry.id) === values.itemInstance && !entry.marketListed);
  const price = Math.max(1, Number(values.price || 0));
  if (!item || !price) {
    toast("Escolha um item disponível e informe um preço válido.");
    return;
  }
  const listing = {
    sellerId: state.user.uid,
    sellerName: state.profile?.displayName || state.user.email,
    itemSnapshot: { ...item, equipped: false, marketListed: false },
    price,
    currency: values.currency === "coins" ? "coins" : "gold",
    status: "active",
    createdAt: state.demo ? new Date().toISOString() : nowValue(),
  };
  const inventory = (character.inventory || []).map((entry) => (entry.instanceId || entry.id) === (item.instanceId || item.id) ? { ...entry, marketListed: true, equipped: false } : entry);
  await addDoc("playerListings", listing);
  await updateCharacter(state.user.uid, { inventory });
  form.reset();
  toast("Anúncio publicado no Bazar.");
}

async function fundMarketTrade(listingId) {
  const listing = (state.content.playerListings || []).find((entry) => entry.id === listingId && entry.status === "active");
  const character = currentCharacter();
  if (!listing || listing.sellerId === state.user.uid) return;
  const price = Number(listing.price || 0);
  const balance = listing.currency === "coins" ? Number(character.millenniumCoins || 0) : Number(character.gold || 0);
  if (balance < price) {
    toast(`${listing.currency === "coins" ? "Millennium Coins" : "PO"} insuficiente para reservar esta troca.`);
    return;
  }
  const alreadyOpen = (state.marketTrades || []).some((trade) => trade.listingId === listingId && trade.buyerId === state.user.uid && ["funded", "ready"].includes(trade.status));
  if (alreadyOpen) {
    toast("Você já deixou uma garantia para este anúncio.");
    return;
  }
  const patch = listing.currency === "coins"
    ? { millenniumCoins: balance - price }
    : { gold: balance - price };
  await updateCharacter(state.user.uid, patch);
  await addDoc("marketTrades", {
    listingId: listing.id,
    buyerId: state.user.uid,
    sellerId: listing.sellerId,
    participants: [state.user.uid, listing.sellerId],
    itemSnapshot: listing.itemSnapshot,
    price,
    currency: listing.currency,
    status: "funded",
    createdAt: state.demo ? new Date().toISOString() : nowValue(),
  });
  toast("Garantia depositada. O vendedor pode entregar o item agora.");
}

async function acceptMarketTrade(tradeId) {
  const trade = (state.marketTrades || []).find((entry) => entry.id === tradeId);
  const listing = (state.content.playerListings || []).find((entry) => entry.id === trade?.listingId);
  const character = currentCharacter();
  if (!trade || !listing || trade.sellerId !== state.user.uid || trade.status !== "funded") return;
  const itemId = trade.itemSnapshot?.instanceId || trade.itemSnapshot?.id;
  const inventory = (character.inventory || []).filter((item) => (item.instanceId || item.id) !== itemId);
  const patch = trade.currency === "coins"
    ? { inventory, millenniumCoins: Number(character.millenniumCoins || 0) + Number(trade.price || 0) }
    : { inventory, gold: Number(character.gold || 0) + Number(trade.price || 0) };
  await updateCharacter(state.user.uid, patch);
  await writeDoc("playerListings", listing.id, { status: "sold", soldAt: state.demo ? new Date().toISOString() : nowValue(), buyerId: trade.buyerId });
  await writeDoc("marketTrades", trade.id, { status: "ready", acceptedAt: state.demo ? new Date().toISOString() : nowValue() });
  toast("Item entregue. A garantia foi liberada para você e o comprador pode coletar.");
}

async function declineMarketTrade(tradeId) {
  const trade = (state.marketTrades || []).find((entry) => entry.id === tradeId);
  if (!trade || trade.sellerId !== state.user.uid || trade.status !== "funded") return;
  await writeDoc("marketTrades", trade.id, { status: "rejected", rejectedAt: state.demo ? new Date().toISOString() : nowValue() });
  toast("Venda recusada. O comprador já pode reaver a garantia.");
}

async function collectMarketTrade(tradeId) {
  const trade = (state.marketTrades || []).find((entry) => entry.id === tradeId);
  const character = currentCharacter();
  if (!trade || trade.buyerId !== state.user.uid || trade.status !== "ready") return;
  const item = { ...trade.itemSnapshot, instanceId: cryptoRandom(), marketListed: false, equipped: false, source: `Bazar de ${getUserName(trade.sellerId)}` };
  await updateCharacter(state.user.uid, { inventory: [...(character.inventory || []), item] });
  await writeDoc("marketTrades", trade.id, { status: "completed", collectedAt: state.demo ? new Date().toISOString() : nowValue() });
  if (isRareReward(item.rarity)) await announceRareReward(state.user.uid, item.name, item.rarity, "troca do Bazar");
  toast("Item coletado no seu inventário.");
}

async function refundMarketTrade(tradeId) {
  const trade = (state.marketTrades || []).find((entry) => entry.id === tradeId);
  const character = currentCharacter();
  if (!trade || trade.buyerId !== state.user.uid || trade.status !== "rejected") return;
  const patch = trade.currency === "coins"
    ? { millenniumCoins: Number(character.millenniumCoins || 0) + Number(trade.price || 0) }
    : { gold: Number(character.gold || 0) + Number(trade.price || 0) };
  await updateCharacter(state.user.uid, patch);
  await writeDoc("marketTrades", trade.id, { status: "refunded", refundedAt: state.demo ? new Date().toISOString() : nowValue() });
  toast("Garantia devolvida para sua carteira.");
}

function openAuctionBid(auctionId) {
  const auction = (state.content.auctionListings || []).find((item) => item.id === auctionId);
  const highest = auctionHighestBid(auctionId);
  if (!auction) return;
  const minimum = Math.max(Number(auction.minBid || 0), Number(highest?.amount || 0) + 1);
  $("#modalContent").innerHTML = `
    <p class="eyebrow">Leilão da Interface</p>
    <h2>${esc(auction.name)}</h2>
    <p>Lance mínimo atual: <strong>${minimum.toLocaleString("pt-BR")} PO</strong>. O maior lance pode coletar o item quando o relógio encerrar.</p>
    <form class="form-stack" data-form="auction-bid">
      <input type="hidden" name="auctionId" value="${esc(auctionId)}" />
      <label><span>Seu lance em PO</span><input name="amount" type="number" min="${minimum}" value="${minimum}" required /></label>
      <button class="primary-button" type="submit">Confirmar lance</button>
    </form>
  `;
  $("#modal").hidden = false;
}

async function placeAuctionBid(form) {
  const values = formValues(form);
  const auction = (state.content.auctionListings || []).find((item) => item.id === values.auctionId);
  const highest = auctionHighestBid(values.auctionId);
  const character = currentCharacter();
  if (!auction || (dateFromValue(auction.endsAt)?.getTime() || 0) <= Date.now()) {
    toast("Este leilão já foi encerrado.");
    return;
  }
  const minimum = Math.max(Number(auction.minBid || 0), Number(highest?.amount || 0) + 1);
  const amount = Number(values.amount || 0);
  if (amount < minimum || Number(character.gold || 0) < amount) {
    toast(`Seu lance precisa ser de pelo menos ${minimum} PO e caber na sua carteira.`);
    return;
  }
  await addDoc("auctionBids", {
    auctionId: auction.id,
    auctionName: auction.name,
    bidderId: state.user.uid,
    bidderName: state.profile?.displayName || state.user.email,
    amount,
    status: "active",
    createdAt: state.demo ? new Date().toISOString() : nowValue(),
  });
  closeModal();
  toast("Lance registrado. Você pode aumentar a oferta enquanto o leilão estiver aberto.");
}

async function claimAuction(auctionId) {
  const auction = (state.content.auctionListings || []).find((item) => item.id === auctionId);
  const highest = auctionHighestBid(auctionId);
  const character = currentCharacter();
  if (!auction || !highest || highest.bidderId !== state.user.uid || highest.status === "claimed") return;
  if ((dateFromValue(auction.endsAt)?.getTime() || Number.MAX_SAFE_INTEGER) > Date.now()) {
    toast("A coleta só abre depois do encerramento do leilão.");
    return;
  }
  if (Number(character.gold || 0) < Number(highest.amount || 0)) {
    toast("Você não tem mais PO suficiente para cobrir o lance vencedor.");
    return;
  }
  const item = { id: auction.id, instanceId: cryptoRandom(), name: auction.name, rarity: auction.rarity || "Raro", categoryId: "leilao", description: auction.description || "Relíquia conquistada em leilão.", bonus: auction.bonus || {}, equipped: false, source: "Leilão da Interface" };
  await updateCharacter(state.user.uid, { gold: Number(character.gold || 0) - Number(highest.amount || 0), inventory: [...(character.inventory || []), item] });
  await writeDoc("auctionBids", highest.id, { status: "claimed", claimedAt: state.demo ? new Date().toISOString() : nowValue() });
  await announceRareReward(state.user.uid, item.name, item.rarity, "leilão vencido");
  toast("Vitória confirmada. A relíquia entrou no seu inventário.");
}

async function startMission(missionId) {
  const character = currentCharacter();
  const activeMissions = Array.from(new Set([...(character.activeMissions || []), missionId]));
  await updateCharacter(state.user.uid, { activeMissions });
  toast("Missão marcada como escolhida.");
}

async function finishMission(missionId) {
  const mission = state.weeklyMissions.find((item) => item.id === missionId);
  if (!mission) return;
  const alreadyPending = pendingProgressRequests().some((request) => request.type === "mission" && request.missionId === missionId);
  if (alreadyPending) {
    toast("Essa missão já está aguardando aprovação.");
    return;
  }
  await addDoc("progressRequests", {
    uid: state.user.uid,
    playerName: state.profile?.displayName || state.user.email,
    characterName: currentCharacter().characterName || "",
    type: "mission",
    status: "pendente",
    missionId,
    title: mission.title,
    description: mission.description,
    rarity: mission.rarity || "Comum",
    reward: mission.reward || "",
    xp: defaultXpForRequest("mission", mission.rarity),
    createdAt: state.demo ? new Date().toISOString() : nowValue(),
  });
  toast("Conclusão enviada para o Oráculo.");
}

async function submitTrainingRequest(form) {
  const values = formValues(form);
  await addDoc("progressRequests", {
    uid: state.user.uid,
    playerName: state.profile?.displayName || state.user.email,
    characterName: currentCharacter().characterName || "",
    type: "training",
    status: "pendente",
    title: values.title,
    description: values.description,
    xp: defaultXpForRequest("training"),
    createdAt: state.demo ? new Date().toISOString() : nowValue(),
  });
  form.reset();
  toast("Treino enviado para validação.");
}

async function submitCreationRequest(form) {
  const values = formValues(form);
  const character = currentCharacter();
  const type = values.type;
  const powerSlots = Math.max(1, Number(character.powerSlots || 1));
  const powersUsed = approvedPowerCount(character);
  const pendingPower = pendingProgressRequests().some((request) => request.type === "power");
  if (type === "power" && (powersUsed >= powerSlots || pendingPower)) {
    toast(`Você já tem ${powersUsed}/${powerSlots} poder(es) liberado(s). Peça ao Oráculo um novo slot quando subir de tier.`);
    return;
  }
  if (type === "technique" && powersUsed < 1) {
    toast("Crie e aprove um poder base antes de enviar técnicas.");
    return;
  }
  await addDoc("progressRequests", {
    uid: state.user.uid,
    playerName: state.profile?.displayName || state.user.email,
    characterName: character.characterName || "",
    type,
    status: "pendente",
    title: values.title,
    description: values.description,
    xp: 0,
    createdAt: state.demo ? new Date().toISOString() : nowValue(),
  });
  form.reset();
  toast("Criação enviada para análise do Oráculo.");
}

async function saveDiaryEntry(form) {
  const values = formValues(form);
  await addDoc("campaignDiary", {
    type: values.type || (state.role === "admin" ? "event" : "memory"),
    title: values.title,
    text: values.text,
    featured: values.featured === "true",
    authorId: state.user.uid,
    authorName: state.profile?.displayName || state.user.email,
    characterName: currentCharacter().characterName || "",
    createdAt: state.demo ? new Date().toISOString() : nowValue(),
  });
  form.reset();
  toast("Registro publicado no diário.");
}

async function sendGlobalChat(form) {
  if (!canSendChat()) return;
  const values = formValues(form);
  await addGlobalMessage({
    text: values.text,
    type: "global",
  });
  form.reset();
}

function chatIdFor(a, b) {
  return [a, b].sort().join("__");
}

function subscribePrivateChat(targetId) {
  if (state.privateUnsub) state.privateUnsub();
  state.privateUnsub = null;
  state.privateChatError = "";
  state.selectedPrivateUserId = targetId;
  syncPrivateMessages();
  render();
}

async function sendPrivateChat(form) {
  if (!canSendChat()) return;
  const values = formValues(form);
  if (!state.selectedPrivateUserId) return;
  const targetId = state.selectedPrivateUserId;
  const localId = cryptoRandom();
  const message = {
    senderId: state.user.uid,
    senderName: state.profile?.displayName || state.user.email,
    targetId,
    targetName: getUserName(targetId),
    participants: [state.user.uid, targetId],
    text: values.text,
    type: "private",
    createdAt: new Date().toISOString(),
  };
  if (state.demo) {
    state.privateMessages.push({ id: localId, ...message });
    state.directMessages.push({ id: localId, ...message });
    render();
  } else {
    state.privateMessages = [...state.privateMessages, { id: localId, ...message, pending: true }];
    render();
    try {
      await addDoc("directMessages", { ...message, createdAt: nowValue() });
      await pruneMessages("directMessages", state.directMessages, (item) => (item.participants || []).includes(state.user.uid) && (item.participants || []).includes(targetId));
    } catch (error) {
      state.privateMessages = state.privateMessages.filter((item) => item.id !== localId);
      render();
      throw error;
    }
  }
  form.reset();
}

function canSendChat() {
  if (state.profile?.status === "muted") {
    toast("Você está mutado e não pode enviar mensagens agora.");
    return false;
  }
  if (state.profile?.status === "suspended") {
    toast("Sua conta está suspensa. Fale com o Oráculo.");
    return false;
  }
  return true;
}

async function submitReport(type, form) {
  const values = formValues(form);
  await addDoc("reports", {
    type,
    status: "aberto",
    reporterId: state.user.uid,
    reporterName: state.profile?.displayName || state.user.email,
    targetId: values.targetId || "",
    title: values.title || (type === "bug" ? "Bug reportado" : "Denúncia de player"),
    description: values.description,
    createdAt: state.demo ? new Date().toISOString() : nowValue(),
  });
  form.reset();
  toast("Report enviado para o Oráculo.");
}

async function reportMessage(messageId, source) {
  const pool = source === "private" ? state.privateMessages : source === "guild" ? state.guildMessages : state.globalMessages;
  const message = pool.find((item) => item.id === messageId);
  const sourceLabel = { private: "direta", guild: "guilda", global: "global" }[source] || source || "global";
  if (!message) {
    toast("Não encontrei essa mensagem para denunciar.");
    return;
  }
  const index = pool.findIndex((item) => item.id === messageId);
  const context = pool.slice(Math.max(0, index - 2), index + 3)
    .map((item) => `${item.senderName || "Player"}: ${item.text || ""}`)
    .join("\n");
  await addDoc("reports", {
    type: "mensagem",
    status: "aberto",
    reporterId: state.user.uid,
    reporterName: state.profile?.displayName || state.user.email,
    targetId: message.senderId || "",
    title: `Mensagem denunciada (${sourceLabel})`,
    description: `Autor: ${message.senderName || "Player"}\nMensagem: ${message.text || ""}\n\nContexto:\n${context}`,
    messageId,
    source,
    createdAt: state.demo ? new Date().toISOString() : nowValue(),
  });
  toast("Mensagem denunciada ao Oráculo.");
}

async function recordProfileView(uid) {
  if (!uid || uid === state.user?.uid || state.demo) return;
  await writeDoc("profileViews", `${uid}_${state.user.uid}`, {
    targetId: uid,
    viewerId: state.user.uid,
    viewerName: state.profile?.displayName || state.user.email,
    viewedAt: state.demo ? new Date().toISOString() : nowValue(),
  }).catch(() => {});
}

async function sendFriendRequest(uid) {
  if (!uid || uid === state.user.uid) return;
  if (areFriends(state.user.uid, uid)) {
    toast("Vocês já são amigos.");
    return;
  }
  if (pendingFriendRequestWith(uid)) {
    toast("Já existe pedido pendente entre vocês.");
    return;
  }
  await addDoc("socialRequests", {
    type: "friend",
    status: "pendente",
    fromId: state.user.uid,
    fromName: state.profile?.displayName || state.user.email,
    toId: uid,
    toName: getUserName(uid),
    participants: [state.user.uid, uid],
    message: "Pedido de amizade enviado pelo perfil.",
    createdAt: state.demo ? new Date().toISOString() : nowValue(),
  });
  toast("Pedido de amizade enviado.");
}

async function respondSocialRequest(id, accept) {
  const request = state.socialRequests.find((item) => item.id === id);
  if (!request) return;
  if (request.toId !== state.user.uid && state.role !== "admin") {
    toast("Esse pedido não é seu.");
    return;
  }
  if ((request.type === "guildInvite" || request.type === "guildJoinRequest") && accept) {
    const guild = state.guilds.find((item) => item.id === request.guildId);
    if (guild) {
      const joiningUid = request.type === "guildJoinRequest" ? request.fromId : state.user.uid;
      if (guildForUser(joiningUid)) {
        toast("Esse player já está em uma guilda.");
        return;
      }
      if ((guild.memberIds || []).length >= GUILD_MEMBER_LIMIT) {
        toast("Esta guilda já atingiu o limite de membros.");
        return;
      }
      const memberIds = Array.from(new Set([...(guild.memberIds || []), joiningUid]));
      await writeDoc("guilds", guild.id, { memberIds });
    }
  }
  await writeDoc("socialRequests", id, { status: accept ? "aceito" : "recusado", respondedAt: state.demo ? new Date().toISOString() : nowValue() });
  toast(accept ? "Pedido aceito." : "Pedido recusado.");
}

async function createGuild(form) {
  const values = formValues(form);
  const character = currentCharacter();
  if (guildForUser()) {
    toast("Você já pertence a uma guilda.");
    return;
  }
  if (Number(character.gold || 0) < GUILD_CREATE_COST) {
    toast(`Você precisa de ${GUILD_CREATE_COST.toLocaleString("pt-BR")} PO para fundar uma guilda.`);
    return;
  }
  const guildId = slug(values.name || `guild-${cryptoRandom()}`);
  await updateCharacter(state.user.uid, { gold: Number(character.gold || 0) - GUILD_CREATE_COST });
  await writeDoc("guilds", guildId, {
    id: guildId,
    name: values.name,
    imageUrl: values.imageUrl || "",
    description: values.description || "",
    leaderId: state.user.uid,
    memberIds: [state.user.uid],
    createdAt: state.demo ? new Date().toISOString() : nowValue(),
  });
  state.selectedGuildId = guildId;
  form.reset();
  toast("Guilda fundada.");
}

async function saveGuildSettings(form) {
  const values = formValues(form);
  const guild = state.guilds.find((item) => item.id === values.guildId);
  if (!isGuildLeader(guild)) {
    toast("Apenas o líder pode editar a guilda.");
    return;
  }
  await writeDoc("guilds", guild.id, {
    name: values.name,
    imageUrl: values.imageUrl || "",
    description: values.description || "",
    mural: values.mural || "",
  });
  toast("Guilda atualizada.");
}

async function sendGuildInvite(form) {
  const values = formValues(form);
  const guild = state.guilds.find((item) => item.id === values.guildId);
  if (!guild || !isGuildLeader(guild)) return;
  if ((guild.memberIds || []).length >= GUILD_MEMBER_LIMIT) {
    toast("A guilda já está lotada.");
    return;
  }
  if (!values.uid) {
    toast("Escolha um player para convidar.");
    return;
  }
  if (guildForUser(values.uid)) {
    toast("Esse player já pertence a uma guilda.");
    return;
  }
  const exists = state.socialRequests.find((request) => request.type === "guildInvite" && request.guildId === guild.id && request.toId === values.uid && request.status === "pendente");
  if (exists) {
    toast("Esse convite já está pendente.");
    return;
  }
  await addDoc("socialRequests", {
    type: "guildInvite",
    status: "pendente",
    fromId: state.user.uid,
    fromName: state.profile?.displayName || state.user.email,
    toId: values.uid,
    toName: getUserName(values.uid),
    participants: [state.user.uid, values.uid],
    guildId: guild.id,
    guildName: guild.name,
    message: `Convite para entrar na guilda ${guild.name}.`,
    createdAt: state.demo ? new Date().toISOString() : nowValue(),
  });
  form.reset();
  toast("Convite de guilda enviado.");
}

async function requestGuildJoin(guildId) {
  const guild = state.guilds.find((item) => item.id === guildId);
  if (!guild) return;
  if (guildForUser()) {
    toast("Você já pertence a uma guilda.");
    return;
  }
  if ((guild.memberIds || []).length >= GUILD_MEMBER_LIMIT) {
    toast("Esta guilda está lotada.");
    return;
  }
  if (pendingGuildRequest(guild.id)) {
    toast("Seu pedido para essa guilda já está pendente.");
    return;
  }
  await addDoc("socialRequests", {
    type: "guildJoinRequest",
    status: "pendente",
    fromId: state.user.uid,
    fromName: state.profile?.displayName || state.user.email,
    toId: guild.leaderId,
    toName: getUserName(guild.leaderId),
    participants: [state.user.uid, guild.leaderId],
    guildId: guild.id,
    guildName: guild.name,
    message: `${state.profile?.displayName || state.user.email} pediu entrada na guilda ${guild.name}.`,
    createdAt: state.demo ? new Date().toISOString() : nowValue(),
  });
  toast("Pedido de entrada enviado ao líder.");
}

async function removeGuildMember(guildId, uid) {
  const guild = state.guilds.find((item) => item.id === guildId);
  if (!guild || !isGuildLeader(guild) || uid === guild.leaderId) return;
  await writeDoc("guilds", guild.id, { memberIds: (guild.memberIds || []).filter((id) => id !== uid) });
  toast("Membro removido da guilda.");
}

async function sendGuildChat(form) {
  if (!canSendChat()) return;
  const values = formValues(form);
  const guild = state.guilds.find((item) => item.id === values.guildId);
  if (!guild || (state.role !== "admin" && !(guild.memberIds || []).includes(state.user.uid))) return;
  await addDoc("guildMessages", {
    guildId: guild.id,
    senderId: state.user.uid,
    senderName: state.profile?.displayName || state.user.email,
    memberIds: guild.memberIds || [],
    text: values.text,
    type: "guild",
    createdAt: state.demo ? new Date().toISOString() : nowValue(),
  });
  await pruneMessages("guildMessages", state.guildMessages, (message) => message.guildId === guild.id);
  form.reset();
}

async function startGuildMission(form) {
  const values = formValues(form);
  const guild = state.guilds.find((item) => item.id === values.guildId);
  if (!guild || !isGuildLeader(guild)) return;
  const partyIds = Object.keys(values)
    .filter((key) => key.startsWith("party_"))
    .map((key) => key.replace("party_", ""))
    .filter((uid) => (guild.memberIds || []).includes(uid))
    .slice(0, 4);
  if (!partyIds.length) {
    toast("Escolha pelo menos um membro para a party.");
    return;
  }
  const mission = state.guildMissions.find((item) => item.id === values.missionId) || DEFAULT_GUILD_MISSIONS[0];
  await writeDoc("guilds", guild.id, {
    activeMission: {
      missionId: mission.id,
      title: mission.title,
      description: mission.description,
      rarity: mission.rarity,
      reward: mission.reward,
      partyIds,
      startedAt: new Date().toISOString(),
    },
  });
  toast("Party formada para missão de guilda.");
}

async function finishGuildMission(guildId) {
  const guild = state.guilds.find((item) => item.id === guildId);
  if (!guild || !isGuildLeader(guild) || !guild.activeMission) return;
  const mission = guild.activeMission;
  await addDoc("progressRequests", {
    uid: guild.leaderId,
    playerName: state.profile?.displayName || state.user.email,
    characterName: currentCharacter().characterName || "",
    type: "guildMission",
    status: "pendente",
    guildId: guild.id,
    guildName: guild.name,
    partyIds: mission.partyIds || [],
    title: `${guild.name}: ${mission.title}`,
    description: `${mission.description}\nParty: ${(mission.partyIds || []).map(getUserName).join(", ")}`,
    rarity: mission.rarity || "Raro",
    reward: mission.reward || "",
    xp: defaultXpForRequest("mission", mission.rarity) * 2,
    createdAt: state.demo ? new Date().toISOString() : nowValue(),
  });
  await writeDoc("guilds", guild.id, { activeMission: null });
  toast("Conclusão da missão de guilda enviada ao Oráculo.");
}

function openUserProfile(uid) {
  if (!uid) return;
  if (uid === state.user?.uid) {
    state.view = "profile";
    render();
    return;
  }
  const character = findCharacter(uid);
  if (!character) {
    toast("Perfil não encontrado.");
    return;
  }
  const isPrivate = character.profilePublic === false;
  const totals = isPrivate ? null : getTotals(character);
  const race = getRace(character.raceId);
  const klass = getClass(character.classId);
  const affinity = getAffinity(character.affinityId);
  const friendship = areFriends(state.user.uid, uid);
  const pending = pendingFriendRequestWith(uid);
  recordProfileView(uid);
  $("#modalContent").innerHTML = `
    ${character.bannerUrl ? `<img class="profile-banner" style="object-position:${esc(objectPosition(character.bannerPosition))}" src="${esc(character.bannerUrl)}" alt="Banner do personagem" />` : ""}
    <div class="profile-grid">
      <img class="avatar" style="object-position:${esc(objectPosition(character.avatarPosition))}" src="${esc(character.avatarUrl || placeholderAvatar())}" alt="Avatar do personagem" />
      <div>
        <p class="eyebrow">${esc(getUserName(uid))}</p>
        <h2>${esc(character.characterName || "Personagem sem nome")}</h2>
        <p>${isPrivate ? "Perfil privado" : `${esc(race?.name)} · ${esc(klass?.name)} · ${esc(affinity?.name || "Sem afinidade")}`}</p>
        ${isPrivate ? "" : `<p class="profile-description">${esc(character.characterDescription || "Sem descrição pública ainda.")}</p>`}
        <div class="tag-row">
          ${activeTitle(character) ? `<span class="tag">${esc(activeTitle(character).name)}</span>` : `<span class="tag">Sem título</span>`}
        </div>
        <div class="token-row">${renderTokens(character.tokens || [])}</div>
        <div class="action-row" style="margin-top:14px">
          ${friendship ? `<span class="tag">Amigo</span>` : pending ? `<span class="tag">Pedido enviado</span>` : `<button class="primary-button" type="button" data-action="send-friend-request" data-user-id="${esc(uid)}">Adicionar amigo</button>`}
          <button class="ghost-button" type="button" data-action="select-direct-user" data-user-id="${esc(uid)}">Mensagem direta</button>
        </div>
      </div>
    </div>
    ${isPrivate ? `<div class="empty-state">Este player deixou detalhes, itens, história e atributos privados.</div>` : `
      <div class="stat-grid" style="margin-top:16px">
        ${renderStat("Nível", character.level || levelFromXp(character.xp || 0))}
        ${renderStat("Prestígio", prestigeFor(character))}
        ${renderStat("PV máx.", totals.hpMax)}
        ${renderStat("PP máx.", totals.ppMax)}
      </div>
      <div class="grid" style="margin-top:16px">
        <article class="panel span-6"><p class="eyebrow">Pets</p><div class="list">${renderPets(character.pets || [])}</div></article>
        <article class="panel span-6"><p class="eyebrow">Itens</p><div class="inventory-grid">${renderInventoryItems((character.inventory || []).slice(0, 6), false)}</div></article>
      </div>
    `}
  `;
  $("#modal").hidden = false;
}

async function saveContent(collection, payload) {
  const id = slug(payload.name || payload.title);
  await writeDoc(collection, id, { ...payload, id });
  toast("Conteúdo salvo.");
}

async function saveGenericContent(form) {
  const values = formValues(form);
  let payload;
  try {
    payload = JSON.parse(values.json || "{}");
  } catch {
    toast("JSON inválido na Forja épica.");
    return;
  }
  await saveContent(values.collection, payload);
  state.epicCollection = values.collection;
  form.reset();
}

async function acceptTerms() {
  await writeDoc("users", state.user.uid, {
    acceptedTermsVersion: state.settings.rulesVersion || "1.0",
    acceptedTermsAt: state.demo ? new Date().toISOString() : nowValue(),
  });
  state.profile = { ...state.profile, acceptedTermsVersion: state.settings.rulesVersion || "1.0" };
  toast("Termo aceito. Bem-vindo à mesa.");
  render();
}

async function saveAdminOps(form) {
  const values = formValues(form);
  await writeDoc("settings", "system", {
    maintenanceMode: values.maintenanceMode === "true",
    rulesVersion: values.rulesVersion || "1.0",
    termsText: values.termsText || DEFAULT_CONTENT.settings.termsText,
  });
  toast("Operações salvas.");
}

async function copyProfileCard() {
  const character = currentCharacter();
  const affinity = getAffinity(character.affinityId);
  const text = [
    `Millennium RPG - ${character.characterName || "Personagem"}`,
    `Player: ${state.profile?.displayName || state.user.email}`,
    `Nível: ${character.level || levelFromXp(character.xp || 0)} | PO: ${character.gold || 0}`,
    `Afinidade: ${affinity?.name || "Sem afinidade"}`,
    `Título: ${activeTitle(character)?.name || "Sem título"}`,
  ].join("\n");
  await navigator.clipboard?.writeText(text).catch(() => {});
  toast("Cartão do personagem copiado.");
}

function openProfilePreview() {
  const character = currentCharacter();
  const title = activeTitle(character);
  const race = getRace(character.raceId);
  const klass = getClass(character.classId);
  const affinity = getAffinity(character.affinityId);
  const totals = getTotals(character);
  $("#modalContent").innerHTML = `
    <p class="eyebrow">Prévia pública</p>
    <h2>Como sua presença aparece na Interface</h2>
    <article class="profile-preview-card ${character.profilePublic ? "public" : "private"}">
      ${character.bannerUrl ? `<img class="profile-banner" style="object-position:${esc(objectPosition(character.bannerPosition))}" src="${esc(character.bannerUrl)}" alt="Banner do personagem" />` : ""}
      <div class="profile-grid">
        <div class="avatar-frame ${rarityClass(title?.rarity || "Comum")}"><img class="avatar" style="object-position:${esc(objectPosition(character.avatarPosition))}" src="${esc(character.avatarUrl || placeholderAvatar())}" alt="Avatar do personagem" /></div>
        <div>
          <p class="eyebrow">${isUserOnline(state.profile || {}) ? "Online" : "Offline"} · ${esc(state.profile?.displayName || "Player")}</p>
          <h2>${esc(character.characterName || "Personagem sem nome")}</h2>
          <strong class="profile-title-line ${rarityClass(title?.rarity || "Comum")}">${esc(title?.name || "Sem título equipado")}</strong>
          <p>${esc(race?.name || "Raça não definida")} · ${esc(klass?.name || "Classe não definida")} · ${esc(affinity?.name || "Sem afinidade")}</p>
          <div class="token-row">${renderTokens(character.tokens || [])}</div>
        </div>
      </div>
      ${character.profilePublic ? `
        <p class="profile-description">${esc(character.characterDescription || "Sem descrição pública ainda.")}</p>
        <div class="profile-mini-stats">${renderStat("Nível", character.level || levelFromXp(character.xp || 0))}${renderStat("Prestígio", prestigeFor(character))}${renderStat("PV", totals.hpMax)}${renderStat("PP", totals.ppMax)}</div>
      ` : `<div class="empty-state">Os outros players veem avatar, nome, título, tokens e os botões sociais. Os detalhes da ficha continuam ocultos.</div>`}
    </article>
  `;
  $("#modal").hidden = false;
}

function openHelpText(title, text) {
  $("#modalContent").innerHTML = `
    <p class="eyebrow">Ajuda rápida</p>
    <h2>${esc(title || "Como usar")}</h2>
    <p>${esc(text || "Este recurso depende de aprovação ou controle do Oráculo.")}</p>
  `;
  $("#modal").hidden = false;
}

function openItemCompare(instanceId) {
  const character = currentCharacter();
  const item = (character.inventory || []).find((entry) => (entry.instanceId || entry.id) === instanceId);
  if (!item) return;
  const equipped = (character.inventory || []).find((entry) => entry.equipped && entry.categoryId === item.categoryId && (entry.instanceId || entry.id) !== instanceId);
  $("#modalContent").innerHTML = `
    <p class="eyebrow">Comparador</p>
    <h2>${esc(item.name)}</h2>
    <div class="compare-grid">
      <div class="item-row">
        <span>Novo item · ${esc(item.rarity || "Comum")}</span>
        <strong>${esc(item.name)}</strong>
        <p>${esc(bonusToText(item.bonus || {}))}</p>
      </div>
      <div class="item-row">
        <span>Equipado atual</span>
        <strong>${esc(equipped?.name || "Nenhum")}</strong>
        <p>${esc(equipped ? bonusToText(equipped.bonus || {}) : "Nada equipado nessa categoria.")}</p>
      </div>
    </div>
    <button class="primary-button" type="button" data-action="toggle-equip" data-item-instance="${esc(instanceId)}">Equipar / alternar</button>
  `;
  $("#modal").hidden = false;
}

function openContentEdit(collection, id) {
  const item = state.content[collection]?.find((entry) => entry.id === id);
  if (!item) {
    toast("Conteúdo não encontrado.");
    return;
  }
  if (VISUAL_FORGE_COLLECTIONS.has(collection)) {
    openVisualContentEdit(collection, item);
    return;
  }
  $("#modalContent").innerHTML = `
    <p class="eyebrow">Forja</p>
    <h2>Editar ${esc(item.name || item.title || id)}</h2>
    <form class="form-stack" data-form="content-edit-json">
      <input type="hidden" name="collection" value="${esc(collection)}" />
      <input type="hidden" name="id" value="${esc(id)}" />
      <label><span>JSON do conteúdo</span><textarea name="json" rows="14" required>${esc(JSON.stringify(item, null, 2))}</textarea></label>
      <button class="primary-button" type="submit">Salvar edição</button>
    </form>
  `;
  $("#modal").hidden = false;
}

function openVisualContentEdit(collection, item) {
  $("#modalContent").innerHTML = `
    <p class="eyebrow">Forja visual</p>
    <h2>Editar ${esc(item.name || item.title || item.id)}</h2>
    <form class="form-stack" data-form="content-forge-visual">
      <input type="hidden" name="collection" value="${esc(collection)}" />
      <input type="hidden" name="id" value="${esc(item.id)}" />
      ${forgeVisualFields(collection, item)}
      <button class="primary-button" type="submit">Salvar alterações</button>
    </form>
  `;
  $("#modal").hidden = false;
}

async function saveContentEdit(form) {
  const values = formValues(form);
  let payload;
  try {
    payload = JSON.parse(values.json || "{}");
  } catch (error) {
    toast("JSON inválido. Confira vírgulas, aspas e chaves.");
    return;
  }
  const id = values.id || payload.id || slug(payload.name || payload.title);
  await writeDoc(values.collection, id, { ...payload, id });
  closeModal();
  toast("Conteúdo atualizado.");
}

function forgeBonusFromValues(values) {
  return {
    ...Object.fromEntries(ATTRIBUTES.map((attribute) => [attribute.key, Number(values[`bonus_${attribute.key}`] || 0)])),
    def: Number(values.bonus_def || 0),
  };
}

async function saveForgeVisual(form) {
  const values = formValues(form);
  const collection = values.collection;
  if (!VISUAL_FORGE_COLLECTIONS.has(collection)) return;
  const existing = values.id ? state.content[collection]?.find((item) => item.id === values.id) : null;
  const base = { ...(existing || {}), name: values.name || existing?.name || "Novo registro", imageUrl: values.imageUrl || "", rarity: values.rarity || existing?.rarity || "Comum" };
  let payload = base;
  if (collection === "gachaPets") {
    payload = { ...base, archetype: values.archetype || "", element: values.element || "", trait: values.trait || "", description: values.description || "", bonus: forgeBonusFromValues(values), td: { damage: Number(values.td_damage || 0), range: Number(values.td_range || 0), cooldown: Number(values.td_cooldown || 1) } };
  }
  if (collection === "gachaItems") {
    payload = { ...base, category: values.category || "Equipamento", effect: values.effect || "", description: values.description || "", bonus: forgeBonusFromValues(values) };
  }
  if (collection === "gachaShardShops") {
    payload = { ...base, shop: values.shop || "Fragmentos do Despertar", cost: Math.max(1, Number(values.cost || 1)), type: values.type || "Item", description: values.description || "" };
  }
  if (collection === "towerMaps") {
    payload = { ...base, theme: values.theme || "", lanes: Math.max(1, Number(values.lanes || 1)), difficulty: values.difficulty || "Fácil", description: values.description || "" };
  }
  if (collection === "gachaBanners") {
    payload = {
      ...existing,
      id: values.id || slug(values.name),
      name: values.name,
      type: values.bannerType || "pets",
      enabled: values.enabled === "true",
      startsAt: values.startsAt ? new Date(values.startsAt).toISOString() : "",
      endsAt: values.endsAt ? new Date(values.endsAt).toISOString() : "",
      featuredIds: Array.from(form.querySelectorAll("[data-featured-choice]:checked")).map((input) => input.value),
      description: values.description || "",
    };
  }
  if (collection === "marketListings") {
    payload = { ...base, price: Math.max(0, Number(values.price || 0)), description: values.description || "" };
  }
  if (collection === "auctionListings") {
    payload = { ...base, minBid: Math.max(0, Number(values.minBid || 0)), endsAt: values.endsAt ? new Date(values.endsAt).toISOString() : "", description: values.description || "" };
  }
  if (collection === "craftingRecipes") {
    payload = { ...base, materials: values.materials || "", result: values.result || "", description: values.description || "" };
  }
  const id = values.id || payload.id || slug(payload.name || payload.title);
  await writeDoc(collection, id, { ...payload, id });
  state.epicCollection = collection;
  if (!$("#modal").hidden) closeModal();
  form.reset();
  toast("Registro salvo pela Forja visual.");
}

async function saveAdminUser(form) {
  const values = formValues(form);
  const uid = values.uid;
  await writeDoc("users", uid, { displayName: values.displayName, role: values.role, status: values.status || "active" });
  await updateCharacter(uid, {
    displayName: values.displayName,
    gold: Number(values.gold || 0),
    millenniumCoins: Number(values.millenniumCoins || 0),
    gachaEnergy: Math.max(0, Math.min(GACHA_ENERGY_MAX, Number(values.gachaEnergy || 0))),
    gachaEnergyUpdatedAt: new Date().toISOString(),
    gachaFragments: {
      ...(getCharacterFor(uid).gachaFragments || {}),
      "Fragmentos do Despertar": Number(values.awakeningFragments || 0),
    },
    affinityAttempts: Number(values.affinityAttempts || 0),
    pityCounter: Number(values.pityCounter || 0),
    prestige: Number(values.prestige || 0),
    powerSlots: Math.max(1, Number(values.powerSlots || 1)),
    raceId: values.raceId,
    classId: values.classId,
    affinityId: values.affinityId,
    profilePublic: values.profilePublic === "true",
  });
  state.adminUserDraft = null;
  toast("Player atualizado.");
}

async function adminAddItem(form) {
  const values = formValues(form);
  const item = getItem(values.itemId);
  if (!item) return;
  const character = getCharacterFor(values.uid);
  const inventory = [...(character.inventory || []), { ...item, instanceId: cryptoRandom(), equipped: false, source: ORACLE_LABEL }];
  await updateCharacter(values.uid, { inventory });
  await announceRareReward(values.uid, item.name, item.rarity, "item");
  toast("Item adicionado.");
}

async function adminRemoveItem(uid, instanceId) {
  const character = getCharacterFor(uid);
  const inventory = (character.inventory || []).filter((item) => (item.instanceId || item.id) !== instanceId);
  await updateCharacter(uid, { inventory });
  toast("Item removido.");
}

async function adminUpdateVaultItem(uid, instanceId, update) {
  const character = getCharacterFor(uid);
  const target = (character.gachaVault || []).find((item) => item.instanceId === instanceId);
  if (!target) {
    toast("Registro de cofre não encontrado.");
    return;
  }
  const gachaVault = (character.gachaVault || []).map((item) => item.instanceId === instanceId ? { ...item, ...update } : item);
  await updateCharacter(uid, { gachaVault });
}

async function adminAddVaultStar(uid, instanceId) {
  const character = getCharacterFor(uid);
  const item = (character.gachaVault || []).find((entry) => entry.instanceId === instanceId);
  if (!item || Number(item.stars || 1) >= MAX_GACHA_STARS) return;
  await adminUpdateVaultItem(uid, instanceId, { stars: Math.min(MAX_GACHA_STARS, Number(item.stars || 1) + 1) });
  toast("Estrela adicionada ao registro do cofre.");
}

async function adminSetVaultRadiant(uid, instanceId) {
  const character = getCharacterFor(uid);
  const gachaVault = (character.gachaVault || []).map((item) => {
    if (item.instanceId !== instanceId) return item;
    const baseName = item.baseName || String(item.name || "").replace(/^Radiante\s+/, "");
    return { ...item, shiny: true, baseName, name: item.name?.startsWith("Radiante ") ? item.name : `Radiante ${baseName}` };
  });
  await updateCharacter(uid, { gachaVault });
  toast("Registro transformado em Radiante.");
}

async function adminHealVaultPet(uid, instanceId) {
  await adminUpdateVaultItem(uid, instanceId, { status: "Livre", activityId: "", injuredAt: "", recoveredBy: ORACLE_LABEL, recoveredAt: new Date().toISOString() });
  toast("Pet restaurado e liberado.");
}

async function adminRemoveVaultItem(uid, instanceId) {
  const character = getCharacterFor(uid);
  const gachaVault = (character.gachaVault || []).filter((item) => item.instanceId !== instanceId);
  const activeActivities = (character.activeActivities || []).filter((activity) => activity.petId !== instanceId);
  await updateCharacter(uid, { gachaVault, activeActivities });
  toast("Registro removido do cofre.");
}

async function adminClearActivity(uid, activityId) {
  const character = getCharacterFor(uid);
  const activity = (character.activeActivities || []).find((entry) => entry.id === activityId);
  if (!activity) return;
  const activeActivities = (character.activeActivities || []).filter((entry) => entry.id !== activityId);
  const gachaVault = (character.gachaVault || []).map((item) => item.instanceId === activity.petId ? { ...item, status: "Livre", activityId: "" } : item);
  await updateCharacter(uid, { activeActivities, gachaVault });
  toast("Atividade removida e pet liberado.");
}

async function reviewProgressRequest(form) {
  await reviewProgressRequestValues(formValues(form));
}

async function reviewProgressRequestValues(values) {
  const request = state.progressRequests.find((item) => item.id === values.requestId);
  if (!request) return;

  const decision = values.decision;
  const status = decision === "approved" ? "aprovado" : decision === "nerf" ? "nerf solicitado" : "reprovado";
  const adminNote = values.adminNote || "";
  const xpGain = decision === "approved" ? Math.max(0, Number(values.xp || 0)) : 0;
  const goldGain = decision === "approved" ? Math.max(0, Number(values.gold || 0)) : 0;
  const essenceGain = decision === "approved" ? Math.max(0, Number(values.essences || 0)) : 0;
  const character = getCharacterFor(request.uid);
  const patch = {};

  if (decision === "approved" && request.type === "guildMission") {
    const targetIds = (request.partyIds || []).length ? request.partyIds : [request.uid];
    for (const uid of targetIds) {
      const memberCharacter = getCharacterFor(uid);
      const xp = Number(memberCharacter.xp || 0) + xpGain;
      const oldLevel = Number(memberCharacter.level || levelFromXp(memberCharacter.xp || 0));
      const level = levelFromXp(xp);
      const memberPatch = {
        xp,
        level,
        gold: Number(memberCharacter.gold || 0) + goldGain,
        affinityAttempts: Number(memberCharacter.affinityAttempts || 0) + essenceGain,
        pendingGift: {
          id: cryptoRandom(),
          message: `Missão de guilda aprovada: ${request.title}.`,
          rewards: [`${xpGain} XP`, `${goldGain} PO`, `${essenceGain} essência(s)`].filter((item) => !item.startsWith("0 ")),
          createdAt: new Date().toISOString(),
          from: state.profile?.displayName || ORACLE_LABEL,
        },
      };
      if (level > oldLevel) memberPatch.freePoints = Number(memberCharacter.freePoints || 0) + (level - oldLevel);
      memberPatch.prestige = prestigeFor({ ...memberCharacter, ...memberPatch });
      await updateCharacter(uid, memberPatch);
    }
  } else if (decision === "approved") {
    const xp = Number(character.xp || 0) + xpGain;
    const oldLevel = Number(character.level || levelFromXp(character.xp || 0));
    const level = levelFromXp(xp);
    patch.xp = xp;
    patch.level = level;
    patch.gold = Number(character.gold || 0) + goldGain;
    patch.affinityAttempts = Number(character.affinityAttempts || 0) + essenceGain;
    if (level > oldLevel) patch.freePoints = Number(character.freePoints || 0) + (level - oldLevel);
    if (request.type === "premiumPass") {
      patch.premiumPassUnlocked = true;
      patch.gold = Math.max(0, Number(character.gold || 0) - Number(request.goldCost || 1000)) + goldGain;
    }

    if (request.type === "mission" && request.missionId) {
      patch.activeMissions = (character.activeMissions || []).filter((id) => id !== request.missionId);
    }
    if (request.type === "power") {
      const legacyPower = character.power?.name ? [{ id: "base", ...character.power, status: character.power.status || "aprovado" }] : [];
      const powers = (character.powers?.length ? character.powers : legacyPower)
        .filter((power) => power.id !== request.id && power.name !== request.title);
      const approvedPower = { id: request.id, name: request.title, description: request.description, status: "aprovado", adminNote };
      const nextPowers = [...powers, approvedPower];
      patch.powers = nextPowers;
      patch.power = nextPowers[0];
      patch.powerSlots = Math.max(Number(character.powerSlots || 1), nextPowers.length);
    }
    if (request.type === "technique") {
      const techniques = (character.techniques || []).filter((technique) => technique.name || technique.description);
      patch.techniques = [...techniques, { id: request.id, name: request.title, description: request.description, status: "aprovado", adminNote }];
    }
    patch.prestige = prestigeFor({ ...character, ...patch });
    const approvedRewards = [`${xpGain} XP`, `${goldGain} PO`, `${essenceGain} essência(s)`].filter((item) => !item.startsWith("0 "));
    if (request.type === "premiumPass") approvedRewards.push("Passe premium liberado");
    patch.pendingGift = {
      id: cryptoRandom(),
      message: `Validação aprovada: ${request.title}.`,
      rewards: approvedRewards,
      createdAt: new Date().toISOString(),
      from: state.profile?.displayName || ORACLE_LABEL,
    };
    await updateCharacter(request.uid, patch);
  }

  await writeDoc("progressRequests", request.id, {
    status,
    decision,
    adminNote,
    xpApproved: xpGain,
    goldApproved: goldGain,
    essencesApproved: essenceGain,
    reviewedBy: state.profile?.displayName || state.user.email,
    reviewedAt: state.demo ? new Date().toISOString() : nowValue(),
  });

  if (decision === "approved") {
    await addGlobalMessage({
      senderId: "system",
      senderName: "Sistema",
      type: "system",
      text: `${getUserName(request.uid)} recebeu aprovação em ${progressTypeLabel(request.type)}: ${request.title}.`,
    });
  }
  toast(decision === "approved" ? "Solicitação aprovada." : decision === "nerf" ? "Nerf solicitado ao player." : "Solicitação reprovada.");
}

async function quickApproveRequest(requestId) {
  const request = state.progressRequests.find((item) => item.id === requestId);
  if (!request) return;
  await reviewProgressRequestValues({
    requestId,
    decision: "approved",
    xp: defaultXpForRequest(request.type, request.rarity),
    gold: request.type === "mission" ? 50 : request.type === "guildMission" ? 120 : 0,
    essences: request.type === "training" ? 1 : 0,
    adminNote: `Aprovado rápido pelo ${ORACLE_LABEL}.`,
  });
}

async function sendReward(form) {
  const values = formValues(form);
  const uid = values.uid;
  const character = getCharacterFor(uid);
  const rarity = values.rarity || "Comum";
  const patch = {};
  let rewardName = "";
  let rewardType = values.type;
  const pendingRewards = [];

  if (values.type === "gold") {
    const amount = Number(values.amount || 0);
    patch.gold = Number(character.gold || 0) + amount;
    rewardName = `${amount} PO`;
    pendingRewards.push(rewardName);
  }
  if (values.type === "coins") {
    const amount = Number(values.amount || 0);
    patch.millenniumCoins = Number(character.millenniumCoins || 0) + amount;
    rewardName = `${amount} Millennium Coins`;
    pendingRewards.push(rewardName);
  }
  if (values.type === "energy") {
    const amount = Number(values.amount || 0);
    patch.gachaEnergy = Math.max(0, Math.min(GACHA_ENERGY_MAX, currentGachaEnergy(character) + amount));
    patch.gachaEnergyUpdatedAt = new Date().toISOString();
    rewardName = `${amount} energia`;
    pendingRewards.push(rewardName);
  }
  if (values.type === "fragments") {
    const amount = Number(values.amount || 0);
    patch.gachaFragments = withFragments(character, "Fragmentos do Despertar", amount);
    rewardName = `${amount} Fragmentos do Despertar`;
    pendingRewards.push(rewardName);
  }
  if (values.type === "attempts") {
    const amount = Number(values.amount || 0);
    patch.affinityAttempts = Number(character.affinityAttempts || 0) + amount;
    rewardName = `${amount} essência(s)`;
    pendingRewards.push(rewardName);
  }
  if (values.type === "item") {
    const item = getItem(values.itemId);
    if (!item) return;
    patch.inventory = [...(character.inventory || []), { ...item, instanceId: cryptoRandom(), equipped: false, source: `Prêmio ${ORACLE_LABEL}` }];
    rewardName = item.name;
    rewardType = "item";
    pendingRewards.push(`Item: ${item.name}`);
  }
  if (values.type === "gachaPet" || values.type === "gachaItem") {
    const pool = values.type === "gachaPet" ? (state.content.gachaPets || []) : (state.content.gachaItems || []);
    const source = pool.find((item) => item.id === values.gachaId);
    if (!source) return;
    const instance = buildGachaInstance(source, values.type === "gachaPet" ? "pets" : "items");
    patch.gachaVault = [...(character.gachaVault || []), { ...instance, source: `Prêmio ${ORACLE_LABEL}` }];
    rewardName = instance.name;
    rewardType = values.type === "gachaPet" ? "pet de cofre" : "item de cofre";
    pendingRewards.push(`${values.type === "gachaPet" ? "Pet" : "Item"} de cofre: ${instance.name}`);
  }
  if (values.type === "title") {
    rewardName = values.customName || "Título sem nome";
    patch.titles = [...(character.titles || []), { id: slug(rewardName), name: rewardName, rarity }];
    pendingRewards.push(`Título: ${rewardName}`);
  }
  if (values.type === "token") {
    rewardName = values.customName || "Token sem nome";
    patch.tokens = [...(character.tokens || []), { id: slug(`${rewardName}-${cryptoRandom()}`), name: rewardName, rarity, imageUrl: values.petImageUrl || "", icon: "✦", description: `Token concedido pelo ${ORACLE_LABEL}.` }];
    pendingRewards.push(`Token: ${rewardName}`);
  }
  if (values.type === "pet") {
    rewardName = values.customName || "Pet sem nome";
    patch.pets = [...(character.pets || []), { id: slug(rewardName), name: rewardName, imageUrl: values.petImageUrl || "", rarity }];
    pendingRewards.push(`Pet: ${rewardName}`);
  }
  if (values.type === "affinity") {
    const affinity = getAffinity(values.affinityId);
    if (!affinity) return;
    const category = getCategory(affinity.categoryId);
    patch.affinityId = affinity.id;
    patch.affinitySnapshot = { ...affinity, categoryName: category.name, rarity: category.rarity };
    rewardName = affinity.name;
    rewardType = "afinidade";
    pendingRewards.push(`Afinidade: ${affinity.name}`);
  }

  patch.pendingGift = {
    id: cryptoRandom(),
    message: `O ${ORACLE_LABEL} enviou um prêmio para você: ${pendingRewards.join(", ")}.`,
    rewards: pendingRewards,
    createdAt: new Date().toISOString(),
    from: state.profile?.displayName || ORACLE_LABEL,
  };
  await updateCharacter(uid, patch);
  await announceRareReward(uid, rewardName, values.type === "affinity" ? getCategory(getAffinity(values.affinityId)?.categoryId)?.rarity : rarity, rewardType);
  form.reset();
  toast("Prêmio enviado.");
}

async function sendAdminMail(form) {
  const values = formValues(form);
  const players = state.users.filter((user) => user.role !== "admin");
  const targets = values.uid === "all" ? players.map((user) => user.id) : [values.uid].filter(Boolean);
  if (!targets.length) {
    toast("Escolha pelo menos um destino.");
    return;
  }

  const essences = Math.max(0, Number(values.essences || 0));
  const rarity = values.rarity || "Comum";
  const item = values.itemId ? getItem(values.itemId) : null;
  const affinity = values.affinityId ? getAffinity(values.affinityId) : null;
  const affinityCategory = affinity ? getCategory(affinity.categoryId) : null;
  const titleName = String(values.titleName || "").trim();
  const baseRewards = [];
  if (essences) baseRewards.push(`${essences} essência(s)`);
  if (titleName) baseRewards.push(`Título: ${titleName}`);
  if (item) baseRewards.push(`Item: ${item.name}`);
  if (affinity) baseRewards.push(`Afinidade: ${affinity.name}`);

  if (!baseRewards.length && !values.message) {
    toast("Adicione uma recompensa ou mensagem.");
    return;
  }

  for (const uid of targets) {
    const character = getCharacterFor(uid);
    const patch = {};
    if (essences) patch.affinityAttempts = Number(character.affinityAttempts || 0) + essences;
    if (titleName) {
      patch.titles = [...(character.titles || []), { id: `${slug(titleName)}-${cryptoRandom().slice(0, 6)}`, name: titleName, rarity, source: `Correio ${ORACLE_LABEL}` }];
    }
    if (item) {
      patch.inventory = [...(character.inventory || []), { ...item, instanceId: cryptoRandom(), equipped: false, source: `Correio ${ORACLE_LABEL}` }];
    }
    if (affinity) {
      patch.affinityId = affinity.id;
      patch.affinitySnapshot = { ...affinity, categoryName: affinityCategory?.name || "", rarity: affinityCategory?.rarity || "" };
    }
    patch.pendingGift = {
      id: cryptoRandom(),
      message: values.message || `Você recebeu: ${baseRewards.join(", ")}.`,
      rewards: baseRewards,
      createdAt: new Date().toISOString(),
      from: state.profile?.displayName || ORACLE_LABEL,
    };

    await updateCharacter(uid, patch);
    if (titleName) await announceRareReward(uid, titleName, rarity, "título");
    if (item) await announceRareReward(uid, item.name, item.rarity, "item");
    if (affinity) await announceRareReward(uid, affinity.name, affinityCategory?.rarity, "afinidade");
  }

  await addGlobalMessage({
    senderId: "system",
    senderName: "Sistema",
    type: "system",
    text: `Correio místico enviado para ${targets.length} player(s).`,
  });
  form.reset();
  toast("Correio enviado.");
}

function selectWeeklyMissions(recycleOnly = false) {
  const pool = state.content.missionPool.length ? state.content.missionPool : DEFAULT_CONTENT.missionPool;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const chosen = shuffled.slice(0, Math.min(5, shuffled.length));
  while (chosen.length < 5 && pool.length) {
    chosen.push(mutateMission(pool[Math.floor(Math.random() * pool.length)]));
  }
  return chosen.map((mission, index) => recycleOnly || index >= shuffled.length ? mutateMission(mission) : { ...mission, id: `${slug(mission.title)}-${mondayResetKey()}-${index}` });
}

function guildRewardFor(rarity) {
  const table = {
    Comum: "90 PO + 80 XP por membro",
    Incomum: "120 PO + 100 XP por membro",
    Raro: "170 PO + 140 XP por membro",
    Épico: "230 PO + 190 XP por membro + chance de título",
    Lendário: "320 PO + 260 XP por membro + prêmio raro",
    Cósmica: "450 PO + 340 XP por membro + recompensa única",
  };
  return table[rarity] || "170 PO + 140 XP por membro";
}

function selectGuildMissions(recycleOnly = false) {
  const basePool = [
    ...DEFAULT_GUILD_MISSIONS,
    ...(state.content.missionPool.length ? state.content.missionPool : DEFAULT_CONTENT.missionPool),
  ];
  const shuffled = [...basePool].sort(() => Math.random() - 0.5);
  const chosen = shuffled.slice(0, Math.min(4, shuffled.length));
  const guildRarities = ["Raro", "Épico", "Lendário", "Cósmica"];
  return chosen.map((mission, index) => {
    const source = recycleOnly ? mutateMission(mission) : { ...mission };
    const rarity = isRareReward(source.rarity) ? source.rarity : guildRarities[index % guildRarities.length];
    return {
      ...source,
      id: `guild-${slug(source.title)}-${mondayResetKey()}-${index}`,
      title: source.title.startsWith("Operação") ? source.title : `Operação ${source.title}`,
      description: `${source.description || "Missão de alto risco para uma party de guilda."} Exige coordenação de até 4 membros.`,
      rarity,
      reward: guildRewardFor(rarity),
    };
  });
}

function mutateMission(mission) {
  const rarity = RARITIES[Math.floor(Math.random() * RARITIES.length)];
  const hooks = ["Eco", "Variação", "Contrato", "Chamado", "Sinal"];
  const gold = { Comum: 30, Incomum: 45, Raro: 70, Épico: 100, Lendário: 150, Cósmica: 220 }[rarity] || 50;
  return {
    ...mission,
    id: `${slug(mission.title)}-${slug(rarity)}-${cryptoRandom().slice(0, 6)}`,
    title: `${mission.title}: ${hooks[Math.floor(Math.random() * hooks.length)]}`,
    rarity,
    reward: `${gold} PO${isRareReward(rarity) ? " + chance de prêmio raro" : ""}`,
  };
}

async function resetWeeklyMissions(recycleOnly = false) {
  const missions = selectWeeklyMissions(recycleOnly);
  const guildMissions = selectGuildMissions(recycleOnly);
  const key = mondayResetKey();
  if (state.demo) {
    state.weeklyMissions = missions.map((mission) => ({ ...mission, createdAt: new Date().toISOString() }));
    state.guildMissions = guildMissions.map((mission) => ({ ...mission, createdAt: new Date().toISOString() }));
    state.settings.lastWeeklyResetKey = key;
    render();
    return;
  }
  const batch = state.db.batch();
  state.weeklyMissions.forEach((mission) => batch.delete(state.db.collection("weeklyMissions").doc(mission.id)));
  state.guildMissions.forEach((mission) => batch.delete(state.db.collection("guildMissions").doc(mission.id)));
  missions.forEach((mission) => batch.set(state.db.collection("weeklyMissions").doc(mission.id), { ...mission, createdAt: nowValue() }, { merge: true }));
  guildMissions.forEach((mission) => batch.set(state.db.collection("guildMissions").doc(mission.id), { ...mission, createdAt: nowValue() }, { merge: true }));
  batch.set(state.db.collection("settings").doc("system"), { lastWeeklyResetKey: key, updatedAt: nowValue() }, { merge: true });
  await batch.commit();
  await addGlobalMessage({ senderId: "system", senderName: "Sistema", type: "system", text: "Novas missões semanais foram publicadas." });
  toast("Missões semanais atualizadas.");
}

async function maybeResetWeeklyMissions() {
  const key = mondayResetKey();
  if (state.role !== "admin") return;
  if (state.settings.lastWeeklyResetKey === key) return;
  if (!state.user) return;
  await resetWeeklyMissions(false).catch((error) => console.warn("Weekly reset skipped:", error));
}

async function markReport(id, status) {
  await writeDoc("reports", id, { status });
  toast("Report atualizado.");
}

async function panicRefresh() {
  if (state.role !== "admin") return;
  const version = cryptoRandom();
  await writeDoc("settings", "system", {
    panicVersion: version,
    panicAt: state.demo ? new Date().toISOString() : nowValue(),
    panicBy: state.profile?.displayName || state.user.email,
  });
  await Promise.all(state.users
    .filter((user) => user.role !== "admin")
    .map((user) => writeDoc("users", user.id, {
      online: false,
      panicOfflineAt: state.demo ? new Date().toISOString() : nowValue(),
    }).catch(() => {})));
  await addGlobalMessage({
    senderId: "system",
    senderName: "Sistema",
    type: "admin-alert",
    text: `ALERTA: ${ORACLE_LABEL} acionou atualização emergencial da interface.`,
  });
  state.lastPanicVersion = version;
  toast("Pânico acionado. Players serão desconectados.");
}

async function toggleMaintenance(mode) {
  if (state.role !== "admin") return;
  await writeDoc("settings", "system", { maintenanceMode: mode === "true" });
  toast(mode === "true" ? "Interface fechada para players." : "Interface aberta para players.");
}

async function startRpg() {
  if (state.role !== "admin") return;
  const alreadyGranted = state.settings.betaGranted;
  await writeDoc("settings", "system", {
    gameStarted: true,
    betaGranted: true,
    seasonName: "Temporada do Despertar",
    gameStartedAt: state.demo ? new Date().toISOString() : nowValue(),
  });
  if (!alreadyGranted) {
    await Promise.all(state.users.filter((user) => user.role !== "admin").map(async (user) => {
      const character = getCharacterFor(user.id);
      const titleId = "testador-beta";
      const tokenId = "token-testador-beta";
      const titles = (character.titles || []).some((title) => title.id === titleId)
        ? character.titles || []
        : [...(character.titles || []), { id: titleId, name: "Testador Beta", rarity: "Lendário", source: "Temporada do Despertar" }];
      const tokens = (character.tokens || []).some((token) => token.id === tokenId)
        ? character.tokens || []
        : [...(character.tokens || []), { id: tokenId, name: "Beta", rarity: "Lendário", icon: "β", description: "Token exclusivo de quem presenciou o despertar da interface." }];
      await updateCharacter(user.id, {
        titles,
        tokens,
        premiumPassUnlocked: true,
        affinityAttempts: Number(character.affinityAttempts || 0) + 10,
        pendingGift: {
          id: cryptoRandom(),
          message: "A Temporada do Despertar começou. Você recebeu o pacote de Testador Beta.",
          rewards: ["Título Testador Beta", "Token Beta", "10 essências", "Passe premium liberado"],
          createdAt: new Date().toISOString(),
          from: ORACLE_LABEL,
        },
      }).catch(() => {});
    }));
  }
  await addGlobalMessage({ senderId: "system", senderName: "Sistema", type: "rare", rarity: "Lendário", text: "A Temporada do Despertar começou. Os escolhidos receberam o chamado do Oráculo." });
  toast("RPG iniciado e pacote beta entregue.");
}

function openReportModal() {
  $("#modalContent").innerHTML = `
    <p class="eyebrow">Atalho rápido</p>
    <h2>Reportar ao Oráculo</h2>
    <form class="form-stack" data-form="quick-report">
      <label><span>Tipo</span><select name="type"><option value="bug">Bug do site</option><option value="denuncia">Denúncia de player</option></select></label>
      <label><span>Player denunciado, se houver</span><select name="targetId"><option value="">Nenhum</option>${state.users.filter((user) => user.id !== state.user.uid).map((user) => `<option value="${esc(user.id)}">${esc(user.displayName || user.email)}</option>`).join("")}</select></label>
      <label><span>Descrição</span><textarea name="description" rows="5" required></textarea></label>
      <button class="primary-button" type="submit">Enviar</button>
    </form>
  `;
  $("#modal").hidden = false;
}

function closeModal() {
  stopActiveAimGame();
  $("#modal").hidden = true;
  $("#modalContent").innerHTML = "";
}

function wireEvents() {
  ["pointerdown", "keydown", "touchstart", "scroll"].forEach((eventName) => {
    document.addEventListener(eventName, touchActivity, { passive: true });
  });

  document.addEventListener("click", async (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    const action = button.dataset.action;
    playSound("click");

    try {
      if (button.dataset.nav) {
        state.view = button.dataset.nav;
        if (button.closest("#modal")) closeModal();
        render();
      }
      if (action === "register") await handleRegister();
      if (action === "toggle-music") await toggleAmbientMusic();
      if (action === "demo-player") enterDemo("player");
      if (action === "demo-admin") enterDemo("admin");
      if (action === "logout") {
        await setPresence(false);
        cleanupListeners();
        if (state.firebaseReady && state.auth?.currentUser) await state.auth.signOut();
        state.user = null;
        state.demo = false;
        showAuth();
      }
      if (action === "open-report") openReportModal();
      if (action === "open-more-nav") openMoreNav();
      if (action === "close-modal") closeModal();
      if (action === "add-emoji") {
        const textarea = button.closest("form")?.querySelector("textarea[name='text']");
        if (textarea) {
          textarea.value = `${textarea.value}${textarea.value ? " " : ""}${button.dataset.emoji || ""}`;
          textarea.focus();
        }
      }
      if (action === "toggle-profile-public") await toggleProfilePublic();
      if (action === "roll-affinity") await rollAffinity(Number(button.dataset.qty || 1));
      if (action === "choose-affinity") await chooseAffinity(button.dataset.affinityId);
      if (action === "gacha-tab") {
        state.gachaTab = button.dataset.tab;
        render();
      }
      if (action === "vault-tab") {
        state.vaultTab = button.dataset.tab;
        render();
      }
      if (action === "invoke-gacha") await invokeGacha(button.dataset.kind, Number(button.dataset.qty || 1));
      if (action === "toggle-vault-equip") await toggleVaultEquip(button.dataset.instanceId);
      if (action === "fuse-vault-item") await fuseVaultItem(button.dataset.instanceId);
      if (action === "shard-vault-item") await shardVaultItem(button.dataset.instanceId);
      if (action === "send-vault-main") await sendVaultMain(button.dataset.instanceId);
      if (action === "recover-pet") await recoverPet(button.dataset.instanceId);
      if (action === "preview-profile-card") openProfilePreview();
      if (action === "redeem-shard-shop") await redeemShardShop(button.dataset.shopId);
      if (action === "minigame-difficulty") {
        state.minigameDifficulty = button.dataset.difficulty;
        render();
      }
      if (action === "start-aim-game") startAimGame(button.dataset.difficulty || state.minigameDifficulty);
      if (action === "collect-activity") await completeActivity(button.dataset.activityId, false);
      if (action === "cancel-activity") await completeActivity(button.dataset.activityId, true);
      if (action === "request-premium-pass") await requestPremiumPass();
      if (action === "claim-pass-reward") await claimPassReward(button.dataset.tierId, button.dataset.track);
      if (action === "equip-title") await equipTitle(button.dataset.titleId);
      if (action === "claim-gift") await claimPendingGift();
      if (action === "toggle-equip") await toggleEquip(button.dataset.itemInstance);
      if (action === "start-mission") await startMission(button.dataset.missionId);
      if (action === "finish-mission") await finishMission(button.dataset.missionId);
      if (action === "select-direct-user") {
        state.view = state.role === "admin" ? "admin-chat" : "chat";
        subscribePrivateChat(button.dataset.userId);
        closeModal();
        render();
      }
      if (action === "open-user-profile") openUserProfile(button.dataset.userId);
      if (action === "report-message") await reportMessage(button.dataset.messageId, button.dataset.messageSource);
      if (action === "send-friend-request") await sendFriendRequest(button.dataset.userId);
      if (action === "accept-social-request") await respondSocialRequest(button.dataset.requestId, true);
      if (action === "decline-social-request") await respondSocialRequest(button.dataset.requestId, false);
      if (action === "request-guild-join") await requestGuildJoin(button.dataset.guildId);
      if (action === "guild-remove-member") await removeGuildMember(button.dataset.guildId, button.dataset.userId);
      if (action === "finish-guild-mission") await finishGuildMission(button.dataset.guildId);
      if (action === "select-guild") {
        state.selectedGuildId = button.dataset.guildId;
        render();
      }
      if (action === "select-user") {
        state.selectedUserId = button.dataset.userId;
        render();
      }
      if (action === "open-admin-user") {
        state.selectedUserId = button.dataset.userId;
        state.view = "admin-users";
        render();
      }
      if (action === "admin-remove-item") await adminRemoveItem(button.dataset.userId, button.dataset.itemInstance);
      if (action === "admin-vault-star") await adminAddVaultStar(button.dataset.userId, button.dataset.instanceId);
      if (action === "admin-vault-radiant") await adminSetVaultRadiant(button.dataset.userId, button.dataset.instanceId);
      if (action === "admin-vault-heal") await adminHealVaultPet(button.dataset.userId, button.dataset.instanceId);
      if (action === "admin-vault-remove") await adminRemoveVaultItem(button.dataset.userId, button.dataset.instanceId);
      if (action === "admin-clear-activity") await adminClearActivity(button.dataset.userId, button.dataset.activityId);
      if (action === "content-tab") {
        state.contentTab = button.dataset.tab;
        render();
      }
      if (action === "profile-tab") {
        state.profileTab = button.dataset.tab;
        render();
      }
      if (action === "help-tab") {
        state.helpTab = button.dataset.tab;
        render();
      }
      if (action === "market-tab") {
        state.marketTab = button.dataset.tab;
        render();
      }
      if (action === "ranking-tab") {
        state.rankingTab = button.dataset.tab;
        render();
      }
      if (action === "ranking-range") {
        state.rankingRange = button.dataset.range;
        render();
      }
      if (action === "request-filter") {
        state.adminRequestFilter = button.dataset.filter;
        render();
      }
      if (action === "epic-collection") {
        state.epicCollection = button.dataset.collection;
        render();
      }
      if (action === "edit-content") openContentEdit(button.dataset.collection, button.dataset.id);
      if (action === "copy-profile-card") await copyProfileCard();
      if (action === "open-help-text") openHelpText(button.dataset.title, button.dataset.text);
      if (action === "request-market-item") await requestMarketItem(button.dataset.marketId, button.dataset.marketCurrency);
      if (action === "buy-market-item") await buyOfficialMarketItem(button.dataset.marketId);
      if (action === "fund-market-trade") await fundMarketTrade(button.dataset.listingId);
      if (action === "accept-market-trade") await acceptMarketTrade(button.dataset.tradeId);
      if (action === "decline-market-trade") await declineMarketTrade(button.dataset.tradeId);
      if (action === "collect-market-trade") await collectMarketTrade(button.dataset.tradeId);
      if (action === "refund-market-trade") await refundMarketTrade(button.dataset.tradeId);
      if (action === "open-auction-bid") openAuctionBid(button.dataset.auctionId);
      if (action === "claim-auction") await claimAuction(button.dataset.auctionId);
      if (action === "compare-item") openItemCompare(button.dataset.itemInstance);
      if (action === "codex-tab") {
        state.codexTab = button.dataset.tab;
        render();
      }
      if (action === "reset-missions") await resetWeeklyMissions(false);
      if (action === "recycle-missions") await resetWeeklyMissions(true);
      if (action === "mark-report") await markReport(button.dataset.reportId, button.dataset.status);
      if (action === "panic-refresh") await panicRefresh();
      if (action === "toggle-maintenance") await toggleMaintenance(button.dataset.mode);
      if (action === "start-rpg") await startRpg();
      if (action === "quick-approve") await quickApproveRequest(button.dataset.requestId);
    } catch (error) {
      console.error(error);
      toast(firebaseErrorMessage(error));
    }
  });

  document.addEventListener("change", (event) => {
    if (event.target.matches("input[type='file'][data-media-field]")) {
      previewMediaInput(event.target).catch((error) => toast(firebaseErrorMessage(error)));
      return;
    }
    if (event.target.dataset.action === "select-private-user") subscribePrivateChat(event.target.value);
    if (event.target.dataset.action === "codex-filter") {
      state.codexFilter = event.target.value;
      render();
    }
    if (event.target.dataset.action === "codex-sort") {
      state.codexSort = event.target.value;
      render();
    }
    const form = event.target.closest("form");
    if (form?.dataset.form === "character") state.characterDraft = formValues(form);
    if (form?.dataset.form === "admin-user-edit") {
      const values = formValues(form);
      state.adminUserDraft = { uid: values.uid, values };
    }
  });

  document.addEventListener("input", (event) => {
    if (event.target.dataset.action === "music-volume") {
      setAmbientVolume(event.target.value);
      return;
    }
    if (event.target.dataset.action === "codex-search") {
      state.codexSearch = event.target.value;
      render();
      return;
    }
    const form = event.target.closest("form");
    if (form?.dataset.form === "character") state.characterDraft = formValues(form);
    if (form?.dataset.form === "admin-user-edit") {
      const values = formValues(form);
      state.adminUserDraft = { uid: values.uid, values };
    }
  });

  document.addEventListener("submit", async (event) => {
    const form = event.target.closest("form");
    if (!form?.dataset.form) return;
    event.preventDefault();

    try {
      const type = form.dataset.form;
      await resolveFormMedia(form, mediaFolderForForm(type));
      if (type === "login") await handleLogin(form);
      if (type === "terms-accept") await acceptTerms();
      if (type === "character") await saveCharacter(form);
      if (type === "global-chat") await sendGlobalChat(form);
      if (type === "private-chat") await sendPrivateChat(form);
      if (type === "diary-entry") await saveDiaryEntry(form);
      if (type === "pet-hunt") await startPetHunt(form);
      if (type === "player-listing") await publishPlayerListing(form);
      if (type === "auction-bid") await placeAuctionBid(form);
      if (type === "tower-defense") await startTowerDefense(form);
      if (type === "create-guild") await createGuild(form);
      if (type === "guild-settings") await saveGuildSettings(form);
      if (type === "guild-invite") await sendGuildInvite(form);
      if (type === "guild-chat") await sendGuildChat(form);
      if (type === "start-guild-mission") await startGuildMission(form);
      if (type === "training-request") await submitTrainingRequest(form);
      if (type === "creation-request") await submitCreationRequest(form);
      if (type === "bug-report") await submitReport("bug", form);
      if (type === "player-report") await submitReport("denuncia", form);
      if (type === "quick-report") {
        const values = formValues(form);
        await submitReport(values.type, form);
        closeModal();
      }
      if (type === "content-edit-json") await saveContentEdit(form);
      if (type === "content-generic") await saveGenericContent(form);
      if (type === "content-forge-visual") await saveForgeVisual(form);
      if (type === "content-race") {
        const v = formValues(form);
        await saveContent("races", { name: v.name, imageUrl: v.imageUrl || "", bonus: parseBonus(v.bonus), passive: v.passive, description: v.description || "" });
        form.reset();
      }
      if (type === "content-class") {
        const v = formValues(form);
        await saveContent("classes", { name: v.name, imageUrl: v.imageUrl || "", bonus: parseBonus(v.bonus), role: v.role, description: v.description || "" });
        form.reset();
      }
      if (type === "content-affinity-category") {
        const v = formValues(form);
        await saveContent("affinityCategories", { name: v.name, weight: Number(v.weight || 0), rarity: v.rarity, color: v.color, imageUrl: v.imageUrl || "", description: v.description || "" });
        form.reset();
      }
      if (type === "content-affinity") {
        const v = formValues(form);
        await saveContent("affinities", { name: v.name, categoryId: v.categoryId, imageUrl: v.imageUrl || "", bonus: parseBonus(v.bonus), passive: v.passive, description: v.description || "" });
        form.reset();
      }
      if (type === "content-item-category") {
        const v = formValues(form);
        await saveContent("itemCategories", { name: v.name });
        form.reset();
      }
      if (type === "content-item") {
        const v = formValues(form);
        await saveContent("items", { name: v.name, categoryId: v.categoryId, imageUrl: v.imageUrl || "", price: Number(v.price || 0), rarity: v.rarity, bonus: parseBonus(v.bonus) });
        form.reset();
      }
      if (type === "content-mission") {
        const v = formValues(form);
        await saveContent("missionPool", { title: v.title, name: v.title, description: v.description, rarity: v.rarity, reward: v.reward });
        form.reset();
      }
      if (type === "content-biome") {
        const v = formValues(form);
        await saveContent("biomes", { name: v.name, imageUrl: v.imageUrl || "", region: v.region || "", description: v.description || "" });
        form.reset();
      }
      if (type === "content-kingdom") {
        const v = formValues(form);
        await saveContent("kingdoms", { name: v.name, imageUrl: v.imageUrl || "", ruler: v.ruler || "", description: v.description || "" });
        form.reset();
      }
      if (type === "content-region") {
        const v = formValues(form);
        await saveContent("regions", { name: v.name, imageUrl: v.imageUrl || "", kingdomId: v.kingdomId || "", description: v.description || "" });
        form.reset();
      }
      if (type === "content-npc") {
        const v = formValues(form);
        await saveContent("npcs", { name: v.name, imageUrl: v.imageUrl || "", role: v.role || "", description: v.description || "" });
        form.reset();
      }
      if (type === "content-rule") {
        const v = formValues(form);
        await saveContent("rulesChapters", { name: v.name, order: Number(v.order || 1), summary: v.summary || "", full: v.full || "" });
        form.reset();
      }
      if (type === "content-faq") {
        const v = formValues(form);
        await saveContent("faqEntries", { name: v.name, category: v.category || "FAQ", answer: v.answer || "" });
        form.reset();
      }
      if (type === "content-tutorial") {
        const v = formValues(form);
        await saveContent("tutorialSteps", { name: v.name, order: Number(v.order || 1), description: v.description || "" });
        form.reset();
      }
      if (type === "admin-user-edit") await saveAdminUser(form);
      if (type === "admin-add-item") await adminAddItem(form);
      if (type === "admin-reward") await sendReward(form);
      if (type === "admin-mail") await sendAdminMail(form);
      if (type === "review-request") await reviewProgressRequest(form);
      if (type === "admin-ops") await saveAdminOps(form);
      if (type === "admin-settings") {
        const v = formValues(form);
        await writeDoc("settings", "system", {
          seasonName: v.seasonName,
          seasonNumber: Number(v.seasonNumber || 1),
          defaultAffinityAttempts: Number(v.defaultAffinityAttempts || 3),
          pityMax: Number(v.pityMax || 30),
          levelMax: Number(v.levelMax || 99),
          eventActive: v.eventActive === "true",
          eventName: v.eventName,
          bannerRateUp: v.bannerRateUp,
          rareRateUpChance: Number(v.rareRateUpChance ?? 0.3),
          soundEnabled: v.soundEnabled !== "false",
          theme: v.theme,
          seasonTheme: v.seasonTheme || "awakening",
          globalNotice: v.globalNotice,
          seedVersion: SEED_VERSION,
        });
        toast("Configurações publicadas.");
      }
    } catch (error) {
      console.error(error);
      toast(firebaseErrorMessage(error));
    }
  });
}

try {
  const storedMusicVolume = localStorage.getItem("millenniumMusicVolume");
  const savedMusicVolume = storedMusicVolume === null ? NaN : Number(storedMusicVolume);
  if (Number.isFinite(savedMusicVolume) && savedMusicVolume >= 0 && savedMusicVolume <= 1) state.musicVolume = savedMusicVolume;
} catch {
  // The site still works when browser storage is unavailable.
}
wireEvents();
window.addEventListener("beforeunload", () => {
  setPresence(false);
});
initFirebase();
