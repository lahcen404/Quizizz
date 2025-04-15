document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('[data-collapse-toggle="navbar-default"]');
    const menu = document.getElementById('navbar-default');

    if (toggleButton && menu) {
      toggleButton.addEventListener('click', () => {
        const expanded = toggleButton.getAttribute('aria-expanded') === 'true';
        toggleButton.setAttribute('aria-expanded', !expanded);
        menu.classList.toggle('hidden');
        menu.classList.toggle('opacity-100');
        menu.classList.toggle('translate-y-0');
        if (expanded) {
          menu.classList.add('opacity-0', 'translate-y-2');
        } else {
          menu.classList.remove('opacity-0', 'translate-y-2');
        }
      });
    }
  });