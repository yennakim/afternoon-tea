import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { createTeaParty, updateTeaParty } from '../../api/teaPartyData';

const initialState = {
  name: '',
  description: '',
  partyTime: '',
  partyDate: '',
  image: '',
};

export default function TeaPartyForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateTeaParty(formInput).then(() => router.push('/teaParty'));
    } else {
      const payload = { ...formInput };
      createTeaParty(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateTeaParty(patchPayload).then(() => {
          router.push('/teaParty');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Edit' : 'Create'} Tea Party</h2>

      {/* TEA PARTY NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Tea Party Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter party name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* TEA PARTY DESCRIPTION INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Tea Party Description" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter description"
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* PARTY TIME INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Tea Party Time" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Start Time"
          name="partyTime"
          value={formInput.partyTime}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* PARTY DATE INPUT  */}
      <FloatingLabel controlId="floatingInput4" label="Tea Party Date" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter date"
          name="partyDate"
          value={formInput.partyDate}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput5" label="Tea Party Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Event</Button>
    </Form>
  );
}

TeaPartyForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    partyDate: PropTypes.string,
    partyTime: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

TeaPartyForm.defaultProps = {
  obj: initialState,
};
