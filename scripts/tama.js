define(['triggers'], function(triggers){
  const tickStatLoss = 10;
  const defaultState = {
    name: 'Hans',
    satiety: 50,
    energy: 50,
    happy: 50,
    dead: false
  };

  function Tama(state){
    this.state = state || defaultState;
    const self = this;

    this.tick = function(){
      var result = {};
      var ended = false;
      for(var i = 0; i < triggers.length; i++){
        triggers[i](self.state, function(res) { result = res; ended = true; });
        if(ended){ return result };
      }

      reduceStats();
      return result;
    }

    function reduceStats(){
      self.state.satiety -= tickStatLoss;
      self.state.energy -= tickStatLoss;
      self.state.happy -= tickStatLoss;
    }

    this.actions = {
      wait: function(){
        return { };
      },
      feed: function(){
        self.state.satiety += 40;
        return { animation: 'feed' };
      },
      sleep: function(){
        self.state.energy = 100;
        return { animation: 'sleep' };
      },
      play: function(){
        self.state.happy += 40;
        return { animation: 'play' };
      },
      revive: function(){
        self.state.dead = false;
        self.state.satiety = 30;
        self.state.energy = 30;
        self.state.happy = 30;
        return { animation: 'defi' };
      },
    }
  }

  return Tama;
});
