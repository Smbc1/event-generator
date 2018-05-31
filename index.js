'use strict';

const EventEmitter = require('events');

/**
 * Async generator for event emitters, to emit final event just call .emit(<event>, <data>, true)
 */
class EventGenerator extends EventEmitter {
  /**
   * Returns async generator
   * @param {string} event
   * @return {Promise.<void>}
   */
  async* listen(event) {
    let result;
    while(true) {
      result = await this.nextEvent(event);
      if (result[1] === true) break;
      yield result[0];
    }
    this.removeAllListeners(event);
    yield result[0];
  }
  /**
   * Wait for next event
   * @param {string} event
   * @return {Promise}
   * @private
   */
  async nextEvent(event) {
    return new Promise(resolve => this.once(event, (data, stop) => resolve([data, stop])));
  }

  /**
   * Destroy emitter
   */
  destroy() {
    this.removeAllListeners();
  }
}

module.exports = EventGenerator;
