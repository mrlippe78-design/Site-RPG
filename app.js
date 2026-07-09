const firebaseConfig = {
  apiKey: "AIzaSyAyCR1Hod1kFemfLkXlPme88ihbRFlXhaM",
  authDomain: "sorteioafinidade.firebaseapp.com",
  projectId: "sorteioafinidade",
  storageBucket: "sorteioafinidade.firebasestorage.app",
  messagingSenderId: "338718810770",
  appId: "1:338718810770:web:7c0cc44fbf70df30b27c4b",
};

const ADMIN_EMAILS = ["mrlippe78@gmail.com"];

const FIREBASE_SCRIPTS = [
  "https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js",
  "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth-compat.js",
  "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore-compat.js",
];

const SEED_VERSION = 4;
const GUILD_CREATE_COST = 1000;
const GUILD_MEMBER_LIMIT = 10;
const CHAT_EMOJIS = ["🔥", "✨", "⚔️", "🛡️", "💰", "👑", "✅", "❌"];
const ATTRIBUTES = [
  { key: "for", label: "Força", short: "FOR" },
  { key: "vel", label: "Velocidade", short: "VEL" },
  { key: "hab", label: "Habilidade", short: "HAB" },
  { key: "res", label: "Resistência", short: "RES" },
  { key: "pod", label: "Poder", short: "POD" },
];

const RARITIES = ["Comum", "Incomum", "Raro", "Épico", "Lendário", "Cósmica"];
const RARE_RARITIES = ["Raro", "Épico", "Lendário", "Cósmica", "Celestial"];
const DEFAULT_GUILD_MISSIONS = [
  { id: "cerco-abissal", title: "Cerco Abissal", description: "Reunir uma party para enfrentar ameaça acima do nível da mesa.", rarity: "Épico", reward: "220 PO + 180 XP para cada membro aprovado" },
  { id: "cartografia-proibida", title: "Cartografia Proibida", description: "Mapear ruínas, facções ou território hostil com registro narrativo.", rarity: "Raro", reward: "150 PO + 120 XP por membro" },
  { id: "contrato-de-guerra", title: "Contrato de Guerra", description: "Resolver uma crise entre grupos rivais sem quebrar a aliança da guilda.", rarity: "Lendário", reward: "Título de guilda + 260 PO" },
];

