const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const notesPath = path.join(__dirname, 'db.json');

async function addNote(title) {
    const notes = await getNotes();
    const note = {
        title,
        id: Date.now().toString()
    }
    notes.push(note);

    await fs.writeFile(notesPath, JSON.stringify(notes));
    console.log(chalk.green('Note was added!'));
}

async function getNotes() {
    const notes = await fs.readFile(notesPath, {encoding: 'utf-8'});
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
    const notes = await getNotes();
    console.log(chalk.bgBlue('Here is the list of notes:'));
    notes.forEach(note => {
        console.log(chalk.blue(note.id, note.title));
    })
}

async function removeNote(id) {
    let notes = await getNotes();
    notes = notes.filter(note => note.id !== id);

    await fs.writeFile(notesPath, JSON.stringify(notes));
    console.log(chalk.green('Note was removed!'));
}

async function editNote(id, newNoteName) {
    let notes = await getNotes();
    let note = notes.findIndex((item) => item.id === id)
    notes[note].title = newNoteName;

    await fs.writeFile(notesPath, JSON.stringify(notes));
}

module.exports = {
    addNote, getNotes, removeNote, editNote
}