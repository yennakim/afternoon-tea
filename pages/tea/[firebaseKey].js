/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewTeaDetails } from '../../api/mergedData';
import { getFoodsPairedWithTea } from '../../api/teaData';
import FoodCard from '../../components/FoodCard';

export default function ViewTea() {
  const [teaDetails, setTeaDetails] = useState({});
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  // TODO: make call to API layer to get the data
  useEffect(() => {
    viewTeaDetails(firebaseKey).then(setTeaDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-row mb-5">
        <img src={teaDetails.image} alt={teaDetails.name} style={{ width: '200px' }} />
      </div>
      <div className="text-white ms-5 mb-4 details">
        <h3>{teaDetails.name}</h3>
        <h6 className="card-subtitle">Type: {teaDetails.type}</h6>
        <p>{teaDetails.description}</p>
        <p>Ingredients: {teaDetails.ingredients}</p>
        <p>Notes: {teaDetails.flavorNotes}</p>
        <p>Ideal temperature: {teaDetails.idealTemp}°F</p>
        <p>Loose leaf: {teaDetails.looseLeaf ? 'Yes' : 'No'}</p>
        <p>Recommended: {teaDetails.iced ? 'Iced 🧊' : 'Hot ☕︎'}</p>
        <hr />
      </div>
      <div className="d-flex flex-wrap">
        {teaDetails.foods?.map((food) => (
          <FoodCard key={food.firebaseKey} foodObj={food} onUpdate={getFoodsPairedWithTea} />
        ))}
      </div>
    </div>
  );
}
