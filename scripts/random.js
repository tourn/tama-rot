define(function(){
  //choices looks like [[10, a], [1, b]]
  function weighted(choices){
    //TODO implement properly
    return choices[0][1];
  }

  function intBetween(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max) + 1;
    return Math.floor(Math.random() * (max - min)) + min;
  }


  return {
    weighted: weighted,
    int: intBetween
  }

});
