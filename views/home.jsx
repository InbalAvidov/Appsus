const { Link, NavLink } = ReactRouterDOM
export function Home() {
    return <div className="home-page">
        <div className="home-text">
            <h1>
                Welcome To AppSus
            </h1>
            <h3>
                AppSus is a platform where you can
                reach your email and notes
            </h3><br />
            <h4>
                This website was made by Inbal Avidov & Omri Hazan
                we hope you'll enjoy this platform!
            </h4>

            <div className="home-links">
                <Link to="/" ><img className="img-home home" src="./assets/img/home.png" /></Link>
                <Link to="/mail"><img className="img-home mail" src="./assets/img/mail.png" /></Link>
                <Link to="/note"><img className="img-home note" src="./assets/img/keep.png" /></Link>
                <Link to="/about"><img className="img-home" src="./assets/img/about.png" /></Link>
            </div>
        </div>
    </div>
}