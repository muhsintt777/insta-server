import { compare, hash } from 'bcrypt';

export class Crypto {
  static async hashString(payload: string, salt?: number): Promise<string> {
    return hash(payload, salt || 10);
  }

  static async compare(payload: string, hash: string): Promise<boolean> {
    return compare(payload, hash);
  }
}
