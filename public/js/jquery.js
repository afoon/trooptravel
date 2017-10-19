$(document).ready(function(){
    $('.dropdown-toggle').dropdown()
    var backgroundImage = $('body');
    
    var backgrounds = new Array(
        'url(https://source.unsplash.com/collection/959652/1600x900)'
      , 'url(https://source.unsplash.com/collection/959614/1600x900)'
      , 'url(https://source.unsplash.com/collection/158748/1600x900)'
      , 'url(https://source.unsplash.com/collection/896677/1600x900)'
      , 'url(https://source.unsplash.com/collection/142324/1600x900)'
      , 'url(https://source.unsplash.com/collection/630188/1600x900)'
    );


    var current = 0;
    
    function nextBackground() {
        current++;
        current = current % backgrounds.length;
        backgroundImage.css('background-image', backgrounds[current]);
    }
    setInterval(nextBackground, 5000);
    
    backgroundImage.css('background-image', backgrounds[0]);



    $('.popover-dismiss').popover({
        trigger: 'focus'
      })
      $(function () {
        $('[data-toggle="popover"]').popover()
      }) 


//     console.log(document.getElementById('bg1'))

//     document.getElementById('bg1').style.backgroundImage = backgrounds[0];
//     document.getElementById('bg2').style.backgroundImage = backgrounds[1];
//     document.getElementById('bg3').style.backgroundImage = backgrounds[2];
//     document.getElementById('bg4').style.backgroundImage = backgrounds[3];
    
// setInterval(
//     function() {
//         setTimeout( function(){
//             document.getElementById('bg1').style.opacity = "0";
//         }, 3000);
//         setTimeout( function(){
//             document.getElementById('bg2').style.opacity = "0";
//         }, 6000);
//         setTimeout( function(){
//             document.getElementById('bg3').style.opacity = "0";
//         }, 9000);
//         setTimeout( function(){
//             document.getElementById('bg1').style.opacity = "1";
//             document.getElementById('bg2').style.opacity = "1";
//             document.getElementById('bg3').style.opacity = "1";
//         }, 12000);
//     }, 15000);


    });