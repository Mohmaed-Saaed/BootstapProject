export function getTotalQtyItems() {
  return localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart")).reduce(
        (acc, item) => acc + item.qty,
        0,
      )
    : 0;
}
