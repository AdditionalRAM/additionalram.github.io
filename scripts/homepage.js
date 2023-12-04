document.addEventListener("DOMContentLoaded", () => {
    const scrollButton = document.getElementById('scrollButton');
    scrollButton.addEventListener('click', scrollDown);

    const imAddram = document.querySelector('#imaddram');
    const originalImAddram = imAddram.textContent;

    function scrollDown() {
        const scrollAmount = 0.95;
        const targetScroll = scrollAmount * window.innerHeight;
        window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
        });
    }

    imAddram.addEventListener('mouseenter', (e) => {
        slowlyRandomizeAddram();
    });

    document.addEventListener("DOMContentLoaded", (e) => {
        slowlyRandomizeAddram();
    });

    async function slowlyRandomizeAddram() {
        console.log("randomizing")
        for (let i = imAddram.textContent.length; i >= 0; i--) {
            await new Promise(r => {
                setTimeout(() => {
                    imAddram.textContent = randomify(originalImAddram, i);
                    r();
                }, 60);
            });
        }
    }

    function randomify(string, amount) {
        let newString = "";
        let amtFromBeginning = string.length - amount;
        const randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789?!£$%&";
        for (let i = 0; i < string.length; i++) {
            if (i < amtFromBeginning) newString += string[i];
            else {
                newString += randomChars[Math.floor(Math.random() * randomChars.length)];
            }
        }
        return newString;
    }
});