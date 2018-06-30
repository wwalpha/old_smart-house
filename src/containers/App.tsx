import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Props } from './App.d';
import Chat from 'components/chat/Chat';

class App extends React.Component<Props, {}> {

  render() {
    return (
      <Chat />
    );
  }
}

export default hot(module)(App);
