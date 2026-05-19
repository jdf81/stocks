/* ==== Reset + basic box‑sizing ==== */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* ==== Layout ==== */
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  background: #f5f5f5;
  color: #222;
  line-height: 1.5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header & Footer */
.app-header,
.app-footer {
  padding: 1rem;
  text-align: center;
  background: #0d6efd;               /* Bootstrap blue – works well on iOS */
  color: white;
}
.app-footer {
  margin-top: auto;
  font-size: 0.85rem;
}

/* Main content */
.app-main {
  flex: 1;
  padding: 1rem;
  max-width: 600px;   /* nice width on large screens */
  margin: 0 auto;
}

/* Search section */
.search-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.search-section label {
  font-weight: 600;
}
.search-section input {
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.search-section button {
  align-self: flex-start;   /* left‑align the button */
  padding: 0.6rem 1rem;
  font-size: 1rem;
  background: #0d6efd;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.search-section button:hover {
  background: #0b5ed7;
}

/* Results */
.results-section {
  margin-top: 1rem;
}
.results-section h2 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}
#stockList {
  list-style: none;
  padding-left: 0;
}
#stockList li {
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  padding: 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#stockList li a {
  text-decoration: none;
  color: #0d6efd;
  font-weight: 500;
}
#stockList li a:hover {
  text-decoration: underline;
}

/* Hidden helper */
.hidden { display: none; }

/* iOS dark‑mode tweak (optional) */
@media (prefers-color-scheme: dark) {
  body { background:#121212; color:#eee; }
  .app-header, .app-footer { background:#1a73e8; }
  #stockList li { background:#2b2b2b; border-color:#555; }
}
