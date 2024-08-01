
// Initialize notes array from local storage
let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Render notes
function renderNotes(filteredNotes = notes) {
    const noteListItems = document.getElementById('note-list-items');
    noteListItems.innerHTML = '';
    filteredNotes.forEach((note, index) => {
        const noteItem = document.createElement('li');
        noteItem.dataset.tags = note.tags.join(',');
        noteItem.innerHTML = `
            <h3 contenteditable="true">${note.title}</h3>
            <p contenteditable="true">${note.content.substring(0, 50)}...</p>
            <p>Tags: ${note.tags ? note.tags.join(', ') : ''}</p>
            <button onclick="deleteNote(${index})">Delete</button>
        `;
        noteItem.addEventListener('click', () => editNote(index));
        noteListItems.appendChild(noteItem);
    });
}

// Save note
document.getElementById('save-note-btn').addEventListener('click', () => {
    const title = document.getElementById('note-title').value;
    const content = document.getElementById('note-content').value;
    const tags = document.getElementById('note-tags').value.split(',').filter(tag => tag.trim() !== '');
    const index = document.getElementById('save-note-btn').dataset.index;
    if (index) {
        notes[index] = { title, content, tags };
        delete document.getElementById('save-note-btn').dataset.index;
    } else {
        notes.push({ title, content, tags });
    }
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
    document.getElementById('note-title').value = '';
    document.getElementById('note-content').value = '';
    document.getElementById('note-tags').value = '';
    document.getElementById('note-form').classList.remove('active');
});

// Delete note
function deleteNote(index) {
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
}

// Edit note
function editNote(index) {
    const note = notes[index];
    document.getElementById('note-title').value = note.title;
    document.getElementById('note-content').value = note.content;
    document.getElementById('note-tags').value = note.tags.join(',');
    document.getElementById('save-note-btn').dataset.index = index;
    document.getElementById('note-form').classList.add('active');
}

// Search notes
document.getElementById('search-input').addEventListener('input', () => {
    const searchQuery = document.getElementById('search-input').value.toLowerCase();
    const filteredNotes = notes.filter((note) => {
        return (
            note.title.toLowerCase().includes(searchQuery) ||
            note.content.toLowerCase().includes(searchQuery) ||
            (note.tags && note.tags.some((tag) => tag.toLowerCase().includes(searchQuery)))
        );
    });
    renderNotes(filteredNotes);
});

// Add note button
document.getElementById('add-note-btn').addEventListener('click', () => {
    document.getElementById('note-form').classList.add('active');
});

document.getElementById('add-note-btn').addEventListener('click', function() {
  document.getElementById('note-form').classList.add('show');
  document.getElementById('add-note-btn').style.display = 'none'; /* Optional: hide the button */
});
// Initialize app
renderNotes();
