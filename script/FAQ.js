const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    const heading = item.querySelector('.accordion-heading');
    heading.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});