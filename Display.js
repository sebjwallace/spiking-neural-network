
function Display(id,h,w){

  this.id = id || 'display'
  this.height = h || 500
  this.width = w || 500
  this.ctx = null
  this.fillColor = 'black'
  this.strokeColor = 'black'

  this.init()

}

Display.prototype.init = function(){
  var canvas = document.createElement('CANVAS')
  canvas.id = this.id
  canvas.height = this.height
  canvas.width = this.width
  this.ctx = canvas.getContext('2d')
  document.body.appendChild(canvas)
}

Display.prototype.line = function(ax,ay,bx,by){
  this.ctx.strokeStyle = this.strokeColor
  this.ctx.beginPath()
  this.ctx.moveTo(ax,ay)
  this.ctx.lineTo(bx,by)
  this.ctx.stroke()
}

Display.prototype.rect = function(x,y,h,w){
  this.ctx.fillStyle = this.fillColor
  this.ctx.fillRect(x,y,h,w)
}

Display.prototype.clear = function(){
  this.ctx.clearRect(0,0,this.height,this.width)
}
