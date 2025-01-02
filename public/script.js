// Rendelés részletek megtekintése a listaelemre kattintva
const orderItems = document.querySelectorAll(".order-item");

orderItems.forEach(item => {
    item.addEventListener("click", function () {
        const orderId = item.getAttribute("data-id");
        // Átirányítás a részletes rendelés oldalra, rendelés azonosítóval
        window.location.href = `/order/edit/${orderId}`;
    });
});

// Új rendelés hozzáadása
const addOrderBtn = document.getElementById("add-order-btn");
if (addOrderBtn) {
    addOrderBtn.addEventListener("click", function () {
        // Üres rendelés hozzáadása - üres order-details oldal megnyitása
        window.location.href = "/order/new";
    });
}


document.addEventListener("DOMContentLoaded", function () {
    const dialog = document.querySelector("dialog");
    const addProductBtn = document.getElementById("add-product-btn");

    // Ellenőrizzük, hogy minden elem létezik-e
    if (addProductBtn && dialog) {
        // A modal megjelenítése a gomb megnyomásakor
        addProductBtn.addEventListener("click", function () {
            console.log("click");
            dialog.showModal();
        });
    }
});



