import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleTeaParty } from '../../../api/teaPartyData';
import TeaPartyForm from '../../../components/forms/TeaPartyForm';

export default function EditTeaParty() {
  const [editTeaParty, setEditTeaParty] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleTeaParty(firebaseKey).then(setEditTeaParty);
  }, [firebaseKey]);

  return (<TeaPartyForm obj={editTeaParty} />);
}
