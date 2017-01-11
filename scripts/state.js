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
      'wait': command(tama.actions.wait)
    });
  }

  function renderDead(){
    //TODO: dead animation
    render.renderState(tama.state);
    render.renderCommands({
      'be sad': function(){}
    });
  }

  function toAnimation(animationName, nextState){
    console.log("+++ANIMATION "+animationName+"+++");
    render.clearAnimation();
    render.clearCommands();
    render.animate(animationName).then(nextState).catch(function(){});
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

  function idleAnimation(){
    const animationName = "idle" + getRandomInt(1,2);
    render.animate(animationName).then(idleAnimation).catch(function(){});
  }

  return {
    init: toIdle
  };

});
