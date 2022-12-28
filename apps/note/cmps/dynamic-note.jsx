import { Img } from "./img-note.jsx"
import { Todos } from "./todos-note.jsx"
import { Txt } from "./txt-note.jsx"

export function DynamicCmp({note}) {
    switch (note.type) {
        case 'note-txt':
            return <Txt note={note} />
        case 'note-img':
            return <Img note={note}/>
        case 'note-todos':
            return <Todos note={note} />
    }
}