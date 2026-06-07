const menu = [
    {
        name: "Phở bò",
        price: 65000,
        quantity: 2
    },

    {
        name: "Trà đá",
        price: 5000,
        quantity: 3
    },

    {
        name: "Bún chả",
        price: 55000,
        quantity: 1
    }
];

const isWednesday = true;
const hasTip = true;

let subtotal = 0;

console.log("===== HÓA ĐƠN NHÀ HÀNG =====");

for (let i = 0; i < menu.length; i++) {

    const item = menu[i];

    const total =
        item.price * item.quantity;

    subtotal += total;

    console.log(
        `${i + 1}. ${item.name} x${item.quantity} = ${total.toLocaleString("vi-VN")}đ`
    );
}

let discount = 0;

if (subtotal > 1000000) {
    discount += subtotal * 0.15;
}
else if (subtotal > 500000) {
    discount += subtotal * 0.10;
}

if (isWednesday) {
    discount += subtotal * 0.05;
}

const afterDiscount =
    subtotal - discount;

const vat =
    afterDiscount * 0.08;

let tip = 0;

if (hasTip) {
    tip = afterDiscount * 0.05;
}

const finalTotal =
    afterDiscount + vat + tip;

console.log("\nTổng cộng:",
    subtotal.toLocaleString("vi-VN") + "đ");

console.log("Giảm giá:",
    discount.toLocaleString("vi-VN") + "đ");

console.log("VAT:",
    vat.toLocaleString("vi-VN") + "đ");

console.log("Tip:",
    tip.toLocaleString("vi-VN") + "đ");

console.log("THANH TOÁN:",
    finalTotal.toLocaleString("vi-VN") + "đ");