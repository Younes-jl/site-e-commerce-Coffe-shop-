
document.addEventListener("DOMContentLoaded", function() {
  document.querySelector('a[href="#a"]').addEventListener("click", function(event) {
    event.preventDefault();
    document.querySelector('#a').scrollIntoView({ behavior: 'smooth' });
  });


document.querySelector('a[href="#p"]').addEventListener("click", function(event) {
    event.preventDefault();
    document.querySelector('#p').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('a[href="#g"]').addEventListener("click", function(event) {
    event.preventDefault();
    document.querySelector('#g').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('a[href="#c"]').addEventListener("click", function(event) {
    event.preventDefault();
    document.querySelector('#c').scrollIntoView({ behavior: 'smooth' });
});


});


  /*------------------------------gallery---------------------------------*/

     