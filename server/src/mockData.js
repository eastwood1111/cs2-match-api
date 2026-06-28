function buildMockMatches(userId, steamAccount) {
  const now = Date.now()
  const steamName = steamAccount.steamName || '你'
  const steamId64 = steamAccount.steamId64

  return [
    {
      shareCode: `mock-${userId}-mirage`,
      mapName: 'de_mirage',
      mode: 'Premier',
      startedAt: new Date(now - 1000 * 60 * 90).toISOString(),
      score: '13:9',
      result: 'win',
      durationSeconds: 2740,
      kills: 22,
      deaths: 14,
      assists: 5,
      adr: 91,
      rating: 1.24,
      parseStatus: 'parsed',
      source: 'mock',
      players: [
        player(steamId64, steamName, 'T', 22, 14, 5, 91, true),
        player('76561198000000001', 'Anchor', 'T', 17, 16, 8, 76, false),
        player('76561198000000002', 'Entry', 'T', 20, 18, 4, 83, false),
        player('76561198000000003', 'Lurk', 'T', 14, 15, 7, 64, false),
        player('76561198000000004', 'IGL', 'T', 11, 17, 10, 58, false)
      ]
    },
    {
      shareCode: `mock-${userId}-ancient`,
      mapName: 'de_ancient',
      mode: 'Premier',
      startedAt: new Date(now - 1000 * 60 * 60 * 22).toISOString(),
      score: '11:13',
      result: 'loss',
      durationSeconds: 3010,
      kills: 18,
      deaths: 19,
      assists: 6,
      adr: 78,
      rating: 0.96,
      parseStatus: 'parsed',
      source: 'mock',
      players: [
        player(steamId64, steamName, 'CT', 18, 19, 6, 78, true),
        player('76561198000000005', 'Short', 'CT', 16, 20, 4, 69, false),
        player('76561198000000006', 'Donut', 'CT', 21, 18, 2, 87, false),
        player('76561198000000007', 'Cave', 'CT', 12, 21, 9, 54, false),
        player('76561198000000008', 'Temple', 'CT', 15, 18, 5, 66, false)
      ]
    },
    {
      shareCode: `mock-${userId}-inferno`,
      mapName: 'de_inferno',
      mode: 'Competitive',
      startedAt: new Date(now - 1000 * 60 * 60 * 48).toISOString(),
      score: '12:12',
      result: 'draw',
      durationSeconds: 2895,
      kills: 25,
      deaths: 17,
      assists: 4,
      adr: 99,
      rating: 1.31,
      parseStatus: 'parsed',
      source: 'mock',
      players: [
        player(steamId64, steamName, 'T', 25, 17, 4, 99, true),
        player('76561198000000009', 'Banana', 'T', 19, 19, 8, 82, false),
        player('76561198000000010', 'Apps', 'T', 13, 18, 6, 61, false),
        player('76561198000000011', 'Pit', 'T', 16, 16, 5, 73, false),
        player('76561198000000012', 'Moto', 'T', 11, 22, 7, 52, false)
      ]
    }
  ]
}

function player(steamId64, name, team, kills, deaths, assists, adr, isCurrentUser) {
  return {
    steamId64,
    name,
    team,
    kills,
    deaths,
    assists,
    adr,
    isCurrentUser
  }
}

module.exports = {
  buildMockMatches
}
