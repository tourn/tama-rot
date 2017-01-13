define(['render', 'tama', 'random'], function(render, Tama, random){

  var tama;

  //STATES
  function toTick(){
    console.log("+++TICK+++");
    const status = tama.tick();
    localStorage.tamaState = JSON.stringify(tama.state);
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
    render.animateContinuously(idleAnimationChoices(tama.state));
    render.renderState(tama.state);
    render.renderCommands({
      'feed': command(tama.actions.feed),
      'sleep': command(tama.actions.sleep),
      'play': command(tama.actions.play),
      'wait': command(tama.actions.wait)
    });
  }

  function idleAnimationChoices(state){
    var choices = [[10, "idle"]];
    choices = choices.concat(statAnimations(state, "satiety"));
    choices = choices.concat(statAnimations(state, "energy"));
    choices = choices.concat(statAnimations(state, "happy"));
    return choices;
  }

  const statLowThreshold = 20
  const statHighThreshold = 100 - statLowThreshold;

  function statAnimations(state, statName){
    return [
      [calculateWeight(state[statName] - 20), "stat_"+statName+"_low"],
      [calculateWeight(80 - state[statName]), "stat_"+statName+"_high"]
    ]
  }

  function calculateWeight(statValue){
    if(statValue >= 0) { return 0; }
    return Math.abs(statValue);
  }

  function renderDead(){
    render.animateContinuously("death");
    render.renderState(tama.state);
    render.renderCommands({
      'be sad': function(){},
      'revive': command(tama.actions.revive)
    });
  }

  function init(){
    var state = localStorage.tamaState;
    if(state){
      state = JSON.parse(state);
    }
    tama = new Tama(state);
    toIdle();
  }

  return {
    init: init
  };

});
