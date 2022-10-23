import { Meteor } from 'meteor/meteor';

// imports of the defined APIs
import '../imports/api/numbersWords';

/**
 * Entry point for the application server.
 */
Meteor.startup(() => {
  console.debug('numbers-words-react: Server is running!');
});
