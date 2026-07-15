(function exposeMillennium370() {
  "use strict";

  const DATA = window.MILLENNIUM_DATA_370;
  if (!DATA) throw new Error("MILLENNIUM_DATA_370 precisa ser carregado antes do runtime 3.7.0.");

  const ui = {
    journeyTab: "overview",
    mapZoom: 1,
    mapContinent: "",
    mapKingdom: "",
    mapRegion: "",
    mapFilter: "all",
    mapSelected: "",
    reforgePreview: null,
    memory: null,
    trial: null,
  };

  const esc = (value) => String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  const normalize = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, " ").trim();
  const clamp = (value, min, max) => Math.max(min, Math.min(max, Number(value) || 0));
  const nowIso = () => new Date().toISOString();
  const dayKey = (value = Date.now()) => new Date(value).toISOString().slice(0, 10);
  const weekKey = (value = Date.now()) => {
    const date = new Date(value);
    const copy = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    const day = copy.getUTCDay() || 7;
    copy.setUTCDate(copy.getUTCDate() + 4 - day);
    const start = new Date(Date.UTC(copy.getUTCFullYear(), 0, 1));
    return `${copy.getUTCFullYear()}-W${String(Math.ceil((((copy - start) / 86400000) + 1) / 7)).padStart(2, "0")}`;
  };

  function timestampValue(value) {
    if (!value) return 0;
    if (typeof value.toMillis === "function") return value.toMillis();
    if (typeof value.toDate === "function") return value.toDate().getTime();
    return Date.parse(value) || Number(value) || 0;
  }

  function words(value) {
    const cleaned = String(value || "")
      .replace(/https?:\/\/\S+/gi, " ")
      .replace(/^>.*$/gm, " ")
      .replace(/^#{1,6}\s+/gm, " ")
      .replace(/[*_~`|()[\]{}<>]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    return cleaned ? cleaned.split(" ").filter((word) => /[\p{L}\p{N}]/u.test(word)).length : 0;
  }

  async function contentHash(value) {
    const normalized = normalize(String(value || "").replace(/https?:\/\/\S+/gi, " ").replace(/^>.*$/gm, " "));
    const bytes = new TextEncoder().encode(normalized);
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
  }

  function formValues(form) {
    const values = {};
    new FormData(form).forEach((value, key) => { values[key] = value; });
    return values;
  }

  function requestActivityType(request = {}) {
    const type = normalize(request.activityType || request.type);
    const aliases = { treino: "training", training: "training", autonarrativa: "autonarrative", interaction: "interaction", interacao: "interaction", mission: "mission", missao: "mission", session: "session", sessao: "session", event: "event", evento: "event" };
    return aliases[type] || type;
  }

  function ownRequests(context) {
    const uid = context.userId;
    return (context.progressRequests || []).filter((request) => request.uid === uid || request.ownerId === uid);
  }

  function requestUsage(context, type) {
    const requests = ownRequests(context).filter((request) => requestActivityType(request) === type && !["recusado", "cancelado"].includes(normalize(request.status)));
    const today = dayKey();
    const week = weekKey();
    return {
      day: requests.filter((request) => dayKey(timestampValue(request.createdAt) || Date.now()) === today).length,
      week: requests.filter((request) => weekKey(timestampValue(request.createdAt) || Date.now()) === week).length,
      requests,
    };
  }

  function xpPercentFor(rule, count, difficulty = "common") {
    if (rule.difficultyRewards) return Number(rule.difficultyRewards[difficulty] || rule.difficultyRewards.common || 0);
    const bands = rule.bands || [];
    return bands.reduce((result, [minimum, percent]) => count >= minimum ? percent : result, 0);
  }

  function levelSnapshot(character = {}) {
    const level = Math.max(1, Number(character.level || 1));
    const xp = Math.max(0, Number(character.xp || 0));
    const required = Math.max(100, Number(character.nextLevelXp || (level * level * 100 + 900)));
    const currentFloor = Math.max(0, Number(character.levelXpFloor || ((level - 1) * (level - 1) * 100 + Math.max(0, level - 1) * 900)));
    const progress = clamp(((xp - currentFloor) / Math.max(1, required - currentFloor)) * 100, 0, 100);
    return { level, xp, required, remaining: Math.max(0, required - xp), progress };
  }

  function masteryRows(character = {}) {
    const masteries = character.masteries || {};
    return DATA.MASTERY_KEYS.map((key) => {
      const source = masteries[key] || {};
      const level = Math.max(0, Number(source.level || source.rank || 0));
      const progress = clamp(source.progress || source.xp || 0, 0, 100);
      return { key, label: key.charAt(0).toUpperCase() + key.slice(1), level, progress };
    });
  }

  function worldProgress(character = {}) {
    const values = [
      ["Regiões", character.discoveredRegionIds], ["Locais", character.discoveredLocationIds], ["NPCs", character.discoveredNpcIds],
      ["Bestiário", character.discoveredBestiaryIds], ["Procurados", character.defeatedWantedIds], ["Chefes", character.defeatedBossIds],
      ["Missões", character.completedMissionIds], ["Arcos", character.completedArcIds],
    ];
    return values.map(([label, entries]) => ({ label, count: Array.isArray(entries) ? entries.length : 0 }));
  }

  function nextRecommendation(context) {
    const character = context.character || {};
    const requests = ownRequests(context);
    if (!character.creationLocked) return { title: "Finalize a ficha", detail: "A Jornada depende da identidade técnica do personagem.", nav: "character" };
    if (!character.affinityId) return { title: "Revele sua afinidade", detail: "A assinatura do personagem ainda não foi registrada.", nav: "roulette" };
    if (requests.some((entry) => ["pendente", "em análise", "aguardando confirmação"].includes(normalize(entry.status)))) return { title: "Acompanhe seus registros", detail: "Há solicitações aguardando confirmação ou análise.", nav: "journey" };
    if (!(character.activeMissions || []).length) return { title: "Escolha uma missão", detail: "Missões conectam a ficha ao mundo e entregam recompensas moderadas.", nav: "missions" };
    if (!(character.discoveredRegionIds || []).length) return { title: "Abra o mapa mundial", detail: "Descubra a primeira região sem gerar leituras durante o zoom.", nav: "world-map" };
    return { title: "Registre sua próxima crônica", detail: "Treino, autonarrativa ou interação podem ser enviados pelo Diário de Jornada.", nav: "journey" };
  }

  function renderJourney(context) {
    const character = context.character || {};
    const level = levelSnapshot(character);
    const recommendation = nextRecommendation(context);
    const pending = ownRequests(context).filter((entry) => !["XP entregue", "recusado", "cancelado"].includes(entry.status));
    const receipts = (character.progressReceipts || character.rewardReceipts || []).slice(-5).reverse();
    const tabs = [["overview", "Visão geral"], ["register", "Registrar atividade"], ["sessions", "Sessões e eventos"], ["masteries", "Maestrias e mundo"]];
    return `
      <div class="m370-page m370-journey">
        <section class="m370-hero m370-hero--journey">
          <div><p class="eyebrow">Personagem → Mundo → Jornada</p><h2>Minha Jornada</h2><p>Progressão oficial do personagem, registros do WhatsApp e consequências do mundo em um único lugar.</p></div>
          <aside><span>Nível ${level.level}</span><strong>${level.xp.toLocaleString("pt-BR")} XP</strong><small>${level.remaining.toLocaleString("pt-BR")} até o próximo nível</small></aside>
          <div class="m370-progress" role="progressbar" aria-label="Progresso do nível" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(level.progress)}"><i style="width:${level.progress}%"></i></div>
        </section>
        <nav class="m370-tabs" aria-label="Seções da Jornada">${tabs.map(([id, label]) => `<button type="button" data-action="m370-journey-tab" data-tab="${id}" class="${ui.journeyTab === id ? "active" : ""}" aria-pressed="${ui.journeyTab === id}">${label}</button>`).join("")}</nav>
        ${ui.journeyTab === "overview" ? renderJourneyOverview(context, recommendation, pending, receipts) : ""}
        ${ui.journeyTab === "register" ? renderJourneyRegister(context) : ""}
        ${ui.journeyTab === "sessions" ? renderSessions(context) : ""}
        ${ui.journeyTab === "masteries" ? renderMasteries(context) : ""}
      </div>`;
  }

  function renderJourneyOverview(context, recommendation, pending, receipts) {
    const character = context.character || {};
    const stats = [
      ["Pontos de desenvolvimento", Number(character.developmentPoints || 0)], ["Classe", character.className || character.classId || "Não registrada"],
      ["Afinidade", character.affinityName || character.affinityId || "Adormecida"], ["Profissão", character.profession || character.professionId || "Não registrada"],
    ];
    return `<div class="m370-grid">
      <article class="m370-card m370-span-8"><header><div><p class="eyebrow">Próxima decisão</p><h3>${esc(recommendation.title)}</h3></div><button class="primary-button" type="button" data-nav="${esc(recommendation.nav)}">Abrir</button></header><p>${esc(recommendation.detail)}</p><div class="m370-stat-grid">${stats.map(([label, value]) => `<div><span>${esc(label)}</span><strong>${esc(value)}</strong></div>`).join("")}</div></article>
      <article class="m370-card m370-span-4"><p class="eyebrow">Registros pendentes</p><h3>${pending.length}</h3><p>${pending.length ? "A Interface preservou os protocolos sem repetir leituras." : "Nenhuma atividade aguarda decisão."}</p></article>
      <article class="m370-card m370-span-7"><p class="eyebrow">Últimas recompensas</p><h3>Recibos</h3><div class="m370-list">${receipts.length ? receipts.map((entry) => `<div><span>${esc(entry.origin || entry.type || "Jornada")}</span><strong>${Number(entry.xp || 0)} XP</strong><small>${esc(entry.createdAt || entry.date || "")}</small></div>`).join("") : `<p class="m370-empty">Os recibos aparecerão aqui depois da primeira aprovação.</p>`}</div></article>
      <article class="m370-card m370-span-5"><p class="eyebrow">Próximos desbloqueios</p><h3>Horizonte do personagem</h3><ul class="m370-bullets"><li>Nova técnica a cada marco configurado.</li><li>Regiões e NPCs revelados pelo mapa.</li><li>Títulos e cosméticos por feitos, sem poder de combate.</li></ul></article>
    </div>`;
  }

  function renderJourneyRegister(context) {
    const rules = Object.values(DATA.ACTIVITY_RULES).filter((entry) => ["training", "autonarrative", "interaction", "mission"].includes(entry.id));
    const usage = Object.fromEntries(rules.map((rule) => [rule.id, requestUsage(context, rule.id)]));
    return `<div class="m370-grid">
      <article class="m370-card m370-span-8"><p class="eyebrow">Diário de Jornada</p><h3>Registrar atividade do WhatsApp</h3><p>A contagem, o preview e o hash acontecem localmente. Uma única gravação é feita somente ao enviar.</p>
        <form class="m370-form" data-form="journey-request-370">
          <label><span>Tipo</span><select name="activityType" data-m370-activity-type>${rules.map((rule) => `<option value="${rule.id}">${esc(rule.label)}</option>`).join("")}</select></label>
          <label><span>Título</span><input name="title" maxlength="120" required /></label>
          <label><span>Foco do treino</span><select name="focus"><option value="">Não se aplica</option>${DATA.TRAINING_FOCUSES.map((focus) => `<option value="${focus}">${focus}</option>`).join("")}</select></label>
          <label><span>Outro personagem</span><input name="participantName" maxlength="100" placeholder="Obrigatório em interações" /></label>
          <label class="m370-full"><span>Texto próprio ou comprovante</span><textarea name="content" rows="12" maxlength="24000" data-m370-word-source required></textarea></label>
          <div class="m370-word-meter m370-full"><strong data-m370-word-count>0 palavras</strong><span data-m370-word-rule>Mínimo do treino: 500 · teto útil: 900</span><i><b data-m370-word-progress style="width:0%"></b></i></div>
          <label class="m370-check m370-full"><input type="checkbox" name="authorshipConfirmed" value="true" required /><span>Confirmo autoria, data e que este conteúdo ainda não recebeu recompensa.</span></label>
          <button class="primary-button intense" type="submit">Enviar registro único</button>
        </form>
      </article>
      <aside class="m370-card m370-span-4"><p class="eyebrow">Limites já carregados</p><h3>Hoje e nesta semana</h3><div class="m370-limits">${rules.map((rule) => `<div><strong>${esc(rule.label)}</strong><span>Hoje ${usage[rule.id].day}/${rule.dailyLimit}</span><span>Semana ${usage[rule.id].week}/${rule.weeklyLimit}</span></div>`).join("")}</div><p class="m370-note">Palavras definem a faixa. Nunca multiplicam XP sem limite.</p></aside>
    </div>`;
  }

  function renderSessions(context) {
    const own = ownRequests(context).filter((entry) => ["session", "event", "sessionredemption"].includes(requestActivityType(entry)) || entry.sessionCode);
    return `<div class="m370-grid">
      <article class="m370-card m370-span-6"><p class="eyebrow">Código oficial</p><h3>Resgatar sessão ou evento</h3><form class="m370-form" data-form="session-redeem-370"><label><span>Código</span><input name="code" maxlength="40" pattern="[A-Za-z0-9-]+" placeholder="SESSAO-ARCO3-0715" required /></label><label><span>Resumo e escolhas</span><textarea name="summary" maxlength="3000" rows="6" required></textarea></label><button class="primary-button" type="submit">Solicitar resgate</button></form></article>
      ${context.role === "admin" ? `<article class="m370-card m370-span-6"><p class="eyebrow">Narrador autorizado</p><h3>Criar sessão compacta</h3><form class="m370-form" data-form="session-create-370"><label><span>Código</span><input name="code" maxlength="40" required /></label><label><span>Título</span><input name="title" maxlength="120" required /></label><label><span>Região</span><select name="regionId">${DATA.REGIONS.map((region) => `<option value="${region.id}">${esc(region.name)}</option>`).join("")}</select></label><label><span>XP-base</span><input name="xpBase" type="number" min="0" max="5000" value="500" /></label><label><span>Validade</span><input name="expiresAt" type="date" required /></label><label class="m370-full"><span>Objetivos</span><textarea name="objectives" maxlength="2000" rows="4" required></textarea></label><button class="primary-button" type="submit">Publicar sessão</button></form></article>` : `<article class="m370-card m370-span-6"><p class="eyebrow">Proteções</p><h3>Resgate verificável</h3><ul class="m370-bullets"><li>Um recibo por personagem e código.</li><li>Validade e participantes são conferidos pelo Oráculo.</li><li>Nenhum XP é aplicado apenas por digitar o código.</li></ul></article>`}
      <article class="m370-card m370-span-12"><p class="eyebrow">Histórico compacto</p><h3>Protocolos de sessão</h3><div class="m370-list">${own.length ? own.slice(0, 12).map((entry) => `<div><span>${esc(entry.sessionCode || entry.code || entry.title)}</span><strong>${esc(entry.status || "pendente")}</strong><small>${esc(entry.title || "Sessão")}</small></div>`).join("") : `<p class="m370-empty">Nenhum código resgatado.</p>`}</div></article>
    </div>`;
  }

  function renderMasteries(context) {
    const character = context.character || {};
    return `<div class="m370-grid">
      <article class="m370-card m370-span-7"><p class="eyebrow">Maestrias</p><h3>Especializações do personagem</h3><div class="m370-mastery-grid">${masteryRows(character).map((entry) => `<div><header><span>${esc(entry.label)}</span><strong>Grau ${entry.level}</strong></header><i><b style="width:${entry.progress}%"></b></i><small>${100 - entry.progress}% até o próximo grau</small></div>`).join("")}</div></article>
      <article class="m370-card m370-span-5"><p class="eyebrow">Progresso no mundo</p><h3>Crônica explorada</h3><div class="m370-stat-grid">${worldProgress(character).map((entry) => `<div><span>${entry.label}</span><strong>${entry.count}</strong></div>`).join("")}</div><button class="ghost-button" type="button" data-nav="world-map">Abrir mapa semântico</button></article>
    </div>`;
  }

  function mapLayerData() {
    if (ui.mapZoom === 1) return DATA.CONTINENTS.map((entry) => ({ ...entry, kind: "continent" }));
    if (ui.mapZoom === 2) return DATA.KINGDOMS.filter((entry) => !ui.mapContinent || entry.continentId === ui.mapContinent).map((entry) => ({ ...entry, kind: "kingdom" }));
    if (ui.mapZoom === 3) return DATA.REGIONS.filter((entry) => !ui.mapKingdom || entry.kingdomId === ui.mapKingdom).map((entry) => ({ ...entry, kind: "region" }));
    return DATA.POIS.filter((entry) => !ui.mapRegion || entry.regionId === ui.mapRegion).map((entry) => ({ ...entry, kind: "poi" }));
  }

  function renderWorldMap(context) {
    const character = context.character || {};
    const discoveredRegions = new Set(character.discoveredRegionIds || []);
    const discoveredLocations = new Set(character.discoveredLocationIds || []);
    const entries = mapLayerData().filter((entry) => ui.mapFilter === "all" || entry.type === ui.mapFilter || entry.kind === ui.mapFilter);
    const selectedSource = [...DATA.CONTINENTS, ...DATA.KINGDOMS, ...DATA.REGIONS, ...DATA.POIS].find((entry) => entry.id === ui.mapSelected);
    const selected = selectedSource ? {
      ...selectedSource,
      kind: DATA.CONTINENTS.includes(selectedSource) ? "continent" : DATA.KINGDOMS.includes(selectedSource) ? "kingdom" : DATA.REGIONS.includes(selectedSource) ? "region" : "poi",
    } : null;
    const zoomLabels = ["", "Mundo", "Continente", "Reino", "Região", "Local"];
    return `<div class="m370-page m370-world">
      <section class="m370-hero m370-hero--map"><div><p class="eyebrow">Cartografia estática versionada</p><h2>Mapa Mundial</h2><p>Pan, zoom, filtros e detalhes locais geram zero leituras Firebase.</p></div><aside><span>Zoom semântico</span><strong>${zoomLabels[ui.mapZoom]}</strong><small>${entries.length} marcador(es) visíveis</small></aside></section>
      <div class="m370-map-toolbar"><div role="group" aria-label="Nível do mapa">${[1, 2, 3, 4, 5].map((zoom) => `<button type="button" data-action="m370-map-zoom" data-zoom="${zoom}" class="${ui.mapZoom === zoom ? "active" : ""}">${zoom}. ${zoomLabels[zoom]}</button>`).join("")}</div><label><span>Filtro</span><select data-m370-map-filter><option value="all">Tudo desta camada</option><option value="settlement">Cidades</option><option value="dungeon">Masmorras</option><option value="boss">Chefes</option></select></label></div>
      <div class="m370-map-layout"><section class="m370-map-canvas" data-zoom="${ui.mapZoom}" aria-label="Mapa de Millennium">${entries.map((entry) => {
        const discovered = entry.kind === "region" ? discoveredRegions.has(entry.id) : entry.kind === "poi" ? discoveredLocations.has(entry.id) || discoveredRegions.has(entry.regionId) : true;
        return `<button type="button" data-action="m370-map-select" data-map-id="${entry.id}" data-map-kind="${entry.kind}" class="m370-map-node ${entry.kind} ${discovered ? "discovered" : "unknown"}" style="--x:${entry.x || 50};--y:${entry.y || 50}" aria-label="${discovered ? esc(entry.name) : "Local não descoberto"}"><span>${entry.kind === "continent" ? "◈" : entry.kind === "kingdom" ? "♜" : entry.kind === "region" ? "◇" : entry.type === "boss" ? "☠" : entry.type === "dungeon" ? "⌂" : "●"}</span><strong>${discovered ? esc(entry.name) : "???"}</strong></button>`;
      }).join("")}<div class="m370-map-grid" aria-hidden="true"></div></section>
      <aside class="m370-map-detail">${selected ? `<p class="eyebrow">${esc(selected.type || selected.kind || "registro")}</p><h3>${esc(selected.name)}</h3>${selected.image ? `<img src="${esc(selected.image)}" alt="Vista de ${esc(selected.name)}" loading="lazy" />` : ""}<p>${esc(selected.summary || selected.description || selected.biome || "Registro cartográfico de Millennium.")}</p>${selected.resources ? `<div class="m370-chips">${selected.resources.map((resource) => `<span>${esc(resource)}</span>`).join("")}</div>` : ""}<button class="ghost-button" type="button" data-action="m370-map-deeper" data-map-id="${selected.id}" data-map-kind="${selected.kind || selected.type}">Explorar esta camada</button>` : `<p class="m370-empty">Selecione um marcador. Conteúdo não descoberto permanece em silhueta.</p>`}</aside></div>
    </div>`;
  }

  function rankFor(performance, difficulty = "normal") {
    const caps = { easy: "A", normal: "S", hard: "SS", nightmare: "SSS", abyssal: "ULTRA", extreme: "X" };
    const capIndex = DATA.RANKS.findIndex((entry) => entry.id === (caps[difficulty] || "S"));
    let index = 0;
    DATA.RANKS.forEach((entry, current) => { if (performance >= entry.threshold) index = current; });
    return DATA.RANKS[Math.min(index, capIndex < 0 ? index : capIndex)].id;
  }

  function renderMinigameExtension(context) {
    const record = context.character?.minigameRecords || {};
    const trials = [["tracking", "Rastreamento"], ["excavation", "Escavação"], ["forge", "Forja"], ["decipher", "Decifração"], ["survival", "Sobrevivência"]];
    return `<section class="m370-extension m370-minigame-expansion"><header><div><p class="eyebrow">Campanhas 3.7.0</p><h2>Jogos completos e ranks D–X</h2><p>Decisões e movimentos são locais; somente o resultado final é persistido.</p></div><button class="primary-button" type="button" data-action="m370-start-memory">Jogar Memória Corrompida</button></header><div class="m370-campaign-strip">${DATA.CAMPAIGN_MAPS.map((map) => `<article><img src="${esc(map.image)}" alt="Cenário de ${esc(map.name)}" loading="lazy" /><span>Ato ${map.act}</span><strong>${esc(map.name)}</strong><small>${esc(map.mechanic)}</small></article>`).join("")}</div><div class="m370-trial-grid">${trials.map(([id, label]) => `<article><span>${esc(record[id]?.rank || "D")}</span><h3>${label}</h3><p>Desafio curto em três atos, seed local e resultado único.</p><button class="ghost-button" type="button" data-action="m370-start-trial" data-mode="${id}">Iniciar</button></article>`).join("")}</div><p class="m370-note">Escala: D · C · B · A · S · SS · SSS · ULTRA · X. Rank X exige execução extrema quase perfeita.</p></section>`;
  }

  function renderSupport(context) {
    const next = nextRecommendation(context);
    const sources = [
      ["Livros de XP", "Passe, missões, masmorra e eventos"], ["Materiais de Reforja", "Alquimia, Tower Defense, Boss e desmontagem"],
      ["Fragmentos", "Arena, duplicatas e eventos"], ["Token de Temporada", "Passe e eventos sazonais"], ["Cosméticos", "Conquistas, facções, Passe e minigames"],
    ];
    return `<section class="m370-extension m370-support"><header><div><p class="eyebrow">Suporte ao jogador</p><h2>O que fazer agora?</h2></div><button class="primary-button" type="button" data-nav="${esc(next.nav)}">${esc(next.title)}</button></header><p>${esc(next.detail)}</p><h3>Onde obter?</h3><div class="m370-source-grid">${sources.map(([item, source]) => `<div><strong>${item}</strong><span>${source}</span></div>`).join("")}</div></section>`;
  }

  function renderProfileExtension(context) {
    const character = context.character || {};
    const mascot = DATA.MASCOTS.find((entry) => entry.id === character.activeMascotId);
    return `<section class="m370-extension m370-profile-identity"><header><div><p class="eyebrow">Identidade pública</p><h2>Títulos, molduras e Mascote</h2></div><span class="m370-public-badge">Gameplay público · dados pessoais protegidos</span></header><div class="m370-profile-preview"><div class="m370-avatar-frame"><img src="${esc(character.avatarUrl || "assets/placeholders/portrait-4x5.svg")}" alt="Avatar público" loading="lazy" /><i></i></div><div><strong>${esc(character.characterName || "Herói sem nome")}</strong><span>${esc(character.activeTitleName || "Desperto")}</span><small>${esc(mascot?.name || "Nenhum Mascote equipado")}</small></div></div><div class="m370-mascot-row">${DATA.MASCOTS.map((entry) => `<button type="button" data-action="m370-equip-mascot" data-mascot-id="${entry.id}" class="${entry.id === character.activeMascotId ? "active" : ""}" title="${esc(entry.name)}"><img src="${esc(entry.image)}" alt="Mascote ${esc(entry.name)}" loading="lazy" /><small>${esc(entry.name)}</small></button>`).join("")}</div></section>`;
  }

  function renderPassExtension(context) {
    const character = context.character || {};
    const tokens = Number(character.seasonTokens || 0);
    const level = clamp(character.passLevel || 1, 1, 50);
    return `<section class="m370-extension m370-pass-utility"><header><div><p class="eyebrow">Economia sazonal</p><h2>Tokens com origem e destino</h2></div><strong>${tokens} Token(s) de Temporada</strong></header><div class="m370-currency-grid">${DATA.CURRENCIES.map((entry) => `<article><h3>${esc(entry.label)}</h3><p><strong>Origem:</strong> ${esc(entry.source)}</p><p><strong>Uso:</strong> ${esc(entry.sinks.join(", "))}</p></article>`).join("")}</div><div class="m370-catchup"><div><span>Recuperação do Passe</span><strong>Nível atual ${level}/50</strong><small>Caixas de escolha evitam recompensas inúteis.</small></div><button class="primary-button" type="button" data-action="m370-pass-catchup" data-level="${level}" ${tokens < Math.max(1, Math.ceil(level / 10)) ? "disabled" : ""}>Usar recuperação</button></div></section>`;
  }

  function inventoryCandidates(character = {}) {
    return (character.inventory || character.items || []).filter((entry) => entry && (entry.instanceId || entry.id) && !["consumable", "material", "currency"].includes(normalize(entry.category || entry.type))).slice(0, 8);
  }

  function renderMarketExtension(context) {
    const items = inventoryCandidates(context.character);
    const preview = ui.reforgePreview;
    return `<section class="m370-extension m370-reforge"><header><div><p class="eyebrow">Aprimoramento · Reforja · Desmontagem</p><h2>Oficina de propriedades</h2></div><span>Preview local · confirmação transacional</span></header><div class="m370-reforge-layout"><div class="m370-reforge-items">${items.length ? items.map((entry) => `<button type="button" data-action="m370-reforge-preview" data-item-id="${esc(entry.instanceId || entry.id)}"><strong>${esc(entry.name || entry.itemId || "Item")}</strong><small>${esc(entry.rarity || "Comum")}</small></button>`).join("") : `<p class="m370-empty">Nenhum equipamento elegível no inventário carregado.</p>`}</div><article class="m370-reforge-preview">${preview ? `<span>Resultado proposto</span><h3>${esc(preview.itemName)}</h3><p>${esc(preview.attribute)}: <strong>+${preview.value}</strong></p><p>Custo: ${preview.cost} PO · ${preview.materialCost} material(is)</p><div class="action-row"><button class="primary-button" type="button" data-action="m370-reforge-apply">Confirmar novo resultado</button><button class="ghost-button" type="button" data-action="m370-reforge-dismiss">Manter resultado anterior</button></div>` : `<p>Escolha um equipamento. A proposta não altera o inventário antes da confirmação.</p>`}</article></div></section>`;
  }

  function renderMonsterExtension() {
    return `<section class="m370-extension m370-monster-loop"><p class="eyebrow">Loop corrigido</p><h2>Cuidado não produz XP infinito</h2><div class="m370-loop-grid"><div><strong>Alimentar</strong><span>Energia e vínculo, sem XP.</span></div><div><strong>Descansar</strong><span>Energia e condição, sem XP.</span></div><div><strong>Interagir</strong><span>Lore, falas e cosméticos, com limite.</span></div><div><strong>Treinar</strong><span>Melhora o próximo Livro de XP; não concede XP direto.</span></div></div></section>`;
  }

  function enhanceRoute(route, host, context) {
    if (!host || host.querySelector(".m370-extension")) return;
    const renderers = {
      profile: renderProfileExtension,
      pass: renderPassExtension,
      market: renderMarketExtension,
      minigames: renderMinigameExtension,
      help: renderSupport,
      monsters: renderMonsterExtension,
      ranking: renderProfileExtension,
    };
    const renderer = renderers[route];
    if (!renderer) return;
    const wrapper = document.createElement("div");
    wrapper.innerHTML = renderer(context);
    [...wrapper.children].forEach((child) => host.appendChild(child));
  }

  function openMemory(bridge) {
    const symbols = ["◇", "△", "✦", "◈", "☾", "☉", "♜", "⚔"];
    const cards = [...symbols, ...symbols].map((symbol, index) => ({ id: index, symbol, open: false, matched: false }));
    const seed = dayKey().split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
    cards.sort((a, b) => ((a.id * 37 + seed) % 101) - ((b.id * 37 + seed) % 101));
    ui.memory = { cards, first: null, lock: false, moves: 0, errors: 0, startedAt: Date.now() };
    renderMemoryModal(bridge);
  }

  function renderMemoryModal(bridge) {
    const game = ui.memory;
    if (!game) return;
    bridge.openModal(`<section class="m370-game-modal"><header><div><p class="eyebrow">Memória Corrompida</p><h2>Restaure os oito pares</h2></div><button class="ghost-button" type="button" data-action="close-modal">Sair</button></header><div class="m370-game-hud"><span>Movimentos ${game.moves}</span><span>Erros ${game.errors}</span><span>Corrupção ${Math.min(100, game.errors * 8)}%</span></div><div class="m370-memory-board">${game.cards.map((card, index) => `<button type="button" data-action="m370-memory-card" data-card-index="${index}" class="${card.open || card.matched ? "open" : ""} ${card.matched ? "matched" : ""}" ${card.matched ? "disabled" : ""} aria-label="Carta ${index + 1}${card.matched ? ", par encontrado" : ""}"><span>${card.open || card.matched ? card.symbol : "?"}</span></button>`).join("")}</div></section>`);
  }

  async function flipMemory(index, bridge) {
    const game = ui.memory;
    const card = game?.cards[index];
    if (!game || !card || card.matched || card.open || game.lock) return;
    card.open = true;
    if (game.first === null) { game.first = index; renderMemoryModal(bridge); return; }
    game.moves += 1;
    const first = game.cards[game.first];
    if (first.symbol === card.symbol) {
      first.matched = true; card.matched = true; first.open = true; card.open = true; game.first = null;
      if (game.cards.every((entry) => entry.matched)) {
        const seconds = Math.max(1, Math.round((Date.now() - game.startedAt) / 1000));
        const performance = clamp(1 - game.errors * 0.055 - Math.max(0, seconds - 35) * 0.006, 0, 1);
        const rank = rankFor(performance, "normal");
        await bridge.commitMinigameResult({ mode: "memory", score: Math.round(performance * 10000), rank, seconds, errors: game.errors, completedAt: nowIso() });
        bridge.openModal(`<section class="m370-result"><p class="eyebrow">Memória restaurada</p><strong>${rank}</strong><h2>${game.moves} movimentos · ${seconds}s</h2><p>O resultado final foi registrado uma única vez.</p><button class="primary-button" type="button" data-action="close-modal">Concluir</button></section>`);
        ui.memory = null;
      } else renderMemoryModal(bridge);
      return;
    }
    game.errors += 1; game.lock = true; renderMemoryModal(bridge);
    window.setTimeout(() => { first.open = false; card.open = false; game.first = null; game.lock = false; renderMemoryModal(bridge); }, 650);
  }

  const TRIAL_CONTENT = Object.freeze({
    tracking: [["Pegadas se aprofundam ao norte.", "seguir norte", "seguir água", 0], ["O vento apaga o cheiro.", "procurar abrigo", "correr", 0], ["Uma pista perfeita parece artificial.", "testar a pista", "aceitar", 0]],
    excavation: [["A camada vibra sob a escova.", "usar pincel", "usar martelo", 0], ["Uma rachadura alcança a borda.", "reduzir pressão", "forçar", 0], ["O selo ainda está preso.", "contornar", "puxar", 0]],
    forge: [["O metal fica rubro.", "martelar borda", "resfriar", 0], ["A lâmina perde alinhamento.", "corrigir ritmo", "aumentar calor", 0], ["A têmpera começa.", "resfriar gradual", "mergulhar", 0]],
    decipher: [["Dois símbolos se repetem.", "buscar padrão", "traduzir isolado", 0], ["Uma linha foi apagada.", "inferir contexto", "inventar palavra", 0], ["A ordem parece circular.", "ler pelo selo", "ler da esquerda", 0]],
    survival: [["A chuva alcança o vale.", "erguer abrigo", "seguir viagem", 0], ["Pegadas cercam o acampamento.", "apagar rastros", "acender fogo", 0], ["A saída exige altura.", "subir com corda", "escalar livre", 0]],
  });

  function startTrial(mode, bridge) {
    ui.trial = { mode, round: 0, correct: 0, startedAt: Date.now() };
    renderTrial(bridge);
  }

  function renderTrial(bridge) {
    const trial = ui.trial;
    const round = TRIAL_CONTENT[trial?.mode]?.[trial.round];
    if (!trial || !round) return;
    bridge.openModal(`<section class="m370-game-modal"><header><div><p class="eyebrow">${esc(trial.mode)} · Ato ${trial.round + 1}/3</p><h2>${esc(round[0])}</h2></div><button class="ghost-button" type="button" data-action="close-modal">Sair</button></header><div class="m370-trial-choices"><button class="primary-button" type="button" data-action="m370-trial-choice" data-choice="0">${esc(round[1])}</button><button class="ghost-button" type="button" data-action="m370-trial-choice" data-choice="1">${esc(round[2])}</button></div></section>`);
  }

  async function chooseTrial(choice, bridge) {
    const trial = ui.trial;
    if (!trial) return;
    if (Number(choice) === 0) trial.correct += 1;
    trial.round += 1;
    if (trial.round < 3) { renderTrial(bridge); return; }
    const performance = trial.correct / 3;
    const rank = rankFor(performance, "normal");
    await bridge.commitMinigameResult({ mode: trial.mode, score: trial.correct * 1000, rank, errors: 3 - trial.correct, completedAt: nowIso() });
    bridge.openModal(`<section class="m370-result"><p class="eyebrow">Prova concluída</p><strong>${rank}</strong><h2>${trial.correct}/3 decisões corretas</h2><p>Somente o resultado final foi persistido.</p><button class="primary-button" type="button" data-action="close-modal">Concluir</button></section>`);
    ui.trial = null;
  }

  function handlesAction(action) {
    return String(action || "").startsWith("m370-");
  }

  async function handleAction(action, dataset, bridge) {
    if (action === "m370-journey-tab") { ui.journeyTab = dataset.tab || "overview"; bridge.render(); }
    if (action === "m370-map-zoom") { ui.mapZoom = clamp(dataset.zoom, 1, 5); bridge.render(); }
    if (action === "m370-map-select") { ui.mapSelected = dataset.mapId || ""; bridge.render(); }
    if (action === "m370-map-deeper") {
      const kind = dataset.mapKind;
      if (kind === "continent") { ui.mapContinent = dataset.mapId; ui.mapZoom = 2; }
      else if (kind === "kingdom") { ui.mapKingdom = dataset.mapId; ui.mapZoom = 3; }
      else if (kind === "region") { ui.mapRegion = dataset.mapId; ui.mapZoom = 4; }
      else ui.mapZoom = 5;
      ui.mapSelected = ""; bridge.render();
    }
    if (action === "m370-equip-mascot") { await bridge.updateCharacter({ activeMascotId: dataset.mascotId, profileProjectionVersion: 370 }); bridge.toast("Mascote equipado sem alterar poder de combate."); }
    if (action === "m370-pass-catchup") { await bridge.consumeSeasonCatchUp(); bridge.toast("Recuperação do Passe aplicada com recibo."); }
    if (action === "m370-reforge-preview") {
      const item = inventoryCandidates(bridge.context().character).find((entry) => (entry.instanceId || entry.id) === dataset.itemId);
      if (!item) return;
      const seed = normalize(`${dataset.itemId}:${dayKey()}`).split("").reduce((sum, char) => ((sum * 31) + char.charCodeAt(0)) >>> 0, 7);
      const attributes = ["força", "velocidade", "habilidade", "resistência", "poder"];
      ui.reforgePreview = { itemId: dataset.itemId, itemName: item.name || item.itemId || "Item", attribute: attributes[seed % attributes.length], value: 1 + (seed % 4), cost: 150 + (seed % 5) * 50, materialCost: 1 + (seed % 3), seed: String(seed) };
      bridge.render();
    }
    if (action === "m370-reforge-apply" && ui.reforgePreview) { await bridge.applyReforge(ui.reforgePreview); ui.reforgePreview = null; bridge.toast("Reforja confirmada com recibo idempotente."); }
    if (action === "m370-reforge-dismiss") { ui.reforgePreview = null; bridge.render(); }
    if (action === "m370-start-memory") openMemory(bridge);
    if (action === "m370-memory-card") await flipMemory(Number(dataset.cardIndex), bridge);
    if (action === "m370-start-trial") startTrial(dataset.mode, bridge);
    if (action === "m370-trial-choice") await chooseTrial(dataset.choice, bridge);
  }

  function handlesForm(type) {
    return ["journey-request-370", "session-redeem-370", "session-create-370"].includes(type);
  }

  async function handleForm(type, form, bridge) {
    const values = formValues(form);
    if (type === "journey-request-370") {
      const rule = DATA.ACTIVITY_RULES[values.activityType];
      if (!rule) throw new Error("Tipo de atividade inválido.");
      const count = words(values.content);
      if (count < rule.minWords) throw new Error(`${rule.label} exige no mínimo ${rule.minWords} palavras próprias.`);
      if (rule.requiresFocus && !values.focus) throw new Error("Escolha o foco do treino.");
      if (rule.requiresParticipant && !String(values.participantName || "").trim()) throw new Error("Informe o outro personagem da interação.");
      const context = bridge.context();
      const usage = requestUsage(context, rule.id);
      if (usage.day >= rule.dailyLimit) throw new Error(`Limite diário de ${rule.label} alcançado.`);
      if (usage.week >= rule.weeklyLimit) throw new Error(`Limite semanal de ${rule.label} alcançado.`);
      const hash = await contentHash(values.content);
      if (usage.requests.some((entry) => entry.contentHash === hash || entry.normalizedHash === hash)) throw new Error("Este conteúdo já foi registrado.");
      const xpPercent = xpPercentFor(rule, count, values.difficulty);
      const receiptId = `journey:${context.userId}:${rule.id}:${hash.slice(0, 20)}`;
      await bridge.addProgressRequest({
        activityType: rule.id, type: rule.id, title: String(values.title || "").trim().slice(0, 120), description: String(values.content || "").trim().slice(0, 24000),
        wordCount: count, usefulWordCount: Math.min(count, rule.usefulMax || count), focus: values.focus || "", participantName: String(values.participantName || "").trim().slice(0, 100),
        contentHash: hash, normalizedHash: hash, xpPercent, dailyKey: dayKey(), weeklyKey: weekKey(), receiptId, idempotencyKey: receiptId,
        status: "pendente", workflowStatus: rule.requiresParticipant ? "aguardando confirmação" : rule.requiresNarrator ? "em análise" : "enviado", schemaVersion: 370,
      });
      form.reset(); bridge.toast(`${rule.label} registrado: ${count} palavras, faixa de ${xpPercent}% do próximo nível.`); bridge.render();
    }
    if (type === "session-redeem-370") {
      const code = normalize(values.code).toUpperCase().replace(/[^A-Z0-9-]/g, "");
      if (!code) throw new Error("Código inválido.");
      const context = bridge.context();
      const idempotencyKey = `session:${context.userId}:${code}`;
      if (ownRequests(context).some((entry) => entry.idempotencyKey === idempotencyKey || entry.sessionCode === code)) throw new Error("Este personagem já solicitou o resgate deste código.");
      await bridge.addProgressRequest({ type: "session", activityType: "session", sessionCode: code, title: `Resgate ${code}`, description: String(values.summary || "").trim().slice(0, 3000), status: "pendente", workflowStatus: "em análise", idempotencyKey, receiptId: idempotencyKey, schemaVersion: 370 });
      form.reset(); bridge.toast("Participação enviada para confirmação."); bridge.render();
    }
    if (type === "session-create-370") {
      if (bridge.context().role !== "admin") throw new Error("Somente o Oráculo pode criar sessões.");
      const code = normalize(values.code).toUpperCase().replace(/[^A-Z0-9-]/g, "");
      await bridge.writeDocument("sessions", code, { code, title: String(values.title || "").slice(0, 120), regionId: values.regionId, xpBase: clamp(values.xpBase, 0, 5000), expiresAt: values.expiresAt, objectives: String(values.objectives || "").slice(0, 2000), status: "active", maxClaimsPerCharacter: 1, schemaVersion: 370 });
      form.reset(); bridge.toast("Sessão publicada com contrato compacto.");
    }
  }

  function onInput(event) {
    if (!event.target.matches("[data-m370-word-source]")) return;
    const form = event.target.closest("form");
    const type = form?.querySelector("[data-m370-activity-type]")?.value || "training";
    const rule = DATA.ACTIVITY_RULES[type] || DATA.ACTIVITY_RULES.training;
    const count = words(event.target.value);
    const meter = form?.querySelector("[data-m370-word-count]");
    const ruleText = form?.querySelector("[data-m370-word-rule]");
    const progress = form?.querySelector("[data-m370-word-progress]");
    if (meter) meter.textContent = `${count.toLocaleString("pt-BR")} palavras`;
    if (ruleText) ruleText.textContent = `Mínimo ${rule.minWords} · teto útil ${rule.usefulMax || "por objetivo"} · faixa ${xpPercentFor(rule, count)}%`;
    if (progress) progress.style.width = `${clamp((count / Math.max(1, rule.usefulMax || rule.minWords || 1)) * 100, 0, 100)}%`;
  }

  function onChange(event, bridge) {
    if (event.target.matches("[data-m370-activity-type]")) {
      const source = event.target.closest("form")?.querySelector("[data-m370-word-source]");
      if (source) onInput({ target: source });
    }
    if (event.target.matches("[data-m370-map-filter]")) { ui.mapFilter = event.target.value; bridge.render(); }
  }

  window.MILLENNIUM_370 = Object.freeze({
    version: DATA.VERSION,
    words,
    contentHash,
    xpPercentFor,
    rankFor,
    renderJourney,
    renderWorldMap,
    renderSupport,
    enhanceRoute,
    handlesAction,
    handleAction,
    handlesForm,
    handleForm,
    onInput,
    onChange,
  });
}());
