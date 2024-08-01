
// Get the note form, add note button, and save note button
const noteForm = document.getElementById('note-form');
const addNoteBtn = document.getElementById('add-note-btn');
const saveNoteBtn = document.getElementById('save-note-btn');
const noteList = document.getElementById('note-list-items');
const noteTitleInput = document.getElementById('note-title');
const noteContentInput = document.getElementById('note-content');
const noteTagsInput = document.getElementById('note-tags');
const searchInput = document.getElementById('search-input');

// Add event listener to the add note button
addNoteBtn.addEventListener('click', () => {
  // Show the note form and hide the add note button
  noteForm.classList.add('show');
  addNoteBtn.style.display = 'none';
});

// Add event listener to the save note button
saveNoteBtn.addEventListener('click', () => {
  // Get the note title, content, and tags
  const noteTitle = noteTitleInput.value;
  const noteContent = noteContentInput.value;
  const noteTags = noteTagsInput.value.split(',');

  // Create a new note item
  const noteItem = document.createElement('li');
  noteItem.innerHTML = `
    <h2>${noteTitle}</h2>
    <p>${noteContent}</p>
    <p>Tags: ${noteTags.join(', ')}</p>
  `;

  // Add the note item to the note list
  noteList.appendChild(noteItem);

  // Clear the note form inputs
  noteTitleInput.value = '';
  noteContentInput.value = '';
  noteTagsInput.value = '';

  // Hide the note form and show the add note button
  noteForm.classList.remove('show');
  addNoteBtn.style.display = 'block';
});

// Add event listener to the search input
searchInput.addEventListener('input', () => {
  // Get the search query
  const searchQuery = searchInput.value.toLowerCase();

  // Filter the note items based on the search query
  const noteItems = noteList.children;
  for (const noteItem of noteItems) {
    const noteText = noteItem.textContent.toLowerCase();
    if (noteText.includes(searchQuery)) {
      noteItem.style.display = 'block';
    } else {
      noteItem.style.display = 'none';
    }
  }
});
