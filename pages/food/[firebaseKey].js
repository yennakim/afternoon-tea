/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewFoodDetails } from '../../api/mergedData';

export default function ViewFood() {
  const [foodDetails, setFoodDetails] = useState({});
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  // TODO: make call to API layer to get the data
  useEffect(() => {
    viewFoodDetails(firebaseKey).then(setFoodDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={foodDetails.image} alt={foodDetails.name} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {foodDetails.name}
        </h5>
        <p>Pairs well with {foodDetails.teaObject?.name}</p>
        <hr />
        <p>
          {foodDetails.foodNotes}
        </p>
      </div>
    </div>
  );
}
