import React, { Component } from 'react';
import ChatKit from '@pusher/chatkit-client';
import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import RoomList from './components/RoomList';
// import NewRoomForm from './components/NewRoomForm';
import './App.css';

import { tokenUrl, instanceLocator } from './config';

class App extends Component {

    constructor() {
        super();
        this.state = {
            messages: [],
            joinableRooms: [],
            joinedRooms: []
        }

        this.sendMessage = this.sendMessage.bind(this);
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
                this.currentUser = currentUser;

                this.currentUser.getJoinableRooms()
                    .then(joinableRooms => {
                        this.setState({
                            joinableRooms,
                            joinedRooms: this.currentUser.rooms
                        })
                    })
                    .catch(err => console.log('errors on joinableRooms: ', err))

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
            .catch(err => console.log('errors on connecting: ', err))
    }

    sendMessage(text) {
        this.currentUser.sendMessage({
            text,
            roomId: '19668054'
        })
    }
  render() {
    return (
      <div className="App">

        <RoomList rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}/>
        <MessageList messages={this.state.messages}/>
        <SendMessageForm sendMessage={this.sendMessage}/>


      </div>
    );
  }
}

export default App;
