export default function IndexController(container) {
  this._container = container;
  this._registerServiceWorker();
}

IndexController.prototype._registerServiceWorker = function() {
  if (!navigator.serviceWorker) return;

  navigator.serviceWorker.register('/sw.js').then(function() {
    console.log('Registration worked!');
  })catch(function() {
    console.log('Registration failed!');
  });
};
