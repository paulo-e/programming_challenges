/* eslint-disable no-undef */

// TODO
// Add poison (-1 tail size, if tail.size == 1, you die)
// FIXME
// Somehow adding poison broke the code

let snake, food, poison, pos
let points = 0
let fps = true
const size = 20

setup = () => {
	createCanvas(500, 300)
	frameRate(10)
	snake = new Snake()
	food = pick_location()
	poison = pick_location()
}

pick_location = () => {
	let cols = floor(width / size)
	let rows = floor(height / size)

	pos = createVector(floor(random(cols)), floor(random(rows)))
	pos.mult(size)
	return pos
}

draw = () => {
	background(113)

	if (snake.eat(food, true)) {
		food = pick_location()
		poison = pick_location()
		points += 10
	} else if (snake.eat(poison, false)) {
		food = pick_location()
		poison = pick_location()
		points -= 10
	}

	snake.update()
	snake.show()

	text(points, 10, 10)

	fill(250, 10, 10)
	rect(food.x, food.y, size, size)
	fill(10, 250, 10)
	rect(poison.x, poison.y, size, size)
}

keyPressed = () => {
	if (keyCode === UP_ARROW) {
		snake.dir(0, -1)
	} else if (keyCode === DOWN_ARROW) {
		snake.dir(0, 1)
	} else if (keyCode === RIGHT_ARROW) {
		snake.dir(1, 0)
	} else if (keyCode === LEFT_ARROW) {
		snake.dir(-1, 0)
	} else if (keyCode === BACKSPACE) {
		if (fps) {
			frameRate(60)
			fps = false
		} else {
			frameRate(10)
			fps = true
		}
	}
}

class Snake {
	constructor() {
		this.x = 0
		this.y = 0
		this.x_speed = 1
		this.y_speed = 0
		this.total = 1
		this.tail = []

		this.update = () => {
			for (let i = 0; i < this.total - 1; i++) {
				this.tail[i] = this.tail[i + 1]
			}
			if (this.total >= 1) {
				this.tail[this.total - 1] = createVector(this.x, this.y)
			}

			this.x += this.x_speed * size
			this.y += this.y_speed * size

			this.x = constrain(this.x, 0, width - size)
			this.y = constrain(this.y, 0, height - size)
		}

		this.show = () => {
			fill(255)
			noStroke()
			for (let i = 0; i < this.total; i++) {
				rect(this.tail[i].x, this.tail[i].y, size, size)
			}
		}

		this.dir = (x, y) => {
			this.x_speed = x
			this.y_speed = y
		}

		this.eat = (pos, food) => {
			let d = dist(this.x, this.y, pos.x, pos.y)
			if (d < 1 && food) {
				this.total++
				return true
			} else if (d < 1 && !food) {
				this.total--
				return true
			} else return false
		}
	}
}
