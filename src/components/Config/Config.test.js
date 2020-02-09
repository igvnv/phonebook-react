import Config from './index';

describe('Config', () => {
  it('contains project title', () => {
    expect(typeof Config.title).toBe('string');
  });

  it('contains API address', () => {
    expect(typeof Config.apiUrl).toBe('string');
  });

  it('contains valid API address', () => {
    expect(Config.apiUrl).toMatch(/^http(s)?:\/\//);
  });

  it('contains number of loading contacts', () => {
    expect(typeof Config.numberCards).toBe('number');
  });

  it('contains valid number of loading contacts', () => {
    expect(Config.numberCards).toBeGreaterThan(0);
    // 5 000 is the limitation of randomuser.me
    expect(Config.numberCards).toBeLessThanOrEqual(5000);
  });

  it('contains alphabet for tabs', () => {
    expect(Array.isArray(Config.tabs)).toBeTruthy();
  });

  it('contains all the letter of alphabet', () => {
    const alphabet = [];

    let charCode = 'a'.charCodeAt();

    do {
      alphabet.push(String.fromCharCode(charCode));
      charCode += 1;
    } while (alphabet[alphabet.length - 1] !== 'z');

    expect(Config.tabs).toEqual(alphabet);
  });
});
