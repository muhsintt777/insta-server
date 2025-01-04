import { CustomError } from '../error';
import { Token } from '../token';

describe('access token', () => {
  const token = Token.createAccessToken({ userId: '1' });

  it('should create access token', () => {
    const isTokenCreated = typeof token === 'string';
    expect(isTokenCreated).toBe(true);
  });

  it('should verify access token', () => {
    const decoded = Token.verifyAccessToken(token);
    expect(decoded.userId).toBe('1');
  });

  it('should throw error for invalid access token', () => {
    expect(() => Token.verifyAccessToken('invalid token')).toThrow(CustomError);
  });
});

describe('refresh token', () => {
  const token = Token.createRefreshToken({ userId: '1' });

  it('should create refresh token', () => {
    const isTokenCreated = typeof token === 'string';
    expect(isTokenCreated).toBe(true);
  });

  it('should verify refresh token', () => {
    const decoded = Token.verifyRefreshToken(token);
    expect(decoded.userId).toBe('1');
  });

  it('should throw error for invalid refresh token', () => {
    expect(() => Token.verifyRefreshToken('invalid token')).toThrow(
      CustomError,
    );
  });
});
