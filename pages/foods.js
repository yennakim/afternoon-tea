import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import FoodCard from '../components/FoodCard';
import { getFoods } from '../api/foodData';

export default function FoodsPage() {
  const [foods, setFoods] = useState([]);
  const getAllFoods = () => {
    getFoods().then(setFoods);
  };

  useEffect(() => {
    getAllFoods();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/food/addFood" passHref>
        <Button>Add A Food</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {foods.map((food) => (
          <FoodCard key={food.firebaseKey} foodObj={food} onUpdate={getAllFoods} />
        ))}
      </div>
    </div>
  );
}
