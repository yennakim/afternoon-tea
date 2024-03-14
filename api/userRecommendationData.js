import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET USER RECOMMENDATIONS
const getUserRecommendations = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/userRecommendations.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// GET SINGLE USER RECOMMENDATION
const getSingleUserRecommendations = (firebaseKey) => new Promise((resolve, reject) => {
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

// GET Pairings To Try
const getPairingsToTry = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/userRecommendations.json?orderBy="pairingsToTry"&equalTo=true`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const pairingToTry = Object.values(data).filter((item) => item.pairingsToTry);
      resolve(pairingToTry);
    })
    .catch(reject);
});

export {
  getUserRecommendations,
  getSingleUserRecommendations,
  getPairingsToTry,
};
