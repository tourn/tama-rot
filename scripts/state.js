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

  function idleAnimation(){
    const animation = animations.sleep; //TODO: choose randomly
    render.animate(animation).then(idleAnimation).catch(function(){});
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
