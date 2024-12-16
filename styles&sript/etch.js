const grid = document.querySelector(".grid")
const btn = document.querySelector("#btn")
btn.addEventListener("click", checkGrid)

// To check the input of the user and intialize creating the grid
function checkGrid() { 
    while (true) {
        const inp = prompt("Enter a number from 1 to 100 ")
        const regx = /^(100|[1-9][0-9]?)$/
        if (regx.test(inp)) {
            return creatGrid(inp)
        } else {
            alert("Please enter a number from 1 to 100")
        }
    }

}

// To generate a random color for the background
function randomColor() {
    const rndr = Math.floor(Math.random() * 256)
    const rndg = Math.floor(Math.random() * 256)
    const rndb = Math.floor(Math.random() * 256)
    return `rgb(${rndr},${rndg},${rndb})`
}

// To darken the random color generated based on the interaction with the square
function darken(rgb, percent)  {  
    //RegExp to get the colors values as digits and then lower by a percentage and return the result as a RGB value
    const rgbValues = rgb.match(/\d+/g).map(Number) 
    const darkenedValues = rgbValues.map(value => Math.max(0, Math.floor(value * (1 - percent))))
    return `rgb(${darkenedValues.join(", ")})`
}

// To handle the number of interaction "hovers" and darkens every new random color till it reachs black then reset and start over
function handleInteractions(square) {
    let interactionCount = parseInt(square.dataset.interactionCount)
    if (interactionCount < 10) {
        interactionCount++
        square.dataset.interactionCount = interactionCount
        const currentColor = square.style.backgroundColor
        const newColor = darken(currentColor, interactionCount * .1)
        square.style.backgroundColor = newColor
    }
    if (interactionCount === 10) {
        interactionCount = 0
        square.dataset.interactionCount = interactionCount
    }
}

// To insert a num^2 of div called square inside the grid and give it initial values 
function creatGrid(num) {
    grid.innerHTML = ``
    for (let i = 0; i < num ** 2; i++) {
        const square = document.createElement("div")
        square.classList.add("square")
        square.dataset.interactionCount = "0"
        square.style.width = `${100 / num}%`
        square.style.backgroundColor = `rgb(255,255,255)`
        square.addEventListener("mouseover", () => {
            square.style.backgroundColor = randomColor()
            handleInteractions(square)
        })
        grid.appendChild(square)
    }
}