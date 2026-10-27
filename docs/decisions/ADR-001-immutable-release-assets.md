# ADR-001: Publish immutable versioned Remote assets with a manifest

- **Status:** Accepted for the PoC
- **Date:** 2026-10-27

## Context
Host and Remote are independently built applications. Host needs a stable discovery URL, while each release must identify a coherent set of entry and chunk assets.

## Decision
Publish the Remote entry, generated assets and `remote-manifest.json` as GitHub Release assets. Use a stable `latest/download/remote-manifest.json` URL for discovery and version-specific URLs for assets. Published versioned assets are immutable. Release verification must check required assets before publication succeeds.

## Alternatives we considered and rejected

- **Let Host download files directly from a GitHub Actions run:** GitHub Actions can store build outputs as workflow artifacts. We chose instead to publish the files as assets of a GitHub Release. Host finds the published version through `remote-manifest.json`.
- **Overwrite the same file URLs for every release:** This could cause Host to load the entry file from one version and additional JavaScript files from another. We therefore use separate asset URLs for each version and do not overwrite published version assets.
- **Make Host build or locate Remote's source code:** This would make Host's build or configuration depend on the Remote repository and its build process. Instead, Remote publishes a release, and Host loads that published release at runtime.

## Consequences
Host can select versions without rebuilding, and entry/chunk assets remain tied to one release. GitHub availability and release workflow correctness become integration dependencies. Production hosting, caching, compatibility and supply-chain controls remain open.
