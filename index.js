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

program
  .command('register <username> <password>')
  .description('Register a new user')
  .action(async (u, p) => {
    await require('./auth').register(u, p);
  });

program
  .command('login <username> <password>')
  .description('Login as an existing user')
  .action(async (u, p) => {
    await require('./auth').login(u, p);
  });

program
  .command('logout')
  .description('Log out of the current session')
  .action(() => {
    require('./auth').logout(); // If logout is sync, this is fine
  });


program.parse(process.argv);



