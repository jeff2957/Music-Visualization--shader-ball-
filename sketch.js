let audio, amp, fft

let isPressed = false
// const bins = 64
// let binWidth 
// let peakDetect

let myShader 

let angle = 0.0
let jitter = 0.0

function preload() {
  audio = loadSound('audio/Are you gonna dance or what.mp3')
  myShader = loadShader('shader/vertex.vert', 'shader/fragment.frag')
  frameRate(60)
}

function setup() {
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
  // background(0)
  
  drawingContext.filter = 'blur(px)'

  console.log(audio.currentTime())

  // stroke(255)

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
  // translate(0, height / 2)
  // rect(0, 0, mapW, mapW)
  console.log()
  // const waveform = audio.getPeaks()

  // for(let i = 0; i < waveform.length; i++){
  //   line(i, waveform[i] * 100, i, waveform[i] * -100)
  // }

  // const waveform = fft.waveform()

  // for(let i = 0; i < waveform.length; i++){
  //   const x = map(i, 0, waveform.length, 0, width)
  //   const y = map(waveform[i], -1, 1, 0, height)
  //   point(x, y) 
  // } 
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


// function peakDetected() {
//   console.log('peak detected')
// }