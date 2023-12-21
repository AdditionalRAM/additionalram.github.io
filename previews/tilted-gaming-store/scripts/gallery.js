$(document).ready(() => {
    const imagePath = "./images/gallery/";
    const imageName = "gallery-image-";
    const imageExtension = ".webp";
    const imageCount = 5;

    const addedImages = [];
    let currentImage = 0;

    // get list of images
    const imageList = [];
    for(let i = 0; i < imageCount; i++) {
        imageList.push(imagePath + imageName + i + imageExtension);
    }

    // get gallery
    const gallery = $('#gallery-holder');

    // add images to gallery
    imageList.forEach((image, index) => {
        // append image to gallery by getImageHTML, add to addedImages and add OnCLick
        gallery.append(getImageHTML(image, index));
        addedImages.push($('#gallery-image-' + index));
        addedImages[index].click(() => {
            currentImage = index;
            enableGalleryMenu();
        });
    });

    // add functions
    $('#gallery-close').click(disableGalleryMenu);
    $('#gallery-right').click(incrementImage);
    $('#gallery-left').click(decrementImage);

    function getImageHTML(src, id){
        return '<div class="gallery-image"><img class="gallery-image-content box clickable totransition" src="' + src + '" alt="Gallery Image" id="' + "gallery-image-" + id + '"/></div>';
    }

    function enableGalleryMenu(){
        $('#gallery-image-view').toggleClass('open');
        // add .disable-scroll class to body
        $('body').addClass('disable-scroll');
        updateImage();
    }

    function disableGalleryMenu(){
        $('#gallery-image-view').toggleClass('open');
        // enable scroll
        $('body').removeClass('disable-scroll');

    }

    function incrementImage(){
        if(currentImage < imageCount - 1){
            currentImage++;
            // addedImages[currentImage].click();
        }
        updateImage();
    }

    function decrementImage(){
        if(currentImage > 0){
            currentImage--;
            // addedImages[currentImage].click();
        }
        updateImage();
    }

    function updateImage(){
        $('#gallery-image-view-image').attr('src', imageList[currentImage]);
    }
});
