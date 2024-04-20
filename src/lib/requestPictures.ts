import axios from 'axios';

const ACCESS_KEY = 'Kj5Pvg3lesCFsqQSMXB22Y8SDsHqmJpI29LCPszmb-4';

export default async function requestImages(query, page) {
  const { data } = await axios.get(
    `https://api.unsplash.com/search/photos`,
    {
      params: {
        query,
        page,
        client_id: ACCESS_KEY,
      }
    }
  );
  return data;
};
