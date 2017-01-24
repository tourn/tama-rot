define(['render', 'rot'], function(render, ROT){
  function defi(){
    var progress = 0;
    const frames = render.getFrames("todo");

    function run(){
      render.clearAnimation(); //TODO: move up
      render.renderFrame(frames[0]);
      return new Promise(function(resolve){
        document.body.addEventListener("keydown", handleKeys);
        document.body.addEventListener("keydown", handleKeys);

        function handleKeys(e){
          if(e.keyCode == ROT.VK_LEFT){
            trigger({dir: 'left'});
          }
          if(e.keyCode == ROT.VK_RIGHT){
            trigger({dir: 'right'});
          }
        }

        function handleTouch(e){
        }

        function trigger(opts){
          if(opts.dir === 'left'){
            if(progress % 2 == 1){
                progress += 1
                render.renderFrame(frames[0]);
            }
          } else {
            if(progress % 2 == 0){
                progress += 1
                render.renderFrame(frames[1]);
            }
          }
          if(progress >= 10){
            end();
          }
        }

        function end(){
          document.body.removeEventListener("keydown", handleKeys);
          resolve(true);
        }
      });
    }

    return {
      run: run
    }
  }

  return {
    defi: defi()
  }
});

