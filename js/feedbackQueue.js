var mustache = require('mustache');
var extend = require('extend');

var FeedbackQueue = function() {};
var container;
var body = document.querySelector('body');
var containerTemplate = '<div class="feedback-queue js-feedback-queue"><div class="feedback-queue-position js-feedback-queue-position"></div></div>';
var singleTemplate = '<div class="feedback-queue-single js-feedback-queue-single is-{{type}}"><span class="feedback-queue-single-cross">&times;</span>{{message}}</div>';

/**
 * create and or return dom node
 */
function getContainer() {

  if (container) {
    return container;
  }

  body.insertAdjacentHTML('afterbegin', mustache.render(containerTemplate));
  container = document.querySelector('.js-feedback-queue');
  return container;
}

FeedbackQueue.prototype.createMessage = function(options) {
  this.create(options);
};

FeedbackQueue.prototype.create = function(options) {
  var optionsTemplate = {
    message: '', // anything goes string
    type: '', // success, fail, neutral or anything?
    life: 5000 // how long will it last?
  };
  extend(optionsTemplate, options);
  options = optionsTemplate;

  // default type
  if (!options.hasOwnProperty('type')) {
    options.type = 'neutral';
  };

  // message property present but just empty
  if (!options.message) {
    return;
  };

  // render
  var theContainer = getContainer();
  theContainer.insertAdjacentHTML('afterbegin', mustache.render(singleTemplate, options));

  var singleMessage = theContainer.querySelector('.js-feedback-queue-single');

  // timeout for removal
  setTimeout(function() {
    singleMessage.parentNode.removeChild(singleMessage)
  }, options.life);

  // click message to remove
  singleMessage.addEventListener('click', function() {
    this.parentNode.removeChild(this)
  });
};

module.exports = FeedbackQueue;
