#!/usr/bin/env node
/* Significa Foundations Agent installer (idempotent) */
import fs from 'fs';
import path from 'path';
import url from 'url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

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

function install() {
  const pkgRoot = path.join(__dirname, "..");
  const src = path.join(pkgRoot, "template");
  const dest = process.cwd();

  // Always ensure .cursor exists
  copyDir(path.join(src, ".cursor"), path.join(dest, ".cursor"));

  // Drop helper docs in project root (optional)
  for (const f of ["README-AGENT.md", "prompt-guide.md"]) {
    const srcFile = path.join(src, f);
    const destFile = path.join(dest, f);
    if (fs.existsSync(srcFile)) fs.copyFileSync(srcFile, destFile);
  }
  console.log("✅ Significa Foundations Agent installed/updated.");
}

const cmd = process.argv[2] || "install";
if (cmd === "install" || cmd === "sync") install();
else {
  console.log("Usage: sf-agent [install|sync]");
  process.exit(0);
}
