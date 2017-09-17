function zeroMaker(int) {
  return (`0${int}`).slice(-2)
}

function timer(float) {
  if (float < 60) {
    return `${parseInt(float)}:${zeroMaker(parseInt((float - parseInt(float)) * 60))}`
  } else {
    return `${parseInt(float/60)}:${zeroMaker(parseInt(float) % 60)}:${zeroMaker(parseInt((float - parseInt(float)) * 0.6))}`
  }
}
