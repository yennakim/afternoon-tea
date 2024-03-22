import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteSingleTea } from '../api/teaData';
import { useAuth } from '../utils/context/authContext';

export default function TeaCard({ teaObj, onUpdate }) {
  const { user } = useAuth();
  const deleteTea = () => {
    if (window.confirm(`Would you like to delete ${teaObj.name}?`)) {
      deleteSingleTea(teaObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card
      className="custom-class"
      style={{
        width: '18rem',
        backgroundColor: '#fefbed',
        margin: '10px',
      }}
    >
      <Card.Img variant="top" src={teaObj.image} alt={teaObj.name} style={{ height: '400px' }} />
      <Card.Body className="text-center">
        <Card.Title>{teaObj.name}</Card.Title>
        <p className="card-text bold">{teaObj.type}</p>
        {/* DYNAMIC LINK TO EDIT THE TEA DETAILS  */}
        <Link href={`/tea/${teaObj.firebaseKey}`} passHref>
          <Button variant="success" className="m-2">VIEW</Button>
        </Link>
        {user.uid === teaObj.uid && (
        <>
          <Link href={`/tea/edit/${teaObj.firebaseKey}`} passHref>
            <Button variant="info">EDIT</Button>
          </Link>
          <Button variant="danger" onClick={deleteTea} className="m-2">
            DELETE
          </Button>
        </>
        )}
      </Card.Body>
    </Card>
  );
}

TeaCard.propTypes = {
  teaObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
