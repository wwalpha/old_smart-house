import * as React from 'react';
// import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { isMobile } from 'react-device-detect';
// import store from 'src/store';
import App from 'src/containers/App';

const start = () => {
  render(
       <App />,
       document.getElementById('root'),
   );
};

const app = {
    // Application Constructor
  initialize: (): void => {
    document.addEventListener('deviceready', this.deviceReady.bind(this), false);
  },

  // Update DOM on a Received Event
  deviceReady: (id: string) => {
    start();
  },
};

if (isMobile) {
  app.initialize();
} else {
  start();
}
