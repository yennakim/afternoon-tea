import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import TeaPartyCard from '../components/TeaPartyCard';
import { getTeaParties } from '../api/teaPartyData';

export default function TeaPartiesPage() {
  const [teaParties, setTeaParties] = useState([]);
  const getAllTeaParties = () => {
    getTeaParties().then(setTeaParties);
  };

  useEffect(() => {
    getAllTeaParties();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/teaParty/new" passHref>
        <Button>Create a Tea Party</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {teaParties.map((party) => (
          <TeaPartyCard key={party.firebaseKey} teaPartyObj={party} onUpdate={getAllTeaParties} />
        ))}
      </div>
    </div>
  );
}
