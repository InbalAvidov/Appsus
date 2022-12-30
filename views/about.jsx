export function About() {
    return <section className="about">
        <h1>Get To Know Our Developers</h1>
        <div className="about-cards">
            <div className="dev-card">
                <img className="dev-img"  src="./assets/img/inbal.jpg" />
                <div className="dev-info">
                    <h3>Inbal Avidov</h3>
                    <p>Inbal is 22 years old.
                        She is living in Oranit with her boyfriend
                        /co-developer of this app - Omri !
                        Inbal is responsible for the Note app.
                    </p>
                </div>
            </div>
            <div className="dev-card">
                <img className="dev-img" src="./assets/img/omri.jpg" />
                <div className="dev-info">
                    <h3>Omri Hazan</h3>
                    <p>Omri is 24 years old.
                        He is living in Oranit with her girlfriend
                        /co-developer of this app - Inbal !
                        Omri is responsible for the Mail app.
                    </p>
                </div>
            </div>
        </div>
    </section>
}
