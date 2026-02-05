import axios from 'axios';
import { ENV } from 'configs/env';
import { CustomError } from 'utils/error';

const api = axios.create({
  baseURL: ENV.GEACODING_CLIENT_BASE_URL,
});

api.interceptors.response.use(
  (response) => response,
  () => {
    throw new CustomError(
      'EXTERNAL_SERVICE_ERROR',
      'Failed to fetch city information',
    );
  },
);

export class GeocodingClient {
  static async getCityName(
    latitude: number,
    longitude: number,
  ): Promise<string> {
    const res = (
      await api.get('/reverse', {
        params: {
          lat: latitude,
          lon: longitude,
          format: 'json',
        },
      })
    ).data;
    return (
      res.address?.city ||
      res.address?.town ||
      res.address?.village ||
      'Unknown Location'
    );
  }
}
