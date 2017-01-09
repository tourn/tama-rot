define(['render', 'animations/animations'], function(render, animations){

  //TODO: persist state
  var state = {
    satiety: 50
  };

  function tick(){
    state.satiety -= 10;
  }

  function wait(){
    tick();
    toIdle();
  }

  function feed(){
    state.satiety = 80;
    toAnimation('feed');
  }

  function toIdle(){
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
    console.log(animationName);
    render.animate(animations[animationName]).then(idleAnimation).catch(function(){});
  }

  function toAnimation(animationName){
    render.clearAnimation();
    render.clearCommands();
    render.animate(animations[animationName]).then(toIdle).catch(function(){});
  }

  return {
    init: toIdle
  };

});
