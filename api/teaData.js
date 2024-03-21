import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET TEAS
const getTeas = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teas.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// GET SINGLE TEA
const getSingleTea = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teas/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// CREATE TEA
const createTea = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teas.json`, {
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

// PATCH TEA
const updateTea = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teas/${payload.firebaseKey}.json`, {
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

// DELETE TEA

const deleteSingleTea = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teas/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// GET TEA FOODS
const getFoodsPairedWithTea = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/foods.json?orderBy="teaId"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// GET USER TEAS
const getUserTeas = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teas.json?orderBy="uid"&equalTo="${uid}"`, {
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
  getTeas,
  getSingleTea,
  createTea,
  updateTea,
  deleteSingleTea,
  getFoodsPairedWithTea,
  getUserTeas,
};
