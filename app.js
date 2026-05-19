/* --------------------------------------------------------------
   Stock Finder – main JavaScript logic
   -------------------------------------------------------------- */

const API_KEY = 'DEMO_API_KEY'; // <-- replace with a real key (see note below)
const ENDPOINT = 'd2daae79b6014e0790687cbaf15de001';

const keywordInput = document.getElementById('keyword');
const searchBtn    = document.getElementById('searchBtn');
const resultsSection = document.getElementById('results');
const queryDisplay   = document.getElementById('queryDisplay');
const stockList      = document.getElementById('stockList');

/**
 * Show / hide the results UI
 */
function toggleResults(show) {
  resultsSection.classList.toggle('hidden', !show);
}

/* --------------------------------------------------------------
   1️⃣ Search function – calls the TwelfthData “search” endpoint.
   The API returns an array of objects; each object contains:
     - symbol
     - name
     - exchange
     - type (stock, etf, etc.)
   We filter to keep only "stock" entries and then render them.
   -------------------------------------------------------------- */
async function searchStocks(keyword) {
  try {
    const url = `${ENDPOINT}?symbol=${encodeURIComponent(keyword)}&apikey=${API_KEY}&prettyjson`;
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

    const data = await resp.json();

    // TwelfthData returns { status: "success", symbols: [...] }
    if (data.status !== 'success' || !Array.isArray(data.symbols)) {
      throw new Error('Invalid API response');
    }

    // Keep only real stocks (ignore ETFs, futures, etc.)
    const stocks = data.symbols.filter(item => item.type === 'stock');

    return stocks;
  } catch (err) {
    console.error('Search error:', err);
    // Return an empty array so UI can show a friendly message
    return [];
  }
}

/* --------------------------------------------------------------
   2️⃣ Render the list of matches.
   -------------------------------------------------------------- */
function renderResults(stocks, query) {
  toggleResults(true);
  queryDisplay.textContent = query;

  // Clear any previous rows
  stockList.innerHTML = '';

  if (stocks.length === 0) {
    const emptyItem = document.createElement('li');
    emptyItem.textContent = 'No matches found.';
    stockList.appendChild(emptyItem);
    return;
  }

  stocks.forEach(stock => {
    const li = document.createElement('li');

    // Create a link that could navigate to a detailed view (optional)
    const link = document.createElement('a');
    link.href = '#';                     // placeholder – you can replace with /stock.html?symbol=...
    link.textContent = `${stock.symbol} (${stock.exchange})`;
    link.title = stock.name;

    const symbolSpan = document.createElement('span');
    symbolSpan.textContent = stock.symbol;

    li.appendChild(symbolSpan);
    li.appendChild(link);
    stockList.appendChild(li);
  });
}

/* --------------------------------------------------------------
   3️⃣ Event listeners
   -------------------------------------------------------------- */
searchBtn.addEventListener('click', async () => {
  const keyword = keywordInput.value.trim();
  if (!keyword) return;

  // Show a quick “loading” UI (you could add a spinner)
  toggleResults(false);
  stockList.innerHTML = '<li>Loading…</li>';

  const matches = await searchStocks(keyword);
  renderResults(matches, keyword);
});

/* --------------------------------------------------------------
   4️⃣ Optional: hit “Enter” while typing
   -------------------------------------------------------------- */
keywordInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') searchBtn.click();
});

/* --------------------------------------------------------------
   5️⃣ Service Worker registration – already handled in index.html,
       but we keep this snippet for clarity.
   -------------------------------------------------------------- */
//if ('serviceWorker' in navigator) { ... } // see index.html

/* --------------------------------------------------------------
   👉 IMPORTANT: Replace the demo API key with a real one
   --------------------------------------------------------------
   The free TwelfthData plan gives you 500 requests per month and
   uses the key `DEMO_API_KEY`. For production use sign up at:
   https://twelvedata.com/ (or any other stock‑data provider).

   If you prefer a different provider, just change:
     - ENDPOINT URL
     - request parameters
     - parsing logic inside `searchStocks`
   -------------------------------------------------------------- */
