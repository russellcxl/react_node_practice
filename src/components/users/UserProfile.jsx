import React from 'react';

export default function UserProfile(props) {
  return (
    <div>
      <h1>USER PROFILE</h1>
      <div>{props.user && props.user.username}</div>
    </div>
  );
}