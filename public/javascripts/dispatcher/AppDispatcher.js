var Flux = require('flux');

export default {
  AuthDispatcher     : new Flux.Dispatcher(),
  QuestionDispatcher : new Flux.Dispatcher(),
  MessageDispatcher  : new Flux.Dispatcher()
};