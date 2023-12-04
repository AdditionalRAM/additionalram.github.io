document.addEventListener("DOMContentLoaded", () => {
    let elementsArray = document.querySelectorAll(".totransition");
    window.addEventListener('scroll', fadeIn);
    function fadeIn() {
        for (var i = 0; i < elementsArray.length; i++) {
            var elem = elementsArray[i]
            var distInView = elem.getBoundingClientRect().top - window.innerHeight + 20;
            if (distInView < 0) {
                elem.classList.add("inView");
                if ((
                    elem.classList.contains('specialfont') ||
                    elem.classList.contains('h1-desc') ||
                    elem.classList.contains('blue-bigger-hovereffect') ||
                    // check if elem is an h2
                    elem.tagName.toLowerCase() == 'h2'
                ) && !elem.id.includes('imaddram')) {
                    slowlyRandomize(elem);
                }
            } else {
                elem.classList.remove("inView");
            }
        }
    }
    fadeIn();

    async function slowlyRandomize(element) {
        if (element == undefined) return;
        if (element.dataset.hasOwnProperty("randomized") && element.dataset.randomized == 'true') return;
        let og = element.textContent;
        element.dataset.original = og;
        element.dataset.randomized = true;
        for (let i = element.textContent.length; i >= 0; i--) {
            await new Promise(r => {
                setTimeout(() => {
                    element.textContent = randomify(og, i);
                    r();
                }, 40);
            });
        }
    }

    function randomify(string, amount) {
        let newString = "";
        let amtFromBeginning = string.length - amount;
        const randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789?!£$%&";
        for (let i = 0; i < string.length; i++) {
            if (i < amtFromBeginning) newString += string[i];
            else if (string[i] == ' ') newString += ' ';
            else {
                newString += randomChars[Math.floor(Math.random() * randomChars.length)];
            }
        }
        return newString;
    }
});