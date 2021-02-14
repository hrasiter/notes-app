const fs = require('fs')
const chalk = require('chalk')
const readNote = (title)=>{
    const notes = loadNotes()

    const note = notes.find((note)=> note.title === title)

    debugger

    if(note){
        console.log(chalk.bold(note.title))
        console.log(note.body)
    }
    else
        console.log(chalk.red.inverse('Note not found!'))
}

const addNote = (title, body) => {
    const notes = loadNotes()

    const dublicateNotes = notes.filter((note) => note.title === title)

    if (dublicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added.'))
    } else {
        console.log(chalk.red.inverse('Title already taken'))
    }
}

const saveNotes = (notes) => {
    const notesJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', notesJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const notesJSON = dataBuffer.toString()
        return JSON.parse(notesJSON)
    } catch (e) {
        return []
    }

}

const removeNote = (title)=>{
    
    const notes = loadNotes()
    const foundNotes = notes.filter((note)=> note.title !== title)

    saveNotes(foundNotes)

    if(foundNotes.length === notes.length)
        console.log(chalk.bgRed('Note not found'))
    else
        console.log(chalk.bgGreen('Note removed'))
}

const listNotes = ()=>{
    console.log(chalk.bold('Your notes...'))
    const notes = loadNotes()
    // for (const note of notes) {
    //     console.log(note.title)
    // }

    notes.forEach(element => {
        console.log(element.title)
    });
}

module.exports = {
    addNote : addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}