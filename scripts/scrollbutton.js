// Function to scroll down by a certain viewport height
function scrollDown() {
    // Calculate the target scroll position (e.g., 2vh for 2% of the viewport height)
    const scrollAmount = 0.95; // Adjust this value as needed
    const targetScroll = scrollAmount * window.innerHeight;
    // Use smooth scrolling for a nicer effect (optional)
    window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
    });
}

//just testing DOM
// const imAddram = document.getElementsByClassName("im-addram");
// console.log(imAddram);

// Attach the scrollDown function to the button click event
const scrollButton = document.getElementById('scrollButton');
scrollButton.addEventListener('click', scrollDown);