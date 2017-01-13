Array.prototype.flatMap = function(lambda) { 
      return Array.prototype.concat.apply([], this.map(lambda)); 
};

define(['rot','animations/animations', 'random'], function(ROT, animations, random){
  const id_controls = 'control';
  const displayWidth = 20;
  var timeout;
  var animationReject;
  var display = new ROT.Display({width: displayWidth, height:5, fontSize: 15});
  document.getElementById("display").appendChild(display.getContainer());

  if(document.URL.indexOf('github') !== -1){
    document.getElementById("status").style.display = 'none';
  }

  function determineFontSize(){
    var width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
    var size = Math.min(800/displayWidth, width/displayWidth);
    console.log(size);
    console.log(width);

    return size;
  }


  //TODO: maybe move this to animations.js and do it on load
  function flattenAnimation(frame){
    if(!frame.loop){
      return frame;
    } else {
      var frames = [];
      for(var l = 0; l < frame.loop; l++){
        for(var i = 0; i < frame.frames.length; i++){
          frames.push(frame.frames[i]);
        }
      }
      return frames;
    }
  }

  function drawImage(image){
    display.clear();
    for(var i = 0; i < image.length; i++){
      for(var j = 0; j < image[i].length; j++){
        display.draw(j,i,image[i][j]);
      }
    }
  }

  function drawFrames(frames, i, resolve){
    i = i || 0;
    if(i >= frames.length) {
      resolve(true);
      return;
    };
    const frame = frames[i];
    drawImage(frame.image);
    timeout = setTimeout(function(){ drawFrames(frames, i+1, resolve); }, frame.duration);
  }

  function animate(definition){
    if(!definition) { 
      console.log("No animation: " + animationName);
      definition = resolveAnimation("todo");
    }
    if(timeout){ clearTimeout(timeout); }
    return new Promise(function(resolve, reject){
      animationReject = resolve;
      drawFrames(definition.flatMap(flattenAnimation), 0, resolve);
    });
  }

  function animateContinuously(animationName){
    const definition = resolveAnimation(animationName);
    animate(definition).then(function(again){
      if(again){ animateContinuously(animationName); }
    });
  }

  // call it like this from outside: animate([10, "death", 5, "doom"]) OR animate("death")
  function resolveAnimation(animation){
    try{
      if(animation instanceof Array){
        animation = random.weighted(animation);
      }
      animation = pickAnimation(animation);
    } catch (e){
      console.log("No animation: " + animation);
      animation = pickAnimation("todo");
    }
    return animation;
  }

  function pickAnimation(animationName){
    const def = animations[animationName];
    if(isMulti(def)){
      return random.weighted(def.slice(1));
    } else {
      return def
    }
  }

  function isMulti(animatonDefinition){
    return animatonDefinition[0] == "wrandom";
  }

  function clearAnimation(){
    if(timeout){ clearTimeout(timeout); }
    if(animationReject){ animationReject(false); }
  }

  function renderState(state){
    const target = document.getElementById('status');
    target.innerHTML = "";
    Object.keys(state).forEach(function(key){
      target.innerHTML += "<p>" + key + ": " + state[key] + "</p>";
    });
  }

  function renderCommands(commands){
    const target = document.getElementById(id_controls);
    target.innerHTML = "";
    Object.keys(commands).forEach(function(key){
      const button = document.createElement("button");
      button.innerHTML = key;
      button.onclick = commands[key];
      target.appendChild(button);
    });

  }

  return {
    clearAnimation: clearAnimation,
    renderState: renderState,
    renderCommands: renderCommands,
    clearCommands: function(){ document.getElementById(id_controls).innerHTML = ""; },
    animate: function(name) { return animate(resolveAnimation(name)); },
    animateContinuously: animateContinuously,
  };
});

