import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import TeaPartyCard from '../components/TeaPartyCard';
import { getTeaParties } from '../api/teaPartyData';

export default function MyPostsPage() {
  const [teaParties, setTeaParties] = useState([]);
  const getAllTeaParties = (user) => {
    getTeaParties(user.uid).then(setTeaParties);
  };
  const { user } = useAuth();

  useEffect(() => {
    getAllTeaParties(user.uid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
