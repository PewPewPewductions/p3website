export function Header() {
  return (
    <header className="top">
      <div className="wrap topbar">
        <a className="brand" href="#top">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/Logo_P3.webp" alt="Pew Pew Pewductions" />
          <span>
            <b>Pew Pew Pewductions</b>
            <em>Elevating your airsoft experience</em>
          </span>
        </a>
        <nav className="main">
          <a href="#campaign">Campaign</a>
          <a href="#operations">Operations</a>
          <a href="#factions">Factions</a>
          <a href="#intel">Intel</a>
          <a href="#roster">About</a>
        </nav>
        <a className="btn btn-primary" href="https://pewpewpewductions.com/s/shop">
          Shop
        </a>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site">
      <div className="wrap foot">
        <div>
          <p className="eyebrow" style={{ marginBottom: 8 }}>
            Pew Pew Pewductions
          </p>
          <small>Airsoft event organizing and hosting · Colorado</small>
        </div>
        <div className="links">
          <a href="mailto:pewpewpewductions@gmail.com">Email</a>
          <a href="https://www.instagram.com/pewpewpewductions">Instagram</a>
          <a href="https://www.youtube.com/@PewPewPewductions">YouTube</a>
          <a href="https://pewpewpewductions.com/s/shop">Shop</a>
          <a href="/admin">Admin</a>
        </div>
      </div>
    </footer>
  );
}
