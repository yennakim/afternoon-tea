import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteSingleTeaParty } from '../api/teaPartyData';
import { useAuth } from '../utils/context/authContext';

export default function TeaPartyCard({ teaPartyObj, onUpdate }) {
  const { user } = useAuth();

  const deleteTeaParty = () => {
    if (window.confirm(`Would you like to delete ${teaPartyObj.name}?`)) {
      deleteSingleTeaParty(teaPartyObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card className="custom-class" style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={teaPartyObj.image} alt={teaPartyObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{teaPartyObj.name}</Card.Title>
        <Card.Text>Created by: {user.uid === teaPartyObj.uid ? `${user.displayName}` : 'Anonymous' }</Card.Text>
        {/* DYNAMIC LINK TO EDIT THE TEA DETAILS  */}
        <Link href={`/teaParty/${teaPartyObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/teaParty/edit/${teaPartyObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteTeaParty} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

TeaPartyCard.propTypes = {
  teaPartyObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
