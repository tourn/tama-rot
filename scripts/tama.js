define(function(){
  //TODO: persist state
  var state = {
    name: 'Hans',
    satiety: 50,
    energy: 50,
    happy: 50,
    dead: false
  };

  function tick(){
    if(state.satiety >= 100){
      state.dead = true;
      state.satiety = 40;
      return {
        animation: 'spreng'
      }
    }

    reduceStats();
    return {}
  }

  function reduceStats(){
    state.satiety -= 10;
    state.energy -= 10;
    state.happy -= 10;
  }

  function wait(){
    return { }
  }

  function feed(){
    state.satiety += 80;
    return {
      animation: 'feed'
    }
  }

  function sleep(){
    state.energy = 100;
    return {
      animation: 'sleep'
    }
  }

  function play(){
    state.happy += 40;
    return {
      animation: 'play'
    }
  }

  function revive(){
    state.dead = false;
    return {
      animation: 'defi'
    }
  }

  return {
    state: state,
    tick: tick,
    actions: {
      wait: wait,
      feed: feed,
      sleep: sleep,
      play: play,
      revive: revive
    }
  }
});
