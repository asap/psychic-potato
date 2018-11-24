const expect = require('expect');
const { generateMessage } = require('./message');

describe('generateMessage', () => {
  it('should send a message', () => {
    const from = 'knights';
    const text = 'Ekke Ekke Ekke Ekke Ptang Zoo Boing!';
    const message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({ from, text });
  });
});
