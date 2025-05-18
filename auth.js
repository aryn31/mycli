const fs = require('fs')
const bcrypt = require('bcrypt')
const USERS_FILE = 'users.json';

function loadUsers(){
    if(!fs.existsSync(USERS_FILE)) return [];
    return JSON.parse(fs.readFileSync(USERS_FILE));
}

function saveUsers(users){
    fs.writeFileSync(USERS_FILE,JSON.stringify(users,null,2));
}

async function register(username,password) {
    const users=loadUsers();
    if(users.find(u => u.username === username)){
        return console.log('Username already exists');
    }
    const passwordHash=await bcrypt.hash(password,10);
    users.push({username,passwordHash});
    saveUsers(users);
    console.log('User registered');
}

async function login(username, password) {
  const users = loadUsers();
  const user = users.find(u => u.username === username);
  if (!user) return console.log('User not found.');
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) return console.log('Incorrect password.');
  fs.writeFileSync('session.json', JSON.stringify({ username }));
  console.log(`Welcome, ${username}`);
}

function getLoggedInUser() {
  if (!fs.existsSync('session.json')) return null;
  return JSON.parse(fs.readFileSync('session.json')).username;
}

function logout() {
  fs.unlinkSync('session.json');
  console.log('Logged out.');
}

module.exports = { register, login, logout, getLoggedInUser };