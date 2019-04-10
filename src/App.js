import React, { Component } from 'react';
import ChatKit from '@pusher/chatkit-client';
import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import RoomList from './components/RoomList';
import NewRoomForm from './components/NewRoomForm';


import { tokenUrl, instanceLocator } from './config';

class App extends Component {

    constructor() {
        super();
        this.state = {
            messages: [],
            joinableRooms: [],
            joinedRooms: [],
            roomId: null
        }

        this.sendMessage = this.sendMessage.bind(this);
        this.subscribeToRoom = this.subscribeToRoom.bind(this);
        this.getRooms = this.getRooms.bind(this);
        this.createRoom = this.createRoom.bind(this);
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
                this.getRooms();
            })
            .catch(err => console.log('errors on connecting: ', err))
    }

    subscribeToRoom(roomId) {
        this.setState({
            messages: []
        })
        this.currentUser.subscribeToRoom({
            roomId: roomId,
            hooks: {
                onMessage: message => {
                    this.setState({
                        messages: [...this.state.messages, message]
                    })
                }
            }
        })
        .then(room => {
            this.setState({
                roomId: room.id
            })
            this.getRooms();
        })
        .catch(err => console.log('error on subscribing to room: ', err))
    }

    getRooms() {
        this.currentUser.getJoinableRooms()
            .then(joinableRooms => {
                this.setState({
                    joinableRooms,
                    joinedRooms: this.currentUser.rooms
                })
            })
            .catch(err => console.log('errors on joinableRooms: ', err))
    }

    sendMessage(text, roomId) {
        this.currentUser.sendMessage({
            text,
            roomId: this.state.roomId
        })
    }

    createRoom(name) {
        this.currentUser.createRoom({
            name
        })
        .then(room => this.subscribeToRoom(room.id))
    }

  render() {
    return (
      <div className="App">
        <RoomList
            roomId={this.state.roomId}
            rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
            subscribeToRoom={this.subscribeToRoom} />
        <MessageList
            roomId={this.state.roomId}
            messages={this.state.messages}/>
        <SendMessageForm
            disable={!this.state.roomId}
            sendMessage={this.sendMessage}/>
        <NewRoomForm createRoom={this.createRoom} />
      </div>
    );
  }
}

export default App;
