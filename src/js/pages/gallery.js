document.addEventListener('DOMContentLoaded', function () {

    const gridButtons = document.querySelectorAll('.grid-buttons button');
    const gallery = document.querySelector('.gallery-masonry');

    gridButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const gridType = btn.dataset.grid; // "small", "medium", "large"

            gridButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            gallery.classList.remove('small-grid', 'medium-grid', 'large-grid');
            gallery.classList.add(`${gridType}-grid`);
        });
    });
    Fancybox.bind("[data-fancybox='gallery']", {
        Toolbar: {
            display: {
                left: ["infobar"],
                middle: ["zoomIn", "zoomOut", "toggle1to1", "rotateCCW", "rotateCW", "flipX", "flipY"],
                right: ["slideshow", "fullscreen", "download", "thumbs", "close"]
            }
        },
        Thumbs: {
            autoStart: true,
            axis: 'x'
        },
        infinite: true,
        wheel: "slide",
        touch: {
            vertical: true,
            momentum: true
        }
    });
})