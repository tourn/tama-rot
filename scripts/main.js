requirejs.config({
  shim: {
    'rot': {
      exports: 'ROT'
    }
  }
});

requirejs(['state', 'render', 'animations/animations'], function(state, render, animations){
  state.init();
});
