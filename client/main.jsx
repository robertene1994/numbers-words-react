import { Meteor } from 'meteor/meteor';

import React from 'react';
import { createRoot } from 'react-dom/client';

import App from '../imports/ui/components/App/App.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';

/**
 * Entry point for the application client.
 */
Meteor.startup(() => {
  createRoot(document.getElementById('numbers-words')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.debug('numbers-words-react: Client is running!');
});
