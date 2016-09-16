
function Neuron(network,y,x){

  this.potential = 0
  this.pre = new Matrix()
  this.post = new Matrix()

  this.network = network
  this.x = x
  this.y = y

}

Neuron.prototype.connectTo = function(weight,y,x){
  if(this.post.isEmpty(y,x)){
    this.post.insert(y,x,weight)
    this.network.get(y,x).connectFrom(this.y,this.x)
  }
}

Neuron.prototype.connectFrom = function(y,x){
  this.pre.insert(y,x,0)
}

Neuron.prototype.drain = function(depolarized){
  if(this.potential >= 0.2)
    this.potential -= 0.2
}

Neuron.prototype.recover = function(){
  this.potential += 20
}

Neuron.prototype.propagate = function(){
  this.post.safeIterate(function(weight,y,x){
    var target = this.network.get(y,x)
    if(target.potential < -0.80)
      this.post.increment(y,x,-0.02)
    target.accumilate(weight,this.y,this.x)
  }.bind(this))
  this.potential = -100
  this.backpropagate()
}

Neuron.prototype.backpropagate = function(){
  this.pre.safeIterate(function(v,y,x){
    var delta = v > 0 ? 0.015 : -0.01
    this.network.get(y,x).moderate(delta,this.y,this.x)
    this.pre.set(y,x,0)
  }.bind(this))
}

Neuron.prototype.accumilate = function(v,y,x){
  this.potential += v
  this.pre.increment(y,x,v)
}

Neuron.prototype.moderate = function(delta,y,x){
  var weight = this.post.get(y,x)
  if(delta < 0 && weight > 0)
    this.post.increment(y,x,delta)
  if(delta > 0 && weight < 1)
    this.post.increment(y,x,delta)
  if(weight == 0)
    this.post.remove(y,x)
}

Neuron.prototype.isAlive = function(){
  if(!this.pre.size() && !this.post.size())
    return true
}

Neuron.prototype.render = function(display){
  var scale = 8
  this.post.safeIterate(function(v,y,x){
    display.strokeColor = this.potential >= 1 ? 'rgba(200,200,10,'+v+')' : 'rgba(20,200,20,'+v+')'
    display.line(this.x*scale+(scale/2),this.y*scale+(scale/2)+10,x*scale+(scale/2),y*scale+(scale/2)+10)
  }.bind(this))
  display.fillColor = this.potential >= 1 ? 'rgba(255,255,255,1)' : 'rgba(180,80,40,'+this.potential+')'
  display.rect(this.x*scale,this.y*scale+10,scale,scale)
}
