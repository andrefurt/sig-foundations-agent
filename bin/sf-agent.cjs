#!/usr/bin/env node
// v1.1.2 – CommonJS bin com auto-fix de headers (Cursor rules)

const fs = require("fs");
const path = require("path");

function readText(p) {
  let b = fs.readFileSync(p);
  // remove UTF-8 BOM
  if (b[0] === 0xEF && b[1] === 0xBB && b[2] === 0xBF) b = b.slice(3);
  return b.toString("utf8").replace(/\r\n?/g, "\n");
}

function writeText(p, txt) {
  fs.writeFileSync(p, txt.replace(/\r\n?/g, "\n"), "utf8");
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src)) {
    const s = path.join(src, entry);
    const d = path.join(dest, entry);
    const st = fs.statSync(s);
    if (st.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

/**
 * Remove qualquer bloco YAML inicial entre `---`…`---`
 * e preprende o header correto.
 */
function forceHeader(filePath, type) {
  let txt = readText(filePath);
  // strip front-matter inicial entre --- ... ---
  if (txt.startsWith("---")) {
    const m = txt.indexOf("\n---\n", 3);
    if (m !== -1) txt = txt.slice(m + 5);
  }
  // strip linhas legacy (ex.: alwaysApply: false)
  txt = txt.replace(/^\s*alwaysApply:.*\n?/m, "");
  const header = `type: ${type}\nscope: **/*\n---\n`;
  writeText(filePath, header + txt);
}

function normalizeModes(destRoot) {
  const rulesRoot = path.join(destRoot, ".cursor", "rules");

  // Globais 01–05 -> always
  ["01-global-standards.mdc",
   "02-foundations-composition.mdc",
   "03-stack-conventions.mdc",
   "04-docs-and-stories.mdc",
   "05-pr-playbook.mdc"].forEach(f => {
    const p = path.join(rulesRoot, f);
    if (fs.existsSync(p)) forceHeader(p, "always");
  });

  // Componentes -> intelligent
  const comps = path.join(rulesRoot, "components");
  if (fs.existsSync(comps)) {
    for (const f of fs.readdirSync(comps)) {
      if (f.endsWith(".mdc")) forceHeader(path.join(comps, f), "intelligent");
    }
  }
}

function install() {
  const pkgRoot = path.join(__dirname, "..");
  const src = path.join(pkgRoot, "template");
  const dest = process.cwd();

  // Copiar .cursor e docs
  copyDir(path.join(src, ".cursor"), path.join(dest, ".cursor"));
  for (const f of ["README-AGENT.md", "prompt-guide.md"]) {
    const s = path.join(src, f);
    if (fs.existsSync(s)) fs.copyFileSync(s, path.join(dest, f));
  }

  // Normalizar headers para o Cursor
  normalizeModes(dest);

  console.log("✅ sig-foundations-agent: rules synced & normalized.");
}

const cmd = process.argv[2] || "install";
if (cmd === "install" || cmd === "sync") install();
else {
  console.log("Usage: sf-agent [install|sync]");
  process.exit(0);
}