import axios from 'axios';
import { ENV } from 'configs/env';
import { CustomError } from 'utils/error';

const client = axios.create({
  baseURL: ENV.WHEATHER_CLENT_BASE_URL,
});
client.interceptors.response.use(
  (response) => response,
  () => {
    throw new CustomError(
      'EXTERNAL_SERVICE_ERROR',
      'Failed to fetch weather data',
    );
  },
);

export class WeatherClient {
  static async getCurrentWeather(latitude: number, longitude: number) {
    const params = {
      latitude,
      longitude,
      current: [
        'temperature_2m',
        'rain',
        'wind_speed_10m',
        'wind_direction_10m',
        'weather_code',
      ],
      timeformat: 'unixtime',
    };
    const response = await client.get('/forecast', {
      params,
    });
    return response.data;
  }
}
