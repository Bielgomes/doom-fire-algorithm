const firePixelsDiv = document.getElementById('root')

const windLeftButton = document.getElementById('wind-left')
const windRightButton = document.getElementById('wind-right')

const fireIntensityColors = [
  "#070707", 
  "#1f0707", 
  "#2f0f07", 
  "#470f07", 
  "#571707", 
  "#671f07", 
  "#771f07", 
  "#8f2707", 
  "#9f2f07", 
  "#af3f07", 
  "#bf4707",
  "#c74707",
  "#df4f07",
  "#df5707",
  "#df5707",
  "#d75f07",
  "#d7670f",
  "#cf6f0f",
  "#cf770f",
  "#cf7f0f",
  "#cf8717",
  "#c78717",
  "#c78f17",
  "#c7971f",
  "#bf9f1f",
  "#bf9f1f",
  "#bfa727",
  "#bfa727",
  "#bfaF2f",
  "#b7af2f",
  "#b7b72f",
  "#cfcf6f",
  "#dfdf9f",
  "#efefc7",
  "#ffffff",
  "#ffffff",
  "#ffffff",
]

const fireWidth = 70
const fireHeight = 70
const firePixelsArray = []

const maxWindForce = 4
let windForce = 0

function setup() {
  createFireDataStruct()
  createFireSource()
  renderFire()

  setInterval(propagateFire, 50)
}

function createFireDataStruct() {
  const numberOfPixels = fireHeight * fireHeight
  for (let i = 0; i < numberOfPixels; i++) {
    firePixelsArray[i] = 0
  }
}

function createFireSource() {
  const numberOfPixels = fireHeight * fireHeight
  const fireSourceIntensity = fireIntensityColors.length - 1

  for (let i = fireWidth * (fireHeight - 1); i < numberOfPixels; i++) {
    firePixelsArray[i] = fireSourceIntensity
  }
}

function renderFire() {
  const fireSourceIntensity = fireIntensityColors.length - 1
  let table = '<table>'

  for (let row = 0; row < fireHeight; row++) {
    table += '<tr>'

    for (let column = 0; column < fireWidth; column++) {
      const pixelIndex = column + (row * fireWidth)
      table += `<td style="background-color: ${fireIntensityColors[firePixelsArray[pixelIndex] < fireSourceIntensity ? firePixelsArray[pixelIndex] : fireSourceIntensity]};"></td>`
    }

    table += '</tr>'
  }

  table += '</table>'
  firePixelsDiv.innerHTML = table
}

function propagateFire() {
  for (let column = 0; column < fireWidth; column++) {
    for (let row = 0; row < fireHeight; row++) {
      const pixelIndex = column * fireWidth + row
      updateFirePixelIntensity(pixelIndex)
    }
  }

  renderFire()
}

function updateFirePixelIntensity(currentPixelIndex) {
  const belowPixelIndex = currentPixelIndex + fireWidth
  if (belowPixelIndex >= fireWidth * fireHeight) {
    return
  }

  const decay = Math.floor(Math.random() * 2)
  const belowPixelFireIntensity = firePixelsArray[belowPixelIndex]

  firePixelsArray[currentPixelIndex - windForce] = belowPixelFireIntensity - decay >= 0 ? belowPixelFireIntensity - decay : 0
}

windLeftButton.addEventListener('click', () => {
  if (windForce == maxWindForce) return
  windForce += 1
})

windRightButton.addEventListener('click', () => {
  if (windForce == -maxWindForce) return
  windForce -= 1
})

setup()
