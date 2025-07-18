const searchInput = document.getElementById('search-input');
const noteTitle = document.getElementById('note-title');
const noteContent = document.getElementById('note-content');

// Check for saved user preference
if (localStorage.getItem('dark-mode') === 'enabled') {
    body.classList.add('bg-gray-900', 'text-white');
    toggleDarkModeButton.textContent = 'Light Mode';
    // Set input backgrounds for dark mode
    searchInput.classList.add('bg-gray-800', 'border-gray-700');
    noteTitle.classList.add('bg-gray-800', 'border-gray-700');
    noteContent.classList.add('bg-gray-800', 'border-gray-700');
} else {
    body.classList.remove('bg-gray-900', 'text-white');
    toggleDarkModeButton.textContent = 'Dark Mode';
    // Reset input backgrounds for light mode
    searchInput.classList.remove('bg-gray-800', 'border-gray-700');
    noteTitle.classList.remove('bg-gray-800', 'border-gray-700');
    noteContent.classList.remove('bg-gray-800', 'border-gray-700');
}

// Toggle dark mode
toggleDarkModeButton.addEventListener('click', () => {
    body.classList.toggle('bg-gray-900');
    body.classList.toggle('text-white');

    // Toggle input styles based on dark mode
    if (body.classList.contains('bg-gray-900')) {
        localStorage.setItem('dark-mode', 'enabled');
        toggleDarkModeButton.textContent = 'Light Mode';
        searchInput.classList.add('bg-gray-800', 'border-gray-700');
        noteTitle.classList.add('bg-gray-800', 'border-gray-700');
        noteContent.classList.add('bg-gray-800', 'border-gray-700');
    } else {
        localStorage.setItem('dark-mode', 'disabled');
        toggleDarkModeButton.textContent = 'Dark Mode';
        searchInput.classList.remove('bg-gray-800', 'border-gray-700');
        noteTitle.classList.remove('bg-gray-800', 'border-gray-700');
        noteContent.classList.remove('bg-gray-800', 'border-gray-700');
    }
});