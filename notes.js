const fs= require('fs')
const path= require('path');
const { stringify } = require('querystring');

const NOTES_FILE = path.join(__dirname,'notes.json');

function loadNotes(){
    if(!fs.existsSync(NOTES_FILE)) return [];
    return JSON.parse(fs.readFileSync(NOTES_FILE));
}

function saveNotes(notes){
    fs.writeFileSync(NOTES_FILE,JSON.stringify(notes,null,2));
}

function addNote(title,content){
    const notes = loadNotes();
    const newNote={
        id: notes.length+1,
        title,
        content,
        created: new Date().toISOString()
    };
    notes.push(newNote);
    saveNotes(notes);
    console.log('Note Added');
}

function listNotes(){
    const notes=loadNotes();
    notes.forEach(note => {
        console.log(`${note.id}. ${note.title}`);
    });
}

function viewNote(id){
    const notes=loadNotes();
    const note=notes.find(n => n.id===id);
    if(!note) return console.log('Note not found');
    console.log(`\n ${note.title}\n${note.content}\n`);
}

function deleteNote(id){
    let notes=loadNotes();
    const before= notes.length;
    notes=notes.filter(n => n.id !== id);
    if(notes.length==before) return console.log('Note not found.');
    saveNotes(notes);
    console.log('Note deleted.')
}

function searchNotes(keyword){
    let notes=loadNotes();
    const results = notes.filter(n =>
        n.title.toLowerCase().includes(keyword.toLowerCase()) || 
        n.content.toLowerCase().includes(keyword.toLowerCase())
    );
    results.forEach(n=> {
        console.log(`${n.id}. ${n.title}`);
    });
}

module.exports = { addNote, listNotes, viewNote, deleteNote, searchNotes };