const table = document.getElementById('productsTable')

const socket = io() 

socket.on('updatedProducts', data => {
    table.innerHTML = 
        `<tr>
            <td>Producto</td>
            <td>Descripción</td>
            <td>Precio</td>
            <td>Código</td>
            <td>Stock</td>
            <td>Categoría</td>
        </tr>`;
        for (product of data) {
            let tr = document.createElement('tr')
            tr.innerHTML=
                        `   <td>${product.title}</td>
                            <td>${product.description}</td>
                            <td>${product.price}</td>
                            <td>${product.code}</td>
                            <td>${product.stock}</td>
                            <td>${product.category}</td>
                        `;
            table.getElementsByTagName('tbody')[0].appendChild(tr);
        }
           
} )