import { NoteService } from "../services/note.service.js"

const { useState, useEffect } = React

export function NoteAdd({ loadNotes, note }) {
    const [noteType, setNoteType] = useState('note-txt')
    const [content, setContent] = useState('')

    useEffect(() => {
        if (!note) return
        setContent(NoteService.getNoteContent(note))
    }, [])

    function onAddNote() {
        NoteService.addNote(content, noteType).then(note => {
            setContent('')
            loadNotes()
        })
    }

    function onSaveNote() {
        NoteService.addNote(content, note.type).then(() =>
            NoteService.remove(note.id))
            .then(() => loadNotes())

    }

    function handleChange({ target }) {
        const { value } = target
        setContent(value)
    }

    function onImgInput(ev) {
        loadImageFromInput(ev, setContent)
    }

    function loadImageFromInput(ev, onImageReady) {
        const reader = new FileReader()
        reader.onload = (event) => {
            let img = new Image()
            img.src = event.target.result
            img.onload = () => onImageReady(img.src)
        }
        reader.readAsDataURL(ev.target.files[0])
    }


    return <div className="note-add flex space-between">
        <input placeholder={noteType === 'note-img' ? "upload a photo" : noteType === 'note-todos' ? 'Title,task,task...' : noteType === 'note-txt' ? 'Take a note' : 'https://youtu.be/XXXXXXX'} onChange={handleChange} value={content} />
        {!note && <div className="note-add-btn">
            <button onClick={() => setNoteType('note-img')} className={noteType === 'note-img' ? 'active' : ''}>
                <input id="img" style={{ display: 'none' }} type="file" className="file-input btn" onChange={onImgInput} />
                <label htmlFor="img" className="fa-regular fa-image" title="Upload photo"></label>
            </button>
            <button onClick={() => setNoteType('note-video')} className={noteType === 'note-video' ? 'active' : ''}><span className="fa-solid fa-play"></span></button>
            <button onClick={() => setNoteType('note-todos')} className={noteType === 'note-todos' ? 'active' : ''}><span className="fa-solid fa-list"></span></button>
            <button onClick={() => setNoteType('note-txt')} className={noteType === 'note-txt' ? 'active' : ''}><span className="fa-solid fa-edit"></span></button>
            <button onClick={onAddNote}>Add</button>
        </div>}
        {note && note.type === 'note-img' && <div>
         <button>
                <input id="img" style={{ display: 'none' }} type="file" className="file-input btn" onChange={onImgInput} />
                <label htmlFor="img" className="fa-regular fa-image" title="Upload photo"></label>
            </button>
        {note && <button onClick={onSaveNote}><span className="fa-solid fa-done" ></span></button>}
         </div>}
    </div>
}