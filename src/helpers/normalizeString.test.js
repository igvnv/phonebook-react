import normalizer from './normalizeString';

describe('Normalize string', () => {
  it("doesn't spoil regular string", () => {
    expect(normalizer('Roman Petrov')).toEqual('Roman Petrov');
  });

  it('replaces diacritics to regular characters', () => {
    expect(normalizer('Átila Pinto')).toEqual('Atila Pinto');
  });

  it('works correctly with NULL', () => {
    expect(normalizer(null)).toEqual('');
  });
});
