Array.prototype.flatMap = function(lambda) { 
      return Array.prototype.concat.apply([], this.map(lambda)); 
};

//TODO: properly import and scope animation definitions

var display = new ROT.Display({width:20, height:5});
document.body.appendChild(display.getContainer());

animate(spreng);

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

function drawFrames(frames, i){
  i = i || 0;
  if(i >= frames.length) { i = 0; };
  const frame = frames[i];
  drawImage(frame.image);
  setTimeout(function(){ drawFrames(frames, i+1); }, frame.duration);
}

function animate(definition){
  drawFrames(definition.flatMap(flattenAnimation));
}
