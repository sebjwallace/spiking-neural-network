
function SNN(population){

  this.inputs = ['0','1','2','3','4','5','6','7','8','9',
  'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P',
  'Q','R','S','T','V','U','W','X','Y','Z']

  this.network = new Matrix(population || this.inputs.length)
  this.display = new Display()

  this.init()

}

SNN.prototype.init = function(){
  this.network.iterate(function(v,y,x){
    this.network.set(y,x,new Neuron(this.network,y,x))
  }.bind(this))
}

SNN.prototype.input = function(input){
  input = input.toUpperCase()
  for(var i = 0; i < this.inputs.length; i++){
    if(input == this.inputs[i]){
      this.network.get(0,i).potential = 1
      this.step()
    }
  }
}

SNN.prototype.neuroGenesis = function(){
  var y = random(1,this.inputs.length-1)
  var x = random(1,this.inputs.length-1)
  if(this.network.get(y,x).isAlive())
    this.network.get(y,x).potential = 1
}

SNN.prototype.step = function(){

  this.display.clear()
  var hyperpolarized = new Matrix()
  var depolarized = new Matrix()

  this.network.iterate(function(neuron,y,x){

    neuron.render(this.display)
    var p = neuron.potential

    if(p >= 1){
      neuron.propagate()
      depolarized.insert(y,x,true)
    }

    if(p < -10 && p > -100)
      hyperpolarized.insert(y,x,true)

    if(p < 0)
      neuron.recover()

    else if(p > 0)
      neuron.drain()

    if(probable(0.001))
      this.neuroGenesis()

  }.bind(this))

  var self = this
  hyperpolarized.safeIterate(function(v,y,x){
    depolarized.safeIterate(function(v,dy,dx){
      if(dy != 0)
        self.network.get(y,x).connectTo(random(4,7)/10,dy,dx)
    }.bind(this))
  }.bind(this))

}
