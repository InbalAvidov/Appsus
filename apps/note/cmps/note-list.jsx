const {useState,useEffect} = React

import { NotePreview } from "./note-preview.jsx"


export function NoteList({notes}) {

    return <div className="note-list">
             {
            notes.map(note => <div key={note.id}>
                <NotePreview note={note} />
            </div>)
        }
        </div>

}

