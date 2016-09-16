
var net = new SNN()

document.onkeypress = function(e){
  if(e.which == 32){
    net.render()
    net.step()
  }
  else
    net.input(e.key)
}

net.input('A')
