import pino from 'pino';
const logger = pino({
  browser: {
    asObject: true,
    transmit: {
      send() {
        // noop for browser console in this scaffolding
      }
    }
  }
});
export default logger;
