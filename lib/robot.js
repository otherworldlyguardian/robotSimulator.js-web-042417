'use strict';

function Robot() {
  this.right = ['north', 'east', 'south', 'west']
  this.left = ['west', 'south', 'east', 'north']
}

Robot.prototype.orient = function (direction) {
  if (this.right.includes(direction)) {
    this.bearing = direction
  } else {
    throw new Error("Invalid Robot Bearing")
  }
}

Robot.prototype.turnRight = function () {
  this.bearing = this.right[(this.right.indexOf(this.bearing) + 1) % 4]
}

Robot.prototype.turnLeft = function () {
  this.bearing = this.left[(this.left.indexOf(this.bearing) + 1) % 4]
}

Robot.prototype.at = function (x, y) {
  this.coordinates = [x, y]
}

Robot.prototype.advance = function () {
  switch (this.bearing) {
    case 'north':
      this.coordinates[1] += 1
      break
    case 'south':
      this.coordinates[1] -= 1
      break
    case 'east':
      this.coordinates[0] += 1
      break
    case 'west':
      this.coordinates[0] -= 1
      break
  }
}

Robot.prototype.instructions = function (str) {
  var arr = str.split('')
  arr.forEach((l, i) => {
    switch (l) {
      case 'L':
        arr[i] = 'turnLeft'
        break
      case 'R':
        arr[i] = 'turnRight'
        break
      case 'A':
        arr[i] = 'advance'
        break
    }
  })
  return arr
}

Robot.prototype.place = function (obj) {
  this.at(obj.x, obj.y)
  this.orient(obj.direction)
}

Robot.prototype.evaluate = function (str) {
  this.instructions(str).forEach(function(instr) {
    this[instr]()
  }, this)
}
