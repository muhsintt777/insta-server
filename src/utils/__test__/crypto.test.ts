import { Crypto } from 'utils/crypto';

describe('hash', () => {
  it('should hash password', async () => {
    const hash = await Crypto.hashString('password');
    expect(hash).not.toBe('password');
  });

  it('should compare password', async () => {
    const hash = await Crypto.hashString('password');
    const isPasswordValid = await Crypto.compare('password', hash);
    const isPasswordInvalid = await Crypto.compare('invalid', hash);
    expect(isPasswordValid).toBe(true);
    expect(isPasswordInvalid).toBe(false);
  });
});
