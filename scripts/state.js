define(['render', 'tama', 'random'], function(render, tama, random){

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

  function renderIdle(){
    render.animateContinuously("idle");
    render.renderState(tama.state);
    render.renderCommands({
      'feed': command(tama.actions.feed),
      'sleep': command(tama.actions.sleep),
      'play': command(tama.actions.play),
      'wait': command(tama.actions.wait)
    });
  }

  function renderDead(){
    render.animateContinuously("death");
    render.renderState(tama.state);
    render.renderCommands({
      'be sad': function(){},
      'revive': command(tama.actions.revive)
    });
  }


  return {
    init: toIdle
  };

});
