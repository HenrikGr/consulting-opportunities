# Consulting Opportunities — Module Federation Remote

Consulting Opportunities is a Module Federation remote application. The Host loads its exposed `FeatureButton` module at runtime through the `consultingOpportunities` federation identity. The remote entry is `consultingOpportunitiesEntry.js`.

## Release and manifest

A successful push to `main` with a new stable version in `package.json` builds the Remote and publishes a GitHub Release tagged `vX.Y.Z`. The release contains the versioned build files and `remote-manifest.json`.

The manifest describes only this Remote. It includes the current release's entry URL and, when a previous release with compatible assets exists, a fallback entry URL. The stable manifest URL for consumers is:

`https://github.com/HenrikGr/consulting-opportunities/releases/latest/download/remote-manifest.json`

Release assets use version-specific URLs. The Vite release build writes those URLs into the generated module references so that chunks are loaded from the same versioned release.

The GitHub Actions workflow artifact is retained for local development tooling. It is not the production distribution contract; the GitHub Release is.

The repository is public. Do not commit secrets or credentials.
