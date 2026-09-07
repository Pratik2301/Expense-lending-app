import { NavLink } from "react-router-dom";

// This one component becomes a left sidebar on wide screens and a
// bottom tab bar on narrow screens — all controlled from index.css,
// no separate mobile component needed.
export default function Navbar() {
  const links = [
    { to: "/", label: "Overview", icon: "◧" },
    { to: "/expenses", label: "Expenses", icon: "◈" },
    { to: "/lending", label: "Lending", icon: "◆" },
  ];

  return (
    <nav className="nav">
      <div className="nav-brand">Ledger</div>
      <ul className="nav-links">
        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
            >
              <span className="nav-icon" aria-hidden="true">{link.icon}</span>
              <span>{link.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
