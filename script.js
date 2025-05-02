document.addEventListener('DOMContentLoaded', () => {
    const marketSummary = document.getElementById('market-summary');
    const watchlist = document.getElementById('watchlist');
    const stockTableBody = document.querySelector('#stock-table tbody');
    const searchInput = document.getElementById('search');

    const allStocks = [
        { symbol: 'AAPL', name: 'Apple Inc.', price: 150.54, change: 0.5 },
        { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2800.66, change: -1.2 },
        { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 3401.46, change: 2.1 },
        { symbol: 'MSFT', name: 'Microsoft Corporation', price: 299.35, change: -0.3 },
        { symbol: 'TSLA', name: 'Tesla Inc.', price: 720.25, change: 3.4 },
        { symbol: 'NFLX', name: 'Netflix Inc.', price: 508.90, change: -2.8 },
    ];

    let watchlistStocks = [];

    function updateMarketSummary() {
        const totalStocks = allStocks.length;
        const positiveChange = allStocks.filter(stock => stock.change > 0).length;
        const negativeChange = allStocks.filter(stock => stock.change < 0).length;

        marketSummary.innerHTML = `
            <div class="summary-item">
                <h3>Total Stocks</h3>
                <p>${totalStocks}</p>
            </div>
            <div class="summary-item">
                <h3>Up</h3>
                <p style="color:green">${positiveChange}</p>
            </div>
            <div class="summary-item">
                <h3>Down</h3>
                <p style="color:red">${negativeChange}</p>
            </div>
        `;
    }

    function renderStockTable(stocks) {
        stockTableBody.innerHTML = '';

        stocks.forEach(stock => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${stock.name} (${stock.symbol})</td>
                <td>$${stock.price.toFixed(2)}</td>
                <td style="color:${stock.change >= 0 ? 'green' : 'red'}">${stock.change}%</td>
                <td>
                    <button class="add" onclick="addToWatchlist('${stock.symbol}')">Add</button>
                </td>
            `;

            stockTableBody.appendChild(row);
        });
    }

    function renderWatchlist() {
        watchlist.innerHTML = '';
        watchlistStocks.forEach(stock => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${stock.name} (${stock.symbol}) - $${stock.price.toFixed(2)}
                <button class="remove" onclick="removeFromWatchlist('${stock.symbol}')">Remove</button>
            `;
            watchlist.appendChild(li);
        });
    }

    // Live search filter
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const filteredStocks = allStocks.filter(stock =>
            stock.name.toLowerCase().includes(query) || stock.symbol.toLowerCase().includes(query)
        );
        renderStockTable(filteredStocks);
    });

    // Initial rendering
    updateMarketSummary();
    renderStockTable(allStocks);
    renderWatchlist();
});

// Functions need to be global for inline onclick attributes to work
function addToWatchlist(symbol) {
    const stock = allStocks.find(s => s.symbol === symbol);
    if (stock && !watchlistStocks.find(s => s.symbol === symbol)) {
        watchlistStocks.push(stock);
        renderWatchlist();
    }
}

function removeFromWatchlist(symbol) {
    watchlistStocks = watchlistStocks.filter(s => s.symbol !== symbol);
    renderWatchlist();
}

// Expose functions globally (since DOMContentLoaded is scoped)
window.addToWatchlist = addToWatchlist;
window.removeFromWatchlist = removeFromWatchlist;
window.renderWatchlist = function () {
    const watchlist = document.getElementById('watchlist');
    watchlist.innerHTML = '';
    watchlistStocks.forEach(stock => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${stock.name} (${stock.symbol}) - $${stock.price.toFixed(2)}
            <button class="remove" onclick="removeFromWatchlist('${stock.symbol}')">Remove</button>
        `;
        watchlist.appendChild(li);
    });
};
