import React, { useEffect, useState } from 'react';
import TeaCard from '../components/TeaCard';
import { getTeas } from '../api/teaData';

function Home() {
  const [teas, setTeas] = useState([]);
  const getAllTeas = () => {
    getTeas().then(setTeas);
  };

  useEffect(() => {
    getAllTeas();
  }, []);

  return (
    <div className="d-flex flex-wrap">
      {teas.map((tea) => (
        <TeaCard key={tea.firebaseKey} teaObj={tea} onUpdate={getAllTeas} />
      ))}
    </div>
  );
}

export default Home;
