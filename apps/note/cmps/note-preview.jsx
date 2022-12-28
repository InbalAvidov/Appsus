
const { useRef, useState, useEffect } = React

import { DynamicCmp } from "./dynamic-note.jsx"

export function NotePreview({ note}) {
    const [cmpType, setCmpType] = useState(note.type)
    return  <DynamicCmp note={note} set/>
   
}
        

        
        
       
       
        