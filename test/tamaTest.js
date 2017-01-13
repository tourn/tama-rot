define(['../test/Squire', '../test/chai'], function(Squire, chai){
  chai.should();
  const injector = new Squire();

  const chanceAlways = {
    chance: function(chance) {
      return chance > 0;
    }
  }

  //FIXME: this is done with a promise so the requirejs outside doesnt start running tests before
  //injector.require is finished.
  var promise = new Promise(function(resolve){
    injector.mock('random', chanceAlways);
    injector.require(['tama'], function(Tama){
      describe('Tama', function(){
        var tama;

        beforeEach(function(){
          console.log("??");
          tama = new Tama({
            satiety: 50,
            energy: 50,
            happy: 50,
            dead: false
          });
        });

        describe('stats', function(){
          it('drop on tick', function(){
            tama.tick();
            tama.state.satiety.should.equal(40);
            tama.state.energy.should.equal(40);
            tama.state.happy.should.equal(40);
          });

          it('raise satiety when fed', function(){
            tama.actions.feed();
            tama.state.satiety.should.equal(90);
            tama.state.energy.should.equal(50);
          });

          it('raise energy when sleeping', function(){
            tama.actions.sleep();
            tama.state.energy.should.equal(100);
          });

          it('raise happiness when playing', function(){
            tama.actions.play();
            tama.state.happy.should.equal(90);
            tama.state.energy.should.equal(50);
          });
        });

        describe('triggers', function(){
          it('suicides when sad', function(){
            tama.state.happy = 0;
            const result = tama.tick();
            tama.state.dead.should.equal(true);
            result.animation.should.equal("suicide");
          });

          it('explodes when overeaten', function(){
            tama.state.satiety = 150;
            const result = tama.tick();
            tama.state.dead.should.equal(true);
            result.animation.should.equal("spreng");
          });

          it('falls asleep when tired', function(){
            tama.state.energy = -10;
            const result = tama.tick();
            tama.state.energy.should.equal(20);
          });
        });
      });

      resolve();
    });
  });

  return promise;

});
