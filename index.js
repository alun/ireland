let Raphael = require('raphael'),
    Circle = require('./circle'),
    elem = document.createElement('div'),
    ready

ready = new Promise(function (resolve, reject) {
  if (document.readyState == 'loading') {
    document.onreadystatechange = () => {
      if (document.readyState == 'complete') {
        setTimeout(() => resolve(), 0)
        document.onreadystatechange = undefined
      }
    }
  }
  else {
    resolve()
  }
})

ready.then(() => {
  document.body.appendChild(elem)
  document.body.style.margin = 0

  render()

  let ribbon = document.createElement('div')
  ribbon.innerHTML = require('./ribbon.html')
  ribbon.style.right = 0
  ribbon.style.top = 0
  document.body.appendChild(ribbon)
})

function render() {

  let html = document.getElementsByTagName('html')[0],
      height =  html.clientHeight,
      width = html.clientWidth,
      amount = 100,
      paper = Raphael(elem, width, height)

  window.onresize = (event) => {
      width = html.clientWidth
      height = html.clientHeight
      paper.setSize(width, height)
      world.forEach((part) => {
        part.worldSize(width, height)
      })
  }

  function drawLine(color) {
    let parts = [],
        i = 0
    for (; i < amount; i++) {
      let part = new Circle({paper, color, width, height})
      parts.push(part)
    }
    return parts
  }

  var world = [Circle.C1, Circle.C2, Circle.C3].
    map((color) => drawLine(color)).
    reduce((parts1, parts2) => parts1.concat(parts2))

  world.forEach(() => {
    let idx = Math.floor(world.length * Math.random())
    world[idx].pop()
  })

  let frame = 0

  function animate() {
    world.forEach((part) => {
      part.animate({frame})
    })
    frame++
    setTimeout(animate, 30)
  }

  animate()
}

