let audio, amp, fft

let isPressed = false

let myShader 

let angle = 0.0
let jitter = 0.0

function preload() {
  audio = loadSound('audio/Are you gonna dance or what.mp3')
  myShader = loadShader('shader/vertex.vert', 'shader/fragment.frag')
  frameRate(60)

}

function setup() {

  const hihat_z = new Audio('./audio/hihat_z.wav')
  const kick_x = new Audio('./audio/kick_x.wav')

  document.addEventListener('keydown', (e) => {
    if (e.key == 'z') {
      console.log("z key is pressed")
      hihat_z.play()
    }
    else if (e.key == 'x') {
      console.log("x key is pressed")
      kick_x.play()
    }
  })

  createCanvas(windowWidth, windowHeight, WEBGL)

  shader(myShader)
  // getAudioContext().suspend()
  // audio.setVolume(0.1)
  
  userStartAudio()
  
  // fill(255, 255, 255)

  amp = new p5.Amplitude()
  fft = new p5.FFT()

  // peakDetect = new p5.PeakDetect()
  // peakDetect.onPeak(peakDetected)
}

function draw() {
  
  background(200, 200, 234, 200) 
  
  drawingContext.filter = 'blur(px)'


  fft.analyze()

  const volume = amp.getLevel()
  let freq = fft.getCentroid()
  
  freq *= 0.001
  
  if (second() % 2 == 0) {
    jitter = random(0, 0.1)
    jitter += jitter
  }

  angle = angle + jitter

  rotateX(sin(freq) + angle * 0.1)
  rotateY(cos(volume) + angle * 0.1)

  

  const mapF = map(freq, 0, 1, 0, 20)
  const mapV = map(volume, 0, 0.2, 0, 0.5)

  myShader.setUniform('uTime', frameCount)

  myShader.setUniform('uFreq', mapF)
  myShader.setUniform('uAmp', mapV)

  
  sphere(200, 400, 400)
  
}

function mousePressed() {
  if (isPressed) {
    audio.pause()
    isPressed = false
  }
  else {
    isPressed = true
    audio.loop()
  }
}