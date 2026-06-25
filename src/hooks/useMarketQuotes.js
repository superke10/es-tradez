import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export function formatPrice(value, precision) {
  if (!value) return "—";
  if (value >= 1000) return value.toLocaleString("en-US", { maximumFractionDigits: 0 });
  const digits = precision ?? (value >= 1 ? 2 : 4);
  return value.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

export function formatChange(pct) {
  if (pct == null) return "—";
  return `${pct >= 0 ? "+" : ""}${pct.toFixed(2)}%`;
}

export function useMarketQuotes(symbols) {
  return useQuery({
    queryKey: ['marketQuotes', symbols],
    queryFn: async () => {
      const res = await base44.functions.invoke('getMarketQuotes', { symbols });
      return res.data.quotes || [];
    },
    refetchInterval: 30000,
    staleTime: 25000,
  });
}