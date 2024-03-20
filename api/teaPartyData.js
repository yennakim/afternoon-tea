import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET TEA PARTIES
const getTeaParties = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teaParties.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// GET SINGLE TEA PARTY
const getSingleTeaParty = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teaParties/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// CREATE TEA PARTY
const createTeaParty = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teaParties.json`, {
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

// PATCH TEA PARTY
const updateTeaParty = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teaParties/${payload.firebaseKey}.json`, {
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

// DELETE TEA PARTY
const deleteSingleTeaParty = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teaParties/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// GET USER TEA PARTIES
const getUserTeaParties = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teaParties.json?orderBy="uid"&equalTo="${uid}"`, {
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
  getTeaParties,
  getSingleTeaParty,
  createTeaParty,
  updateTeaParty,
  deleteSingleTeaParty,
  getUserTeaParties,
};
