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

interface Wheather {
  temperature: {
    value: number;
    unit: string;
  };
  minTemperature: {
    value: number;
    unit: string;
  };
  maxTemperature: {
    value: number;
    unit: string;
  };
  humidity: {
    value: number;
    unit: string;
  };
  windSpeed: {
    value: number;
    unit: string;
  };
  windDirection: {
    value: number;
    unit: string;
  };
  weatherCode: WheatherCode;
  isDay: boolean;
}

type WheatherCode = 'CLEAR_SKY' | 'PARTLY_CLOUDY' | 'CLOUDY' | 'RAIN' | 'SNOW';

function mapWeatherCode(code: number): WheatherCode {
  if (code === 0) return 'CLEAR_SKY';
  if (code === 1 || code === 2) return 'PARTLY_CLOUDY';
  if (code === 3) return 'CLOUDY';
  if (code >= 51 && code <= 67) return 'RAIN';
  if (code >= 71 && code <= 77) return 'SNOW';
  return 'CLEAR_SKY';
}
export class WeatherClient {
  static async getCurrentWeather(latitude: number, longitude: number) {
    const params = {
      latitude,
      longitude,
      current: [
        'temperature_2m',
        'relative_humidity_2m',
        'wind_speed_10m',
        'wind_direction_10m',
        'weather_code',
        'is_day',
      ],
      daily: ['temperature_2m_max', 'temperature_2m_min'],
      timezone: 'auto',
      timeformat: 'unixtime',
    };

    const response = await client.get('/forecast', {
      params,
    });

    const weatherData: Wheather = {
      temperature: {
        value: response.data.current.temperature_2m,
        unit: response.data.current_units.temperature_2m,
      },
      minTemperature: {
        value: response.data.daily.temperature_2m_min[0],
        unit: response.data.daily_units.temperature_2m_min,
      },
      maxTemperature: {
        value: response.data.daily.temperature_2m_max[0],
        unit: response.data.daily_units.temperature_2m_max,
      },
      humidity: {
        value: response.data.current.relative_humidity_2m,
        unit: response.data.current_units.relative_humidity_2m,
      },
      windSpeed: {
        value: response.data.current.wind_speed_10m,
        unit: response.data.current_units.wind_speed_10m,
      },
      windDirection: {
        value: response.data.current.wind_direction_10m,
        unit: response.data.current_units.wind_direction_10m,
      },
      weatherCode: mapWeatherCode(response.data.current.weather_code),
      isDay: response.data.current.is_day === 1,
    };
    return weatherData;
  }
}
