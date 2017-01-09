define(['render'], function(render){

  //TODO: persist state
  var state = {
    satiety: 50
  };

  function toTick(){
    if(state.satiety > 100){
      toExplode(); return;
    }
    state.satiety -= 10;
    toIdle();
  }

  function wait(){
    tick();
    toIdle();
  }

  function feed(){
    state.satiety += 40;
    toAnimation('feed');
  }

  function toExplode(){
    render.clearAnimation();
    render.renderState(state);
    render.animate("spreng").then(function(){}).catch(function(){});
    render.clearCommands();
  }

  function toIdle(suppressTick){
    idleAnimation();
    render.renderState(state);
    render.renderCommands({
      'feed': feed,
      'wait': wait
    });
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

  function toAnimation(animationName){
    render.clearAnimation();
    render.clearCommands();
    render.animate(animationName).then(toTick).catch(function(){});
  }

  return {
    init: toIdle
  };

});
