import { ApiResponse } from 'utils/api-response';

describe('ApiResponse', () => {
  it('should create a response with default message and errorType', () => {
    const data = { foo: 'bar' };
    const response = new ApiResponse(data);
    expect(response.message).toBe('successfull');
    expect(response.data).toEqual(data);
    expect(response.errorType).toBeNull();
  });

  it('should create a response with custom message and errorType', () => {
    const data = { foo: 'bar' };
    const response = new ApiResponse(data, 'custom message', 'CUSTOM_ERROR');
    expect(response.message).toBe('custom message');
    expect(response.data).toEqual(data);
    expect(response.errorType).toBe('CUSTOM_ERROR');
  });

  it('should allow null data', () => {
    const response = new ApiResponse(null);
    expect(response.data).toBeNull();
  });
});
