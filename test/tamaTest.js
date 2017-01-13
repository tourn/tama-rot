define(['../test/Squire', '../test/chai'], function(Squire, chai){
  chai.should();
  const injector = new Squire();

  //FIXME: this is done with a promise so the requirejs outside doesnt start running tests before
  //injector.require is finished.
  var promise = new Promise(function(resolve){
    injector.require(['tama'], function(Tama){
      injector.mock('random', { chance: function(){ return true; } });

      describe('Tama', function(){
        var tama;

        beforeEach(function(){
          tama = new Tama();
        });

        it('raises satiety when fed', function(){
          tama.actions.feed();
          tama.state.satiety.should.equal(90);
        });

        it('raises energy when sleeping', function(){
          tama.actions.sleep();
          tama.state.energy.should.equal(100);
        });
      });

      resolve();
    });
  });

  return promise;

});
