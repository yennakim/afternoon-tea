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
      <div className="d-flex flex-column">
        <img src={teaDetails.image} alt={teaDetails.name} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {teaDetails.name}
        </h5>
        <p>{teaDetails.description}</p>
        <ul>
          <li>Ingredients: {teaDetails.ingredients}</li>
          <li>Notes: {teaDetails.flavorNotes}</li>
          <li>Ideal temperature: {teaDetails.idealTemp} degrees</li>
          <li>Steep time: {teaDetails.steepTime} minutes</li>
          <li>Loose leaf: {teaDetails.looseLeaf ? 'Yes' : 'No'}</li>
        </ul>
        <hr />
        <div className="d-flex flex-wrap">
          {teaDetails.foods?.map((food) => (
            <FoodCard key={food.firebaseKey} foodObj={food} onUpdate={getFoodsPairedWithTea} />
          ))}
        </div>
      </div>
    </div>
  );
}

// TEA IS AUTHORS
// FOOD IS BOOKS
