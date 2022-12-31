const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {




    return <header className="app-header full main-layout">
        <Link to="/">
            <h1 className="logo">AppSus</h1>
        </Link>
        <div className="main-menu" >
            <nav >
                <NavLink to="/" ><img className="img-menu home" src="./assets/img/home.png" /></NavLink>
                <NavLink to="/mail"><img className="img-menu mail" src="./assets/img/mail.png" /></NavLink>
                <NavLink to="/note"><img className="img-menu note" src="./assets/img/keep.png" /></NavLink>
                <NavLink to="/about"><img className="img-menu" src="./assets/img/about.png" /></NavLink>
            </nav>
            <button>
                <span className="fa-solid fa-menu menu-btn header"></span>
            </button>
        </div>
    </header>
}
