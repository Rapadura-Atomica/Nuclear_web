# Changelog

All notable changes to this project will be documented here.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

### Added
- Bandeirinhas de São João: varal decorativo fixo no topo de todas as páginas (tema junino), em CSS, com triângulos coloridos gerados via JS de forma responsiva
  - Arquivos afetados: `assets/css/main.css`, `assets/js/main.js`, `index.html`, `animation.html`, `rigging.html`, `boardAnimatic.html`, `artisticInteligence.html`, `generic.html`, `elements.html`
- Council System: multi-agent pipeline with 3 complexity tiers
  - Tier 1 (Direct): immediate implementation for trivial tasks
  - Tier 2 (Light): Investigator → Specialist → Reviewer → Documenter pipeline
  - Tier 3 (Full): complete pipeline with Architect and ADR generation
  - Agents: Router, Investigator, Architect, Reviewer, Documenter
  - Specialists: Backend, Frontend, DevOps, Security, General
  - Automatic documentation: CHANGELOG, ADRs, PR templates, session summaries

---

<!--
INSTRUCTIONS FOR THE DOCUMENTER:
Add entries under [Unreleased] after each Tier 2 or Tier 3 cycle.
When releasing, move entries from [Unreleased] to [vX.Y.Z] with the date.

Valid types:
- Added: new functionality
- Changed: change in existing functionality
- Deprecated: functionality that will be removed
- Removed: removed functionality
- Fixed: bug fix
- Security: security-related change
-->
