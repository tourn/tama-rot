Array.prototype.flatMap = function(lambda) { 
      return Array.prototype.concat.apply([], this.map(lambda)); 
};

define(['rot','animations/animations', 'random'], function(ROT, animations, random){
  const id_controls = 'control';
  const id_info = 'info';
  const displayWidth = 20;
  var timeout;
  var animationReject;
  var display;

  if(document.URL.indexOf('github') !== -1){
    document.getElementById("status").style.display = 'none';
  }

  createDisplay();

  function createDisplay(o){
    var opts = {width: displayWidth, height:5, fontSize: determineFontSize(),
      fg: 'black', bg: 'white'
    };
    Object.assign(opts, o);
    console.log(opts);
    display = new ROT.Display(opts);
    const node = document.getElementById("display");
    while(node.firstChild){
      node.removeChild(node.firstChild);
    }
    node.appendChild(display.getContainer());
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

  //TODO: maybe move this to animations.js and do it on load
  function getDimensions(definition){
    var x = 0;
    var y = 0;
    definition.flatMap(flattenAnimation).forEach(function(frame){
      y = Math.max(y, frame.image.length);
      frame.image.forEach(function(line){
        x = Math.max(x, line.length);
      });
    });

    return {x: x, y: y};
  }

  function drawImage(image){
    display.clear();
    for(var i = 0; i < image.length; i++){
      for(var j = 0; j < image[i].length; j++){
        display.draw(j,i,image[i][j]);
      }
    }
  }

  function drawText(image, text){
    for(var i = 0; i < image.length; i++){
      const index = image[i].indexOf('%s');
      if(index !== -1){
        display.drawText(index,i,text);
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
    if(frame.text){
      drawText(frame.image, frame.text);
    }
    timeout = setTimeout(function(){ drawFrames(frames, i+1, resolve); }, frame.duration);
  }

  function animate(definition){
    if(!definition) { 
      console.log("No animation: " + animationName); //FIXME: animationName isnt defined?
      definition = resolveAnimation("todo");
    }
    if(timeout){ clearTimeout(timeout); }
    return new Promise(function(resolve, reject){
      animationReject = resolve; //FIXME naming
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

  function getFrames(animationName){
    const definition = resolveAnimation(animationName);
    return definition.flatMap(flattenAnimation);
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

  function renderInfo(info){
    const target = document.getElementById(id_info);
    target.innerHTML += "<p>" + info + "</p>";
  }

  function renderCommands(commands){
    const target = document.getElementById(id_controls);
    target.innerHTML = "";
    Object.keys(commands).forEach(function(key){
      const div = document.createElement("div");
      div.className = "pure-u-1 pure-u-sm-1-2 pure-u-md-1-4 pure-u-lg-1-8"
      const button = document.createElement("button");
      button.innerHTML = key;
      button.className = "pure-button"
      button.onclick = commands[key];
      div.appendChild(button)
      target.appendChild(div);
    });

  }

  return {
    clearAnimation: clearAnimation,
    renderState: renderState,
    renderCommands: renderCommands,
    renderInfo: renderInfo,
    getDimensions: getDimensions,
    createDisplay: createDisplay,
    clearCommands: function(){ document.getElementById(id_controls).innerHTML = ""; },
    clearInfo: function(){ document.getElementById(id_info).innerHTML = ""; },
    animate: function(name) { return animate(resolveAnimation(name)); },
    animateContinuously: animateContinuously,
    getFrames: getFrames,
    renderFrame: function(frame){ drawImage(frame.image); }
  };
});

