document.querySelectorAll('.carousel-item img').forEach(img => {
    img.addEventListener('click', function () {
        const modalImage = document.getElementById('modalImage');
        modalImage.src = this.src;
    });
});

document.getElementById('imageModal').addEventListener('hidden.bs.modal', function () {
    document.activeElement.blur();
});