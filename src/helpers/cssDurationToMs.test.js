import toMs from './cssDurationToMs';

describe('CSS duration to milliseconds', () => {
  it('returns 0 for an empty string', () => {
    expect(toMs('')).toEqual(0);
  });

  it('returns 0 for an invalid string', () => {
    expect(toMs('something else')).toEqual(0);
  });

  it('works correct with seconds', () => {
    expect(toMs('0.5s')).toEqual(500);
  });

  it('works correct with milliseconds', () => {
    expect(toMs('500ms')).toEqual(500);
  });
});