const DEFAULT_CONTENT = {
  settings: {
    seasonName: "Temporada 1",
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
    globalNotice: "Bem-vindo ao suporte oficial da mesa Millennium RPG.",
    rulesVersion: "1.0",
    termsText: "Ao entrar na mesa Millennium RPG, você concorda em respeitar os jogadores, seguir as decisões do Admin, não abusar de bugs do site, não manipular dados de ficha sem autorização e manter o jogo saudável para todos.",
    maintenanceMode: false,
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
  missionPool: [
    { id: "patrulha-fronteira", title: "Patrulha da Fronteira", description: "Concluir uma cena de vigília, escolta ou reconhecimento.", rarity: "Comum", reward: "30 PO" },
    { id: "treino-focado", title: "Treino Focado", description: "Registrar um treino com objetivo claro para o personagem.", rarity: "Comum", reward: "1 essência extra" },
    { id: "resgate-noturno", title: "Resgate Noturno", description: "Participar de uma cena com risco social ou físico para salvar alguém.", rarity: "Raro", reward: "70 PO + título temporário" },
    { id: "eco-antigo", title: "Eco Antigo", description: "Investigar ruínas, documentos ou memórias ligadas à temporada.", rarity: "Épico", reward: "Item raro aprovado pelo Admin" },
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
    { id: "criacao-personagem", name: "Criação de personagem", order: 1, summary: "Defina nome, raça, classe, história, atributos e perfil público antes de começar.", full: "A primeira ficha salva trava raça, classe e atributos base. Depois disso, pontos novos entram apenas por evolução aprovada pelo Admin." },
    { id: "atributos-testes", name: "Atributos e testes", order: 2, summary: "FOR, VEL, HAB, RES e POD orientam testes, combate e resistência.", full: "O Admin define dificuldade, bônus e consequências. Itens, afinidades, títulos e efeitos temporários podem alterar os totais." },
    { id: "combate", name: "Combate", order: 3, summary: "Combate acontece fora do site, mas ficha, inventário e técnicas ficam registrados aqui.", full: "Use o site como apoio de consulta. Mudanças de poder, técnica, item raro e recompensa dependem de validação do Admin." },
    { id: "afinidades", name: "Afinidades", order: 4, summary: "Afinidades vêm da roleta e podem gerar anúncios quando forem raras.", full: "A roleta usa categorias, pesos, pity e eventos configurados pelo Admin. XP não vem de giros." },
    { id: "poderes-tecnicas", name: "Poderes e técnicas", order: 5, summary: "Cada player começa com um slot de poder base e cria técnicas a partir dele.", full: "Novos poderes exigem slot liberado pelo Admin. Técnicas e poderes podem receber pedido de nerf antes da aprovação." },
    { id: "treino-evolucao", name: "Treino e evolução", order: 6, summary: "XP vem de treinos e missões aprovados.", full: "O player relata treino ou conclui missão. O Admin aprova, define XP, PO, essências e recompensas." },
    { id: "missoes-semanais", name: "Missões semanais", order: 7, summary: "Missões resetam segunda 00:00 e podem ser recicladas pelo Admin.", full: "O player escolhe a missão, marca conclusão e aguarda validação. Guildas têm missões próprias mais difíceis." },
    { id: "guildas", name: "Guildas", order: 8, summary: "Guildas têm limite, chat, líderes, partys e missões internas.", full: "Criar guilda custa 1.000 PO. O líder controla imagem, descrição, convites, membros e partys de até 4 pessoas." },
    { id: "economia-inventario", name: "Economia, loja e inventário", order: 9, summary: "PO, itens, pets, títulos e recompensas ficam registrados no perfil.", full: "O Admin pode adicionar, remover e corrigir inventário. Itens raros podem aparecer no chat global." },
    { id: "conduta", name: "Regras de conduta", order: 10, summary: "Respeito, clareza e jogo saudável vêm primeiro.", full: "Denúncias, bugs e abusos devem ser reportados pelo site. O Admin pode advertir, mutar, suspender ou ajustar fichas." },
  ],
  faqEntries: [
    { id: "ganhar-xp", name: "Como ganho XP?", category: "Evolução", answer: "XP vem de missões, treinos e criações aprovadas pelo Admin. Girar roleta não dá XP." },
    { id: "conseguir-poder", name: "Como consigo poder?", category: "Poderes", answer: "Envie um poder base em Missões > Poderes e técnicas. Para ter outro poder, o Admin precisa liberar um slot." },
    { id: "entrar-guilda", name: "Como entro em guilda?", category: "Guildas", answer: "Abra Guildas, escolha uma na lista e envie pedido de entrada. O líder aprova pelo correio." },
    { id: "perfil-privado", name: "O que perfil privado esconde?", category: "Perfil", answer: "Esconde atributos, itens, história e detalhes, mas mantém foto, nome, título e botão de amizade." },
  ],
  tutorialSteps: [
    { id: "tutorial-ficha", name: "Crie sua ficha", order: 1, description: "Preencha personagem, avatar, raça, classe e atributos. Salvar pela primeira vez trava a base." },
    { id: "tutorial-afinidade", name: "Role afinidade", order: 2, description: "Use essências para sortear afinidade. Raridades altas geram anúncio no chat global." },
    { id: "tutorial-missao", name: "Pegue uma missão", order: 3, description: "Escolha uma missão semanal, conclua fora do site e envie para validação do Admin." },
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
    { id: "kit-aventureiro", name: "Kit Aventureiro", rarity: "Comum", price: 75, description: "Pacote base de consumíveis e ferramentas. Compra depende de aprovação do Admin." },
  ],
  auctionListings: [
    { id: "lamina-celeste", name: "Lâmina Celeste", rarity: "Épico", minBid: 500, endsAt: "Domingo 22:00", description: "Leilão semanal controlado pelo Admin." },
  ],
  craftingRecipes: [
    { id: "amuleto-guarda", name: "Amuleto de Guarda", rarity: "Incomum", materials: "Cristal menor + tecido ritual", result: "Acessório defensivo aprovado pelo Admin." },
  ],
  techniqueLibrary: [
    { id: "lamina-flamejante", name: "Lâmina Flamejante", rarity: "Comum", powerType: "Fogo", description: "Exemplo de técnica aprovada: dano simples com custo e alcance claros." },
  ],
  achievements: [
    { id: "primeira-missao", name: "Primeira missão", rarity: "Comum", description: "Concluir uma missão aprovada pelo Admin." },
    { id: "primeiro-raro", name: "Primeiro raro", rarity: "Raro", description: "Receber item, título ou afinidade rara." },
    { id: "fundador-guilda", name: "Fundador de guilda", rarity: "Épico", description: "Criar uma guilda com 1.000 PO." },
  ],
  seasonPass: [
    { id: "marco-1", name: "Marco I", tier: 1, reward: "Título cosmético da temporada", description: "Conclua atividades aprovadas para marcar presença na temporada." },
    { id: "marco-2", name: "Marco II", tier: 2, reward: "Pet cosmético", description: "Recompensa sugerida para players ativos." },
  ],
  reputationFactions: [
    { id: "conselho-dourado", name: "Conselho Dourado", region: "Aurèvia", description: "Facção comercial que valoriza contratos cumpridos e estabilidade.", levels: "Neutro, Aliado, Honrado" },
  ],
};

const CONTENT_COLLECTIONS = Object.keys(DEFAULT_CONTENT).filter((key) => key !== "settings");

function defaultContentState() {
  return Object.fromEntries(CONTENT_COLLECTIONS.map((collection) => [collection, [...DEFAULT_CONTENT[collection]]]));
}

const NAVS = {
  player: [
    { id: "player-home", label: "Início", icon: "⌂" },
    { id: "profile", label: "Perfil", icon: "◈" },
    { id: "character", label: "Personagem", icon: "✎" },
    { id: "roulette", label: "Roleta", icon: "✦" },
    { id: "inventory", label: "Inventário", icon: "◎" },
    { id: "grimoire", label: "Grimório", icon: "✧" },
    { id: "codex", label: "Codex", icon: "✥" },
    { id: "help", label: "Guia", icon: "?" },
    { id: "market", label: "Mercado", icon: "$" },
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
    { id: "admin-mail", label: "Correio", icon: "@" },
    { id: "admin-requests", label: "Validações", icon: "✓" },
    { id: "admin-ops", label: "Operações", icon: "◆" },
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
  inventory: "Inventário e dinheiro",
  grimoire: "Grimório e títulos",
  codex: "Codex do mundo",
  help: "Guia, regras e tutorial",
  market: "Mercado e crafting",
  ranking: "Ranking da mesa",
  hall: "Hall da Fama",
  diary: "Diário de campanha",
  guild: "Guildas e partys",
  chat: "Chat da comunidade",
  missions: "Missões semanais",
  reports: "Reports e denúncias",
  "admin-home": "Painel de controle",
  "admin-users": "Usuários e fichas",
  "admin-content": "Forja do Admin",
  "admin-rewards": "Enviar prêmios",
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
  adminRequestFilter: "all",
  epicCollection: "wantedBoard",
  lastRoll: null,
  lastRollResults: [],
  rolling: false,
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
  presenceTimer: null,
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
    activeTitleId: "",
    pendingGift: null,
    activeMissions: [],
    rollHistory: [],
    titles: [],
    pets: [],
    inventory: [],
    power: { name: "", description: "" },
    powers: [],
    powerSlots: 1,
    techniques: [{ name: "", description: "" }],
    story: "",
    personality: "",
    avatarUrl: "",
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
  const equipmentBonus = addBonuses(...equippedItems(character).map((item) => item.bonus || {}));
  const raw = addBonuses(character.base, race.bonus, klass.bonus, affinity?.bonus, equipmentBonus);
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
  if (key.includes("cosm")) return "cosmic";
  if (key.includes("lend")) return "legendary";
  if (key.includes("pico")) return "epic";
  if (key.includes("raro")) return "rare";
  if (key.includes("incomum")) return "uncommon";
  return "common";
}

function rarityClass(rarity) {
  return `rarity-${rarityKey(rarity)}`;
}

function rarityScore(rarity) {
  return { common: 1, uncommon: 2, rare: 3, epic: 4, legendary: 5, cosmic: 6 }[rarityKey(rarity)] || 1;
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

function delay(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
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
  }[type] || "Solicitação";
}

function defaultXpForRequest(type, rarity = "Comum") {
  const byRarity = { Comum: 40, Incomum: 60, Raro: 90, "Épico": 130, Lendário: 180, Cósmica: 240 };
  if (type === "training") return 30;
  if (type === "power" || type === "technique") return 0;
  return byRarity[rarity] || 50;
}

function requestRewardHint(request) {
  const parts = [];
  if (request.xp) parts.push(`${request.xp} XP`);
  if (request.reward) parts.push(request.reward);
  return parts.join(" · ") || "Admin define na aprovação";
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
  $("#demoActions").hidden = state.firebaseReady;
  $("#authNote").hidden = state.firebaseReady;
  $("#authNote").textContent = state.firebaseReady
    ? ""
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
  setPresence(true);
  if (state.presenceTimer) window.clearInterval(state.presenceTimer);
  state.presenceTimer = window.setInterval(() => setPresence(true), 45000);
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
          displayName: profile.displayName || user.email?.split("@")[0] || "Admin",
          updatedAt: nowValue(),
        }, { merge: true });
      } catch (error) {
        console.warn("Não consegui gravar o papel Admin ainda. Publique firestore.rules.", error);
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
      toast("Atualização emergencial iniciada pelo Admin. Você será desconectado.");
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

  $("#authScreen").hidden = true;
  $("#appShell").hidden = false;
  startPresence();
  announceSessionEntry();
  render();
}

