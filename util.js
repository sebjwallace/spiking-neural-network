
function randomFloat(){
  return random(-1000,1000) / 1000
}

function random(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function probable(max){
  var n = random(0.01,1000000) / 10000
  return n < max
}
