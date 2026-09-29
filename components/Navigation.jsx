export default function Navigation(){
    return (
        <aside className="side-navigation">
            <a className="club-mark" href="#overview" aria-label="Country Club home">
                <span className="club-mark-icon">C</span>
                <span className="club-mark-name">COUNTRY<br />CLUB</span>
            </a>
            <div className="nav-divider" />
            <p className="nav-section-label">WORKSPACE</p>
            <nav className="nav-links" aria-label="Main navigation">
                <a className="nav-link is-active" href="#overview"><span className="nav-glyph material-symbol" aria-hidden="true">dashboard</span>Overview</a>
                <a className="nav-link" href="#members"><span className="nav-glyph material-symbol" aria-hidden="true">groups</span>Members</a>
                <a className="nav-link" href="#packages"><span className="nav-glyph material-symbol" aria-hidden="true">card_membership</span>Subscriptions</a>
            </nav>
            <div className="nav-footer">
                <span className="admin-avatar">AM</span>
                <span className="admin-details"><strong>Telvin Mugambi</strong><small>Club administrator</small></span>
            </div>
        </aside>
    )
}