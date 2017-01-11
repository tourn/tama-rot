define(function(){
  //TODO: persist state
  var state = {
    name: 'Hans',
    satiety: 50,
    dead: false
  };

  function tick(){
    if(state.satiety >= 100){
      state.dead = true;
      return {
        animation: 'spreng'
      }
    }

    reduceStats();
    return {}
  }

  function reduceStats(){
    state.satiety -= 10;
  }

  function wait(){
    return {
    }
  }

  function feed(){
    state.satiety += 80;
    return {
      animation: 'feed'
    }
  }

  return {
    state: state,
    tick: tick,
    actions: {
      wait: wait,
      feed: feed
    }
  }
});
