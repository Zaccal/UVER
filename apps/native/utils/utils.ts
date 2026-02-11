export function fallbackAvatarGenrator(name: string) {
  return name[0].toUpperCase() + name[1].toLocaleUpperCase();
}

export function formatNumberPrice(price: string | number) {
  if (typeof price === "string") {
    price = price.replace(/,/g, "");
    if (price === "" || isNaN(Number(price))) return "";
    price = Number(price);
  }
  if (typeof price !== "number" || isNaN(price)) {
    return "";
  }
  return price.toLocaleString();
}
