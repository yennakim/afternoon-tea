import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleFood } from '../../../api/foodData';
import FoodForm from '../../../components/forms/FoodForm';

export default function EditFood() {
  const [editFoodItem, setEditFoodItem] = useState({});
  const router = useRouter();
  // TODO: grab the firebasekey
  const { firebaseKey } = router.query;

  // TODO: make a call to the API to get the book data
  useEffect(() => {
    getSingleFood(firebaseKey).then(setEditFoodItem);
  }, [firebaseKey]);

  // TODO: pass object to form
  return (<FoodForm obj={editFoodItem} />);
}
