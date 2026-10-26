import fs from 'node:fs';

function releaseAssetUrl(repository, tag, fileName) {
  return `https://github.com/${repository}/releases/download/${tag}/${fileName}`;
}

export function createRemoteManifest({
  repository,
  version,
  federationName,
  entryFile,
  fallbackTag = null,
}) {
  if (!repository || !version || !federationName || !entryFile) {
    throw new Error('repository, version, federationName, and entryFile are required');
  }

  const tag = `v${version}`;
  const versionInfo = (releaseTag) => ({
    version: releaseTag.slice(1),
    tag: releaseTag,
    entryUrl: releaseAssetUrl(repository, releaseTag, entryFile),
  });

  return {
    schemaVersion: 1,
    remote: {
      key: federationName,
      repository,
      federationName,
      exposes: ['./FeatureButton'],
    },
    currentVersion: versionInfo(tag),
    fallbackVersion: fallbackTag ? versionInfo(fallbackTag) : null,
  };
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  const manifest = createRemoteManifest({
    repository: process.env.REPOSITORY,
    version: process.env.VERSION,
    federationName: process.env.FEDERATION_NAME,
    entryFile: process.env.ENTRY_FILE,
    fallbackTag: process.env.FALLBACK_TAG || null,
  });

  fs.writeFileSync('remote-manifest.json', `${JSON.stringify(manifest, null, 2)}\\n`);
  console.log('Created remote-manifest.json');
}
