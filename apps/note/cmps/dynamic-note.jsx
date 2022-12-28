

export function DynamicCmp({ note, loadNotes }) {
    switch (note.type) {
        case 'note-txt':
            return <div className="note-content">
                <p>{note.info.txt}</p>
            </div>
        case 'note-img':
            return <div className="note-content">
            <img className="note-img" src={note.info.url}/>
            </div>
        case 'note-todos':
            return <div className="note-content">
                <h2>{note.info.label}</h2>
                <ul>
                    {note.info.todos.map((todo, idx) => <li key={idx}>{todo.txt}</li>)}
                </ul>
            </div>
    }
}