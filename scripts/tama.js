define(function(){
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

    //TODO: this scales badly. Could probably tear it apart with something interceptor-like
    this.tick = function(){
      if(self.state.satiety >= 200){
        self.state.dead = true;
        self.state.satiety = 40;
        return { animation: 'spreng' };
      }

      reduceStats();
      return {};
    }

    function reduceStats(){
      self.state.satiety -= 10;
      self.state.energy -= 10;
      self.state.happy -= 10;
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
        return { animation: 'defi' };
      },
    }
  }

  return Tama;
});
