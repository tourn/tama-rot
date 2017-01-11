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
    console.log(name);
    list.innerHTML += "<option>"+name+"</option>";
  });

  list.onchange = function(){
    animate(this.value);
  };

  function animate(name){
    render.clearAnimation();
    render.animate(name).then(function(again){ if(again) {animate(name)} });
  }
});
