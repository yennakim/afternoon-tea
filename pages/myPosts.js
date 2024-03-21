import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getUserTeas } from '../api/teaData';
import TeaPartyCard from '../components/TeaPartyCard';
import { getUserTeaParties } from '../api/teaPartyData';
import { useAuth } from '../utils/context/authContext';
import TeaCard from '../components/TeaCard';

export default function MyPostsPage() {
  const [userTeas, setUserTeas] = useState([]);
  const [teaParties, setTeaParties] = useState([]);
  const { user } = useAuth();

  const getMyCreatedTeas = () => {
    getUserTeas(user.uid).then(setUserTeas);
  };

  const getAllTeaParties = () => {
    getUserTeaParties(user.uid).then(setTeaParties);
  };

  useEffect(() => {
    getMyCreatedTeas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    getAllTeaParties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="text-center my-4">
      <Link href="/teaParty/new" passHref>
        <Button>Create a Tea Party</Button>
      </Link>
      <h1>Created Teas</h1>
      <div className="d-flex flex-wrap">
        {userTeas.map((tea) => (
          <TeaCard key={tea.firebaseKey} teaObj={tea} onUpdate={getMyCreatedTeas} />
        ))}
      </div>

      <h1>Created Tea Party Events </h1>
      <div className="d-flex flex-wrap">
        {teaParties.map((party) => (
          <TeaPartyCard key={party.firebaseKey} teaPartyObj={party} onUpdate={getAllTeaParties} />
        ))}
      </div>
    </div>
  );
}
