import { storageService } from "../../../services/async-storage.service.js"
import { utilService } from "../../../services/util.service.js"

const NOTE_KEY = 'noteDB'
_createnotes()

export const NoteService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
    addNote,
    pinNote,
    getNoteContent,
}

function query(filterBy = getDefaultFilter()) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => regex.test(note.content))
            }
            if (filterBy.type) {
                notes = notes.filter(note => note.type === filterBy.type)
            }
            return notes
        })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)

}


function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function getDefaultFilter() {
    return { txt: '', type: '' }
}

function _createnotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            {
                id: "n101",
                type: "note-txt",
                isPinned: true,
                info: {
                    txt: "Fullstack Me Baby!"
                },
                isPinned: false,
                isEdit: false,
                content:"Fullstack Me Baby!"
            },
            {
                id: "n102",
                type: "note-img",
                info: {
                    url: "assets/img/puppy.jpg",
                    title: "Image"
                },
                style: {
                    backgroundColor: "#00d"
                },
                isPinned: false,
                isEdit: false,
                content:"assets/img/puppy.jpg"
            },
            {
                id: "n103",
                type: "note-todos",
                info: {
                    label: "Get my stuff together",
                    todos: [
                        { txt: "Driving liscence", doneAt: null },
                        { txt: "Coding power", doneAt: 187111111 }
                    ]
                },
                isPinned: false,
                isEdit: false,
                content:"Get my stuff together,Driving liscence,Coding power"
            }
        ]
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}

function addNote(content, noteType) {
    if (noteType === 'note-txt') return _addTxtNote(content)
    else if (noteType === 'note-img') return _addImgNote(content)
    else if (noteType === 'note-video') return _addVideoNote(content)
    if (noteType === 'note-todos') return _addTodosNote(content)
}

function _addTxtNote(txt) {
    const newNote = {
        id: '',
        type: "note-txt",
        isPinned: false,
        info: {
            txt,
        },
        isPinned: false,
        isEdit: false,
        content:txt
    }
    return save(newNote)
}

function _addTodosNote(text) {
    const todosText = text.split(',')
    const label = todosText.splice(0, 1)
    const todos = todosText.map((todo, idx) => ({ txt: todo, doneAt: null }))
    const newNote = {
        id: "",
        type: "note-todos",
        info: {
            label,
            todos,
        },
        isPinned: false,
        isEdit: false,
        content:todosText.join('')

    }
    return save(newNote)

}
function _addImgNote(src) {
    const newNote = {
        id: '',
        type: "note-img",
        info: {
            url: src,
            title: "Bobi and Me"
        },
        style: {
            backgroundColor: "#00d"
        },
        isPinned: false,
        isEdit: false,
        content:src

    }
    return save(newNote)
}

function _addVideoNote(content) {
    const contentArr = content.split('/')
    const videoId = contentArr[contentArr-1]
    const newNote = {
        id: '',
        type: "note-video",
        title: "My Video",
        videoId,
        content,
        isPinned: false,
        isEdit: false,
        content:contentArr.join('')

    }
    return save(newNote)

}
function pinNote(note) {
    note.isPinned = !note.isPinned
    return save(note)
}

function getNoteContent(note){
    if (note.type === 'note-txt') return note.info.txt
    else if (note.type === 'note-img') return note.info.url
    else if (note.type === 'note-video') return note.content
    if (note.type === 'note-todos'){
        const todos = [...note.info.todos]
        const todosText = todos.map(todo => todo.txt)
        return [note.info.label,...todosText].join(',')
    }
}


