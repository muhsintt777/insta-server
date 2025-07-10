import path from 'path';
import { readFileSync } from 'fs';
import { Request, Response } from 'express';

export const metaDataHandler = (req: Request, res: Response) => {
  const packageJsonPath = path.resolve(__dirname, '../../package.json');
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

  res.json({ name: packageJson.name, version: packageJson.version });
};
