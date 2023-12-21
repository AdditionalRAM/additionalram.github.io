$(document).ready(() => {
    const mapEmbed = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2427.9481264676615!2d13.375129177015712!3d52.51627783650482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851c655f20989%3A0x26bbfb4e84674c63!2sBrandenburg%20Gate!5e0!3m2!1sen!2sde!4v1703188304558!5m2!1sen!2sde" width="800" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';

    const mapHolder = $('#map-holder');
    const loadButton = $("#load-map");

    loadButton.click(() => {
        mapHolder.html(mapEmbed);
        loadButton.remove();
    });
});