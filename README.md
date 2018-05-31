# Event emitter for generators

## Installation
```npm i event-generator --production```

Or

`npm i event-generator && npm test`

## Usage
This tiny library provides easy `for await ... of` approach to events and iteration 
through them asynchronously. Let's take a look:
```
    const EventGenerator = require('event-generator');
    const emitter = new EventGenerator();
    
    setTimeout(() => emitter.emit('event', 'Hello!', true), 5);
    for await (const event of emitter.listen('event')) {
      console.log(event);
    }
    emitter.destroy();

```
It allows to make your code more synchronous-like, even if most of it based on events.

## Attention!
Yes, because of `return` nature, you can pass only **one** argument ti `.emit` and second 
is **stop_flag**, if you pass it `true`, then asynchronous loop wil stop.

## Methods
* `.listen(<event>)` - returns async generator iterable for emitted events
* `.emit(<event>, <data>, [<stop_flag>])` - emits `<data>` to `<event>` to listeners, can stop the iteration/listening
* `.destroy()` - removes all listeners
