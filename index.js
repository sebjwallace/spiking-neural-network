
var net = new SNN()

var inputs = '1,A,N,D,2,E,Q,U,A,L,S,3,A,N,D,9,M,U,N,U,S,5,E,Q,U,A,L,S,4'.split(',')

var limit = 4000
var count = 0
var n = 0

var timer = setInterval(function(){
  net.input(inputs[n])
  n += n == inputs.length-1 ? -n : 1
  // n = random(0,net.inputs.length-1)
  if(count == limit)
    clearInterval(timer)
  count++
},50)
