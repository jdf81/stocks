/* --------------------------------------------------------------
   Stock Finder – main JavaScript logic (fixed)
   -------------------------------------------------------------- */

const API_KEY = 'YOUR_REAL_API_KEY_HERE';   // <-- replace with a real key
const ENDPOINT = 'https://api.twelvedata.com/search';

/* --------------------------------------------------------------
   1️⃣ Search function – uses the correct query parameter and
       correctly parses the response (works for both “symbol=…”
       and “q=…” styles). Returns an array of stock objects.
   -------------------------------------------------------------- */
async function searchStocks(keyword) {
  try {
    // <-- NOTE: use `q=` for a free‑text keyword search
    const url = `${ENDPOINT}?q=${encodeURIComponent(keyword)}&apikey=${API_KEY}&prettyjson`;

    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

    const data = await resp.json();

    // TwelfthData may return {status:"success", symbols: [...]}
    // or just an array of items. Handle both.
    let symbols;
    if (data.status === 'success' && Array.isArray(data.symbols)) {
      symbols = data.symbols;
    } else if (Array.isArray(data)) {
      symbols = data;                     // older API version
    } else {
      throw new Error('Invalid API response');
    }

    // Keep only real stocks (ignore ETFs, futures, etc.)
    const stocks = symbols.filter(item => item.type === 'stock');

    return stocks;
  } catch (err) {
    console.error('Search error:', err);
    return [];   // empty list → UI can show “no matches”
  }
}

/* --------------------------------------------------------------
   2️⃣ Render the list of matches – now we also display the
       company name and a little bit more context.
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

    // Show: Symbol – Company Name (Exchange)
    const txt = `${stock.symbol} – ${stock.name} (${stock.exchange})`;
    const span = document.createElement('span');
    span.textContent = txt;
    li.appendChild(span);

    stockList.appendChild(li);
  });
}

/* --------------------------------------------------------------
   3️⃣ Event listeners (unchanged)
   -------------------------------------------------------------- */
searchBtn.addEventListener('click', async () => {
  const keyword = keywordInput.value.trim();
  if (!keyword) return;

  toggleResults(false);
  stockList.innerHTML = '<li>Loading…</li>';

  const matches = await searchStocks(keyword);
  renderResults(matches, keyword);
});

keywordInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') searchBtn.click();
});

