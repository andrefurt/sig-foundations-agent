#!/usr/bin/env node
// CommonJS bin – compatível com Node 18/20 sem ESM quirks

const fs = require("fs");
const path = require("path");

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src)) {
    const s = path.join(src, entry);
    const d = path.join(dest, entry);
    const stat = fs.statSync(s);
    if (stat.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function patchFrontMatter(filePath, { type, scope }) {
  let txt = fs.readFileSync(filePath, "utf8");
  const lines = txt.split(/\r?\n/);

  let dash = lines.findIndex((l) => /^---\s*$/.test(l));
  if (dash === -1) {
    const insertAt = (lines[0] || "").startsWith("# rule:") ? 1 : 0;
    const header = [`type: ${type}`, `scope: ${scope}`, `---`, ""];
    lines.splice(insertAt, 0, ...header);
  } else {
    let typeIdx = -1, scopeIdx = -1;
    for (let i = 0; i < dash; i++) {
      if (/^\s*type\s*:/.test(lines[i])) typeIdx = i;
      if (/^\s*scope\s*:/.test(lines[i])) scopeIdx = i;
    }
    if (typeIdx === -1) { lines.splice(dash, 0, `type: ${type}`); dash++; }
    else { lines[typeIdx] = `type: ${type}`; }

    typeIdx = -1; scopeIdx = -1; dash = lines.findIndex((l) => /^---\s*$/.test(l));
    for (let i = 0; i < dash; i++) if (/^\s*scope\s*:/.test(lines[i])) { scopeIdx = i; break; }
    if (scopeIdx === -1) lines.splice(dash, 0, `scope: ${scope}`);
    else lines[scopeIdx] = `scope: ${scope}`;
  }
  fs.writeFileSync(filePath, lines.join("\n"));
}

function normalizeModes(destRoot) {
  const rulesRoot = path.join(destRoot, ".cursor", "rules");
  const globals = [
    "01-global-standards.mdc",
    "02-foundations-composition.mdc",
    "03-stack-conventions.mdc",
    "04-docs-and-stories.mdc",
    "05-pr-playbook.mdc",
  ];
  for (const f of globals) {
    const p = path.join(rulesRoot, f);
    if (fs.existsSync(p)) patchFrontMatter(p, { type: "always", scope: "**/*" });
  }
  const compsDir = path.join(rulesRoot, "components");
  if (fs.existsSync(compsDir)) {
    for (const f of fs.readdirSync(compsDir)) {
      if (f.endsWith(".mdc")) {
        patchFrontMatter(path.join(compsDir, f), { type: "intelligent", scope: "**/*" });
      }
    }
  }
}

function install() {
  const pkgRoot = path.join(__dirname, "..");
  const src = path.join(pkgRoot, "template");
  const dest = process.cwd();

  copyDir(path.join(src, ".cursor"), path.join(dest, ".cursor"));
  for (const f of ["README-AGENT.md", "prompt-guide.md"]) {
    const s = path.join(src, f);
    if (fs.existsSync(s)) fs.copyFileSync(s, path.join(dest, f));
  }

  // força modos recomendados ao copiar
  normalizeModes(dest);

  console.log("✅ Significa Foundations Agent installed/updated.");
}

const cmd = process.argv[2] || "install";
if (cmd === "install" || cmd === "sync") install();
else { console.log("Usage: sf-agent [install|sync]"); process.exit(0); }