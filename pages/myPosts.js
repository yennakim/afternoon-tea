import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import TeaPartyCard from '../components/TeaPartyCard';
import { getUserTeaParties } from '../api/teaPartyData';
import { useAuth } from '../utils/context/authContext';

export default function MyPostsPage() {
  const [teaParties, setTeaParties] = useState([]);
  const { user } = useAuth();

  const getAllTeaParties = () => {
    getUserTeaParties(user.uid).then(setTeaParties);
  };

  useEffect(() => {
    getAllTeaParties();
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
