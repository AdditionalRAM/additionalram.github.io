$(document).on("headerLoaded", () => {
    const root = document.querySelector(':root');
    let normalNavbarColor = document.querySelector(".navbar").style.color;
    let darkButton = document.querySelector('#darkmode');
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
            document.querySelectorAll(".logo").forEach((e) => {
                e.style.filter = "none";
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
            document.querySelectorAll(".logo").forEach((e) => {
                e.style.filter = "invert(100%)";
            });
        }
        // const darkHTML = '<img class="dark-mode-icon" src="/images/icons/dark-mode.svg" alt="Dark" />';
        // const lightHTML = '<img class="light-mode-icon" src="/images/icons/light-mode.svg" alt="Light" />';
        // change color of darkHTML/lightHTML here
        // darkButton.innerHTML = darkMode ?  darkHTML : lightHTML;
        const darkIcon = document.querySelector(".dark-mode-icon");
        const lightIcon = document.querySelector(".light-mode-icon");
        // active icon gets .mode-icon-enabled, inactive gets .mode-icon-disabled
        if (darkMode) {
            darkIcon.classList.add("mode-icon-enabled");
            lightIcon.classList.remove("mode-icon-enabled");
            darkIcon.classList.remove("mode-icon-disabled");
            lightIcon.classList.add("mode-icon-disabled");
        } else {
            darkIcon.classList.remove("mode-icon-enabled");
            lightIcon.classList.add("mode-icon-enabled");
            darkIcon.classList.add("mode-icon-disabled");
            lightIcon.classList.remove("mode-icon-disabled");
        }

        let darkButtonPositioning = () => {
            const mediaQuery = window.matchMedia('(max-width: 1200px)');
            if (mediaQuery.matches) {
                darkButton.style.position = "absolute";
                const logoText = document.querySelector(".logo.logotext");
                // set height same as logotext
                darkButton.style.height = logoText.clientHeight + "px";
                // put button in same position as .logo.logotext
                darkButton.style.top = logoText.offsetTop + "px";
                // allign left of this with right of .logo.logotext parent
                let logo = document.querySelector(".logo");
                // get .logo-anchor left padding + margin
                let logoAnchor = document.querySelector(".logo-anchor");
                let logoAnchorStyle = window.getComputedStyle(logoAnchor);
                let logoAnchorLeftPadding = parseInt(logoAnchorStyle.getPropertyValue("padding-left"));
                let logoAnchorMarginLeft = parseInt(logoAnchorStyle.getPropertyValue("margin-left"));
                // get .logo left padding + margin
                let logoStyle = window.getComputedStyle(logo);
                let logoLeftPadding = parseInt(logoStyle.getPropertyValue("padding-left"));
                let logoMarginLeft = parseInt(logoStyle.getPropertyValue("margin-left"));

                let darkButtonStyle = window.getComputedStyle(darkButton);
                let darkButtonRightPadding = parseInt(darkButtonStyle.getPropertyValue("padding-right"));
                let darkButtonRightMargin = parseInt(darkButtonStyle.getPropertyValue("margin-right"));

                darkButton.style.right = ((logoAnchorLeftPadding + logoAnchorMarginLeft + logoLeftPadding + logoMarginLeft) -
                 (darkButtonRightPadding + darkButtonRightMargin)
                ) + "px";
            }
            else{
                darkButton.style.position = "relative";
                darkButton.style.height = "auto";
                darkButton.style.top = "auto";
                darkButton.style.right = "auto";
            }
        };

        // call darkButtonPositioning on load and on resize
        darkButtonPositioning();
        window.addEventListener("resize", darkButtonPositioning);
        
        localStorage.setItem("darkMode", darkMode);
    }
});