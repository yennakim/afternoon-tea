import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET TEA Party Pairings
const getTeaPartyPairings = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teaPartyPairings.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// GET Single Tea Party Pairing
const getSingleTeaPartyPairing = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teaPartyPairings/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// CREATE Tea Party Pairing
const createTeaPartyPairing = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teaPartyPairings.json`, {
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

// PATCH Tea Party Pairing
const updateTePartyPairing = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teaPartyPairings/${payload.firebaseKey}.json`, {
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

// DELETE Tea Party Pairing

const deleteSingleTeaPartyPairing = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teaPartyPairings/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// GET JOIN TABLE TEA PARTY PAIRING - PAIRINGID
const getPartyPairingByPairingId = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teaPartyPairings.json?orderBy="pairingId"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// GET JOIN TABLE TEA PARTY PAIRING - TEAPARTYID
const getPartyPairingByTeaPartyId = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teaPartyPairings.json?orderBy="teaPartyId"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  getTeaPartyPairings,
  getSingleTeaPartyPairing,
  createTeaPartyPairing,
  updateTePartyPairing,
  deleteSingleTeaPartyPairing,
  getPartyPairingByPairingId,
  getPartyPairingByTeaPartyId,
};
