/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewTeaPartyDetails } from '../../api/mergedData';

export default function ViewTeaParty() {
  const [partyDetails, setPartyDetails] = useState({});
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  // TODO: make call to API layer to get the data
  useEffect(() => {
    viewTeaPartyDetails(firebaseKey).then(setPartyDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={partyDetails.image} alt={partyDetails.name} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h1>
          {partyDetails.name}
        </h1>
        <hr />

        <h4>Date: {partyDetails.partyDate}</h4>
        <h4>
          Time: {partyDetails.partyTime}
        </h4>
      </div>
      <div>
        <br />
        <h5>{partyDetails.description}</h5>
      </div>
    </div>
  );
}
