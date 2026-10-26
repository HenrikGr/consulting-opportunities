# Consulting Opportunities — Module Federation Remote

Consulting Opportunities is a Module Federation remote application. The Host loads its exposed `FeatureButton` module at runtime through the `consultingOpportunities` federation identity. The remote entry is `consultingOpportunitiesEntry.js`.

## Host integration contract

The consuming Host in this PoC is [`HenrikGr/hgc-ab`](https://github.com/HenrikGr/hgc-ab).

- Federation identity: `consultingOpportunities` (derived from the package name by `vite.config.js`).
- Exposed module: `./FeatureButton`.
- Remote entry filename: `consultingOpportunitiesEntry.js`.
- The Host loads the module using the manifest; it does not build the Remote into its own bundle.
- The current feature button emits the browser event `consulting-opportunities:clicked` when clicked. This is a PoC event contract, not a general application API.

## Release and manifest

A successful push to `main` with a new stable version in `package.json` builds the Remote and publishes a GitHub Release tagged `vX.Y.Z`. The release contains the versioned build files and `remote-manifest.json`.

The manifest describes only this Remote. It includes the current release's entry URL and, when a previous release with compatible assets exists, a fallback entry URL. The stable manifest URL for consumers is:

`https://github.com/HenrikGr/consulting-opportunities/releases/latest/download/remote-manifest.json`

The Host's `public/microfrontends.json` points to that stable URL. The manifest's current and fallback entry URLs point to version-specific assets, for example `releases/download/v1.0.6/consultingOpportunitiesEntry.js`. Release builds write version-specific GitHub Release URLs into generated module references so entry files and their chunks are loaded from the same release version.

**Distribution contract:** consumers use the GitHub Release and its manifest, not a CI workflow artifact. Treat published release assets as immutable; publish a new version instead of replacing files in an existing release.

## Local development and validation

- `npm run dev` starts the Remote on port `5001`.
- `npm run build` builds the Remote.
- `npm test` runs the Node test suite.

For the Host's local development, the Host Vite server proxies GitHub Release asset requests to keep browser requests same-origin. The proxy belongs to the Host and is not part of this Remote's deployed runtime.

The repository is public. Do not commit secrets or credentials.
