import { WeatherClient } from 'external/wheather-client';
import { wheatherSchema } from './wheather-validation';

export class WeatherService {
  static async getCurrentWeather(latitude: number, longitude: number) {
    const params = wheatherSchema.parse({ latitude, longitude });
    return WeatherClient.getCurrentWeather(params.latitude, params.longitude);
  }
}
