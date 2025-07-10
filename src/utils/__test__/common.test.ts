import {
  getZodErrMessage,
  validateId,
  getCommonJsonTransformConfig,
} from 'utils/common';
import { ZodError, z } from 'zod';
import { CustomError } from 'utils/error';

describe('getZodErrMessage', () => {
  it('should return joined error messages', () => {
    const schema = z.object({ foo: z.string().min(5) });
    try {
      schema.parse({ foo: 'bar' });
    } catch (e) {
      expect(getZodErrMessage(e as ZodError)).toContain(
        'String must contain at least 5 character(s)',
      );
    }
  });

  it('should return default message if no issues', () => {
    const err = { issues: [] } as unknown as ZodError;
    expect(getZodErrMessage(err)).toBe('Validation failed');
  });
});

describe('validateId', () => {
  it('should return valid id and isValid true for valid ObjectId', () => {
    const valid = '507f1f77bcf86cd799439011';
    expect(validateId(valid)).toEqual({ id: valid, isValid: true });
  });

  it('should throw CustomError for invalid id when safe=false', () => {
    expect(() => validateId('invalid-id')).toThrow(CustomError);
  });

  it('should return isValid false for invalid id when safe=true', () => {
    expect(validateId('invalid-id', true)).toEqual({
      id: 'invalid-id',
      isValid: false,
    });
  });

  it('should trim whitespace from id', () => {
    const valid = ' 507f1f77bcf86cd799439011 ';
    expect(validateId(valid).isValid).toBe(true);
  });
});

describe('getCommonJsonTransformConfig', () => {
  it('should transform _id to id and remove _id', () => {
    const config = getCommonJsonTransformConfig();
    const ret: any = { _id: 'abc', foo: 'bar' };
    const result = config.transform({}, { ...ret });
    expect(result.id).toBe('abc');
    expect(result._id).toBeUndefined();
    expect(result.foo).toBe('bar');
  });

  it('should call custom transform if provided', () => {
    const custom = jest.fn((_doc, ret) => {
      ret.extra = 42;
    });
    const config = getCommonJsonTransformConfig(custom);
    const ret: any = { _id: 'abc' };
    const result = config.transform({}, { ...ret });
    expect(custom).toHaveBeenCalled();
    expect(result.extra).toBe(42);
    expect(result.id).toBe('abc');
    expect(result._id).toBeUndefined();
  });
});
