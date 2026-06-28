function buildSummary(items) {
  const total = items.length
  if (total === 0) {
    return {
      total: 0,
      winRate: '0%',
      avgKd: '0.00',
      avgAdr: '0'
    }
  }

  const wins = items.filter((item) => item.result === 'win').length
  const kd = items.reduce((sum, item) => sum + item.kills / Math.max(item.deaths, 1), 0) / total
  const adr = items.reduce((sum, item) => sum + item.adr, 0) / total

  return {
    total,
    winRate: `${Math.round((wins / total) * 100)}%`,
    avgKd: kd.toFixed(2),
    avgAdr: `${Math.round(adr)}`
  }
}

module.exports = {
  buildSummary
}
