define(['render', 'tama'], function(render, tama){

  //STATES
  function toTick(){
    console.log("+++TICK+++");
    const status = tama.tick();
    if(status.animation){
      toAnimation(status.animation, toIdle);
    } else {
      toIdle();
    }
  }

  function toIdle(suppressTick){
    console.log("+++IDLE+++");
    if(tama.state.dead){
      renderDead();
    } else {
      renderIdle();
    }
  }

  function renderIdle(){
    idleAnimation();
    render.renderState(tama.state);
    render.renderCommands({
      'feed': command(tama.actions.feed),
      'sleep': command(tama.actions.sleep),
      'play': command(tama.actions.play),
      'wait': command(tama.actions.wait)
    });
  }

  function renderDead(){
    deadAnimation();
    render.renderState(tama.state);
    render.renderCommands({
      'be sad': function(){},
      'revive': command(tama.actions.revive)
    });
  }

  function toAnimation(animationName, nextState){
    console.log("+++ANIMATION "+animationName+"+++");
    render.clearAnimation();
    render.clearCommands();
    render.animate(animationName).then(nextState);
  }

  //UTIL
  function command(cmd){
    return function(){
      const status = cmd();
      if(status.animation){
        toAnimation(status.animation, toTick);
      } else {
        toTick();
      }
    }
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max) + 1;
    return Math.floor(Math.random() * (max - min)) + min;
  }

  //TODO: make random animations by defining an array in animations.js
  function deadAnimation(){
    const animationName = "death" + getRandomInt(1,2);
    render.animate(animationName).then(function(again){
      if(again){ deadAnimation(); }
    });
  }

  function idleAnimation(){
    const animationName = "idle" + getRandomInt(1,3);
    render.animate(animationName).then(function(again){
      if(again){ idleAnimation(); }
    });
  }

  return {
    init: toIdle
  };

});
