import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getTeas = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teas.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export default getTeas;
