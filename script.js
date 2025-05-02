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
        // Add more stocks as needed
    ];

    let watchlistStocks = [
        { symbol: 'AAPL', name: 'Apple Inc.', price: 150.54, change: 0.5 },
        { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2800.66, change: -1.2 },
        // Add more stocks as needed
    ];

    function updateMarketSummary() {
        const totalStocks = allStocks.length;
        const positiveChange = allStocks.filter(stock => stock.change > 0).length;
        const negativeChange = allStocks.filter(stock => stock.change < 0).length;

        marketSummary.innerHTML = `
            <div
::contentReference[oaicite:10]{index=10}
 
