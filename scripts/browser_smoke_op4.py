from __future__ import annotations

import json
import mimetypes
import re
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse, unquote

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
BASELINE = Path('/mnt/data/op4_work/Millennium_3_1_Operacao_3/project')
QA = ROOT / 'qa'
SHOTS = QA / 'screenshots'
SHOTS.mkdir(parents=True, exist_ok=True)

SCRIPT_ORDER = [
    'build-info.js',
    'millennium-stability.js',
    'millennium-world-alive.js',
    'millennium-echoes.js',
    'millennium-account-management.js',
    'catalogs-3.1.js',
    'millennium-core.js',
    'millennium-journey.js',
    'millennium-backend.js',
    'millennium-polish.js',
    'content-v3.js',
    'app.js',
]
CSS_ORDER = ['styles.css', 'overrides.css', 'journey.css', 'backend.css', 'polish.css', 'world-alive.css', 'account-management.css', 'echoes.css']


def load_project_inline(page, root: Path):
    def route_handler(route):
        parsed = urlparse(route.request.url)
        if parsed.hostname == 'millennium.local':
            relative = unquote(parsed.path.lstrip('/')) or 'index.html'
            target = (root / relative).resolve()
            try:
                target.relative_to(root.resolve())
            except ValueError:
                route.abort()
                return
            if target.is_file():
                body = target.read_bytes()
                mime = mimetypes.guess_type(target.name)[0] or 'application/octet-stream'
                route.fulfill(status=200, body=body, content_type=mime)
            else:
                route.fulfill(status=404, body=b'not found', content_type='text/plain')
            return
        if parsed.scheme in {'data', 'blob'}:
            route.continue_()
            return
        route.abort()

    page.route('**/*', route_handler)
    html = (root / 'index.html').read_text(encoding='utf-8')
    html = re.sub(r'<link[^>]+(?:styles\.css|overrides\.css|journey\.css|backend\.css|polish\.css|world-alive\.css|account-management\.css|echoes\.css)[^>]*>', '', html)
    html = re.sub(r'<script\s+src="[^"]+"[^>]*></script>', '', html)
    css = '\n'.join((root / name).read_text(encoding='utf-8') for name in CSS_ORDER if (root / name).exists())
    html = html.replace('<head>', '<head><base href="http://millennium.local/"><style>' + css + '</style>', 1)
    page.set_content(html, wait_until='domcontentloaded')
    for name in SCRIPT_ORDER:
        path = root / name
        if path.exists():
            page.add_script_tag(content=path.read_text(encoding='utf-8'))
    page.wait_for_selector('[data-action="demo-player"]', state='visible', timeout=12000)


def enter_demo(page, role: str):
    page.click(f'[data-action="demo-{role}"]')
    page.wait_for_selector('#appShell:not([hidden])', timeout=10000)
    page.wait_for_timeout(350)


def click_nav(page, nav: str):
    clicked = page.evaluate("""(nav) => {
      const candidates = Array.from(document.querySelectorAll(`button[data-nav=\"${nav}\"]`));
      const target = candidates.find((el) => { const s = getComputedStyle(el); const r = el.getBoundingClientRect(); return s.display !== 'none' && s.visibility !== 'hidden' && r.width > 0 && r.height > 0; }) || candidates[0];
      if (!target) return false;
      target.click();
      return true;
    }""", nav)
    if not clicked:
        raise RuntimeError(f'Navigation button not found: {nav}')
    page.wait_for_timeout(400)


def click_codex_tab(page, tab: str = "affinities"):
    clicked = page.evaluate("""(tab) => {
      const target = document.querySelector(`button[data-action=\"codex-tab\"][data-tab=\"${tab}\"]`);
      if (!target) return false;
      target.click();
      return true;
    }""", tab)
    if not clicked:
        raise RuntimeError(f'Codex tab not found: {tab}')
    page.wait_for_timeout(450)

def overflow_px(page):
    return page.evaluate('Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth)')


