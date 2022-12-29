const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    return <header className="app-header">
        <Link to="/">
            <h1>AppSus</h1>
        </Link>
        <nav>
            <NavLink to="/" ><img className="img-menu home" src="./assets/img/home.png"/></NavLink>
            {/* <NavLink to="/about"><img className="img-menu" src="../assets/img/about.jpg"/></NavLink> */}
            <NavLink to="/mail"><img className="img-menu mail" src="./assets/img/mail.png"/></NavLink>
            <NavLink to="/note"><img className="img-menu note" src="./assets/img/notes.png"/></NavLink>
        </nav>
    </header>
}
