// about.js

function openModal(name, description, picture) {
    var modal = document.getElementById('myModal');
    var modalContent = document.querySelector('.modal-content');
    var modalTitle = document.getElementById('modal-title');
    var modalDescription = document.getElementById('modal-description');
    var modalPicture = document.getElementById('modal-picture');

    modalTitle.textContent = name;
    modalDescription.textContent = description;
    modalPicture.src = picture;

    modal.style.display = 'flex';

    // Apply animation classes
    modalContent.classList.add('animate-in');
    setTimeout(() => {
        modalContent.classList.remove('animate-in');
    }, 300);
}

function closeModal() {
    var modal = document.getElementById('myModal');
    var modalContent = document.querySelector('.modal-content');

    // Apply animation class for modal exit
    modalContent.classList.add('animate-out');
    setTimeout(() => {
        modal.style.display = 'none';
        modalContent.classList.remove('animate-out');
    }, 300);
}

window.onclick = function(event) {
    var modal = document.getElementById('myModal');
    if (event.target === modal) {
        closeModal();
    }
};
