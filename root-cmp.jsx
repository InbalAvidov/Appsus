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
import { UserMsg } from "./cmps/user-msg.jsx"



export function App() {

    
   const page = window.location.url
   console.log(page);
    return <Router>
        <section className="app main-layout">
           {  <AppHeader />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailIndex />} />
                <Route path="/mail/new/:mailId" element={<MailNew />} />
                <Route path="/mail/new" element={<MailNew />} />
                <Route path="/mail/:mailId" element={<MailDetails />} />
                <Route path="/note" element={<NoteIndex />}/>
                <Route path="/note/:mailId" element={<NoteIndex />}/>
            </Routes>
        </section>
        <UserMsg/>
    </Router>

}