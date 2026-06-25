Deno.serve(async (req) => {
  try {
    const body = await req.json();
    const symbols = body?.symbols;
    if (!Array.isArray(symbols) || symbols.length === 0) {
      return Response.json({ error: 'symbols array required' }, { status: 400 });
    }

    const apiKey = Deno.env.get("FINNHUB_API_KEY");

    const quotes = await Promise.all(
      symbols.map(async (symbol) => {
        try {
          if (symbol.startsWith("OANDA:")) {
            return await fetchForexRate(symbol);
          }
          if (!apiKey) return nullQuote(symbol);
          const res = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${apiKey}`
          );
          const data = await res.json();
          return {
            symbol,
            price: data.c || null,
            change: data.d ?? 0,
            percentChange: data.dp ?? 0,
            high: data.h || null,
            low: data.l || null,
            previousClose: data.pc || null,
          };
        } catch {
          return nullQuote(symbol);
        }
      })
    );

    return Response.json({ quotes });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});

function nullQuote(symbol) {
  return { symbol, price: null, change: 0, percentChange: 0, high: null, low: null, previousClose: null };
}

async function fetchForexRate(symbol) {
  const pair = symbol.replace("OANDA:", "");
  const [from, to] = pair.split("_");

  const today = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const start = weekAgo.toISOString().split("T")[0];
  const end = today.toISOString().split("T")[0];

  const res = await fetch(
    `https://api.frankfurter.app/${start}..${end}?from=${from}&to=${to}`
  );
  const data = await res.json();

  const rates = data.rates;
  if (!rates || Object.keys(rates).length === 0) return nullQuote(symbol);

  const sortedDates = Object.keys(rates).sort();
  const latestDate = sortedDates[sortedDates.length - 1];
  const prevDate = sortedDates[sortedDates.length - 2] || latestDate;

  const price = rates[latestDate][to];
  const prevPrice = rates[prevDate][to] || price;

  const change = price - prevPrice;
  const percentChange = prevPrice ? (change / prevPrice) * 100 : 0;

  return {
    symbol,
    price,
    change,
    percentChange,
    high: null,
    low: null,
    previousClose: prevPrice,
  };
}