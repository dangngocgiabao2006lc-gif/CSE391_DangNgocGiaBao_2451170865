function createCart() {
    let items = [];
    let discount = 0;

    return {
        addItem(product, quantity = 1) {
            const existing = items.find(i => i.id === product.id);

            if (existing) {
                existing.quantity += quantity;
            } else {
                items.push({ ...product, quantity });
            }
        },

        removeItem(productId) {
            items = items.filter(i => i.id !== productId);
        },

        updateQuantity(productId, newQuantity) {
            const item = items.find(i => i.id === productId);

            if (item) {
                item.quantity = newQuantity;
            }
        },

        getTotal() {
            const total = items.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );

            return total - total * discount;
        },

        applyDiscount(code) {
            if (code === "SALE10") discount = 0.1;
            else if (code === "SALE20") discount = 0.2;
            else discount = 0;
        },

        printCart() {
            console.table(items);

            console.log(
                "Tổng tiền:",
                this.getTotal().toLocaleString() + "đ"
            );
        },

        getItemCount() {
            return items.reduce((sum, item) => sum + item.quantity, 0);
        },

        clearCart() {
            items = [];
        }
    };
}

const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 2, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);

cart.printCart();

cart.applyDiscount("SALE10");

cart.printCart();

console.log(cart.getItemCount());