import { Request, Response } from 'express';
import { WeatherService } from './wheather-service';
import { ApiResponse } from 'utils/api-response';
import { wheatherSchema } from './wheather-validation';

export class WheatherController {
  static async getCurrentWeather(req: Request, res: Response) {
    const { latitude, longitude } = wheatherSchema.parse(req.query);
    const weatherData = await WeatherService.getCurrentWeather(
      latitude,
      longitude,
    );
    res.status(200).json(new ApiResponse(weatherData));
  }
}
