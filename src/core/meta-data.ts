import path from 'path';
import { readFileSync } from 'fs';
import { Request, Response } from 'express';
import { ApiResponse } from 'utils/api-response';

export const metaDataHandler = (req: Request, res: Response) => {
  const packageJsonPath = path.resolve(__dirname, '../../package.json');
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

  res.json(
    new ApiResponse({ name: packageJson.name, version: packageJson.version }),
  );
};
