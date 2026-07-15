(function exposeMillennium370Data() {
  "use strict";

  const VERSION = "3.7.0";

  const ACTIVITY_RULES = Object.freeze({
    training: Object.freeze({ id: "training", label: "Treino", minWords: 500, usefulMax: 900, dailyLimit: 2, weeklyLimit: 6, weeklyXpCap: 18, requiresFocus: true, bands: [[500, 2.5], [650, 2.7], [800, 2.9], [900, 3]] }),
    autonarrative: Object.freeze({ id: "autonarrative", label: "Autonarrativa", minWords: 1000, usefulMax: 1800, dailyLimit: 1, weeklyLimit: 3, weeklyXpCap: 18, bands: [[1000, 5], [1250, 5.3], [1500, 5.6], [1800, 6]] }),
    interaction: Object.freeze({ id: "interaction", label: "Interação", minWords: 350, usefulMax: 700, dailyLimit: 2, weeklyLimit: 5, weeklyXpCap: 10, requiresParticipant: true, bands: [[350, 1.5], [700, 2]] }),
    mission: Object.freeze({ id: "mission", label: "Missão", minWords: 0, usefulMax: 0, dailyLimit: 1, weeklyLimit: 5, weeklyXpCap: 70, requiresNarrator: true, difficultyRewards: Object.freeze({ simple: 8, common: 11, hard: 14, epic: 18 }) }),
    session: Object.freeze({ id: "session", label: "Sessão oficial", minWords: 0, usefulMax: 0, dailyLimit: 2, weeklyLimit: 5, weeklyXpCap: 60, requiresCode: true, requiresNarrator: true }),
    event: Object.freeze({ id: "event", label: "Evento narrado", minWords: 0, usefulMax: 0, dailyLimit: 2, weeklyLimit: 5, weeklyXpCap: 60, requiresCode: true, requiresNarrator: true }),
  });

  const TRAINING_FOCUSES = Object.freeze(["força", "velocidade", "habilidade", "resistência", "poder", "afinidade", "técnica", "profissão"]);
  const REQUEST_STATES = Object.freeze(["rascunho local", "enviado", "aguardando confirmação", "em análise", "aprovado", "aprovado com ajuste", "recusado", "XP entregue", "cancelado"]);
  const MASTERY_KEYS = Object.freeze(["classe", "afinidade", "arma", "técnica", "profissão", "exploração", "facção"]);

  const CONTINENTS = Object.freeze([
    { id: "aurevia", name: "Aurèvia", summary: "Terras solares de rotas antigas, cidades muradas e florestas conscientes.", x: 28, y: 44, image: "assets/maps/aurevia.webp" },
    { id: "noctheryn", name: "Noctheryn", summary: "Continente de vigílias, ruínas profundas e fronteiras tocadas pelo Vazio.", x: 72, y: 46, image: "assets/maps/noctheryn.webp" },
  ]);

  const KINGDOMS = Object.freeze([
    { id: "coroa-aurora", continentId: "aurevia", name: "Coroa da Aurora", capital: "Porto Millennium", factionIds: ["vigias-aurora"], x: 20, y: 38, image: "assets/maps/porto-millennium.webp" },
    { id: "dominio-vidro", continentId: "aurevia", name: "Domínio do Vidro", capital: "Caldris", factionIds: ["cartografos-livres"], x: 38, y: 55, image: "assets/maps/deserto-de-vidro.webp" },
    { id: "trono-velado", continentId: "noctheryn", name: "Trono Velado", capital: "Nóctis", factionIds: ["sociedade-laminas"], x: 65, y: 35, image: "assets/maps/noctheryn.webp" },
    { id: "fronteira-partida", continentId: "noctheryn", name: "Fronteira Partida", capital: "Kael", factionIds: ["juramentados-cinza"], x: 81, y: 59, image: "assets/maps/ruinas-de-kael.webp" },
  ]);

  const REGIONS = Object.freeze([
    { id: "porto-millennium", kingdomId: "coroa-aurora", name: "Porto Millennium", biome: "Costa arcana", danger: 1, x: 16, y: 44, image: "assets/maps/porto-millennium.webp", resources: ["sal rúnico", "madeira naval"] },
    { id: "floresta-viva", kingdomId: "coroa-aurora", name: "Floresta Viva", biome: "Bosque consciente", danger: 2, x: 27, y: 33, image: "assets/maps/floresta-viva.webp", resources: ["seiva desperta", "erva lunar"] },
    { id: "deserto-de-vidro", kingdomId: "dominio-vidro", name: "Deserto de Vidro", biome: "Dunas cristalinas", danger: 3, x: 38, y: 52, image: "assets/maps/deserto-de-vidro.webp", resources: ["sílica viva", "fragmento solar"] },
    { id: "campos-dos-ossos", kingdomId: "dominio-vidro", name: "Campos dos Ossos", biome: "Ermo fóssil", danger: 4, x: 43, y: 66, image: "assets/maps/campos-dos-ossos.webp", resources: ["pó ancestral", "medula pétrea"] },
    { id: "noctheryn", kingdomId: "trono-velado", name: "Coração de Noctheryn", biome: "Metrópole noturna", danger: 3, x: 64, y: 39, image: "assets/maps/noctheryn.webp", resources: ["tinta espectral", "metal lunar"] },
    { id: "pantano-sinos-afogados", kingdomId: "trono-velado", name: "Pântano dos Sinos", biome: "Mangue funerário", danger: 4, x: 72, y: 49, image: "assets/maps/pantano-sinos-afogados.webp", resources: ["lodo memorial", "bronze afogado"] },
    { id: "ruinas-de-kael", kingdomId: "fronteira-partida", name: "Ruínas de Kael", biome: "Cidadela caída", danger: 5, x: 80, y: 52, image: "assets/maps/ruinas-de-kael.webp", resources: ["pedra selada", "cinza régia"] },
    { id: "abismo-frio", kingdomId: "fronteira-partida", name: "Abismo Frio", biome: "Fenda glacial", danger: 6, x: 86, y: 68, image: "assets/maps/abismo-frio.webp", resources: ["gelo negro", "núcleo glacial"] },
  ]);

  const POIS = Object.freeze(REGIONS.flatMap((region, index) => [
    { id: `${region.id}-refugio`, regionId: region.id, type: "settlement", name: `Refúgio de ${region.name}`, x: region.x - 2, y: region.y - 2, description: "Ponto seguro, comerciantes e registros locais." },
    { id: `${region.id}-ameaca`, regionId: region.id, type: index % 2 ? "boss" : "dungeon", name: index % 2 ? `Guardião de ${region.name}` : `Passagem de ${region.name}`, x: region.x + 3, y: region.y + 3, description: "Conteúdo descoberto por exploração, missão ou evento." },
  ]));

  const FACTIONS = Object.freeze([
    { id: "vigias-aurora", name: "Vigias da Aurora", values: ["proteção", "memória", "dever"], shop: "Relíquias defensivas" },
    { id: "cartografos-livres", name: "Cartógrafos Livres", values: ["descoberta", "autonomia", "verdade"], shop: "Mapas e ferramentas" },
    { id: "sociedade-laminas", name: "Sociedade das Lâminas", values: ["disciplina", "sigilo", "precisão"], shop: "Técnicas e cosméticos" },
    { id: "juramentados-cinza", name: "Juramentados da Cinza", values: ["resiliência", "reparação", "sacrifício"], shop: "Materiais de Reforja" },
    { id: "circulo-alquimico", name: "Círculo Alquímico", values: ["conhecimento", "equilíbrio", "risco"], shop: "Catalisadores" },
    { id: "coro-sem-rosto", name: "Coro Sem Rosto", values: ["silêncio", "segredo", "transformação"], shop: "Cosméticos raros" },
  ]);

  const ENEMY_ARCHETYPES = Object.freeze([
    ["rastejante-cortina", "Rastejante da Cortina", "quadrúpede baixo", "runner", "floresta-viva"],
    ["sentinela-folha", "Sentinela da Folha", "tronco alto com braços-lâmina", "guard", "floresta-viva"],
    ["vespa-bruma", "Vespa da Bruma", "inseto aéreo triangular", "flying", "floresta-viva"],
    ["mico-eco", "Mico de Eco", "saltador de cauda espiral", "teleport", "floresta-viva"],
    ["caranguejo-runa", "Caranguejo Rúnico", "casco largo e pinças", "armored", "porto-millennium"],
    ["corsario-afogado", "Corsário Afogado", "marinheiro assimétrico", "ranged", "porto-millennium"],
    ["enguia-luz", "Enguia de Luz", "serpente elétrica", "chain", "porto-millennium"],
    ["sino-andante", "Sino Andante", "sino sobre pernas finas", "summoner", "pantano-sinos-afogados"],
    ["viuva-lodo", "Viúva do Lodo", "aranha de pernas longas", "poison", "pantano-sinos-afogados"],
    ["monge-submerso", "Monge Submerso", "figura curva com cajado", "healer", "pantano-sinos-afogados"],
    ["caco-vivo", "Caco Vivo", "cristal flutuante", "split", "deserto-de-vidro"],
    ["escorpiao-prisma", "Escorpião Prisma", "cauda facetada", "pierce", "deserto-de-vidro"],
    ["miragem-faminta", "Miragem Faminta", "silhueta vazada", "illusion", "deserto-de-vidro"],
    ["abutsombra", "Abutre de Sombra", "ave com asas rasgadas", "flying", "campos-dos-ossos"],
    ["ossario-marchante", "Ossário Marchante", "pilha óssea bípede", "fragmenter", "campos-dos-ossos"],
    ["coveiro-ferro", "Coveiro de Ferro", "bruto com pá", "armored", "campos-dos-ossos"],
    ["vigia-sem-rosto", "Vigia Sem Rosto", "manto vertical sem cabeça", "stealth", "noctheryn"],
    ["lamina-eco", "Lâmina de Eco", "duelista estreito", "counter", "noctheryn"],
    ["olho-catedral", "Olho da Catedral", "orbe com pilares", "support", "noctheryn"],
    ["pedreiro-caido", "Pedreiro Caído", "golem quadrado", "siege", "ruinas-de-kael"],
    ["arauto-cinza", "Arauto da Cinza", "estandarte vivo", "buffer", "ruinas-de-kael"],
    ["rato-coroa", "Rato da Coroa", "roedor com coroa quebrada", "thief", "ruinas-de-kael"],
    ["lobo-geada", "Lobo de Geada", "canídeo de dorso cristalino", "runner", "abismo-frio"],
    ["estalactita-viva", "Estalactita Viva", "cone suspenso", "burrow", "abismo-frio"],
    ["ermitão-branco", "Ermitão Branco", "manto arredondado", "freeze", "abismo-frio"],
    ["batedor-fenda", "Batedor da Fenda", "inseto de seis pernas", "scout", "abismo-frio"],
    ["mascara-roubada", "Máscara Roubada", "máscara com fitas", "copy", "noctheryn"],
    ["cavaleiro-oco", "Cavaleiro Oco", "armadura sem torso", "charge", "ruinas-de-kael"],
    ["peregrino-sal", "Peregrino de Sal", "andarilho com mochila", "drain", "porto-millennium"],
    ["flor-mandibula", "Flor Mandíbula", "planta circular dentada", "trap", "floresta-viva"],
  ].map(([id, name, silhouette, behavior, regionId], index) => Object.freeze({ id, name, silhouette, behavior, regionId, tier: "common", threat: 1 + (index % 5), discoveredDescription: `Criatura de ${REGIONS.find((entry) => entry.id === regionId)?.name || "Millennium"}; reage com ${behavior}.` })));

  const SPECIAL_ENEMIES = Object.freeze([
    ["curador-sinos", "Curador dos Sinos", "healer"], ["duplicador-prisma", "Duplicador Prisma", "clone"], ["sabotador-kael", "Sabotador de Kael", "sabotage"],
    ["invocador-cortina", "Invocador da Cortina", "summoner"], ["carcereiro-gelo", "Carcereiro de Gelo", "control"], ["capitao-afogado", "Capitão Afogado", "commander"],
    ["oraculo-falso", "Oráculo Falso", "prediction"], ["devorador-buffs", "Devorador de Bênçãos", "dispel"], ["escudo-catedral", "Escudo da Catedral", "protector"],
    ["mercador-mimico", "Mercador Mímico", "mimic"], ["semeador-corrupcao", "Semeador de Corrupção", "hazard"], ["relojoeiro-partido", "Relojoeiro Partido", "time-shift"],
  ].map(([id, name, behavior], index) => Object.freeze({ id, name, behavior, tier: "special", silhouette: `elite-${index + 1}`, threat: 5 + (index % 3) })));

  const BOSSES = Object.freeze([
    ["rei-cacos", "Rei dos Cacos", "deserto-de-vidro", "quebra a arena em prismas"],
    ["abadessa-afogada", "Abadessa Afogada", "pantano-sinos-afogados", "invoca sinos e marés"],
    ["cervo-milenar", "Cervo Milenar", "floresta-viva", "muda caminhos com raízes"],
    ["almirante-sal", "Almirante de Sal", "porto-millennium", "atira bordadas e chama corsários"],
    ["trono-sem-rei", "Trono Sem Rei", "ruinas-de-kael", "possui estátuas e troca pontos fracos"],
    ["mae-da-geada", "Mãe da Geada", "abismo-frio", "congela setores e parte o chão"],
    ["bispo-do-olho", "Bispo do Olho", "noctheryn", "observa padrões e pune repetição"],
    ["colosso-ossario", "Colosso Ossário", "campos-dos-ossos", "reconstrói membros com fragmentos"],
    ["dragao-cortina", "Dragão da Cortina", "floresta-viva", "atravessa planos e deixa ecos"],
    ["arauto-vazio", "Arauto do Vazio", "noctheryn", "alterna luz, sombra e silêncio"],
  ].map(([id, name, regionId, mechanic], index) => Object.freeze({ id, name, regionId, mechanic, tier: "boss", phases: 2 + (index % 3), threat: 8 + (index % 3), silhouette: `boss-${index + 1}` })));

  const CAMPAIGN_MAPS = Object.freeze([
    "Campo de Treinamento", "Floresta Enevoada", "Ruínas de Caldris", "Fortaleza Escarlate",
    "Deserto dos Ossos", "Cidade Submersa", "Pico Congelado", "Fenda do Vazio",
  ].map((name, index) => Object.freeze({ id: `campaign-${index + 1}`, name, act: index + 1, mechanic: ["tutorial", "névoa", "cobertura", "pressão", "vento", "refração", "gelo", "portais"][index], image: `assets/mundo-vivo-370/maps/map-${String(index + 1).padStart(2, "0")}.webp` })));

  const CARTOGRAPHY_MAPS = Object.freeze([
    "Bosque Antigo", "Pântano Profundo", "Ruínas Reais", "Deserto de Vidro", "Cordilheira Congelada", "Cidade Afundada", "Cavernas de Ferro", "Vazio Fraturado",
  ].map((name, index) => Object.freeze({ id: `cartography-${index + 1}`, name, act: index + 1, objective: ["saída", "resgate", "relíquia", "mapear", "criatura", "furtividade", "pistas", "colapso"][index], image: `assets/mundo-vivo-370/maps/map-${String(index + 1).padStart(2, "0")}.webp` })));

  const TOWER_MAPS = Object.freeze(CAMPAIGN_MAPS.map((map, index) => Object.freeze({ ...map, id: `tower-${index + 1}`, lanes: [2, 3, 4, 2, 3, 2, 3, 4][index], routeType: ["crossroads", "bridges", "ring", "portals", "citadel", "marsh", "rails", "mirror"][index] })));
  const RITUAL_SCENES = Object.freeze(["Altar da Aurora", "Cripta dos Sinos", "Observatório Partido", "Jardim de Cinzas", "Catedral Submersa", "Círculo do Vazio"].map((name, index) => Object.freeze({ id: `ritual-${index + 1}`, name, sequenceModifier: index + 1, image: `assets/mundo-vivo-370/maps/map-${String((index % 8) + 1).padStart(2, "0")}.webp` })));
  const ALCHEMY_SCENES = Object.freeze(["Laboratório de Caldris", "Forja de Sal", "Estufa Lunar", "Caldeirão Ossário", "Oficina Afogada", "Retorta do Abismo"].map((name, index) => Object.freeze({ id: `alchemy-${index + 1}`, name, hazard: ["calor", "corrosão", "esporos", "instabilidade", "pressão", "vazio"][index], image: `assets/mundo-vivo-370/maps/map-${String(((index + 2) % 8) + 1).padStart(2, "0")}.webp` })));
  const MEMORY_VARIANTS = Object.freeze(["Fragmentos da Aurora", "Ecos Afogados", "Runas de Vidro", "Vigília Glacial", "Sombras de Kael", "Constelações Partidas"].map((name, index) => Object.freeze({ id: `memory-${index + 1}`, name, pairs: 4 + index, image: `assets/mundo-vivo-370/maps/map-${String(((index + 4) % 8) + 1).padStart(2, "0")}.webp` })));

  const RANKS = Object.freeze([
    ["D", 0], ["C", 0.35], ["B", 0.5], ["A", 0.62], ["S", 0.74], ["SS", 0.82], ["SSS", 0.89], ["ULTRA", 0.95], ["X", 0.985],
  ].map(([id, threshold]) => Object.freeze({ id, threshold })));

  const MASCOTS = Object.freeze([
    "Lume-Correio", "Corvo de Vidro", "Raposa da Aurora", "Mímico de Bolso", "Sapo Rúnico", "Gato da Cortina", "Mini Colosso", "Vespa-Carta", "Enguia Celeste", "Caranguejo de Bronze",
    "Lebre da Névoa", "Broto Guardião", "Morcego Prisma", "Lagarto de Sal", "Ouriço de Cinza", "Peixe-Lanterna", "Aranha Bordadeira", "Lobo de Papel", "Serpente de Fita", "Besouro Relicário",
    "Polvo Oráculo", "Pássaro Relógio", "Cervo Miniatura", "Tatu de Ferro", "Cabra Glacial", "Dragão de Chá", "Medusa de Jardim", "Pinguim do Vazio", "Mariposa Solar", "Cão Cartógrafo",
  ].map((name, index) => Object.freeze({ id: `mascot-${String(index + 1).padStart(2, "0")}`, name, rarity: ["Comum", "Incomum", "Raro", "Épico", "Lendário"][Math.floor(index / 6)], origin: ["Jornada", "Passe", "Minigames", "Facção", "Evento"][index % 5], atlasIndex: index, image: `assets/mundo-vivo-370/mascots/mascot-${String(index + 1).padStart(2, "0")}.webp`, combatPower: 0 })));

  const CURRENCIES = Object.freeze([
    { id: "gold", label: "PO", source: "Missões, comércio e atividades", sinks: ["mercado", "aprimoramento", "guilda"] },
    { id: "millenniumCoins", label: "MC", source: "eventos e recompensas especiais", sinks: ["invocação", "cosméticos"] },
    { id: "arenaFragments", label: "Fragmentos de Arena", source: "Arena", sinks: ["loja da Arena"] },
    { id: "seasonTokens", label: "Token de Temporada", source: "Passe e eventos", sinks: ["caixas de escolha", "recuperação do Passe"] },
  ]);

  const PASS_REWARDS = Object.freeze(Array.from({ length: 50 }, (_, index) => {
    const level = index + 1;
    const cycle = level % 10;
    const free = cycle === 0 ? { type: "choice-box", amount: 1 } : cycle % 3 === 0 ? { type: "seasonTokens", amount: 2 } : { type: "xp-book", amount: 1 + Math.floor(level / 15) };
    const premium = cycle === 0 ? { type: "mascot", id: MASCOTS[(level / 10 - 1) * 6]?.id || MASCOTS[0].id } : cycle % 2 === 0 ? { type: "reforge-material", amount: 2 } : { type: "cosmetic", amount: 1 };
    return Object.freeze({ level, free, premium, catchUpCost: Math.max(1, Math.ceil(level / 10)) });
  }));

  window.MILLENNIUM_DATA_370 = Object.freeze({
    VERSION,
    ACTIVITY_RULES,
    TRAINING_FOCUSES,
    REQUEST_STATES,
    MASTERY_KEYS,
    CONTINENTS,
    KINGDOMS,
    REGIONS,
    POIS,
    FACTIONS,
    ENEMY_ARCHETYPES,
    SPECIAL_ENEMIES,
    BOSSES,
    CAMPAIGN_MAPS,
    CARTOGRAPHY_MAPS,
    TOWER_MAPS,
    RITUAL_SCENES,
    ALCHEMY_SCENES,
    MEMORY_VARIANTS,
    RANKS,
    MASCOTS,
    CURRENCIES,
    PASS_REWARDS,
  });
}());
