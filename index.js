#!/usr/bin/env node
const { program } = require('commander');
const { addNote, listNotes, viewNote, deleteNote, searchNotes } = require('./notes');

program
  .command('add <title> <content>')
  .description('Add a new note')
  .action(addNote);

program
  .command('list')
  .description('List all notes')
  .action(listNotes);

program
  .command('view <id>')
  .description('View a note by ID')
  .action(id => viewNote(parseInt(id)));

program
  .command('delete <id>')
  .description('Delete a note by ID')
  .action(id => deleteNote(parseInt(id)));

program
  .command('search <keyword>')
  .description('Search notes by keyword')
  .action(searchNotes);

program.parse(process.argv);