def capture_before(browser):
    if not BASELINE.exists():
        return {'baselineAvailable': False}
    context = browser.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=1)
    page = context.new_page()
    load_project_inline(page, BASELINE)
    enter_demo(page, 'player')
    click_nav(page, 'codex')
    click_codex_tab(page, 'affinities')
    page.screenshot(path=str(SHOTS / 'codex-mobile-before.png'), full_page=False)
    context.close()
    return {'baselineAvailable': True, 'beforeScreenshot': 'qa/screenshots/codex-mobile-before.png'}


def run_current(browser):
    checks = []
    page_errors = []
    console_errors = []
    ignored_external = []

    def check(name, condition, details=None):
        checks.append({'name': name, 'passed': bool(condition), 'details': details})

    # Mobile player
    context = browser.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=1)
    page = context.new_page()
    page.on('pageerror', lambda exc: page_errors.append(str(exc)))
    def on_console(msg):
        if msg.type == 'error':
            text = msg.text
            if 'ERR_FAILED' in text or 'Failed to load resource' in text:
                ignored_external.append(text)
            else:
                console_errors.append(text)
    page.on('console', on_console)
    load_project_inline(page, ROOT)
    enter_demo(page, 'player')
    check('Demo Player abre no mobile', page.locator('#appShell').is_visible())
    check('Mobile sem overflow inicial', overflow_px(page) <= 1, {'overflowPx': overflow_px(page)})

    click_nav(page, 'codex')
    click_codex_tab(page, 'affinities')
    page.wait_for_selector('.codex-card-summary', timeout=8000)
    cards = page.locator('.codex-card-summary').count()
    check('Codex resumido possui cards', cards > 0, {'cards': cards})
    check('Codex mobile sem overflow', overflow_px(page) <= 1, {'overflowPx': overflow_px(page)})
    first_img = page.locator('.codex-card-summary img').first
    check('Thumbnail do Codex usa lazy loading', first_img.get_attribute('loading') == 'lazy')
    summary_lines = page.locator('.codex-card-summary p').first.evaluate('(el) => ({height: el.getBoundingClientRect().height, lineHeight: parseFloat(getComputedStyle(el).lineHeight) || 0})')
    check('Resumo do Codex permanece compacto', summary_lines['lineHeight'] == 0 or summary_lines['height'] <= summary_lines['lineHeight'] * 5.5, summary_lines)
    opener = page.locator('.codex-open-button').first
    opener.evaluate('(el) => { el.focus(); el.click(); }')
    page.wait_for_selector('#modal:not([hidden])', timeout=5000)
    check('Registro completo abre em modal acessível', page.locator('.codex-entry-modal').is_visible())
    page.keyboard.press('Escape')
    page.wait_for_function("document.querySelector('#modal')?.hidden === true", timeout=5000)
    check('Escape fecha modal', page.locator('#modal').is_hidden())
    page.wait_for_timeout(80)
    focus_returned = page.locator('.codex-open-button').first.evaluate('(el) => el === document.activeElement')
    check('Foco retorna ao acionador do modal', focus_returned)
    page.screenshot(path=str(SHOTS / 'codex-mobile-after.png'), full_page=False)

    page.wait_for_timeout(500)
    image_health = page.evaluate('''() => Array.from(document.images).map(img => ({src: img.getAttribute('src'), complete: img.complete, width: img.naturalWidth, fallback: img.classList.contains('image-fallback-applied')}))''')
    failed_images = [item for item in image_health if item['complete'] and item['width'] == 0 and not item['fallback']]
    check('Imagens visíveis carregam ou usam fallback', len(failed_images) == 0, {'failed': failed_images[:5]})

    stat_fixture = page.evaluate('''() => {
      const content = {
        classes: [{ id: "guerreiro", bonus: { for: 2, res: 1 } }],
        races: [{ id: "demonio", bonus: { for: 2, vel: 1 } }],
        affinities: [{ id: "tempo", bonus: { for: 1, hab: 1, pod: 2 } }],
        items: [{ id: "espada-curta", name: "Espada Curta", bonus: {} }],
      };
      const character = {
        base: { for: 4, vel: 4, hab: 4, res: 4, pod: 4 },
        development: { for: 0, vel: 0, hab: 0, res: 0, pod: 0 },
        raceId: "demonio", classId: "guerreiro", affinityId: "tempo",
        inventory: [{ instanceId: "legacy-1", name: "espada curta", equipped: true }],
      };
      return window.MILLENNIUM_CORE_31.calculateCharacterStats(character, content).total;
    }''')
    check('Motor unificado produz 9/5/5/5/6', stat_fixture == {'for': 9, 'vel': 5, 'hab': 5, 'res': 5, 'pod': 6}, stat_fixture)

    click_nav(page, 'gacha')
    page.wait_for_selector('[data-gacha-countdown]', timeout=8000)
    countdown = page.locator('[data-gacha-countdown]').first.inner_text().strip()
    page.screenshot(path=str(SHOTS / 'gacha-rotation-mobile.png'), full_page=False)
    check('Gacha mostra contagem regressiva horária', bool(re.search(r'\d{1,2}:\d{2}', countdown)), {'countdown': countdown})
    odds_button = page.locator('[data-action="gacha-odds"]').first
    if odds_button.count():
        odds_button.evaluate('(el) => el.click()')
        page.wait_for_selector('.gacha-info-modal', timeout=5000)
        check('Gacha abre probabilidades públicas', page.locator('.gacha-rate-list > div').count() > 0, {'rows': page.locator('.gacha-rate-list > div').count()})
        page.screenshot(path=str(SHOTS / 'gacha-probabilidades-mobile.png'), full_page=False)
        page.keyboard.press('Escape')
    else:
        check('Gacha abre probabilidades públicas', False, {'reason': 'button missing'})

    click_nav(page, 'creations')
    page.wait_for_timeout(350)
    page.screenshot(path=str(SHOTS / 'criacoes-player-mobile.png'), full_page=False)
    forbidden_creation_fields = page.locator('form[data-form="creation-request"] [name="cost"], form[data-form="creation-request"] [name="limitations"], form[data-form="creation-request"] [name="countermeasures"]').count()
    check('Player não define custo, limitações ou contramedidas finais', forbidden_creation_fields == 0, {'forbiddenFields': forbidden_creation_fields})

    click_nav(page, 'minigames')
    start = page.locator('[data-action="start-aim-game"]:not([disabled])').first
    if start.count():
        start.evaluate('(el) => el.click()')
        page.wait_for_selector('.aim-session', timeout=5000)
        check('Prova da Mira inicia com sessão explícita', page.locator('.aim-session').is_visible())
        page.locator('.aim-exit').evaluate('(el) => el.click()')
        page.wait_for_function("document.querySelector('#modal')?.hidden === true", timeout=5000)
        check('Fechar minigame encerra o modal', page.locator('#modal').is_hidden())
    else:
        check('Prova da Mira inicia com sessão explícita', False, {'reason': 'no enabled difficulty'})
        check('Fechar minigame encerra o modal', False, {'reason': 'not started'})

    seal = page.locator('[data-action="start-seal-ritual"]:not([disabled])').first
    if seal.count():
        seal.evaluate('(el) => el.click()')
        page.wait_for_selector('.seal-session', timeout=5000)
        check('Ritual dos Selos inicia em toque e teclado', page.locator('.seal-button').count() == 6, {'buttons': page.locator('.seal-button').count()})
        page.screenshot(path=str(SHOTS / 'ritual-dos-selos-mobile.png'), full_page=False)
        page.keyboard.press('Escape')
        page.wait_for_function("document.querySelector('#modal')?.hidden === true", timeout=5000)
    else:
        check('Ritual dos Selos inicia em toque e teclado', False, {'reason': 'no enabled ritual'})
    context.close()

    # Reduced motion
    context = browser.new_context(viewport={'width': 390, 'height': 844}, reduced_motion='reduce')
    page = context.new_page()
    load_project_inline(page, ROOT)
    animation = page.locator('.auth-runes').evaluate('(el) => getComputedStyle(el).animationName')
    check('Reduced motion remove animação contínua', animation == 'none', {'animationName': animation})
    context.close()

    # Desktop admin
    context = browser.new_context(viewport={'width': 1366, 'height': 768}, device_scale_factor=1)
    page = context.new_page()
    page.on('pageerror', lambda exc: page_errors.append(str(exc)))
    load_project_inline(page, ROOT)
    enter_demo(page, 'admin')
    click_nav(page, 'admin-users')
    page.wait_for_selector('.account-management-grid', timeout=8000)
    check('Painel separa reset, moderação e exclusão', page.locator('.account-management-card').count() == 3, {'cards': page.locator('.account-management-card').count()})
    check('Reset de ficha está disponível ao Oráculo', page.locator('[data-action="admin-reset-character"]').count() == 1)
    check('Suspensão e banimento estão separados', page.locator('[data-action="admin-suspend-account"]').count() == 1 and page.locator('[data-action="admin-ban-account"]').count() == 1)
    check('Exclusão definitiva possui ação própria', page.locator('[data-action="admin-delete-account"]').count() == 1)
    page.screenshot(path=str(SHOTS / 'account-management-admin-3.3.0.png'), full_page=False)
    click_nav(page, 'admin-ops')
    page.wait_for_selector('.diagnostic-console', timeout=8000)
    text = page.locator('.diagnostic-console').inner_text()
    check('Demo Admin abre diagnóstico da Interface', 'Estado da Interface' in text)
    check('Diagnóstico mostra build e rota', 'BUILD' in text.upper() and 'ROTA' in text.upper())
    check('Diagnóstico oferece exportação', page.locator('[data-action="download-diagnostics"]').count() == 1)
    check('Desktop sem overflow', overflow_px(page) <= 1, {'overflowPx': overflow_px(page)})
    page.screenshot(path=str(SHOTS / 'admin-diagnostics-after.png'), full_page=False)
    context.close()

    asset_results = {}
    for rel in [
        'assets/first-awakening-portal.webp',
        'assets/maps/arena-das-sete-esferas.webp',
        'assets/maps/sociedade-das-laminas.webp',
        'assets/maps/reino-do-pecado-partido.webp',
        'assets/pets/cronista-de-vidro.webp',
        'assets/pets/filha-da-cinza.webp',
    ]:
        path = ROOT / rel
        asset_results[rel] = path.is_file() and path.stat().st_size > 0
    check('Assets críticos existem e não estão vazios', all(asset_results.values()), asset_results)

    return {
        'generatedAt': datetime.now(timezone.utc).isoformat(),
        'mode': 'Chromium local DOM; mobile emulation and desktop',
        'checks': checks,
        'passed': sum(1 for x in checks if x['passed']),
        'failed': sum(1 for x in checks if not x['passed']),
        'pageErrors': page_errors,
        'consoleErrors': console_errors,
        'ignoredExternalErrors': ignored_external,
    }


def main():
    with sync_playwright() as pw:
        browser = pw.chromium.launch(executable_path='/usr/bin/chromium', headless=True, args=['--no-sandbox'])
        before = capture_before(browser)
        result = run_current(browser)
        browser.close()
    result['screenshots'] = {**before, 'after': [
        'qa/screenshots/codex-mobile-after.png',
        'qa/screenshots/admin-diagnostics-after.png',
        'qa/screenshots/account-management-admin-3.3.0.png',
        'qa/screenshots/gacha-rotation-mobile.png',
        'qa/screenshots/gacha-probabilidades-mobile.png',
        'qa/screenshots/criacoes-player-mobile.png',
        'qa/screenshots/ritual-dos-selos-mobile.png',
    ]}
    (QA / 'account-management-browser-smoke-3.3.0.json').write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps(result, ensure_ascii=False, indent=2))
    raise SystemExit(1 if result['failed'] or result['pageErrors'] or result['consoleErrors'] else 0)

if __name__ == '__main__':
    main()
