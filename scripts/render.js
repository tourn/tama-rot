Array.prototype.flatMap = function(lambda) { 
      return Array.prototype.concat.apply([], this.map(lambda)); 
};

define(['rot','animations/animations'], function(ROT, animations){
  var encoder;
  var captureTimeout;
  var timeout;
  var display = new ROT.Display({width:20, height:5});
  document.body.appendChild(display.getContainer());

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
    if(i >= frames.length) { finishGIF(); return; };
    const frame = frames[i];
    drawImage(frame.image);
    timeout = setTimeout(function(){ drawFrames(frames, i+1); }, frame.duration);
  }

  function animate(definition){
    if(timeout){ clearTimeout(timeout); }
    drawFrames(definition.flatMap(flattenAnimation));
  }

  function finishGIF(){
    clearTimeout(captureTimeout);
    encoder.compile(false, function(output){
      var data_url = (window.webkitURL || window.URL).createObjectURL(output);
      document.body.innerHTML += "<video src='" + data_url + "' autoplay loop/>";
    });
  }

  function recordGIF(definition){
    const context = document.getElementsByTagName('canvas')[0].getContext("2d");
    const sampleRateMS = 10;
    encoder = new Whammy.Video(1000/sampleRateMS);
    if(timeout){ clearTimeout(timeout); }
    drawFrames(definition.flatMap(flattenAnimation));

    function captureFrame(){
      captureTimeout = setTimeout(function(){
        encoder.add(context);
        captureFrame();
      },sampleRateMS);
    }
    captureFrame();
  }




  return {
    animate: animate,
    recordGIF: recordGIF
  };
});

