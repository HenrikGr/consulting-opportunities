import React from 'react';
import { createRoot } from 'react-dom/client';
import FeatureButton from './FeatureButton.jsx';

createRoot(document.getElementById('root')).render(
  <main style={{ fontFamily: 'system-ui', padding: '2rem' }}>
    <h1>Consulting Opportunities</h1>
    <p>This standalone page verifies that Consulting Opportunities builds independently.</p>
    <FeatureButton />
  </main>,
);
