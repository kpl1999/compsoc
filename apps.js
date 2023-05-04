const observer = new IntersectionObserver(entries => {
    entries.forEach((entry) => {
        console.log("heyo")
        // entry.target.classList.toggle('show', entry.isIntersecting);
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));