import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createTea, updateTea } from '../../api/teaData';

const initialState = {
  name: '',
  description: '',
  type: '',
  idealTemp: '',
  ingredients: '',
  flavorNotes: '',
  looseLeaf: '',
  iced: '',
  image: '',
};

export default function TeaForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
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
      updateTea(formInput).then(() => router.push('/'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createTea(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateTea(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Tea</h2>

      {/* TEA NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label=" Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter tea name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* TEA DESCRIPTION TEXTAREA INPUT  */}
      <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Tea Description"
          style={{ height: '100px' }}
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* TEA TYPE SELECT  */}
      <FloatingLabel controlId="floatingSelect" label="Tea Type" className="mb-3">
        <Form.Control
          as="select"
          name="type"
          value={formInput.type}
          onChange={handleChange}
          required
        >
          <option value="">Select Tea Type</option>
          <option value="Black">Black</option>
          <option value="Green">Green</option>
          <option value="Herbal">Herbal</option>
          <option value="Oolong">Oolong</option>
          <option value="White">White</option>
        </Form.Control>
      </FloatingLabel>

      {/* IDEAL TEA TEMP INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Ideal Temperature" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter ideal tea temperature"
          name="idealTemp"
          value={formInput.idealTemp}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* INGREDIENTS  INPUT  */}
      <FloatingLabel controlId="floatingInput4" label="Ingredients" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter ingredients"
          name="ingredients"
          value={formInput.ingredients}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* FLAVOR NOTES INPUT  */}
      <FloatingLabel controlId="floatingInput5" label="Flavor Notes" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter flavor notes"
          name="flavorNotes"
          value={formInput.flavorNotes}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput6" label="Tea Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
      <Form.Check
        className="text mb-3"
        type="switch"
        id="looseLeaf"
        name="looseLeaf"
        label="Loose leaf?"
        checked={formInput.looseLeaf}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            looseLeaf: e.target.checked,
          }));
        }}
      />
      <Form.Check
        className="text mb-3"
        type="switch"
        id="iced"
        name="iced"
        label="Iced?"
        checked={formInput.iced}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            iced: e.target.checked,
          }));
        }}
      />

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Add'} Tea</Button>
    </Form>
  );
}

TeaForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    idealTemp: PropTypes.string,
    ingredients: PropTypes.string,
    flavorNotes: PropTypes.string,
    looseLeaf: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,

  }),
};

TeaForm.defaultProps = {
  obj: initialState,
};
