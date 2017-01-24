define(function(){
  const syllables = ["is", "this", "the", "real", "life"];


  function singSyllable(syllable){
    const duration = syllable.length * 100;
    return [{ duration: duration, text: syllable, image: [
      "(\\_/) %s",
      "(-o-)/",
      "(> <)"
    ]},
    { duration: duration, text: syllable, image: [
      "(\\_/) %s",
      "(-.-)/",
      "(> <)"
    ]}]
  }

  return {
    syllables: function(syllables){
      return syllables.flatMap(function(syllable){
        return singSyllable(syllable);
      });
    }
  }
});
