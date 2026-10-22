import React from 'react';

const remoteVersion = __REMOTE_VERSION__;

export default function FeatureButton() {
  return (
      <button
          type="button"
          onClick={() =>
              window.dispatchEvent(new CustomEvent('remote-poc:clicked'))
          }
          style={{
            background: '#2459a9',
            color: 'white',
            border: 0,
            borderRadius: 6,
            padding: '0.7rem 1rem',
            cursor: 'pointer',
          }}
      >
        Remote feature — v{remoteVersion}
      </button>
  );
}
