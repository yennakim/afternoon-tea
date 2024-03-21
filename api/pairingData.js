import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET PAIRINGS
const getPairings = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/pairings.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// GET SINGLE PAIRING
const getSinglePairing = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/pairings/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// GET FOOD ID
const getPairingFoodId = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/pairings.json?orderBy="foodId"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// GET TEA ID
const getPairingTeaId = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/pairings.json?orderBy="teaId"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// CREATE PAIRING
const createPairing = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/pairings.json`, {
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

// PATCH PAIRING
const updatePairing = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/pairings/${payload.firebaseKey}.json`, {
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

// DELETE PAIRING
const deleteSinglePairing = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/pairings/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getPairings,
  getSinglePairing,
  getPairingFoodId,
  getPairingTeaId,
  createPairing,
  updatePairing,
  deleteSinglePairing,
};
