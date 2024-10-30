let inventario = {
    "UVA X 50 G": 100,
    "UVA X 100 G": 200,
    "UVA X 200 G": 150,
    "UVA X 500 G": 80,
    "COCO RALLADO X 50 G": 120,
    "COCO RALLADO X 100 G": 150,
    "COCO RALLADO X 250 G": 100,
    "UVA + COCO X 75 G": 130,
    "UVA + COCO X 150 G": 90,
    "CIRUELA X 50 G": 200,
    "CIRUELA X 100 G": 160,
    "CIRUELA X 200 G": 100,
    "CANELA X 10 G": 150,
    "CANELA X 20 G": 140,
    "CANELA X 30 G": 110,
    "CANELA X 50 G": 80,
    "CANELA PARTIDA X 10 G": 200,
    "CANELA PARTIDA X 20 G": 150,
    "CANELA PARTIDA X 100 G": 50,
    "CANELA MOLIDA X 20 G": 180,
    "CANELA MOLIDA X 50 G": 130,
    "CLAVO X 10 G": 140,
    "CLAVO X 20 G": 130,
    "ANIS ESTRELLA X 10 G": 150,
    "ANIS ESTRELLA X 20 G": 120,
    "ANIS EN PEPA X 10 G": 200,
    "ANIS EN PEPA X 20 G": 150,
    "FLOR DE JAMAICA X 18 G": 100,
    "FLOR DE MANZANILLA X 18 GR": 110,
    "LINAZA X 100 G": 160,
    "LINAZA X 200 G": 150,
    "LINAZA X 500 G": 90,
    "LINAZA MOLIDA X 200 G": 80,
    "LINAZA MOLIDA X 500 G": 70,
    "BICARBONATO X 50 G": 150,
    "BICARBONATO X 100 G": 100,
    "BICARBONATO X 200 G": 90,
    "BICARBONATO X 500 G": 50,
    "NUEZ MOSCADA X 15 G": 120,
    "NUEZ MOSCADA X 30 G": 110,
    "CHIA X 200 G": 100,
    "AJONJOLI X 100 G": 70,
    "GRAGEAS X 100 G": 60,
    "HABA X 30 G": 130,
    "HABA X 60 G": 110,
    "HABA X 120 G": 90,
    "MANI UVA X 40 G": 150,
    "MANI UVA X 80 G": 140,
    "MANI UVA X 200 G": 80,
    "MANI SAL X 40 G": 130,
    "MANI SAL X 80 G": 100,
    "MANI SAL X 200 G": 90,
    "MANI DULCE X 40 G": 120,
    "MANI DULCE X 80 G": 110,
    "MANI DULCE X 200 G": 90,
    "MANI AJONJOLI X 40 G": 140,
    "MANI AJONJOLI X 80 G": 130,
    "MANI AJONJOLI X 200 G": 100,
    "MANI MIXTO X 40 G": 150,
    "MANI MIXTO X 80 G": 140,
    "MANI MIXTO X 200 G": 90,
    "MANI NATURAL X 40 G": 150,
    "MANI NATURAL X 80 G": 140,
    "MANI PICANTE X 40 G": 130,
    "MANI PICANTE X 80 G": 110,
    "MANI CON ARANDANOS X 40 G": 120,
    "MANI CON ARANDANOS X 80 G": 100,
    "ARANDANO X 50 G": 90,
    "ARANDANO X 100 G": 80,
    "PISTACHO X 35 G": 100,
    "PISTACHO X 70 G": 70,
    "MARAÑON X 40 G": 120,
    "MARAÑON X 80 G": 110,
    "MIX FRUTOS SECOS X 50 G": 100,
    "MIX FRUTOS SECOS X 100 G": 90,
    "NUEZ X 50 G": 80,
    "NUEZ X 100 G": 70,
    "ALMENDRA X 50 G": 120,
    "ALMENDRA X 100 G": 110,
    "MORITAS X 50 G": 130,
    "MORITAS X 100 G": 100,
    "GOMAS X 50 G": 120,
    "GOMAS X 100 G": 110,
    "ALMENDRA CONF X 50 G": 80,
    "ALMENDRA CONF X 100 G": 70,
    "CHOMELLO X 50 G": 100,
    "CHOMELLO DISPLAY X 30 UNI": 30
};

let productosSeleccionados = [];
let productoSeleccionado = null;
document.querySelectorAll('.producto').forEach(item => {
    item.addEventListener('click', event => {
        const nombre = event.target.getAttribute('data-nombre');
        const precio = parseFloat(event.target.getAttribute('data-precio'));

        productoSeleccionado = { nombre, precio };
        document.querySelectorAll('.producto').forEach(p => p.style.border = '1px solid #ddd');
        event.target.style.border = '2px solid blue';

        const cantidad = parseInt(prompt(`¿Cuántas unidades de ${productoSeleccionado.nombre} deseas agregar? (Disponibles: ${inventario[nombre]})`, "1"));
        if (!isNaN(cantidad) && cantidad > 0) {
            agregarProducto(cantidad);
        } else {
            alert('Cantidad no válida.');
        }
    });
});

function agregarProducto(cantidad) {
    if (!productoSeleccionado) {
        alert('Por favor, selecciona un producto.');
        return;
    }
    inventario[productoSeleccionado.nombre] -= cantidad;
    localStorage.setItem('inventario', JSON.stringify(inventario));
    productosSeleccionados.push({ ...productoSeleccionado, cantidad });
    mostrarTicket();
}


