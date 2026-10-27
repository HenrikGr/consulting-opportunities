# Consulting Opportunities — Module Federation Remote

Consulting Opportunities is a React feature exposed as a Module Federation Remote. The Host loads it at runtime rather than bundling it into the Host build.

## How to integrate with the Host

The consuming Host in this PoC is [`HenrikGr/hgc-ab`](https://github.com/HenrikGr/hgc-ab).

- **Federation identity:** `consultingOpportunities`, derived from the package name by `vite.config.js`.
- **Exposed module:** `./FeatureButton`.
- **Remote entry:** `consultingOpportunitiesEntry.js`.
- **Discovery:** configure the Host to use the stable manifest URL below. The Host loads the manifest and then the version-specific entry.
- **Current event:** the feature button dispatches `consulting-opportunities:clicked`. This is a PoC signal, not a stable application API or general cross-repository contract.

Stable manifest URL:

`https://github.com/HenrikGr/consulting-opportunities/releases/latest/download/remote-manifest.json`

The Host's `public/microfrontends.json` points to this URL. See the Host's [Microfrontend Architecture](https://github.com/HenrikGr/hgc-ab/blob/main/docs/MICROFRONTEND-ARCHITECTURE.md) document for the complete loading and fallback flow.

## Technical modules

### Runtime dependencies

| Module | Purpose |
| --- | --- |
| `react` | Defines the feature UI as React components. |
| `react-dom` | Provides React's browser DOM rendering integration. |
| `@module-federation/enhanced` | Provides Module Federation runtime capabilities used by the integration. |

### Development and build dependencies

| Module | Purpose |
| --- | --- |
| `vite` | Runs the development server and builds the application. |
| `@vitejs/plugin-react` | Integrates React support into Vite. |
| `@module-federation/vite` | Integrates Module Federation with the Vite build. |
| `vitest` | Test runner dependency available to the project. |
| `playwright` | Browser automation tooling dependency. |

The package scripts currently run the Node test runner through `npm test`; use the scripts defined in `package.json` as the source of truth for available commands.

## How to publish a release

The release workflow builds a stable package version and publishes a GitHub Release tagged `vX.Y.Z`. The release contains versioned build assets and `remote-manifest.json`. The manifest describes the current release and, when available, a fallback release.

Version-specific asset URLs ensure that the entry and its chunks are loaded from the same release.

**Distribution rules:**
- Consumers use the GitHub Release and manifest, not a CI workflow artifact.
- Treat published versioned release assets as immutable. Publish a new version instead of replacing files.
- Release verification must fail if required assets are missing or unusable; publication must not proceed after failed verification.

## How to run and develop locally

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

The Remote development server runs on port `5001`.

Build the Remote:

```bash
npm run build
```

Run the automated test suite:

```bash
npm test
```

The Host provides a local proxy for GitHub Release assets during Host development and preview; that proxy is owned by the Host and is not part of the Remote runtime.

This repository is public. Do not commit secrets or credentials.
