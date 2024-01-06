const tabs = [];

$(document).ready(() => {
    // tabs = $('.tab-content');
    // const fccTab = $('#fcc-tab');
    // switchTab(0, fccTab);
    fetchPortfolioData().then(data => {populateTabs(data)});
});


function switchTab(tabIndex, clickedElement){
    tabs.forEach((tab, index) => {
        $(tab).removeClass("active");
        if(index < tabIndex){
            $(tab).addClass("left");
            $(tab).removeClass("right");  
        }
        else if(index > tabIndex){
            $(tab).addClass("right");
            $(tab).removeClass("left");
        }
        else{
            $(tab).removeClass("right");
            $(tab).removeClass("left");
        }
    });
    // show tab with index
    $(tabs[tabIndex]).addClass("active");
    if(clickedElement != null){
        // remove active class from all tabs
        $('.tab-switcher').removeClass('tab-active');
        // add active class to clicked tab
        $(clickedElement).addClass('tab-active');
    }
}

async function fetchPortfolioData() {
    try {
        const response = await fetch('../portfolio/portfolio.json'); // Fetch the JSON file from the projects folder
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json(); // Extract JSON from the response
        return data; // Return the JSON data
    } catch (error) {
        console.error('There was a problem fetching the portfolio data:', error);
        return null; // Return null or handle the error accordingly
    }
}

let parsedData = null;

function populateTabs(data){
    parsedData = data;
    const tabsContainer = $('#tabs-container');
    const tabSwitcher = $('#tab-switchers');
    tabsContainer.empty();
    tabSwitcher.empty();
    // for each property in data
    // data structure: { fccTab: [], webTab: [], ... }
    let keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let value = data[key];
        // create tabSwitcher 
        const tabSwitcherElement = `<button class="tab-switcher" onclick="switchTab(${i}, this)" id="${key}Switcher">${value.title}</button>`;
        tabSwitcher.append(tabSwitcherElement);
        // create tab
        const tabHTML = `
        <div class="tab-content" id="${key}">
            <h2 class="tab-title specialfont">${value.title}</h2>
        </div>
        `;
        tabsContainer.append(tabHTML);
        const tab = $(`#${key}`)
        tabs.push(tab);
        // create projects
        const projects = value.children;
        for (let j = 0; j < projects.length; j++) {
            const project = projects[j];
            const projectHTML = `
            <div class="project" data-projectJSON=${[i, j]}>
                <div class="img-container">
                    <img ${project.pixelated ? 'style="image-rendering: pixelated"' : ""} src="${project.imgSrc}" alt="${project.title} Icon" loading="lazy">
                </div>
                <p class="title">${project.title}</p>
            </div>
            `;
            tab.append(projectHTML);
            //  get referenced to just appended project
            const projectElement = tab.children().last();
            // add click listener
            projectElement.click((event) => {
                // Open modal by passing the clicked project element
                openPopup(event.currentTarget);
            });
        }
    }
    switchTab(0, $('#fccTabSwitcher'));
    initTransitions();
    updateColors();
}

function openPopup(project){
    const popup = $('#popup');

    const projectDataTag = $(project).data('projectjson');
    // structure: [0,1]
    // parse to array
    const projectJSON = projectDataTag.split(',').map(Number);
    // const projectData => [n-th key in parsedData, n-th project in that key's children array]
    const projectData = parsedData[Object.keys(parsedData)[projectJSON[0]]].children[projectJSON[1]];

    $("#popup-close-button").click(closePopup);
    $("#popup-title").text(projectData.title);
    $("#popup-desc").text(projectData.description);
    $("#popup-img").attr('src', projectData.imgSrc);
    $("#popup-img").attr('alt', projectData.title);
    $("#popup-img").css('image-rendering', projectData.pixelated ? 'pixelated' : 'auto');
    $("#popup-link").attr('href', projectData.link);
    
    popup.addClass('active');

    // disable scrolling
    $("body").css('overflow', 'hidden');
}

function closePopup() {
    const popup = $('#popup');
    // const project = $("#popup .project");
    // parent.children().eq(index - 1).after(project);
    popup.removeClass('active');
    $("#popup-close-button").off('click');
    // re enable scrolling
    $("body").css('overflow', "");
}