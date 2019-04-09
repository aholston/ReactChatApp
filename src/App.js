import React, { Component } from 'react';
import ChatKit from '@pusher/chatkit-client';
import MessageList from './components/MessageList';
// import SendMessageForm from './components/SendMessageForm';
// import RoomList from './components/RoomList';
// import NewRoomForm from './components/NewRoomForm';
import './App.css';

import { tokenUrl, instanceLocator } from './config';

class App extends Component {

    componentDidMount() {
        const chatManager = new ChatKit.ChatManager({
            instanceLocator
        });
    }
  render() {
    return (
      <div className="App">

        <MessageList />

      </div>
    );
  }
}

export default App;
