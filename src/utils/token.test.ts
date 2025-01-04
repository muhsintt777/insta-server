import { ENV } from 'configs/env';

describe('Mocked Environment Variables', () => {
  it('should have mocked access token key', () => {
    expect(process.env.ACCESS_TOKEN_KEY).toBe('mock_access_key');
    expect(ENV.ACCESS_TOKEN_KEY).toBe('mock_access_key');
  });

  it('should have mocked refresh token key', () => {
    expect(process.env.REFRESH_TOKEN_KEY).toBe('mock_refresh_key');
    expect(ENV.REFRESH_TOKEN_KEY).toBe('mock_refresh_key');
  });
});
