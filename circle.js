let C1 = "#f77f00",
    C2 = "#ffffff",
    C3 = "#009e60"

function rand(length = 1) {
  return length * Math.random()
}

function randomColor(but) {
  var a = [C1, C2, C3], idx = a.indexOf(but)
  if (but && idx > -1) {
    a.splice(idx, 1)
  }
  idx = Math.floor(rand(a.length))
  return a[idx]
}

class Circle {

  constructor(args) {
    let paper = args.paper,
        width = args.width,
        height = args.height,
        color = args.color,
        circle = this.circle = paper.circle()
    this.colorize(color)
    this.worldSize(width, height)
    this.renew()

    circle.node.style.cursor = 'pointer'
    circle.mouseover(() => {
      if (this.x1 !== undefined) {
        return
      }
      this.colorize(randomColor(this.color))
      this.pop()
      this.renew()
      this.transitTo(
        this.laneWidth * (this.lane + rand()),
        this.height * rand()
      )
    })
  }
  get lane() {
    return this.color == C1 ? 0 : this.color == C2 ? 1 : 2
  }
  get offset() {
    return this.lane * this.laneWidth
  }
  get laneWidth() {
    return this.width / 3
  }
  worldSize(width, height) {
    let oldWidth = this.width,
        oldHeight = this.height
    this.width = width
    this.height = height
    this.circle.attr({
      r: this.height / 50 + rand(10)
    })
    if (oldWidth !== undefined) {
      this.moveTo(
        this.x0 * this.width / oldWidth,
        this.y0 * this.height / oldHeight
      )
    }
    else {
      this.moveTo(
        this.offset + rand(this.laneWidth),
        this.height * rand()
      )
    }
  }
  transitTo(x, y) {
    this.x1 = x
    this.y1 = y
  }
  moveTo(x, y) {
    this.x0 = x
    this.y0 = y
    this.circle.attr({
      cx: x,
      cy: y
    })
  }
  colorize(color) {
    this.circle.attr("fill", color)
    this.circle.attr("stroke", randomColor(color))
    this.color = color
    return this
  }
  pop() {
    let node = this.circle.node
    node.parentNode.appendChild(node)
  }
  renew() {
    let circle = this.circle
    this.radius = this.height / 40 + 30 * Math.random()
    this.cycle =  20 + 20 * Math.random()
    this.dispersion = 3 * Math.random()
    this.direction = Math.random() > 0.5 ? 1 : -1
  }
  animate(args) {
    let frame = args.frame,
        circle = this.circle,
        x = this.x0,
        y = this.y0,
        phase

    if (this.x1 || this.y1) {
      if (!this.frameStart) {
        this.frameStart = frame
        circle.attr({opacity: rand(0.8)})
      }
      phase = (frame - this.frameStart) / this.cycle
      if (this.x1 !== undefined) {
        x = this.x0 + (this.x1 - this.x0) * phase
      }
      if (this.y1 !== undefined) {
        y = this.y0 + (this.y1 - this.y0) * phase
      }
      if (phase > 1) {
        if (this.x1 !== undefined) {
          x = this.x0 = this.x1
        }
        if (this.y1 !== undefined) {
          y = this.y0 = this.y1
        }
        delete this.x1
        delete this.y1
        delete this.frameStart
        circle.attr({opacity: 1})
      }
    }

    phase = 2 * Math.PI * frame / this.cycle * this.direction
    x = x + this.radius * Math.cos(phase)
    y = y + this.radius * Math.sin(phase)
    circle.attr({
      cx: x + this.dispersion * rand(),
      cy: y + this.dispersion * rand()
    })
  }
}

((_) => {
  _.C1 = C1
  _.C2 = C2
  _.C3 = C3
})(Circle)

export default Circle
