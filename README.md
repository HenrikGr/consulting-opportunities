# Consulting Opportunities — Module Federation Remote

Consulting Opportunities is a Module Federation Remote. The Host loads exposed module `./FeatureButton` using federation identity `consultingOpportunities` and entry `consultingOpportunitiesEntry.js`.

## Host integration contract

The consuming Host is [`HenrikGr/hgc-ab`](https://github.com/HenrikGr/hgc-ab).

- Federation identity: `consultingOpportunities`, derived from the package name by `vite.config.js`.
- Exposed module: `./FeatureButton`.
- Entry filename: `consultingOpportunitiesEntry.js`.
- Host loads the Remote through its published manifest rather than bundling it into the Host build.
- The current button dispatches `consulting-opportunities:clicked`. This is a PoC signal, not a general application API or stable cross-repository contract.

## Release and manifest

The release workflow builds a stable package version and publishes a GitHub Release tagged `vX.Y.Z`. The release contains versioned build assets and `remote-manifest.json`. The manifest describes the current release and, when available, a fallback release.

Stable manifest URL:
`https://github.com/HenrikGr/consulting-opportunities/releases/latest/download/remote-manifest.json`

The Host's `public/microfrontends.json` points to that URL. Version-specific asset URLs ensure entry files and chunks are loaded from the same release.

**Distribution contract:** consumers use the GitHub Release and manifest, not a CI workflow artifact. Published versioned assets are immutable; publish a new version rather than replacing files. Release verification must fail if required assets are missing or unusable, and publication must not proceed after failed verification.

## Local development and validation

- `npm run dev` starts the Remote on port `5001`.
- `npm run build` builds the Remote.
- `npm test` runs the Node test suite.

The Host provides the local release-asset proxy; it is not part of the Remote runtime. This repository is public. Do not commit secrets or credentials.
