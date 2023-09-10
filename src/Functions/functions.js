export function getAge(date) {
  let month_diff = Date.now() - date.getTime();
  let age_dt = new Date(month_diff);
  let year = age_dt.getUTCFullYear();
  return Math.abs(year - 1970);
}
