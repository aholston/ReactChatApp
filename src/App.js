import React, { Component } from 'react';
import ChatKit from '@pusher/chatkit-client';
import MessageList from './components/MessageList';
// import SendMessageForm from './components/SendMessageForm';
// import RoomList from './components/RoomList';
// import NewRoomForm from './components/NewRoomForm';
import './App.css';

import { tokenUrl, instanceLocator } from './config';

class App extends Component {

    constructor() {
        super();
        this.state = {
            messages: []
        }
    }

    componentDidMount() {
        const chatManager = new ChatKit.ChatManager({
            instanceLocator,
            userId: 'andre',
            tokenProvider: new ChatKit.TokenProvider({
                url: tokenUrl
            })
        });

        chatManager.connect()
            .then(currentUser => {
                currentUser.subscribeToRoom({
                    roomId: '19668054',
                    hooks: {
                        onMessage: message => {
                            this.setState({
                                messages: [...this.state.messages, message]
                            })
                        }
                    }
                })
            })
    }
  render() {
    return (
      <div className="App">

        <MessageList messages={this.state.messages}/>

      </div>
    );
  }
}

export default App;
