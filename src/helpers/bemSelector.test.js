import bemSelector from './bemSelector';

describe('BEM selector', () => {
  it('returns block element', () => {
    expect(bemSelector('block-name')).toEqual('block-name');
  });

  it('adds single element', () => {
    expect(bemSelector('block-name', 'item')).toEqual(
      'block-name block-name__item'
    );
  });

  it('adds multiple elements', () => {
    expect(bemSelector('block-name', ['item1', 'item2'])).toEqual(
      'block-name block-name__item1 block-name__item2'
    );
  });

  it('skips empty elements', () => {
    expect(
      bemSelector('block-name', [false, undefined, null, '', 'item1', 'item2'])
    ).toEqual('block-name block-name__item1 block-name__item2');
  });

  it('adds single modifier', () => {
    expect(bemSelector('block-name', false, 'active')).toEqual(
      'block-name block-name_active'
    );
  });

  it('adds multiple modifiers', () => {
    expect(bemSelector('block-name', false, ['active', 'important'])).toEqual(
      'block-name block-name_active block-name_important'
    );
  });

  it('skips empty modifiers', () => {
    expect(
      bemSelector('block-name', false, [
        false,
        undefined,
        null,
        'active',
        'important',
      ])
    ).toEqual('block-name block-name_active block-name_important');
  });
});
