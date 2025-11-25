/**
 * Calculate reward points for a single transaction amount
 * - 2 pts per dollar over $100
 * - 1 pt per dollar between $50 and $100
 * Fractional dollars do not create partial points (floor used)
 */
export function pointsForAmount(amount) {
  if (typeof amount !== 'number' || Number.isNaN(amount) || amount <= 0) return 0;
  const dollars = Math.floor(amount);
  let points = 0;
  if (dollars > 100) {
    points += (dollars - 100) * 2;
    points += 50 * 1;
  } else if (dollars > 50) {
    points += (dollars - 50) * 1;
  }
  return points;
}
export function pointsForTransaction(tx) {
  return pointsForAmount(tx.amount);
}
export function aggregateCustomerTransactions(transactions) {
  const map = {};
  transactions.forEach((tx) => {
    const d = new Date(tx.date);
    if (Number.isNaN(d)) return;
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    map[key] = map[key] || { transactions: [], points: 0 };
    const p = pointsForTransaction(tx);
    map[key].transactions.push({ ...tx, points: p });
    map[key].points += p;
  });
  return map;
}
