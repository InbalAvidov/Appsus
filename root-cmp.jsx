const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter
const { useState } = React

import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { MailIndex } from "./apps/mail/views/mail-index.jsx"
import { MailDetails } from "./apps/mail/cmps/mail-details.jsx"
import { MailNew } from "./apps/mail/cmps/mail-new.jsx"
import { NoteIndex } from "./apps/note/views/note-index.jsx"
import { NoteEdit } from "./apps/note/cmps/note-edit.jsx"



export function App() {

    const page = window.location.href
    console.log(page);
    console.log((page.includes('mail') || page.includes('note') ));
    return <Router>
        <section className="app">
            <AppHeader style={{ display: (page.includes('mail') || page.includes('note') ) ? 'block' : 'none' }}/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailIndex />} />
                <Route path="/mail/new/:mailId" element={<MailNew />} />
                <Route path="/mail/:mailId" element={<MailDetails />} />
                <Route path="/note" element={<NoteIndex />}>
                    <Route path="/note/edit/:noteId" element={<NoteEdit />} />
                </Route>
            </Routes>
        </section>
    </Router>

}