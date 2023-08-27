export default function returnDatePeriod() {
  function checkDigits(num: number): string {
    let result = String(num);
    if (result.length < 2) {
      result = `0${result}`;
    }
    return result;
  }
  const nowDate = new Date();
  const maxBDate = `${nowDate.getFullYear() - 13}-${checkDigits(nowDate.getMonth() + 1)}-${checkDigits(
    nowDate.getDate()
  )}`;
  const minBDate = `${nowDate.getFullYear() - 133}-${checkDigits(nowDate.getMonth() + 1)}-${checkDigits(
    nowDate.getDate()
  )}`;

  return { maxBDate, minBDate };
}
