const n = 20; // Number of bars
const array = [];
const container = document.getElementById("container");

// Set up event listeners for buttons
document.getElementById("initButton").addEventListener("click", init);
document.getElementById("playButton").addEventListener("click", play);

// Initialize the array with random numbers
function init() {
    for (let i = 0; i < n; i++) {
        array[i] = Math.random();
    }
    showBars();
}

// Start the sorting animation
function play() {
    const copy = [...array]; // Create a copy of the array
    const arrayForAnimation = bubbleSort(copy); // Get the animation steps
    animate(arrayForAnimation); // Start animating the sorting process
}

// Animate the sorting process
function animate(arrayForAnimation) {
    if (arrayForAnimation.length === 0) {
        showBars(); // Show final sorted bars
        return;
    }

    const move = arrayForAnimation.shift(); // Get the next move
    const [i, j] = move.indices;

    if (move.type === "swap") {
        [array[i], array[j]] = [array[j], array[i]]; // Perform swap
    }

    showBars(move); // Update the display

    setTimeout(function () {
        animate(arrayForAnimation); // Continue with the next move after a delay
    }, 200);
}

// Bubble sort algorithm to generate animation steps
function bubbleSort(array) {
    const arrayForAnimation = [];

    do {
        var swapped = false;
        for (let i = 1; i < array.length; i++) {
            arrayForAnimation.push({ indices: [i - 1, i], type: "comparison" }); // Comparison step

            if (array[i - 1] > array[i]) {
                swapped = true;
                arrayForAnimation.push({ indices: [i - 1, i], type: "swap" }); // Swap step
                [array[i - 1], array[i]] = [array[i], array[i - 1]]; // Perform swap in the copy
            }
        }
    } while (swapped);

    return arrayForAnimation; // Return all animation steps
}

// Display the bars based on the current state of the array
function showBars(move) {
    container.innerHTML = ""; // Clear previous bars

    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div");
        bar.style.height = array[i] * 100 + "%"; // Set height based on value
        bar.classList.add("bar");

        // Highlight bars being compared or swapped
        if (move && move.indices.includes(i)) {
            bar.style.backgroundColor = move.type === "swap" ? "red" : "blue";
        }

        container.appendChild(bar); // Add bar to container
    }
}











