
navigator.serviceWorker.register('/sw.js').then(function(reg){
  console.log('ya!');
}).catch(function(err) {
  console.log('Boo!');
})
