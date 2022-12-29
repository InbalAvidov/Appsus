import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { NoteService } from "../services/note.service.js"

const { useState, useEffect } = React

export function NoteAdd({ loadNotes, note, setIsEdit }) {
    const [noteType, setNoteType] = useState('note-txt')
    const [content, setContent] = useState('')

    useEffect(() => {
        if (!note) return
        setContent(NoteService.getNoteContent(note))
    }, [])

    function onAddNote() {
        NoteService.addNote(content, noteType, false).then(note => {
            setContent('')
            loadNotes()
        })
        showSuccessMsg('Your note was added successfully!')
    }

    function onSaveNote(ev) {
        ev.stopPropagation()
        NoteService.addNote(content, note.type, note.isPinned).then(() =>
            NoteService.remove(note.id))
            .then(() => {
                setIsEdit(false)
                loadNotes()
            })
        showSuccessMsg('Your note was saved successfully!')

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
            <button title="Video" onClick={() => setNoteType('note-video')} className={noteType === 'note-video' ? 'active' : ''}><span className="fa-solid fa-play"></span></button>
            <button title="List" onClick={() => setNoteType('note-todos')} className={noteType === 'note-todos' ? 'active' : ''}><span className="fa-solid fa-list"></span></button>
            <button title="Text" onClick={() => setNoteType('note-txt')} className={noteType === 'note-txt' ? 'active' : ''}><span className="fa-solid fa-edit"></span></button>
            <button onClick={onAddNote}>Add</button>
        </div>}
        {note &&
            <div>
                <button onClick={onSaveNote}><span className="fa-solid fa-done" ></span></button>
                {note.type === 'note-img' &&
                    <button>
                        <input id="img" style={{ display: 'none' }} type="file" className="file-input btn" onChange={onImgInput} />
                        <label htmlFor="img" className="fa-regular fa-image" title="Upload photo"></label>
                    </button>}
            </div>}
    </div>
}