function timer(float) {
  if (float < 60) {
    return `${parseInt(float)}m${parseInt((float - parseInt(float)) * 60)}s`
  } else {
    return `${parseInt(float/60)}h${parseInt(float) % 60}m${parseInt((float - parseInt(float)) * 0.6)}s`
  }
}
