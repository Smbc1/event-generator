'use strict';

const EventGenerator = require('../index');

describe('basic functionality', () => {
  it('should remove listeners on destroy', async() => {
    const emitter = new EventGenerator();
    emitter.listen('hello').next();
    emitter.listenerCount('hello').should.be.eql(1);
    emitter.destroy();
    emitter.listenerCount('hello').should.be.eql(0);
  });
  it('should loop through events', async() => {
    const emitter = new EventGenerator();
    setTimeout(() => emitter.emit('event', 'Hello!', true), 5);
    for await (const event of emitter.listen('event')) {
      event.should.be.eql('Hello!');
    }
    emitter.destroy();
  });
  it('should stop listening by flag', async() => {
    let events = 0;
    const emitter = new EventGenerator();
    const interval = setInterval(() => emitter.emit('event', 'Hello!', events > 5), 1);
    for await (const event of emitter.listen('event')) {
      event.should.be.eql('Hello!');
      events++;
    }
    clearInterval(interval);
    emitter.destroy();
  });
});
