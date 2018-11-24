const expect = require('expect');
const { isRealString } = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    expect(isRealString(42)).toBeFalsy();
  });
  it('should reject string with only spaces', () => {
    expect(isRealString('    ')).toBeFalsy();
  });
  it('should allows string with non-space characters', () => {
    expect(isRealString('   Hans Gruber   ')).toBeTruthy();
  });
});
