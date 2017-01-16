define(['random'], function(random){
  function overeatenExplode(state, end){
    if(state.satiety >= 100 && random.chance(state.satiety - 100)){
      state.dead = true;
      state.satiety = 40;
      end({ animation: 'overeatenexplode' });
    }
  }

  function hungerDeath(state, end){
    if(state.satiety <= 0){
      state.dead = true;
      end({ animation: 'starved' });
    }
  }

  function sadSuicide(state, end){
    if(state.happy < 20 && random.chance(20-state.happy)){
      state.dead = true;
      end({ animation: 'suicide' });
    }
  }

  function tiredSleep(state, end){
    if(state.energy <= 0){
      state.energy=20;
      state.happy -= 40;
      state.satiety -= 20;
      end({ animation: 'sleep'});
    } else if(state.energy < 20){
      state.happy -= 10;
    }
  }

  return [
    overeatenExplode,
    hungerDeath,
    sadSuicide,
    tiredSleep
  ];

});
