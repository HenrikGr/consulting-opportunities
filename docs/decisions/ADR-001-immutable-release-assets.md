# ADR-001: Publish immutable versioned Remote assets with a manifest

- **Status:** Accepted for the PoC
- **Date:** 2026-10-27

## Context
Host and Remote are independently built applications. Host needs a stable discovery URL, while each release must identify a coherent set of entry and chunk assets.

## Decision
Publish the Remote entry, generated assets and `remote-manifest.json` as GitHub Release assets. Use a stable `latest/download/remote-manifest.json` URL for discovery and version-specific URLs for assets. Published versioned assets are immutable. Release verification must check required assets before publication succeeds.

## Alternatives
- Workflow artifacts as runtime distribution: not selected because the integration needs a stable published contract.
- Mutable asset paths shared by releases: not selected because entry/chunk versions could become mismatched.
- Host building or discovering Remote source: not selected because it couples independent repositories.

## Consequences
Host can select versions without rebuilding, and entry/chunk assets remain tied to one release. GitHub availability and release workflow correctness become integration dependencies. Production hosting, caching, compatibility and supply-chain controls remain open.
