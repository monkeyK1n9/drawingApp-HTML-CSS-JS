// Created by kingKong
// This is a drawing app. With the mouse, you can draw, increase ink size and change color and save

// selecting elements
let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")
let size = 10
let isPressed = false
let increase = document.getElementById("increase")
let decrease = document.getElementById("decrease")
let inkSize = document.getElementById("ink-size")
let color = document.getElementById("color")

let x 
let y

let clear = document.getElementById("clear")
let exp = document.getElementById("save")
let image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")

// listening to the mouse mouvement
// 1. Mouse pressed?
canvas.addEventListener("mouseup", e=> {
    isPressed = false

    x = undefined
    y = undefined
})

canvas.addEventListener("mousedown", e => {
    isPressed = true

    x = e.offsetX
    y = e.offsetY
})

// 2. Draw with respect to mouse mouvements
canvas.addEventListener("mousemove", e => {
    if (isPressed) {
        let x2 = e.offsetX
        let y2 = e.offsetY

        drawCircle(x2, y2)
        connectDots (x, y, x2, y2)

        x = x2
        y = y2
    }

})

// 3. Increase and decrease ink size
increase.addEventListener("click", () => {
    size += 5

    inkSize.innerHTML = `${size}`

    if (size >= 50) {
        size = 50
        inkSize.innerHTML = `${size}`
    }
})

decrease.addEventListener("click", () => {
    size -= 5

    inkSize.innerHTML = `${size}`

    if (size <= 5) {
        size = 5
        inkSize.innerHTML = `${size}`
    }
})

// 4. Change the color option
color.addEventListener("change", e => {
    color = e.target.value
})

// 5. Option to clear the drawing window
clear.addEventListener("click", e => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})

// 6. Saving the drawings as images
exp.addEventListener("click", e => {
    window.location.href = image
})

function drawCircle(x, y) {
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI*2)
    ctx.fill()
    ctx.fillStyle = color
}

function connectDots (x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = color
    ctx.stroke()
    ctx.lineWidth = size
}