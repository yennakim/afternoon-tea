import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET FOODS
const getFoods = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/foods.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// GET SINGLE FOOD ITEM
const getSingleFood = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/foods/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getFoods,
  getSingleFood,
};
