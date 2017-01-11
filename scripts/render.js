Array.prototype.flatMap = function(lambda) { 
      return Array.prototype.concat.apply([], this.map(lambda)); 
};

define(['rot','animations/animations'], function(ROT, animations){
  const id_controls = 'control';
  var timeout;
  var animationReject;
  var display = new ROT.Display({width:20, height:5});
  document.getElementById("display").appendChild(display.getContainer());

  if(document.URL.indexOf('github') !== -1){
    document.getElementById("status").style.display = 'none';
  }

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

  function animate(animationName){
    const definition = animations[animationName];
    if(!definition) { throw "No animation: " + animationName; }
    if(timeout){ clearTimeout(timeout); }
    return new Promise(function(resolve, reject){
      animationReject = resolve;
      drawFrames(definition.flatMap(flattenAnimation), 0, resolve);
    });
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
    animate: animate,
    clearAnimation: clearAnimation,
    renderState: renderState,
    renderCommands: renderCommands,
    clearCommands: function(){ document.getElementById(id_controls).innerHTML = ""; }
  };
});

