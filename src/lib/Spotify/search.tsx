import { enpointBaseUrl, fetchHelper } from './index';

const searchSpotify = async (
  query: string,
  page: number = 1,
  limit: number = 10,
  type: string = 'track,artist,album,playlist',
) => {
  'use server';
  let newLimit = limit;
  const offset = (page - 1) * limit;
  if (offset > 1000 - limit) newLimit = 1000 - offset;
  const url = `${enpointBaseUrl}/search?q=${query}&type=${type}&limit=${newLimit}&offset=${offset}`;
  return fetchHelper(url);
};

export default searchSpotify;
