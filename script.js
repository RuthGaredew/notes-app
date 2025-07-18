const toggleDarkModeButton = document.getElementById('toggle-dark-mode');
const body = document.getElementById('body');

// Function to apply dark mode styles
function applyDarkMode(isDarkMode) {
    if (isDarkMode) {
        body.classList.add('bg-gray-900', 'text-white');
        toggleDarkModeButton.textContent = 'Light Mode';
    } else {
        body.classList.remove('bg-gray-900', 'text-white');
        toggleDarkModeButton.textContent = 'Dark Mode';
    }
}

// Check for saved user preference
const isDarkMode = localStorage.getItem('dark-mode') === 'enabled';
applyDarkMode(isDarkMode);

// Toggle dark mode
if (toggleDarkModeButton) {
    toggleDarkModeButton.addEventListener('click', () => {
        const currentMode = body.classList.contains('bg-gray-900');
        applyDarkMode(!currentMode);
        localStorage.setItem('dark-mode', currentMode ? 'disabled' : 'enabled');
    });
}

// Function to load notes from localStorage
function loadNotes() {
    const noteList = document.getElementById('note-list');
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    noteList.innerHTML = ''; // Clear existing notes

    notes.forEach((note, index) => {
        const noteCard = document.createElement('div');
        noteCard.className = 'note-card bg-gray-800 border border-gray-700 p-4 rounded-lg shadow-md';

        noteCard.innerHTML = `
            <h2 class="font-bold text-lg">${note.title}</h2>
            <p class="text-gray-400">${note.content}</p>
            <button class="bg-red-600 text-white p-1 rounded mt-2 delete-btn">Delete</button>
            <button class="bg-yellow-500 text-white p-1 rounded mt-2 edit-btn" data-index="${index}">Edit</button>
        `;

        noteList.appendChild(noteCard);
    });

    // Delete note functionality
    noteList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const noteCard = e.target.parentElement;
            const noteTitle = noteCard.querySelector('h2').textContent;

            // Remove from localStorage
            const updatedNotes = notes.filter(note => note.title !== noteTitle);
            localStorage.setItem('notes', JSON.stringify(updatedNotes));

            // Remove from the DOM
            noteList.removeChild(noteCard);
        }

        // Edit note functionality
        if (e.target.classList.contains('edit-btn')) {
            const index = e.target.getAttribute('data-index');
            const noteToEdit = notes[index];

            // Redirect to the add-note page with the note data
            window.location.href = `add-note.html?title=${encodeURIComponent(noteToEdit.title)}&content=${encodeURIComponent(noteToEdit.content)}&index=${index}`;
        }
    });
}

// Load notes if on the main page
if (document.title === 'Notes App') {
    loadNotes();
}

// Handle note submission on the add-note page
const noteForm = document.getElementById('note-form');
if (noteForm) {
    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get('index');

    // Populate form if editing
    if (index !== null) {
        document.getElementById('form-title').textContent = 'Edit Note';
        document.getElementById('note-title').value = urlParams.get('title');
        document.getElementById('note-content').value = urlParams.get('content');
    }

    noteForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('note-title').value;
        const content = document.getElementById('note-content').value;

        // Store the note in localStorage
        const notes = JSON.parse(localStorage.getItem('notes')) || [];

        if (index !== null) {
            // Update existing note
            notes[index] = { title, content };
        } else {
            // Add new note
            notes.push({ title, content });
        }

        localStorage.setItem('notes', JSON.stringify(notes));

        // Redirect back to the main notes page
        window.location.href = 'index.html';
    });
}