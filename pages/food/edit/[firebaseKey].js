import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleFood } from '../../../api/foodData';
import FoodForm from '../../../components/forms/FoodForm';

export default function EditFood() {
  const [editFoodItem, setEditFoodItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleFood(firebaseKey).then(setEditFoodItem);
  }, [firebaseKey]);

  return (<FoodForm obj={editFoodItem} />);
}
