# Copilot Instructions for ProjetoTeste

This repo is a Playwright-based end‑to‑end test suite for the "Seu Barriga" demo application.  The goal of any AI coding assistant is to help add or maintain tests, DSL helpers and page objects following the patterns already in place.

---

## Big picture architecture

- **Tests live under `tests/`** and are plain JavaScript files using Playwright's `test` API (`*.spec.js`).
- **Page objects** (`pages/*.page.ts`) wrap raw Playwright locators and actions.  Each class accepts a `Page` instance in the constructor.
- **DSL classes** (`dsl/*.dsl.ts`) build higher‑level flows on top of the page objects (e.g. `MovimentacaoDSL` knows how to fill every field and save).
- Tests instantiate a page object and its DSL, then call DSL methods to drive scenarios.

> Example pattern from `tests/MovimentacaoTests.spec.js`:
> ```js
> const movimentacaoPage = new MovimentacaoPage(page);
> const movimentacaoDSL = new MovimentacaoDSL(movimentacaoPage);
> await movimentacaoDSL.criarNovaMovimentacaoPago(...);
> ```

- Shared login logic is duplicated in `test.beforeEach` blocks across test files (navigate, fill credentials, assert title).
- Browsers are configured in `playwright.config.js`.  Only Chromium is used locally; traces are captured on first retry.

---

## Developer workflows

1. **Setup**
   - `npm install` (installs `@playwright/test` and types)
   - `npx playwright install` if running on a clean machine (installs browsers).

2. **Run tests**
   - `npx playwright test` runs all specs.
   - Use `npx playwright test tests/ContasTests.spec.js` to run a single file.
   - Reports are generated under `playwright-report/` (open `index.html`).
   - There are no custom npm `scripts`; invoke Playwright directly.

3. **Debugging**
   - `npx playwright test --headed` or `--debug` to step through.
   - Tests can import TS page objects without compiling – Playwright handles them via ts-node.

4. **Adding new tests**
   - Create a new `*.spec.js` under `tests/`.
   - Follow the existing pattern: import `test`, `expect`, relevant page/DSL classes.
   - Put any repetitive navigation/login into a `test.beforeEach` or extend with a helper if needed.

---

## Project-specific conventions

- File extensions mix TS and JS; pages/DSLs are `.ts` while specs are `.js`.
- Naming:
  - Page objects: `SomethingPage.page.ts`
  - DSL: `SomethingDSL.dsl.ts`
  - Specs: `SomethingTests.spec.js`
- The DSLs expose human‑readable Portuguese method names (e.g. `criarNovaMovimentacaoPago`, `adicionarConta`).
- Locator methods use Playwright's `locator`, `getByPlaceholder`, `getByRole`, etc., and often rely on Portuguese link/text values from the application.
- There's no centralized configuration file for test data; hard‑coded values appear in tests/DSLs.

---

## Integration points & dependencies

- External site: `https://seubarriga.wcaquino.me` – tests assume it’s available and stable.
- Playwright version locked in `package.json` (currently `^1.58.2`).
- No other external services or APIs are invoked; everything runs through the browser.

---

## Notes for AI assistance

- When writing new page/DSL code, mimic the existing style (async methods, single responsibility).
- Avoid adding dependencies or build steps; keep everything within the Playwright ecosystem.
- The app under test is in Portuguese; use the same language in locators and method names.
- Tests assert UI feedback via `page.locator("div[role='alert']").toContainText(...)`.

Feel free to suggest refactors (e.g. central login helper) but maintain compatibility with current tests.

---

*If anything is unclear or missing, please point it out so we can refine these instructions.*
