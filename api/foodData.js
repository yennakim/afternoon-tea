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
    .then((data) => resolve(Object.values(data)))
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

// CREATE FOOD
const createFood = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/foods.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// PATCH FOOD
const updateFood = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/foods/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// DELETE FOOD
const deleteSingleFood = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/foods/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// GET USER FOODS
const getUserFoods = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/foods.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

export {
  getFoods,
  getSingleFood,
  createFood,
  updateFood,
  deleteSingleFood,
  getUserFoods,
};
