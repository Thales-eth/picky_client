import './NoFriendsMessage.css'
import React from 'react'

const NoFriendsMessage = () => {
    return (
        <div className='noFriends'>
            <p>No friends. So sad...</p>
            <a className='mt-3' href="/explorer">Start exploring what other creators have shared</a>
        </div>
    )
}

export default NoFriendsMessage