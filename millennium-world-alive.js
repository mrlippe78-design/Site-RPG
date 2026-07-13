(function exposeMillenniumWorldAlive() {
  "use strict";

  const HOUR_MS = 60 * 60 * 1000;
  const ATTRIBUTE_KEYS = ["for", "vel", "hab", "res", "pod"];

  const OFFICIAL_CLASSES = Object.freeze([
    {
      id: "cacador",
      name: "Caçador",
      bonus: { hab: 2, vel: 1 },
      role: "Rastreamento, sobrevivência, combate à distância, emboscada e leitura de terreno.",
      description: "Especialista em encontrar rotas, ameaças, presas e sinais que outros ignoram.",
      limitation: "Não recebe acerto automático nem vantagem absoluta por estar escondido.",
      paths: "Batedor · Arqueiro de Monstros · Rastreador · Caçador de Relíquias · Sentinela de Fronteira",
      active: true,
      official: true,
    },
    {
      id: "guardiao",
      name: "Guardião",
      bonus: { res: 2, for: 1 },
      role: "Proteção, defesa de aliados, controle de passagem e resistência.",
      description: "Sustenta linhas, protege rotas e transforma o próprio corpo em obstáculo consciente.",
      limitation: "Defender alguém não anula automaticamente ataques ou consequências.",
      paths: "Bastião · Escudeiro Rúnico · Guardião de Portal · Protetor Juramentado · Muralha Viva",
      active: true,
      official: true,
    },
    {
      id: "feiticeiro",
      name: "Feiticeiro",
      bonus: { pod: 2, hab: 1 },
      role: "Manifestação espontânea, manipulação energética e controle sobrenatural.",
      description: "Canaliza fenômenos por instinto, herança, pacto ou marca pessoal.",
      limitation: "Não substitui a Afinidade nem concede domínio total sobre elementos.",
      paths: "Canalizador · Bruxo de Pacto · Condutor de Essência · Herdeiro Arcano · Manifestador",
      active: true,
      official: true,
    },
    {
      id: "monge",
      name: "Monge",
      bonus: { for: 1, vel: 1, res: 1 },
      role: "Disciplina corporal, combate próximo, mobilidade e resistência mental.",
      description: "Transforma postura, respiração e repetição em técnica refinada.",
      limitation: "Não concede imunidade, esquiva automática ou múltiplas ações gratuitas.",
      paths: "Punho de Ferro · Peregrino · Guardião Interior · Asceta de Guerra · Mestre de Fluxo",
      active: true,
      official: true,
    },
  ]);

  const LEGACY_ITEMS = Object.freeze([
    { id: "espada-curta", name: "Espada Curta", categoryId: "arma", price: 45, rarity: "Comum", bonus: { for: 1, hab: 1 }, aliases: ["espada curta", "short sword"], description: "Lâmina leve preservada para compatibilidade com inventários antigos." },
  ]);

  const PET_ASSETS = Object.freeze({
    "porteiro-sem-rosto": { hero: "assets/pets/porteiro-sem-rosto.webp", thumbnail: "assets/pets/porteiro-sem-rosto-thumb.webp" },
    "dama-da-vitrine": { hero: "assets/pets/dama-da-vitrine.webp", thumbnail: "assets/pets/dama-da-vitrine-thumb.webp" },
    "vigia-de-telhado": { hero: "assets/pets/vigia-de-telhado.webp", thumbnail: "assets/pets/vigia-de-telhado-thumb.webp" },
    "novica-da-lanterna": { hero: "assets/pets/novica-da-lanterna.webp", thumbnail: "assets/pets/novica-da-lanterna-thumb.webp" },
    "cronista-do-trovao": { hero: "assets/pets/cronista-do-trovao.webp", thumbnail: "assets/pets/cronista-do-trovao-thumb.webp" },
    "vigia-de-ferro": { hero: "assets/pets/vigia-de-ferro.webp", thumbnail: "assets/pets/vigia-de-ferro-thumb.webp" },
    "cronista-de-vidro": { hero: "assets/pets/cronista-de-vidro.webp", thumbnail: "assets/pets/cronista-de-vidro-thumb.webp" },
    "filha-da-cinza": { hero: "assets/pets/filha-da-cinza.webp", thumbnail: "assets/pets/filha-da-cinza-thumb.webp" },
    "santo-da-promessa": { hero: "assets/pets/santo-da-promessa.webp", thumbnail: "assets/pets/santo-da-promessa-thumb.webp" },
    "oraculo-partido": { hero: "assets/pets/oraculo-partido.webp", thumbnail: "assets/pets/oraculo-partido-thumb.webp" },
    "herdeiro-dos-seis-veus": { hero: "assets/pets/herdeiro-dos-seis-veus.webp", thumbnail: "assets/pets/herdeiro-dos-seis-veus-thumb.webp" },
    "general-da-cicatriz": { hero: "assets/pets/general-da-cicatriz.webp", thumbnail: "assets/pets/general-da-cicatriz-thumb.webp" },
    "vazio-que-ri": { hero: "assets/pets/vazio-que-ri.webp", thumbnail: "assets/pets/vazio-que-ri-thumb.webp" },
    "menina-do-fio-vermelho": { hero: "assets/pets/menina-do-fio-vermelho.webp", thumbnail: "assets/pets/menina-do-fio-vermelho-thumb.webp" },
    "mecanico-da-ponte": { hero: "assets/pets/mecanico-da-ponte.webp", thumbnail: "assets/pets/mecanico-da-ponte-thumb.webp" },
    "coveiro-de-luas": { hero: "assets/pets/coveiro-de-luas.webp", thumbnail: "assets/pets/coveiro-de-luas-thumb.webp" },
    "violinista-da-chuva": { hero: "assets/pets/violinista-da-chuva.webp", thumbnail: "assets/pets/violinista-da-chuva-thumb.webp" },
    "marinheiro-da-ultima-vela": { hero: "assets/pets/marinheiro-da-ultima-vela.webp", thumbnail: "assets/pets/marinheiro-da-ultima-vela-thumb.webp" },
    "vigia-do-aqueduto": { hero: "assets/pets/vigia-do-aqueduto.webp", thumbnail: "assets/pets/vigia-do-aqueduto-thumb.webp" },
    "capelao-das-cinzas": { hero: "assets/pets/capelao-das-cinzas.webp", thumbnail: "assets/pets/capelao-das-cinzas-thumb.webp" },
    "duelista-da-pedra-negra": { hero: "assets/pets/duelista-da-pedra-negra.webp", thumbnail: "assets/pets/duelista-da-pedra-negra-thumb.webp" },
    "rainha-do-campo-cinzento": { hero: "assets/pets/rainha-do-campo-cinzento.webp", thumbnail: "assets/pets/rainha-do-campo-cinzento-thumb.webp" },
    "arqueira-de-vidro": { hero: "assets/pets/arqueira-de-vidro.webp", thumbnail: "assets/pets/arqueira-de-vidro-thumb.webp" },
    "tecelã-de-brumas": { hero: "assets/pets/tecela-de-brumas.webp", thumbnail: "assets/pets/tecela-de-brumas-thumb.webp" },
    "dama-do-ultimo-sino": { hero: "assets/pets/dama-do-ultimo-sino.webp", thumbnail: "assets/pets/dama-do-ultimo-sino-thumb.webp" },
  });

  const LOCATION_ASSETS = Object.freeze({
    aurevia: { hero: "assets/maps/aurevia.webp", thumbnail: "assets/maps/aurevia-thumb.webp" },
    noctheryn: { hero: "assets/maps/noctheryn.webp", thumbnail: "assets/maps/noctheryn-thumb.webp" },
    "porto-millennium": { hero: "assets/maps/porto-millennium.webp", thumbnail: "assets/maps/porto-millennium-thumb.webp" },
    "ruinas-de-kael": { hero: "assets/maps/ruinas-de-kael.webp", thumbnail: "assets/maps/ruinas-de-kael-thumb.webp" },
    "abismo-frio": { hero: "assets/maps/abismo-frio.webp", thumbnail: "assets/maps/abismo-frio-thumb.webp" },
    "floresta-viva": { hero: "assets/maps/floresta-viva.webp", thumbnail: "assets/maps/floresta-viva-thumb.webp" },
    "deserto-de-vidro": { hero: "assets/maps/deserto-de-vidro.webp", thumbnail: "assets/maps/deserto-de-vidro-thumb.webp" },
    "campos-dos-ossos": { hero: "assets/maps/campos-dos-ossos.webp", thumbnail: "assets/maps/campos-dos-ossos-thumb.webp" },
    "jardins-de-carne": { hero: "assets/maps/jardins-de-carne.webp", thumbnail: "assets/maps/jardins-de-carne-thumb.webp" },
    "mar-de-vidro-negro": { hero: "assets/maps/mar-de-vidro-negro.webp", thumbnail: "assets/maps/mar-de-vidro-negro-thumb.webp" },
    "cordilheira-dente-branco": { hero: "assets/maps/cordilheira-dente-branco.webp", thumbnail: "assets/maps/cordilheira-dente-branco-thumb.webp" },
    "pantano-sinos-afogados": { hero: "assets/maps/pantano-sinos-afogados.webp", thumbnail: "assets/maps/pantano-sinos-afogados-thumb.webp" },
    "pantano-dos-sinos": { hero: "assets/maps/pantano-dos-sinos.webp", thumbnail: "assets/maps/pantano-dos-sinos-thumb.webp" },
    "arena-das-sete-esferas": { hero: "assets/maps/arena-das-sete-esferas.webp", thumbnail: "assets/maps/arena-das-sete-esferas-thumb.webp" },
    "aldeia-das-folhas-douradas": { hero: "assets/maps/aldeia-das-folhas-douradas.webp", thumbnail: "assets/maps/aldeia-das-folhas-douradas-thumb.webp" },
    "cruzamento-das-cortinas": { hero: "assets/maps/cruzamento-das-cortinas.webp", thumbnail: "assets/maps/cruzamento-das-cortinas-thumb.webp" },
    "sociedade-das-laminas": { hero: "assets/maps/sociedade-das-laminas.webp", thumbnail: "assets/maps/sociedade-das-laminas-thumb.webp" },
    "reino-do-pecado-partido": { hero: "assets/maps/reino-do-pecado-partido.webp", thumbnail: "assets/maps/reino-do-pecado-partido-thumb.webp" },
  });

  const normalize = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  const slug = (value) => normalize(value).replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const stableNumber = (value) => String(value || "").split("").reduce((sum, character) => ((sum * 33) + character.charCodeAt(0)) >>> 0, 5381);

  function mergeById(existing = [], incoming = []) {
    const map = new Map((existing || []).filter(Boolean).map((entry) => [entry.id, { ...entry }]));
    (incoming || []).forEach((entry) => {
      if (!entry?.id) return;
      map.set(entry.id, { ...(map.get(entry.id) || {}), ...entry });
    });
    return [...map.values()];
  }

  function applyAssets(entries = [], assets = {}) {
    return (entries || []).map((entry) => {
      const asset = assets[entry.id] || assets[slug(entry.name)];
      if (!asset) return entry;
      return {
        ...entry,
        imageUrl: asset.hero,
        imageHero: asset.hero,
        imageThumbnail: asset.thumbnail,
        altText: entry.altText || entry.name,
        focusX: Number.isFinite(Number(entry.focusX)) ? Number(entry.focusX) : 50,
        focusY: Number.isFinite(Number(entry.focusY)) ? Number(entry.focusY) : 42,
        zoom: Number.isFinite(Number(entry.zoom)) ? Number(entry.zoom) : 1,
      };
    });
  }

  function decorateCollection(collection, entries = []) {
    if (collection === "classes") return mergeById(entries, OFFICIAL_CLASSES);
    if (collection === "items") return mergeById(entries, LEGACY_ITEMS);
    if (collection === "gachaPets") return applyAssets(entries, PET_ASSETS);
    if (["kingdoms", "regions", "biomes", "towerMaps"].includes(collection)) return applyAssets(entries, LOCATION_ASSETS);
    return entries;
  }

  function applyCatalogs(defaultContent = {}) {
    ["classes", "items", "gachaPets", "kingdoms", "regions", "biomes", "towerMaps"].forEach((collection) => {
      defaultContent[collection] = decorateCollection(collection, defaultContent[collection] || []);
    });
    return defaultContent;
  }

  function petAssetFor(item = {}) {
    return PET_ASSETS[item.sourceId] || PET_ASSETS[item.id] || PET_ASSETS[slug(item.name)] || null;
  }

  function locationAssetFor(item = {}) {
    return LOCATION_ASSETS[item.id] || LOCATION_ASSETS[slug(item.name)] || null;
  }

  function rotationId(now = Date.now(), offsetMs = 0) {
    return Math.floor((Number(now) + Number(offsetMs || 0)) / HOUR_MS);
  }

  function rotationWindow(now = Date.now(), offsetMs = 0) {
    const id = rotationId(now, offsetMs);
    return {
      id,
      startsAt: new Date(id * HOUR_MS - Number(offsetMs || 0)),
      endsAt: new Date((id + 1) * HOUR_MS - Number(offsetMs || 0)),
    };
  }

  function seededShuffle(items = [], seed = "") {
    return [...items].sort((left, right) => {
      const a = stableNumber(`${seed}:${left.id || left.name}`);
      const b = stableNumber(`${seed}:${right.id || right.name}`);
      return a - b || String(left.id || left.name).localeCompare(String(right.id || right.name));
    });
  }

  function rarityKey(value) {
    const key = normalize(value);
    if (key.startsWith("epic")) return "epic";
    if (key.startsWith("lend")) return "legendary";
    if (key.startsWith("mit")) return "mythic";
    if (key.startsWith("cosm")) return "cosmic";
    if (key.startsWith("celest")) return "celestial";
    if (key.startsWith("secret")) return "secret";
    if (key.startsWith("incom")) return "uncommon";
    if (key.startsWith("comum")) return "common";
    return "broken";
  }

  function selectBalancedRotation(pool = [], type = "pets", now = Date.now(), offsetMs = 0) {
    const window = rotationWindow(now, offsetMs);
    const unique = [...new Map((pool || []).filter((item) => item?.id).map((item) => [item.id, item])).values()];
    const buildSelection = (hour) => {
      const buckets = new Map();
      unique.forEach((item) => {
        const key = rarityKey(item.rarity);
        if (!buckets.has(key)) buckets.set(key, []);
        buckets.get(key).push(item);
      });
      const plan = [
        ["uncommon", 1], ["epic", 1], ["legendary", 2], ["mythic", 1], ["cosmic", 1], ["celestial", 1], ["secret", 1],
      ];
      const selected = [];
      const addFrom = (key, count) => {
        seededShuffle(buckets.get(key) || [], `${type}:${hour}:${key}`).forEach((item) => {
          if (selected.length >= 6 || count <= 0 || selected.some((entry) => entry.id === item.id)) return;
          selected.push(item);
          count -= 1;
        });
      };
      plan.forEach(([key, count]) => addFrom(key, count));
      if (selected.length < Math.min(6, unique.length)) {
        seededShuffle(unique, `${type}:${hour}:fallback`).forEach((item) => {
          if (selected.length < Math.min(6, unique.length) && !selected.some((entry) => entry.id === item.id)) selected.push(item);
        });
      }
      return selected;
    };
    let selected = buildSelection(window.id);
    if (unique.length > selected.length) {
      const previous = buildSelection(window.id - 1);
      const sameSet = selected.length === previous.length && selected.every((item) => previous.some((entry) => entry.id === item.id));
      if (sameSet) {
        const alternative = seededShuffle(unique.filter((item) => !selected.some((entry) => entry.id === item.id)), `${type}:${window.id}:anti-repeat`)[0];
        if (alternative) selected = [...selected.slice(0, -1), alternative];
      }
    }
    return {
      type,
      hour: window.id,
      rotationId: window.id,
      name: "Ecos da Hora",
      description: "Companheiros em destaque mudam globalmente a cada hora.",
      featured: selected,
      startsAt: window.startsAt,
      endsAt: window.endsAt,
      configured: false,
    };
  }

  function countdownParts(endsAt, now = Date.now()) {
    const remaining = Math.max(0, new Date(endsAt).getTime() - Number(now));
    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    return { remaining, minutes, seconds, label: `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}` };
  }

  function publicRates(pool = [], rarityTable = []) {
    const available = new Set((pool || []).map((item) => rarityKey(item.rarity)));
    const active = (rarityTable || []).filter((entry) => available.has(entry.id) && Number(entry.weight || 0) > 0);
    const total = active.reduce((sum, entry) => sum + Number(entry.weight || 0), 0) || 1;
    return active.map((entry) => ({ ...entry, percentage: Number(((Number(entry.weight || 0) / total) * 100).toFixed(4)) }));
  }

  function sameImageUsage(collections = {}) {
    const usages = new Map();
    Object.entries(collections).forEach(([collection, entries]) => {
      (entries || []).forEach((entry) => {
        const image = entry.imageHero || entry.imageUrl || "";
        if (!image) return;
        if (!usages.has(image)) usages.set(image, []);
        usages.get(image).push(`${collection}/${entry.id}`);
      });
    });
    return [...usages.entries()].filter(([, entries]) => entries.length > 1).map(([image, entries]) => ({ image, entries }));
  }

  function itemMatch(instance = {}, catalog = []) {
    const candidates = [instance.catalogId, instance.itemId, instance.sourceId, instance.id].filter(Boolean);
    for (const candidate of candidates) {
      const exact = (catalog || []).find((item) => item.id === candidate);
      if (exact) return exact;
    }
    const normalizedName = normalize(instance.name);
    if (!normalizedName) return null;
    return (catalog || []).find((item) => normalize(item.name) === normalizedName || slug(item.name) === slug(instance.name)) || null;
  }

  function attributeBreakdown(stats = {}, attribute = "for") {
    const sources = [
      ["base", "Base", 1], ["development", "Desenvolvimento", 1], ["raceBonus", "Raça", 1],
      ["classBonus", "Classe", 1], ["affinityBonus", "Afinidade", 1], ["equipmentBonus", "Equipamentos", 1],
      ["temporaryBonus", "Efeitos", 1], ["penalties", "Penalidades", -1],
    ];
    return sources.map(([key, label, sign]) => ({ key, label, value: Number(stats?.[key]?.[attribute] || 0) * sign }));
  }

  function sealSequence(seed, length = 4) {
    const symbols = ["◇", "△", "✦", "◈", "⌁", "✥"];
    const sequence = [];
    for (let index = 0; index < length; index += 1) sequence.push(symbols[stableNumber(`${seed}:${index}`) % symbols.length]);
    return sequence;
  }

  window.MILLENNIUM_WORLD_ALIVE_32 = Object.freeze({
    HOUR_MS,
    ATTRIBUTE_KEYS,
    OFFICIAL_CLASSES,
    LEGACY_ITEMS,
    PET_ASSETS,
    LOCATION_ASSETS,
    normalize,
    slug,
    stableNumber,
    mergeById,
    decorateCollection,
    applyCatalogs,
    petAssetFor,
    locationAssetFor,
    rotationId,
    rotationWindow,
    selectBalancedRotation,
    countdownParts,
    publicRates,
    sameImageUsage,
    itemMatch,
    attributeBreakdown,
    sealSequence,
  });
}());
