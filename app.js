
const validator = require('validator')
const notes = require('./notes')
const chalk = require('chalk')
const yargs = require('yargs')

yargs.version('1.0.0')

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder:{
        title:{
            description: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body:{
            description: 'body of node',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){ notes.addNote(argv.title, argv.body)}
})

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder:{
        title:{
            description: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){ notes.removeNote(argv.title)}
})

yargs.command({
    command: 'list',
    describe: 'List the notes',
    handler(){notes.listNotes()}
})

yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){notes.readNote(argv.title)}
})

//console.log(yargs.argv)
yargs.parse()