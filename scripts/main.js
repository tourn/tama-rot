requirejs.config({
  paths: {
    'hammer': 'lib/hammer.min'
  },
  shim: {
    'rot': {
      exports: 'ROT'
    }
  }
});

requirejs(['state'], function(state, render, animations){
  state.init();
});