function enterDemo(role) {
  state.demo = true;
  state.user = { uid: `demo-${role}`, email: `${role}@demo.local` };
  state.profile = { id: state.user.uid, email: state.user.email, displayName: role === "admin" ? "Admin Demo" : "Player Demo", role };
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
    { id: "demo-admin", displayName: "Admin Demo", email: "admin@demo.local", role: "admin" },
  ];
  state.characters = [playerChar, defaultCharacter("demo-admin", "Admin Demo")];
  state.character = role === "player" ? playerChar : defaultCharacter("demo-admin", "Admin Demo");
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
}

async function announceSessionEntry() {
  if (state.sessionAnnounced || !state.user || state.demo) return;
  state.sessionAnnounced = true;
  const character = currentCharacter();
  const title = activeTitle(character);
  const name = displayNameWithTitle(state.user.uid, state.profile?.displayName || state.user.email);
  await addGlobalMessage({
    senderId: "system",
    senderName: "Sistema",
    type: state.role === "admin" ? "admin-alert" : "join",
    text: state.role === "admin"
      ? `ALERTA: Admin ${name} entrou no site.`
      : `${name}${title ? ` (${title.name})` : ""} entrou no servidor.`,
  }).catch(() => {});
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
  const nav = NAVS[state.role];
  if (!nav.some((item) => item.id === state.view)) state.view = nav[0].id;
  $("#roleLabel").textContent = state.role === "admin" ? "Admin" : "Player";
  $("#seasonLabel").textContent = state.settings.seasonName || `Temporada ${state.settings.seasonNumber || 1}`;
  $("#contextLabel").textContent = state.role === "admin" ? "Administração da plataforma" : "Suporte do personagem";
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
    <span>Online ${state.users.filter((user) => user.role !== "admin" && isUserOnline(user)).length}</span>
  `;
}

function renderMobileBottomNav(nav) {
  const ids = state.role === "admin"
    ? ["admin-home", "admin-users", "admin-requests", "admin-chat", "admin-ops"]
    : ["player-home", "character", "chat", "missions", "profile"];
  return nav
    .filter((item) => ids.includes(item.id))
    .map((item) => `<button class="${state.view === item.id ? "active" : ""}" type="button" data-nav="${item.id}"><span>${item.icon}</span><small>${item.label}</small></button>`)
    .join("");
}

function renderMaintenanceGate() {
  return `
    <div class="grid">
      <article class="panel span-12 center-panel">
        <p class="eyebrow">Modo manutenção</p>
        <h2>O Admin está ajustando a plataforma</h2>
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
        <h2>Seu acesso foi pausado pelo Admin</h2>
        <p>Entre em contato com a administração da mesa pelo canal combinado para entender a decisão.</p>
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
            <h2>Você recebeu um presente do Admin</h2>
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
      text: hasActiveMission ? `${(character.activeMissions || []).length} missão(ões) ativa(s).` : "Pegue uma missão semanal e envie conclusão ao Admin.",
      nav: "missions",
      done: hasActiveMission,
    },
    {
      title: pending.length ? "Validação pendente" : "Relate treino ou criação",
      text: pending.length ? `${pending.length} pedido(s) aguardando análise.` : "Treinos, poderes e técnicas passam pelo Admin.",
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
      <article class="panel span-12">
        ${character.bannerUrl ? `<img class="profile-banner" src="${esc(character.bannerUrl)}" alt="Banner do personagem" />` : ""}
        <div class="profile-grid">
          <img class="avatar" src="${esc(character.avatarUrl || placeholderAvatar())}" alt="Avatar do personagem" />
          <div>
            <div class="panel-heading">
              <div>
                <p class="eyebrow">${esc(state.profile?.displayName || "Player")}</p>
                <h2>${esc(character.characterName || "Personagem sem nome")}</h2>
              </div>
              <div class="action-row">
                <button class="ghost-button" type="button" data-action="copy-profile-card">Copiar cartão</button>
                <button class="ghost-button" type="button" data-action="toggle-profile-public">
                  ${character.profilePublic ? "Deixar privado" : "Deixar público"}
                </button>
              </div>
            </div>
            <p>${esc(race?.name)} · ${esc(klass?.name)} · ${esc(affinity?.name || "Sem afinidade")}</p>
            <p class="profile-description">${esc(character.characterDescription || "Sem descrição pública ainda.")}</p>
            <div class="tag-row">
              ${(character.titles || []).map((title) => `<span class="tag">${esc(title.name)} · ${esc(title.rarity || "Título")}</span>`).join("") || `<span class="tag">Sem títulos</span>`}
            </div>
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
          <span>Presente do Admin</span>
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
          <label><span>Avatar por URL ou GIF</span><input name="avatarUrl" value="${esc(draftValue(draft, "avatarUrl", character.avatarUrl || ""))}" /></label>
          <label><span>Banner animado por URL ou GIF</span><input name="bannerUrl" value="${esc(draftValue(draft, "bannerUrl", character.bannerUrl || ""))}" /></label>
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
            <p>${esc(character.power?.description || "Envie uma criação pela aba Missões para o Admin analisar.")}</p>
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

function renderInventory() {
  const character = currentCharacter();
  return `
    <div class="grid">
      <article class="panel span-12">
        <div class="stat-grid">
          ${renderStat("Peças de Ouro", character.gold || 0)}
          ${renderStat("XP", character.xp || 0)}
          ${renderStat("Nível", character.level || levelFromXp(character.xp || 0))}
          ${renderStat("Itens", (character.inventory || []).length)}
          ${renderStat("Títulos", (character.titles || []).length)}
          ${renderStat("Pets", (character.pets || []).length)}
        </div>
      </article>
      <article class="panel span-8">
        <div class="panel-heading"><div><p class="eyebrow">Inventário</p><h3>Itens do personagem</h3></div></div>
        <div class="inventory-grid">${renderInventoryItems(character.inventory || [], true)}</div>
      </article>
      <article class="panel span-4">
        <p class="eyebrow">Títulos e pets</p>
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
    <div class="pet-card">
      ${pet.imageUrl ? `<img class="pet-image" src="${esc(pet.imageUrl)}" alt="${esc(pet.name)}" />` : `<div class="pet-image placeholder">PET</div>`}
      <strong>${esc(pet.name)}</strong>
      <p>${esc(pet.rarity || "Pet")}</p>
    </div>
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
  const rows = leaderboard().slice(0, 30);
  return `
    <div class="grid">
      <article class="panel span-12">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Ranking</p>
            <h2>Prestígio da mesa</h2>
          </div>
          <span class="tag">Raros + giros + nível</span>
        </div>
        <div class="ranking-list">
          ${rows.map((char, index) => {
            const title = activeTitle(char);
            const affinity = getAffinity(char.affinityId);
            return `
              <div class="ranking-row ${char.ownerId === state.user?.uid ? "self" : ""}">
                <strong class="ranking-place">#${index + 1}</strong>
                <div>
                  <h3>${esc(char.characterName || char.displayName || getUserName(char.ownerId))}</h3>
                  <p>${title ? esc(title.name) : "Sem título"} · ${esc(affinity?.name || "Sem afinidade")}</p>
                </div>
                <div class="ranking-score">
                  <strong>${prestigeFor(char)}</strong>
                  <span>${Number(char.totalRares || 0)} raros</span>
                </div>
              </div>
            `;
          }).join("") || `<div class="empty-state">Nenhum personagem público no ranking.</div>`}
        </div>
      </article>
    </div>
  `;
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
  const tabs = [
    ["market", "Mercado"],
    ["auction", "Leilão"],
    ["crafting", "Crafting"],
    ["vault", "Cofre"],
    ["pass", "Passe"],
  ];
  const tab = state.marketTab || "market";
  const cards = {
    market: () => marketCards(state.content.marketListings, (item) => `${Number(item.price || 0)} PO · ${item.description || ""}`),
    auction: () => marketCards(state.content.auctionListings, (item) => `Lance mínimo ${Number(item.minBid || 0)} PO · termina ${item.endsAt || "a definir"} · ${item.description || ""}`),
    crafting: () => marketCards(state.content.craftingRecipes, (item) => `${item.materials || "Materiais a definir"} → ${item.result || ""}`),
    vault: () => `<article class="panel span-12"><div class="stat-grid">${renderStat("PO no bolso", currentCharacter().gold || 0)}${renderStat("Itens", (currentCharacter().inventory || []).length)}${renderStat("Raros", currentCharacter().totalRares || 0)}</div><p class="hint">Cofre pessoal visual. Movimentações raras ainda passam pelo Admin.</p></article>`,
    pass: () => marketCards(state.content.seasonPass, (item) => `Tier ${item.tier || 1} · ${item.reward || ""} · ${item.description || ""}`),
  };
  return `
    <div class="grid">
      <article class="panel span-12">
        <div class="panel-heading"><div><p class="eyebrow">Economia</p><h2>Mercado, leilão, cofre e passe</h2></div><span class="tag">Admin controla recompensas</span></div>
        <div class="tabs codex-tabs">${tabs.map(([id, label]) => `<button class="tab ${tab === id ? "active" : ""}" type="button" data-action="market-tab" data-tab="${id}">${label}</button>`).join("")}</div>
      </article>
      ${tab === "vault" ? cards.vault() : `<article class="panel span-12"><div class="content-grid">${cards[tab]?.() || cards.market()}</div></article>`}
    </div>
  `;
}

function marketCards(items, detail) {
  return sortByName(items).map((item) => `
    <div class="content-card market-card">
      ${item.imageUrl ? `<img class="content-image" src="${esc(item.imageUrl)}" alt="${esc(item.name)}" />` : ""}
      <span>${esc(item.rarity || item.category || "Mercado")}</span>
      <h3>${esc(item.name)}</h3>
      <p>${esc(detail(item))}</p>
      <button class="ghost-button" type="button" data-action="open-help-text" data-title="${esc(item.name)}" data-text="${esc("Solicite ao Admin pelo chat/correio para comprar, dar lance ou fabricar este registro.")}">Como usar?</button>
    </div>
  `).join("") || `<div class="empty-state">Nada publicado aqui ainda.</div>`;
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
          ${ownGuild ? `<p class="hint">Você já pertence a uma guilda. Para fundar outra, fale com o Admin.</p>` : Number(character.gold || 0) < GUILD_CREATE_COST ? `<p class="hint">Você precisa de ${GUILD_CREATE_COST.toLocaleString("pt-BR")} PO para fundar uma guilda.</p>` : ""}
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
            ${leader ? `<button class="primary-button" type="button" data-action="finish-guild-mission" data-guild-id="${esc(guild.id)}">Enviar conclusão ao Admin</button>` : ""}
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
          <button class="primary-button" type="submit">Enviar treino ao Admin</button>
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
          ${pendingMission ? `<span class="tag">Aguardando Admin</span>` : active
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
      ${request.adminNote ? `<p><strong>Nota do Admin:</strong> ${esc(request.adminNote)}</p>` : ""}
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
            <label><span>Papel</span><select name="role"><option value="player" ${draftValue(draft, "role", selectedUser.role) !== "admin" ? "selected" : ""}>Player</option><option value="admin" ${draftValue(draft, "role", selectedUser.role) === "admin" ? "selected" : ""}>Admin</option></select></label>
            <label><span>Status</span><select name="status"><option value="active" ${draftValue(draft, "status", selectedUser.status || "active") === "active" ? "selected" : ""}>Ativo</option><option value="muted" ${draftValue(draft, "status", selectedUser.status || "active") === "muted" ? "selected" : ""}>Mutado</option><option value="suspended" ${draftValue(draft, "status", selectedUser.status || "active") === "suspended" ? "selected" : ""}>Suspenso</option></select></label>
            <label><span>PO</span><input name="gold" type="number" value="${Number(draftValue(draft, "gold", character.gold || 0))}" /></label>
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
            ["epic", "Épicos"],
          ].map(([id, label]) => `<button class="tab ${state.contentTab === id ? "active" : ""}" type="button" data-action="content-tab" data-tab="${id}">${label}</button>`).join("")}
        </div>
      </article>
      ${renderContentEditor()}
    </div>
  `;
}

function renderContentEditor() {
  const tab = state.contentTab;
  if (tab === "race") {
    return `
      <article class="panel span-5">${contentForm("content-race", "Nova raça", `
        <label><span>Nome</span><input name="name" required /></label>
        <label><span>Imagem por URL</span><input name="imageUrl" /></label>
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
        <label><span>Imagem por URL</span><input name="imageUrl" /></label>
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
        <label><span>Imagem por URL</span><input name="imageUrl" /></label>
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
        <label><span>Imagem por URL</span><input name="imageUrl" /></label>
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
        <label><span>Imagem por URL</span><input name="imageUrl" /></label>
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
        <label><span>Imagem por URL</span><input name="imageUrl" /></label>
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
        <label><span>Imagem por URL</span><input name="imageUrl" /></label>
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
        <label><span>Imagem por URL</span><input name="imageUrl" /></label>
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
  "description": "Descrição editável pelo Admin."
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
            <option value="item">Item</option>
            <option value="title">Título</option>
            <option value="affinity">Afinidade</option>
            <option value="pet">Pet</option>
            <option value="attempts">Essências de roleta</option>
          </select></label>
          <label><span>Quantidade de PO / essências</span><input name="amount" type="number" value="0" /></label>
          <label><span>Item</span><select name="itemId"><option value="">Nenhum</option>${optionList(state.content.items)}</select></label>
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
          <p>Desconecta todos os players online e força recarregamento de sessão. Admins continuam no painel.</p>
        </div>
        <button class="danger-button" type="button" data-action="panic-refresh">Botão de pânico</button>
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
  inventory: renderInventory,
  grimoire: renderGrimoire,
  codex: renderCodex,
  help: renderHelpCenter,
  market: renderMarket,
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
    toast("Esta ficha está bloqueada temporariamente pelo Admin.");
    return;
  }
  if (!state.content.affinities.length) {
    toast("Cadastre afinidades no painel Admin antes de girar.");
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

    const last = results[results.length - 1];
    if (!last) {
      playSound("fail");
      toast("Não encontrei afinidades para sortear.");
      return;
    }

    const rareResults = results.filter((result) => result.rare);
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

    state.lastRoll = last.affinity;
    state.lastRollResults = results;
    await updateCharacter(state.user.uid, {
      affinityId: last.affinity.id,
      affinityAttempts: attempts - results.length,
      pityCounter: pity,
      totalRolls,
      totalRares,
      prestige,
      rollHistory: history,
      affinitySnapshot: { ...last.affinity, categoryName: last.category?.name || "", rarity: last.category?.rarity || "" },
    });

    if (rareResults.length) {
      playSound("rare");
      for (const result of rareResults) {
        await announceRareReward(state.user.uid, result.affinity.name, result.category?.rarity, "afinidade");
      }
    }

    const best = results.slice().sort((a, b) => rarityScore(b.category?.rarity) - rarityScore(a.category?.rarity))[0];
    toast(`${results.length} giro(s): melhor resultado ${best.affinity.name} (${best.category?.rarity || "Comum"}).`);
  } finally {
    window.clearInterval(interval);
    state.rolling = false;
    render();
  }
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
  toast("Conclusão enviada para o Admin.");
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
    toast(`Você já tem ${powersUsed}/${powerSlots} poder(es) liberado(s). Peça ao Admin um novo slot quando subir de tier.`);
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
  toast("Criação enviada para análise do Admin.");
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
    toast("Sua conta está suspensa. Fale com o Admin.");
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
  toast("Report enviado para o Admin.");
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
  toast("Mensagem denunciada ao Admin.");
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
  toast("Conclusão da missão de guilda enviada ao Admin.");
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
    ${character.bannerUrl ? `<img class="profile-banner" src="${esc(character.bannerUrl)}" alt="Banner do personagem" />` : ""}
    <div class="profile-grid">
      <img class="avatar" src="${esc(character.avatarUrl || placeholderAvatar())}" alt="Avatar do personagem" />
      <div>
        <p class="eyebrow">${esc(getUserName(uid))}</p>
        <h2>${esc(character.characterName || "Personagem sem nome")}</h2>
        <p>${isPrivate ? "Perfil privado" : `${esc(race?.name)} · ${esc(klass?.name)} · ${esc(affinity?.name || "Sem afinidade")}`}</p>
        ${isPrivate ? "" : `<p class="profile-description">${esc(character.characterDescription || "Sem descrição pública ainda.")}</p>`}
        <div class="tag-row">
          ${activeTitle(character) ? `<span class="tag">${esc(activeTitle(character).name)}</span>` : `<span class="tag">Sem título</span>`}
        </div>
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

function openHelpText(title, text) {
  $("#modalContent").innerHTML = `
    <p class="eyebrow">Ajuda rápida</p>
    <h2>${esc(title || "Como usar")}</h2>
    <p>${esc(text || "Este recurso depende de aprovação ou controle do Admin.")}</p>
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

async function saveAdminUser(form) {
  const values = formValues(form);
  const uid = values.uid;
  await writeDoc("users", uid, { displayName: values.displayName, role: values.role, status: values.status || "active" });
  await updateCharacter(uid, {
    displayName: values.displayName,
    gold: Number(values.gold || 0),
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
  const inventory = [...(character.inventory || []), { ...item, instanceId: cryptoRandom(), equipped: false, source: "Admin" }];
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
          from: state.profile?.displayName || "Admin",
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
    patch.pendingGift = {
      id: cryptoRandom(),
      message: `Validação aprovada: ${request.title}.`,
      rewards: [`${xpGain} XP`, `${goldGain} PO`, `${essenceGain} essência(s)`].filter((item) => !item.startsWith("0 ")),
      createdAt: new Date().toISOString(),
      from: state.profile?.displayName || "Admin",
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
    adminNote: "Aprovado rápido pelo Admin.",
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
  if (values.type === "attempts") {
    const amount = Number(values.amount || 0);
    patch.affinityAttempts = Number(character.affinityAttempts || 0) + amount;
    rewardName = `${amount} essência(s)`;
    pendingRewards.push(rewardName);
  }
  if (values.type === "item") {
    const item = getItem(values.itemId);
    if (!item) return;
    patch.inventory = [...(character.inventory || []), { ...item, instanceId: cryptoRandom(), equipped: false, source: "Prêmio Admin" }];
    rewardName = item.name;
    rewardType = "item";
    pendingRewards.push(`Item: ${item.name}`);
  }
  if (values.type === "title") {
    rewardName = values.customName || "Título sem nome";
    patch.titles = [...(character.titles || []), { id: slug(rewardName), name: rewardName, rarity }];
    pendingRewards.push(`Título: ${rewardName}`);
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
    message: `O Admin enviou um prêmio para você: ${pendingRewards.join(", ")}.`,
    rewards: pendingRewards,
    createdAt: new Date().toISOString(),
    from: state.profile?.displayName || "Admin",
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
      patch.titles = [...(character.titles || []), { id: `${slug(titleName)}-${cryptoRandom().slice(0, 6)}`, name: titleName, rarity, source: "Correio Admin" }];
    }
    if (item) {
      patch.inventory = [...(character.inventory || []), { ...item, instanceId: cryptoRandom(), equipped: false, source: "Correio Admin" }];
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
      from: state.profile?.displayName || "Admin",
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
    text: "ALERTA: Admin acionou atualização emergencial da plataforma.",
  });
  state.lastPanicVersion = version;
  toast("Pânico acionado. Players serão desconectados.");
}

function openReportModal() {
  $("#modalContent").innerHTML = `
    <p class="eyebrow">Atalho rápido</p>
    <h2>Reportar ao Admin</h2>
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
  $("#modal").hidden = true;
  $("#modalContent").innerHTML = "";
}

function wireEvents() {
  document.addEventListener("click", async (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    const action = button.dataset.action;
    playSound("click");

    try {
      if (button.dataset.nav) {
        state.view = button.dataset.nav;
        render();
      }
      if (action === "register") await handleRegister();
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
      if (action === "admin-remove-item") await adminRemoveItem(button.dataset.userId, button.dataset.itemInstance);
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
      if (action === "compare-item") openItemCompare(button.dataset.itemInstance);
      if (action === "codex-tab") {
        state.codexTab = button.dataset.tab;
        render();
      }
      if (action === "reset-missions") await resetWeeklyMissions(false);
      if (action === "recycle-missions") await resetWeeklyMissions(true);
      if (action === "mark-report") await markReport(button.dataset.reportId, button.dataset.status);
      if (action === "panic-refresh") await panicRefresh();
      if (action === "quick-approve") await quickApproveRequest(button.dataset.requestId);
    } catch (error) {
      console.error(error);
      toast(firebaseErrorMessage(error));
    }
  });

  document.addEventListener("change", (event) => {
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
      if (type === "login") await handleLogin(form);
      if (type === "terms-accept") await acceptTerms();
      if (type === "character") await saveCharacter(form);
      if (type === "global-chat") await sendGlobalChat(form);
      if (type === "private-chat") await sendPrivateChat(form);
      if (type === "diary-entry") await saveDiaryEntry(form);
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
        await saveContent("items", { name: v.name, categoryId: v.categoryId, price: Number(v.price || 0), rarity: v.rarity, bonus: parseBonus(v.bonus) });
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

wireEvents();
window.addEventListener("beforeunload", () => {
  setPresence(false);
});
initFirebase();
