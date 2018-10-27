var linearColors = ["#FF530D","#E82C0C","#FF0000","#E80C7A","#FF0DFF","#A40DFF","#0DFFF7","#0DFF10","#FFC700"];

$('.CommonAttribute').hide().slice( 0, 2 ).show();

var newArray = [];

var startTime;
var endTime; 


$(".DropdownClass").change(function () {

    if ($(this).attr('name') == 'Count') {
        var number = $(this).val();
        newArray = shuffle(linearColors);

        $('.CommonAttribute').hide().slice( 0, number ).show();
        $('.CommonAttribute').each(function(index){
            $(this).css("fill", "black");
        });
    }
});

$(".linearButton").click(function(){
    newArray = shuffle(linearColors);


    $('.CommonAttribute').each(function(index){
        $(this).css("fill", newArray[index]);
    });

        startTime = new Date().getTime();

});

$(".CommonAttribute").click(function(){
    endTime = new Date().getTime();
    console.log(endTime - startTime + " ms");

    $('#timeLinear').text( "Time taken: " + (endTime - startTime) + " ms");

})


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }