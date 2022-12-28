const { Link, NavLink } = ReactRouterDOM
export function Home({setIsHome}) {
setIsHome(true)
    return <div className="home-page">
        <div className="home-text">
            <h1>
                Welcome To AppSus
            </h1>
            <p>
                AppSus is a platform where you can reach your
                email,notes and visit our book shop.
                This website was made by Inbal Avidov & Omri Hazan
                we hope you'll enjoy this platform!
            </p>
        </div>
                <nav className="home-links">
                    <NavLink to="/" ><img className="img-home home" src="../assets/img/home.png" /></NavLink>
                    {/* <NavLink to="/about"><img classNameName="img-menu" src="../assets/img/about.jpg"/></NavLink> */}
                    <NavLink to="/mail" ><img className="img-home mail" src="../assets/img/Gmail-logo.png" /></NavLink>
                    <NavLink to="/note" ><img className="img-home note" src="../assets/img/notes.png" /></NavLink>
                </nav>
    </div>
}