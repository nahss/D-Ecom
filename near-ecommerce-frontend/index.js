import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const reactRoot = createRoot(document.querySelector('#root'));
reactRoot.render(<App />);