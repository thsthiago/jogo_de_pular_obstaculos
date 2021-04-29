const personagem = document.querySelector('.personagem')
const cenario = document.querySelector('.cenario')
let isJumping = false;
let position = 0 

function handleKeyup(e) {
  if (e.keyCode === 32) {
    if(!isJumping) {
      jump()
    }
  }
}

function jump() {
  isJumping = true
  let upInterval = setInterval(() => {
    if(position >= 150) {
      clearInterval(upInterval)
      let downInterval = setInterval(() => {
        if(position <= 30) {
          clearInterval(downInterval)
          isJumping = false
        } else {
          position -= 20;
          personagem.style.bottom = position + 'px'
        }
      }, 20)
    } else {
      position += 20;

      personagem.style.bottom = position + 'px'
    }
  }, 20) 
}

function createObstaculo() {
  const obstaculo = document.createElement('div')
  let obstaculoPosition = 1000;
  let randomTime = Math.random() * 6000 

  obstaculo.classList.add('obstaculo')
  obstaculo.style.left = 1000 + 'px'
  cenario.appendChild(obstaculo)

  let leftInterval = setInterval(() => {
    if(obstaculoPosition < -60) {
      clearInterval(leftInterval)  
      cenario.removeChild(obstaculo)
    } else if(obstaculoPosition > 100 && obstaculoPosition < 160 && position < 60){
      clearInterval(leftInterval)
      cenario.innerHTML += '<h1 class="game-over">Fim de jogo</h1>'
      clearTimeout(time)
    } else {
      obstaculoPosition -= 10
      obstaculo.style.left = obstaculoPosition + 'px'
    }
  }, 20)

  let time = setTimeout(createObstaculo, randomTime)
}

createObstaculo()

document.addEventListener('keyup', handleKeyup)