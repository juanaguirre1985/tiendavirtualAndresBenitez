document.addEventListener('DOMContentLoaded', function() {
    const { jsPDF } = window.jspdf;
    const cartItemsElement = document.getElementById('cart-items').getElementsByTagName('tbody')[0];
    const orderNumberElement = document.getElementById('order-number');
    const cartSubtotalElement = document.getElementById('cart-subtotal');
    const cartIvaElement = document.getElementById('cart-iva');
    const cartTotalElement = document.getElementById('cart-total');
    const invoiceButton = document.getElementById('invoice-button');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderNumber = Math.floor(Math.random() * 1000000);

    function formatCurrency(value) {
        return value.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
    }

    function renderCart() {
        cartItemsElement.innerHTML = '';
        let subtotal = 0;
        let totalIva = 0;
        let totalAmount = 0;

        cart.forEach((item, index) => {
            const price = item.price;
            const iva = parseFloat((price * 0.19).toFixed(2)); // IVA calculado como 19% del precio
            const total = parseFloat((price + iva).toFixed(2)); // Total calculado como precio + IVA

            subtotal += price;
            totalIva += iva;
            totalAmount += total;

            const row = cartItemsElement.insertRow();
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${formatCurrency(price)}</td>
                <td>${formatCurrency(iva)}</td>
                <td>${formatCurrency(total)}</td>
            `;
        });

        // Calcular subtotal, IVA y total
        const formattedSubtotal = formatCurrency(subtotal);
        const formattedTotalIva = formatCurrency(totalIva);
        const formattedTotalAmount = formatCurrency(totalAmount);

        orderNumberElement.textContent = `Nro de Compra: ${orderNumber.toString().padStart(6, '0')}`;
        cartSubtotalElement.textContent = `Subtotal: ${formattedSubtotal}`;
        cartIvaElement.textContent = `IVA 19%: ${formattedTotalIva}`;
        cartTotalElement.textContent = `Total a pagar: ${formattedTotalAmount}`;
    }

    function generatePDF() {
        const doc = new jsPDF();
        const storeName = "Tienda Electrodomésticos Benítez";
        const formattedOrderNumber = orderNumber.toString().padStart(6, '0');

        doc.setFontSize(16);
        doc.text(storeName, 10, 10);
        doc.setFontSize(14);
        doc.text(`Nro de Compra: ${formattedOrderNumber}`, 10, 20);

        let y = 30;
        doc.setFontSize(12);
        doc.text('Resumen de Compra:', 10, y);
        y += 10;

        // Encabezados de tabla en PDF
        doc.text('Ítem', 10, y);
        doc.text('Descripción', 40, y);
        doc.text('Precio', 100, y);
        doc.text('IVA', 130, y);
        doc.text('Total', 160, y);
        y += 10;

        let subtotal = 0;
        let totalIva = 0;
        let totalAmount = 0;

        cart.forEach((item, index) => {
            const price = item.price;
            const iva = parseFloat((price * 0.19).toFixed(2));
            const total = parseFloat((price + iva).toFixed(2));

            subtotal += price;
            totalIva += iva;
            totalAmount += total;

            doc.text(`${index + 1}`, 10, y);
            doc.text(`${item.name}`, 40, y);
            doc.text(formatCurrency(price), 100, y);
            doc.text(formatCurrency(iva), 130, y);
            doc.text(formatCurrency(total), 160, y);
            y += 10;
        });

        // Totales en PDF
        const formattedSubtotal = formatCurrency(subtotal);
        const formattedTotalIva = formatCurrency(totalIva);
        const formattedTotalAmount = formatCurrency(totalAmount);

        doc.text(`Subtotal: ${formattedSubtotal}`, 10, y);
        y += 10;
        doc.text(`IVA 19%: ${formattedTotalIva}`, 10, y);
        y += 10;
        doc.text(`Total a pagar: ${formattedTotalAmount}`, 10, y);

        doc.save('factura.pdf');
    }

    invoiceButton.addEventListener('click', function() {
        generatePDF();
        localStorage.removeItem('cart');
        window.location.href = '../catalogo/catalogo.html';
    });

    renderCart();
});
