import React from 'react';

const UserInfo = ({ user }) => {
    return (
        <div>
            <p>{user.name}</p>
            <img src={user.photo} alt="none" style={{ width: '150px' }} />
            <p>User ID: {user.uid}</p>
        </div>
    );
};

export default UserInfo;
