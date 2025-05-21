import React from 'react';

const BadgeRequestCard = ({ mentor, onAccept, onReject, onViewDocument }) => {
  return (
    <tr>
      <td>{mentor.name}</td>
      <td>{mentor.email}</td>
      <td>
        <button onClick={onViewDocument}>View Document</button>
      </td>
      <td>
        <button onClick={onAccept} style={{ marginRight: '8px' }}>Accept</button>
        <button onClick={onReject}>Reject</button>
      </td>
    </tr>
  );
};

export default BadgeRequestCard;
