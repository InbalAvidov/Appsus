const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter
const {useState} = React

import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { MailIndex } from "./apps/mail/views/mail-index.jsx"
import { MailDetails } from "./apps/mail/cmps/mail-details.jsx"
import { MailNew } from "./apps/mail/cmps/mail-new.jsx"
import { NoteIndex } from "./apps/note/views/note-index.jsx"



export function App() {
const [isHome, setIsHome] = useState(true)
    return <Router>
        <section className="app">
        {!isHome && <AppHeader setIsHome={setIsHome} />}
            <Routes>
                <Route path="/" element={<Home setIsHome={setIsHome} />} />
                <Route path="/about" element={<About setIsHome={setIsHome} />} />
                <Route path="/mail" element={<MailIndex setIsHome={setIsHome} />} />
                <Route path="/mail/new/:mailId" element={<MailNew />} />
                <Route path="/mail/:mailId" element={<MailDetails />} />
                <Route path="/note" element={<NoteIndex setIsHome={setIsHome} />} />
            </Routes>
        </section>
    </Router>
}
