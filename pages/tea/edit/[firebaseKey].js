import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleTea } from '../../../api/teaData';
import TeaForm from '../../../components/forms/TeaForm';

export default function EditTea() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  // TODO: grab the firebasekey
  const { firebaseKey } = router.query;

  // TODO: make a call to the API to get the tea data
  useEffect(() => {
    getSingleTea(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // TODO: pass object to form
  return (<TeaForm obj={editItem} />);
}
