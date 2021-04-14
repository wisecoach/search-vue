export function formatBirth(birth){
  let timestamp = new Date() - new Date(birth)
  return Math.floor(timestamp / 1000 / 3600 / 24 / 365)
}

export const degrees = {
  1: '小学',
  2: '初中',
  3: '高中',
  4: '大专',
  5: '本科',
  6: '研究生',
  7: '博士生'
}

export function formatDegree(degree){
  return degrees[degree] || '未知'
}
