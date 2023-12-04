$(document).on("headerLoaded", () => {
    const root = document.querySelector(':root');
    let normalNavbarColor = document.querySelector(".navbar").style.color;
    const darkButton = document.querySelector('#darkmode');
    const varList = [
        '--background-color1',
        '--background-color2',
        '--accent-blue',
        '--accent-green',
        '--accent-lime',
        '--text-color'
    ];
    const darkColors = [
        '#000033',
        '#000022',
        '#0074E4',
        '#006400',
        '#7FFF00',
        '#F0F0F0'
    ];
    const lightColors = [
        '#F0F0F0', // --background-color1: Light Gray
        '#FFFFFF', // --background-color2: White
        '#0000CD', // --accent-blue: Medium Blue
        '#228B22', // --accent-green: Forest Green
        '#32CD32', // --accent-lime: Lime Green
        '#000000'  // --text-color: Black
    ];

    let darkMode = true;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // dark mode
    }
    else {
        darkMode = false;
    }
    if (localStorage.getItem("darkMode") !== null) {
        darkMode = localStorage.getItem("darkMode") === 'true';
    }
    updateColors();


    darkButton.addEventListener("click", (e) => {
        darkMode = !darkMode;
        updateColors();
    });

    function updateColors() {
        if (darkMode) {
            for (let i = 0; i < varList.length; i++) {
                root.style.setProperty(varList[i], darkColors[i]);
            }
            document.querySelectorAll(".navbar").forEach((e) => {
                e.style.color = normalNavbarColor;
            });
            document.querySelectorAll("img").forEach((e) => {
                if (e.src.includes("light"))
                    e.src = e.src.replace("light", "dark");
            });
        } else {
            for (let i = 0; i < varList.length; i++) {
                root.style.setProperty(varList[i], lightColors[i]);
            }
            document.querySelectorAll(".navbar").forEach((e) => {
                e.style.color = lightColors[5];
            });
            document.querySelectorAll("img").forEach((e) => {
                if (e.src.includes("dark"))
                    e.src = e.src.replace("dark", "light");
            });
        }
        darkButton.textContent = darkMode ? "Dark" : "Light";
        localStorage.setItem("darkMode", darkMode);
    }
});