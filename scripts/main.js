requirejs.config({
  shim: {
    'rot': {
      exports: 'ROT'
    }
  }
});

requirejs(['state'], function(state, render, animations){
  state.init();
});