// Parte 3
function mostrarTicket() {
    const ticketBody = document.getElementById('ticketBody');
    ticketBody.innerHTML = '';
    let totalFactura = 0;

    productosSeleccionados.forEach((producto, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${producto.nombre}</td>
            <td><input type="number" value="${producto.cantidad}" onchange="modificarCantidad(${index}, this.value)"></td>
            <td>$${formatPrice(producto.precio)}</td>
            <td>$${formatPrice(producto.cantidad * producto.precio)}</td>
            <td><button onclick="eliminarProducto(${index})">Eliminar</button></td>
        `;
        ticketBody.appendChild(row);
        totalFactura += producto.cantidad * producto.precio;
    });

    document.getElementById('totalFactura').textContent = formatPrice(totalFactura);
}
// Parte 4
function modificarCantidad(index, nuevaCantidad) {
    if (!isNaN(nuevaCantidad) && nuevaCantidad > 0) {
        productosSeleccionados[index].cantidad = parseInt(nuevaCantidad, 10);
        mostrarTicket();
    } else {
        alert('Cantidad no válida.');
    }
}

function eliminarProducto(index) {
    productosSeleccionados.splice(index, 1);
    mostrarTicket();
}


function formatPrice(price) {
    return price.toLocaleString('es-CO');
}

function generarTicketPDF() {
    const clienteInput = document.getElementById('cliente').value;
    const fecha = new Date().toLocaleDateString();
    const { jsPDF } = window.jspdf;
    const ticketHeight = 100 + (productosSeleccionados.length * 10);
    const doc = new jsPDF('p', 'mm', [85, ticketHeight]);

    let y = 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`Ticket`, 42.5, y, { align: 'center' });
    y += 10;
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text(`Cliente: ${clienteInput}`, 1, y);
    y += 5;
    doc.text(`Fecha: ${fecha}`, 1, y);
    y += 5;
    doc.text('Producto', 1, y);
    doc.text('Cantidad', 30, y);
    doc.text('Precio', 50, y);
    doc.text('Valor', 70, y);
    y += 5;
    doc.setFont('helvetica', 'normal');

    let totalFactura = 0;
    productosSeleccionados.forEach(producto => {
        const nombreProducto = doc.splitTextToSize(producto.nombre, 30);
        doc.text(nombreProducto, 1, y + 5);
        doc.text(`${producto.cantidad}`, 32, y + 5);
        doc.text(`$${formatPrice(producto.precio)}`, 52, y + 5);
        doc.text(`$${formatPrice(producto.cantidad * producto.precio)}`, 72, y + 5);

        for (let i = 10; i < 80; i += 5) {
            doc.line(i, y + 8, i + 2, y + 8);
        }

        totalFactura += producto.cantidad * producto.precio;
        y += 7;
    });

    doc.setFont('helvetica', 'bold');
    doc.text(`Total de la Factura: $${formatPrice(totalFactura)}`, 10, y + 10);
    doc.setFont('helvetica', 'normal');
    doc.save(`ticket_factura_${fecha}.pdf`);

    resetFormulario();
}






function resetFormulario() {
    productosSeleccionados = [];
    mostrarTicket();
    const contadorElement = document.getElementById('contadorFacturas');
    if (contadorElement) {
        contadorElement.textContent = `Total de Facturas Generadas: ${contadorFacturas}`;
    } else {
        const nuevoContadorElement = document.createElement('h4');
        nuevoContadorElement.id = 'contadorFacturas';
        nuevoContadorElement.textContent = `Total de Facturas Generadas: ${contadorFacturas}`;
        document.body.appendChild(nuevoContadorElement);
    }
}

function recargarInventario() {
    const adminPassword = prompt("Ingrese la contraseña de administrador:");
    if (adminPassword === "1") {
        const producto = prompt("Ingrese el nombre del producto:");
        const cantidad = parseInt(prompt(`Ingrese la cantidad a agregar para ${producto}:`), 10);
        if (!isNaN(cantidad) && inventario[producto] !== undefined) {
            inventario[producto] += cantidad;
            localStorage.setItem('inventario', JSON.stringify(inventario));
            alert(`${cantidad} unidades de ${producto} añadidas.`);
        } else {
            alert("Producto no encontrado o cantidad no válida.");
        }
    } else {
        alert("Contraseña incorrecta.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const contadorGuardado = localStorage.getItem('contadorFacturas');
    if (contadorGuardado) {
        contadorFacturas = parseInt(contadorGuardado, 10);
    }
    const inventarioGuardado = localStorage.getItem('inventario');
    if (inventarioGuardado) {
        inventario = JSON.parse(inventarioGuardado);
    }
    const contadorElement = document.createElement('h4');
    contadorElement.id = 'contadorFacturas';
    contadorElement.textContent = `Total de Facturas Generadas: ${contadorFacturas}`;
    document.body.appendChild(contadorElement);

    if (!document.querySelector('.recargarButton')) {
        const recargarButton = document.createElement('button');
        recargarButton.textContent = 'Recargar Inventario';
        recargarButton.className = 'recargarButton';
        recargarButton.style.fontSize = '10px';
        recargarButton.style.padding = '1px';
        recargarButton.onclick = recargarInventario;
        document.body.appendChild(recargarButton);
    }
});

window.addEventListener('beforeunload', () => {
    localStorage.setItem('contadorFacturas', contadorFacturas);
    localStorage.setItem('inventario', JSON.stringify(inventario));
});
