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
    window.sessionStorage.animation = this.value;
    animate(this.value);
  };

  function animate(name){
    render.clearAnimation();
    render.animate(name).then(function(again){ if(again) {animate(name)} });
  }

  if(window.sessionStorage.animation){
    animate(window.sessionStorage.animation);
  }
});
