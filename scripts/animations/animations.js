const animations = [
  'beat',
  'cuddle',
  'death1',
  'death2',
  'death3',
  'deathwall',
  'defi',
  'eat',
  'feed',
  'happy1',
  'idle1',
  'idle2',
  'idle3',
  'idle4', //TODO: rename
  'love',
  'music1',
	'music2',
  'overeatenexplode',
  'play',
  'sad1',
  'sad2',
  'sad3',
  'sleep',
  'spreng',
  'suicide',
  'todo',
  'train',
  'training',
];
define(animations.map(function(path){ return './' + path;}), function(){
  var exports = {};
  for(var i=0; i < animations.length; i++){
    const name = animations[i];
    exports[name] = arguments[i];
  }
  const TODO = exports['todo'];

  function multi(choices){
    return ['wrandom'].concat(choices.map(function(choice){
      const def = exports[choice[1]];
      if(!def){
        console.log("Animation not found: " + choice[1]);
        def = TODO;
      }
      return [choice[0], def];
    }));
  }

  return Object.assign(exports, {
    death: multi([[10, "death1"], [10, "death2"], [1, "death3"]]),
    idle: multi([[10, "idle1"], [10, "idle2"], [2, "idle3"]]),
		music: multi([[10, "music1"], [5, "music2"]]),
    TODO: TODO,
    stat_satiety_low: TODO,
    stat_satiety_high: multi([[10, "idle4"]]),
    stat_energy_low: TODO,
    stat_energy_high: TODO,
    stat_happy_low: multi([[10, "sad1"], [5, "sad2"], [1, "sad3"]]),
    stat_happy_high: multi([[10, "happy1"]]),
  });

});

