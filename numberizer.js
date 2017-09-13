function hourPlur(float) {
  if (parseInt(float) > 1) {
    return `${parseInt(float)} hours`
  } else {
    return `${parseInt(float)} hour`
  }
}

function minPlur(float) {
  if (parseInt(float) > 1) {
    return `${parseInt(float)} minutes`
  } else {
    return `${parseInt(float)} minute`
  }
}

function secPlur(float) {
  if (parseInt(float) > 1) {
    return `${parseInt(float)} seconds`
  } else {
    return `${parseInt(float)} second`
  }
}

function secondizer(float) {
  if (parseInt(float) > 60 && parseInt((float - parseInt(float)) * 60) === 0) {
    return `${hourPlur(parseInt(float/60))}, ${minPlur(parseInt(float) % 60)}`
  } else if (parseInt(float) < 60 && parseInt((float - parseInt(float)) * 60) > 0) {
    return `${minPlur(parseInt(float))}, ${secPlur(parseInt((float - parseInt(float)) * 60))}`
  } else if (parseInt(float) > 60 && parseInt((float - parseInt(float)) * 60) > 0) {
    return `${hourPlur(parseInt(float/60))}, ${minPlur(parseInt(float) % 60)}, ${secPlur(parseInt((float - parseInt(float)) * 60))}`
  } else if (parseInt(float) < 60 && parseInt((float - parseInt(float)) * 60) === 0) {
    return `${minPlur(parseInt(float))}`
  } else if (parseInt(float) === 60 && parseInt((float - parseInt(float)) * 60) === 0) {
    return `${hourPlur((float/60))}`
  } else if (parseInt(float) === 60 && parseInt((float - parseInt(float)) * 60) > 0) {
    return `${hourPlur(parseInt(float/60))}, ${secPlur(parseInt((float - parseInt(float)) * 60))}`
  }
}
