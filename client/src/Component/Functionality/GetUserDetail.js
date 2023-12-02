export function getUserDetail() {
  const detailString = localStorage.getItem('Detail');
  return detailString ? JSON.parse(detailString) : null;
}