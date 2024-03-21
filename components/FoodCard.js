import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteSingleFood } from '../api/foodData';
import { useAuth } from '../utils/context/authContext';

export default function FoodCard({ foodObj, onUpdate }) {
  const { user } = useAuth();
  const deleteFood = () => {
    if (window.confirm(`Would you like to delete ${foodObj.name}?`)) {
      deleteSingleFood(foodObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={foodObj.image} alt={foodObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{foodObj.name}</Card.Title>
        <Link href={`/food/${foodObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        {user.uid === foodObj.uid && (
        <>
          <Link href={`/food/edit/${foodObj.firebaseKey}`} passHref>
            <Button variant="info">EDIT</Button>
          </Link>
          <Button variant="danger" onClick={deleteFood} className="m-2">
            DELETE
          </Button>
        </>
        )}
      </Card.Body>
    </Card>
  );
}

FoodCard.propTypes = {
  foodObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
