import React from 'react';

class RoomList extends React.Component {
    render() {
        return (
            <div className='rooms-list'>
                <div className='help-text'>Room List</div>
                <ul>
                <h3>Your Rooms:</h3>
                    {this.props.rooms.map(room => {
                        return (
                            <li key={room.id} className='room'>
                                <a
                                    href="#"
                                    onClick={() => this.props.subscribeToRoom(room.id)}># {room.name}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default RoomList
