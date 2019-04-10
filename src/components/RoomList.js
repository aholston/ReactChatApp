import React from 'react';

class RoomList extends React.Component {
    render() {
        const orderedRooms = [...this.props.rooms].sort((a,b) => {
            return a.id - b.id
        })
        return (
            <div className='rooms-list'>
                <div className='help-text'>Room List</div>
                <ul>
                <h3>Your Rooms:</h3>
                    {orderedRooms.map(room => {
                        const active = this.props.roomId === room.id ? 'active' : ''
                        return (
                            <li key={room.id} className={'room ' + active}>
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
