import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { createFood, updateFood } from '../../api/foodData';
import { useAuth } from '../../utils/context/authContext';
import { getTeas } from '../../api/teaData';

const initialState = {
  name: '',
  foodNotes: '',
};

function FoodForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [teas, setTeas] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getTeas().then(setTeas);
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj], user);

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
      updateFood(formInput).then(() => router.push('/foods'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createFood(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateFood(patchPayload).then(() => {
          router.push('/foods');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Add'} Food Item</h2>

      {/* FOOD NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Food Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter food name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* FLAVOR NOTES INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Flavor Notes" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter flavor notes"
          name="foodNotes"
          value={formInput.foodNotes}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput4" label="Food Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* TEA SELECT  */}
      <FloatingLabel controlId="floatingSelect" label="Tea">
        <Form.Select
          aria-label="Tea"
          name="teaId"
          onChange={handleChange}
          className="mb-3"
          value={formInput.teaId} //
          required
        >
          <option value="">Select Tea</option>
          {
            teas.map((tea) => (
              <option
                key={tea.firebaseKey}
                value={tea.firebaseKey}
              >
                {tea.name}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Add'} Food Item</Button>
    </Form>
  );
}

FoodForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    flavorNotes: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

FoodForm.defaultProps = {
  obj: initialState,
};

export default FoodForm;
