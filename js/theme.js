export default function theme(themeToggle) {
    themeToggle.addEventListener('click', (e) => {
        if (e.currentTarget.classList.contains('header__check')) {
            document.body.classList.toggle('theme-light');
        }
    });
}