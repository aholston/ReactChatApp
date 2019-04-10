import React from 'react';

function Message(props) {
        return (
            <div className='message'>
            <div key={props.key} className="message">
                <div className='message-username'>{props.username}</div>
                <div className='message-text'>{props.message}</div>
            </div>
            </div>
        )
}

export default Message;
