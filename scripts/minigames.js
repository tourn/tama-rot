define(['render', 'rot'], function(render, ROT){
  function defi(){
    var progress = 0;
    const frames = render.getFrames("todo");

    function run(){
      render.renderFrame(frames[0]);


      return new Promise(function(resolve){
        document.body.addEventListener("keydown", handleKeys);
        document.body.addEventListener("touchstart", handleTouchstart);
        document.body.addEventListener("touchmove", handleTouchmove);

        function handleKeys(e){
          if(e.keyCode == ROT.VK_UP){
            trigger({dir: 'up'});
          }
          if(e.keyCode == ROT.VK_DOWN){
            trigger({dir: 'down'});
          }
        }

        var init;

        function handleTouchstart(e){
          console.log("TOUCH START");
          init = e.changedTouches[0].screenY;
        }

        function handleTouchmove(e){
          const current = e.changedTouches[0].screenY;
          const difference = init - current
          console.log("DIFFERENCE: " + difference);
          if(difference >= 100){
            init = current;
            trigger({dir: 'up'});
          } else if (difference <= -100){
            init = current;
            trigger({dir: 'down'});
          }
        }

        function trigger(opts){
          if(opts.dir === 'up'){
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
            //FIXME: stop tracking swiping if done
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

