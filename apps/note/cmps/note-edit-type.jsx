const { useState } = React

export function NoteEditByType ({note}){

    switch (note.type) {
        case 'note-txt':
            return <div className="note-content">
                <input value={note.info.txt} />
            </div>
        case 'note-img':
            return <div className="note-content">
                <img className="note-img" src={note.info.url} />
            </div>
        case 'note-todos':
            return <div className="note-content">
                <h2>{note.info.label}</h2>
                <ul>
                    {note.info.todos.map((todo, idx) => <li key={idx}>{todo.txt}</li>)}
                </ul>
            </div>
        case 'note-video':
            return <div className="note-content">
                <iframe width="100% "height="100%" src={`https://www.youtube.com/embed/${note.videoId}`} title="Youtube Player" frameBorder="0" allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"/>
            </div>
    }
}