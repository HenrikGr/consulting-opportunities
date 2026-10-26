import test from 'node:test';
import assert from 'node:assert/strict';
import { createRemoteManifest } from '../scripts/create-remote-manifest.mjs';

test('creates this Remote manifest with versioned release asset URLs', () => {
  const manifest = createRemoteManifest({
    repository: 'HenrikGr/consulting-opportunities',
    version: '1.0.5',
    federationName: 'consultingOpportunities',
    entryFile: 'consultingOpportunitiesEntry.js',
    fallbackTag: 'v1.0.4',
  });

  assert.equal(manifest.schemaVersion, 1);
  assert.deepEqual(manifest.remote.exposes, ['./FeatureButton']);
  assert.equal(manifest.currentVersion.tag, 'v1.0.5');
  assert.equal(
    manifest.currentVersion.entryUrl,
    'https://github.com/HenrikGr/consulting-opportunities/releases/download/v1.0.5/consultingOpportunitiesEntry.js',
  );
  assert.equal(manifest.fallbackVersion.tag, 'v1.0.4');
  assert.equal(
    manifest.fallbackVersion.entryUrl,
    'https://github.com/HenrikGr/consulting-opportunities/releases/download/v1.0.4/consultingOpportunitiesEntry.js',
  );
});

test('uses null fallback when no previous release has compatible assets', () => {
  const manifest = createRemoteManifest({
    repository: 'HenrikGr/consulting-opportunities',
    version: '1.0.5',
    federationName: 'consultingOpportunities',
    entryFile: 'consultingOpportunitiesEntry.js',
  });

  assert.equal(manifest.fallbackVersion, null);
});

test('requires the Remote release identity', () => {
  assert.throws(
    () => createRemoteManifest({ repository: 'HenrikGr/consulting-opportunities' }),
    /required/,
  );
});
