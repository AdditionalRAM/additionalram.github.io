// Get a reference to the button and the content div
const scrollButton = document.getElementById('scrollButton');
const content = document.getElementById('content');

// Define the amount you want to scroll down (in viewport heights)
const scrollAmount = 90; // Adjust this value as needed

// Add a click event listener to the button
scrollButton.addEventListener('click', () => {
    // Calculate the target scroll position
    const targetScroll = content.scrollTop + (scrollAmount * window.innerHeight);

    // Use smooth scrolling for a nicer effect (optional)
    content.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
    });
});