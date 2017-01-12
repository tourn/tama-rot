define(function(){
  //choices looks like [[10, a], [1, b]]
  function weighted(choices){
    var samples = [];
    for(var i = 0; i<choices.length; i++){
      for(var j = 0; j < choices[i][0]; j++){
        samples.push(choices[i][1]);
      }
    }
    return samples[intBetween(0, samples.length)];
  }

  function intBetween(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }


  return {
    weighted: weighted,
    int: intBetween
  }

});
