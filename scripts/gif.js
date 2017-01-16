requirejs.config({
  shim: {
    'rot': {
      exports: 'ROT'
    }
  }
});

requirejs(['render', 'animations/animations'], function(render, animations){
  const list = document.getElementById('animations');
  list.innerHTML += "<option></option>";
  Object.keys(animations).forEach(function(name){
    //if this is a weighted random array TODO: is this still relevant with multis?
    if(animations[name][0] instanceof Array) { return; }
    list.innerHTML += "<option>"+name+"</option>";
  });

  list.onchange = function(){
    render.clearAnimation();
    recordGIF(this.value);
  };

  function recordGIF(animationName){
    const dim = render.getDimensions(animations[animationName]);
    console.log(dim);
    render.createDisplay({width: dim.x, height: dim.y, fontSize: 15});

    const context = document.getElementsByTagName('canvas')[0].getContext("2d");
    const sampleRateMS = 20;
    encoder = new GIFEncoder();
    encoder.setRepeat(0);
    encoder.setFrameRate(sampleRateMS);
    encoder.start();
    render.animate(animationName).then(finishGIF);

    function captureFrame(){
      captureTimeout = setTimeout(function(){
        encoder.addFrame(context);
        captureFrame();
      },sampleRateMS);
    }
    captureFrame();
  }

  function finishGIF(){
    clearTimeout(captureTimeout);
    encoder.finish();
    var binary_gif = encoder.stream().getData() //notice this is different from the as3gif package!
    var data_url = 'data:image/gif;base64,'+encode64(binary_gif);
    document.body.innerHTML += "<img src='" + data_url + "'/>";
  }

});
