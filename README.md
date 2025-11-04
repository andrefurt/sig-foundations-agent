# @andrefurt/sig-foundations-agent

Personal-scoped package to install the **Significa Foundations Agent** into any project.
It copies `.cursor/` rules and component docs so Cursor can apply Foundations patterns automatically.

## How to publish (GitHub Packages)
1. Create a tag in the form `v1.0.1` and push it.
2. GitHub Actions runs `.github/workflows/release.yml` and publishes to **GitHub Packages**.

If you want to publish manually:
```bash
export GITHUB_TOKEN=YOUR_PAT   # write:packages
npm publish --access public --registry=https://npm.pkg.github.com
```

## Install in a project
```bash
# .npmrc in the project root (once)
@andrefurt:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}

pnpm add -D @andrefurt/sig-foundations-agent
# postinstall copies .cursor/**, README-AGENT.md, prompt-guide.md
```

## Re-sync later
```bash
pnpm sf-agent sync
```
