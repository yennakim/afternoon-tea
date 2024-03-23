import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteSingleFood } from '../api/foodData';
import { useAuth } from '../utils/context/authContext';

export default function FoodCard({ foodObj, onUpdate }) {
  const { user } = useAuth();
  const router = useRouter();
  const deleteFood = () => {
    if (window.confirm(`Would you like to delete ${foodObj.name}?`)) {
      deleteSingleFood(foodObj.firebaseKey).then(() => onUpdate(router.push('/')));
    }
  };
  return (
    <Card
      style={{
        width: '18rem',
        backgroundColor: '#fefbed',
        margin: '10px',
      }}
    >
      <Card.Img variant="top" src={foodObj.image} alt={foodObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{foodObj.name}</Card.Title>
        <Card.Text>{foodObj.foodNotes}</Card.Text>
        <Card.Text>Recommended by: {user && user.uid === foodObj.uid ? user.displayName : foodObj.username}</Card.Text>
        {user && user.uid === foodObj.uid && (
        <Card.Footer>
          <Link href={`/food/edit/${foodObj.firebaseKey}`} passHref>
            <Button variant="info">EDIT</Button>
          </Link>
          <Button variant="danger" onClick={deleteFood} className="m-2">
            DELETE
          </Button>
        </Card.Footer>
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
    foodNotes: PropTypes.string,
    username: PropTypes.string,
    teaId: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
