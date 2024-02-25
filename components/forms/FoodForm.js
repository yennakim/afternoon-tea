import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { createFood, updateFood } from '../../api/foodData';

const initialState = {
  name: '',
  foodNotes: '',
};

function FoodForm({ obj }) {
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
      updateFood(formInput).then(() => router.push('/foods'));
    } else {
      const payload = { ...formInput };
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

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Add'} Food Item</Button>
    </Form>
  );
}

FoodForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    flavorNotes: PropTypes.string,
    image: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
};

FoodForm.defaultProps = {
  obj: initialState,
};

export default FoodForm;
