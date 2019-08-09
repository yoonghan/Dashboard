import { configure } from '@storybook/react';

function loadStories() {
  const req = require.context('../stories', false , /.+\.story\.tsx?$/);
  req.keys().forEach(req);
  // You can require as many stories as you need.
}


configure(loadStories, module);
