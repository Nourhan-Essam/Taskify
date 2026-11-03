import './BottomNav.css';

const BottomNav = ({currentPage, setCurrentPage}) => {
    return(
    <div className="bottom-nav">
        <button onClick={() => setCurrentPage("home")} 
                className={`nav-item ${currentPage === "home" ? "active" : ""}`}>
                <span>🏠</span>
                <p>Home</p>
        </button>
        <button 
                onClick={() => setCurrentPage("create")} 
                className={`nav-item ${currentPage === "create" ? "active" : ""}`}
            >
                <span>➕</span>
                <p>Add</p>
            </button>

            <button 
        className={`nav-item ${currentPage === 'welcome' ? 'active' : ''}`}
        onClick={() => setCurrentPage('welcome')}
      >
        <span className="nav-icon">🙋🏻‍♂️</span>
        <span className="nav-label">Profile</span>
      </button>
    </div>
    )
}
export default BottomNav;