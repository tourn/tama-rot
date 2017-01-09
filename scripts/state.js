define(['render', 'animations/animations'], function(render, animations){

  //TODO: persist state
  var state = {
    satiety: 50
  };

  function tick(){
    state.satiety -= 10;
  }

  function feed(){
    state.satiety = 80;
    toAnimation('feed');
  }

  function toIdle(){
    //TODO: draw idle animation
    render.renderState(state);
    render.renderCommands({
      'feed': feed
    });
  }

  function toAnimation(animationName){
    //TODO: take controls away
    render.animate(animations[animationName]).then(toIdle);
  }

  return {
    init: toIdle
  };

});
