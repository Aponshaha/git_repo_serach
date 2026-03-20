import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="page-wrapper">
      <header className="navbar">
        <div className="container">
          <div className="navbar-inner">
            <span className="navbar-brand">Repo Search Dashboard</span>
          </div>
          {/* <nav className="nav-links">
            <NavLink to="/" end className={linkClass}>
              Dashboard
            </NavLink>
          </nav> */}
        </div>
      </header>
      <main className="container main-content">
        <Outlet />
      </main>
    </div>
  );
}
