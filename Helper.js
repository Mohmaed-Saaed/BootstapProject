export function getTotalQtyItems() {
  return JSON.parse(localStorage.getItem("cart")).reduce(
    (acc, item) => acc + item.qty,
    0,
  );
}
