const noteInput = document.getElementById("noteInput");
const saveNoteBtn = document.getElementById("saveNoteBtn");
const notesContainer = document.getElementById("notes");

// Load saved notes when page opens
window.addEventListener("load", loadNotes);

// 🎯 1️⃣ Save note when button is clicked
saveNoteBtn.addEventListener("click", function () {
  const noteText = noteInput.value.trim();

  if (noteText === "") {
    alert("Please write your note first...");
    return;
  }

  const newNote = {
    text: noteText,
    color: getRandomColor(),
    time: new Date().toLocaleString(),
  };

  createNote(newNote);
  saveNoteToLocalStorage(newNote);
  noteInput.value = "";
});

// 🎨 Random background color generator
function getRandomColor() {
  const colors = ["#fdd835", "#81c784", "#4fc3f7", "#ba68c8", "#ff8a65", "#aed581"];
  return colors[Math.floor(Math.random() * colors.length)];
}

// 🧱 Function to create and display note on page
function createNote(noteData) {
  const note = document.createElement("div");
  note.classList.add("note");
  note.style.backgroundColor = noteData.color;

  // Add note content and timestamp
  const noteText = document.createElement("p");
  noteText.textContent = noteData.text;

  const timeStamp = document.createElement("small");
  timeStamp.textContent = `🕒 ${noteData.time}`;

  // ✏️ Edit on click
  noteText.addEventListener("click", function () {
    const newText = prompt("Edit your note:", noteData.text);
    if (newText !== null && newText.trim() !== "") {
      noteData.text = newText.trim();
      noteText.textContent = newText;
      updateLocalStorage();
    }
  });

  // 🗑 Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑";
  deleteBtn.classList.add("deleteBtn");
  deleteBtn.addEventListener("click", function () {
    note.remove();
    deleteNoteFromLocalStorage(noteData);
  });

  // Append elements
  note.appendChild(noteText);
  note.appendChild(timeStamp);
  note.appendChild(deleteBtn);
  notesContainer.appendChild(note);
}

// 💾 Save to localStorage
function saveNoteToLocalStorage(note) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));
}

// 🗂 Load notes from localStorage
function loadNotes() {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.forEach(createNote);
}

// 🧹 Delete specific note
function deleteNoteFromLocalStorage(noteToDelete) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes = notes.filter((note) => note.text !== noteToDelete.text || note.time !== noteToDelete.time);
  localStorage.setItem("notes", JSON.stringify(notes));
}

// ✏️ Update localStorage after editing
function updateLocalStorage() {
  const allNotes = [];
  const noteElements = document.querySelectorAll(".note");

  noteElements.forEach((noteEl) => {
    const text = noteEl.querySelector("p").textContent;
    const time = noteEl.querySelector("small").textContent.replace("🕒 ", "");
    const color = noteEl.style.backgroundColor;
    allNotes.push({ text, time, color });
  });

  localStorage.setItem("notes", JSON.stringify(allNotes));
}
