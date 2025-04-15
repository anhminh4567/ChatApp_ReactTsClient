function FormatMoneyVND(money: number) {
  switch (true) {
    case money >= 1000 * 1000 * 1000:
      return `${(money / (1000 * 1000 * 1000)).toFixed(1)} ty`;

    case money >= 1000 * 1000:
      return `${(money / (1000 * 1000)).toFixed(1)} tr`;

    case money >= 1000:
      return `${(money / 1000).toFixed(1)} k`;
    default:
      return `${money}`;
  }
}
function FormatMoneyCommaVND(money: number) {
  let moneyCharArray = money.toString().split("").reverse();
  let result = "";
  moneyCharArray.forEach((char, index) => {
    let position = index + 1;
    if (position % 3 === 1 && position > 1) result = "," + result;
    result = char + result;
  });
  return result;
}
export const Formatter = {
  FormatMoneyVND,
  FormatMoneyCommaVND,
};
