import React, { useEffect, useState } from 'react';
import { getUserTeas } from '../api/teaData';
import TeaPartyCard from '../components/TeaPartyCard';
import { getUserTeaParties } from '../api/teaPartyData';
import { useAuth } from '../utils/context/authContext';
import TeaCard from '../components/TeaCard';
import { getUserFoods } from '../api/foodData';
import FoodCard from '../components/FoodCard';

export default function MyPostsPage() {
  const [userTeas, setUserTeas] = useState([]);
  const [userFoods, setUserFoods] = useState([]);
  const [teaParties, setTeaParties] = useState([]);
  const { user } = useAuth();

  const getMyCreatedTeas = () => {
    getUserTeas(user.uid).then(setUserTeas);
  };

  const getMyCreatedFoods = () => {
    getUserFoods(user.uid).then(setUserFoods);
  };

  const getAllTeaParties = () => {
    getUserTeaParties(user.uid).then(setTeaParties);
  };

  useEffect(() => {
    getMyCreatedTeas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    getMyCreatedFoods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    getAllTeaParties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="text-center my-4">
      <h1>Created Teas</h1>
      <div className="d-flex flex-wrap">
        {userTeas.map((tea) => (
          <TeaCard key={tea.firebaseKey} teaObj={tea} onUpdate={getMyCreatedTeas} />
        ))}
      </div>

      <h1>Created Foods</h1>
      <div className="d-flex flex-wrap">
        {userFoods.map((food) => (
          <FoodCard key={food.firebaseKey} foodObj={food} onUpdate={getMyCreatedFoods} />
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
