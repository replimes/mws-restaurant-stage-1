
navigator.serviceWorker.register('/sw.js').then(function(reg){
  console.log('ya!');
}).catch(function(err) {
  console.log('Boo!');
})



self.addEventListener('fetch', function(event) {
  console.log(event.request);
})
