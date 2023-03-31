let likes = document.querySelectorAll('.element__vector');
likes.forEach(likes => {
    likes.addEventListener('click', function(e) {
        e.target.classList.toggle('element__vector_active');
    }) 
});