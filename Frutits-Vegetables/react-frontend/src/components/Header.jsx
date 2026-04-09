import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navLinks } from "../data/siteData";
import { getCart } from "../utils/cartUtils";

function Header() {
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);
  const headerClassName =
    location.pathname === "/" ? "full_bg home_header" : "full_bg";

  useEffect(() => {
    const updateCount = () => {
      const cart = getCart();
      setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
    };

    updateCount();
    window.addEventListener("cartUpdated", updateCount);
    window.addEventListener("storage", updateCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCount);
      window.removeEventListener("storage", updateCount);
    };
  }, []);

  return (
    <header className={headerClassName}>
      <div className="header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col logo_section">
              <div className="full">
                <div className="center-desk">
                  <div className="logo">
                    <Link to="/">
                      <img src="/images/logo.png" alt="Sunshine" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9">
              <nav className="navigation navbar navbar-expand-md navbar-dark">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarsExample04"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarsExample04">
                  <ul className="navbar-nav mr-auto">
                    {navLinks.map((item) => (
                      <li key={item.to} className="nav-item">
                        <NavLink
                          to={item.to}
                          end={item.to === "/"}
                          className={({ isActive }) =>
                            `nav-link${isActive ? " active" : ""}`
                          }
                        >
                          {item.label}
                          {item.to === "/cart" && cartCount > 0 && (
                            <span
                              style={{
                                display: "inline-block",
                                marginLeft: "8px",
                                padding: "2px 7px",
                                fontSize: "0.8rem",
                                color: "#fff",
                                backgroundColor: "#dc3545",
                                borderRadius: "12px",
                              }}
                            >
                              {cartCount}
                            </span>
                          )}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
