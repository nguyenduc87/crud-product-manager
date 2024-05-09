const tbodyNode = document.querySelector('tbody');
const numberIconCart = document.querySelector('.number');
const divPayment = document.querySelector('.payment');
let cartList = [];

const dollar = new Intl.NumberFormat('en-US');

window.addEventListener('load', () => {
    const productJson = localStorage.getItem('key');
    if (productJson === null) {
        cartList = [];
    }else {
        cartList = JSON.parse(productJson);
        cartList.forEach(item => {
            const trNode = document.createElement('tr');
            tbodyNode.appendChild(trNode);
            trNode.innerHTML = `
                <td>${item.name}</td>
                <td><img src="${item.image}" /></td>
                <td>${dollar.format(item.price)} $</td>
                <td>
                    <div class="quantity">
                        <button class="down-number">-</button>
                        <input type="text" class="input-quantity" value="${item.quantity}">
                        <button class="up-number">+</button>
                    </div>
                </td>
                <td class="total-money">${dollar.format(item.price * item.quantity)} $</td>
                <td class="delete">
                    <button>X</button>
                </td>
            `
            const inputNode = trNode.querySelector('.input-quantity');
            const totalMoneyNode = trNode.querySelector('.total-money');
            const downNumber = trNode.querySelector('.down-number');
            const upNumber = trNode.querySelector('.up-number');
            
            downNumber.addEventListener('click', () => {
                inputNode.value = Number(inputNode.value) - 1;
                if (Number(inputNode.value) <= 1) { 
                    inputNode.value = 1;
                    downNumber.classList.add('down-number-hidden');
                    downNumber.classList.remove('down-number');
                    item.quantity = Number(inputNode.value);
                    totalMoneyNode.innerHTML = `${dollar.format(item.price * item.quantity)} $`;
                    localStorage.setItem('key', JSON.stringify(cartList));
                    paymentMoney(cartList);
                    updateIconNumberCart(cartList);
                }else {
                    item.quantity = Number(inputNode.value);
                    totalMoneyNode.innerHTML = `${dollar.format(item.price * item.quantity)} $`;
                    localStorage.setItem('key', JSON.stringify(cartList));
                    paymentMoney(cartList);
                    updateIconNumberCart(cartList);
                }
            })

            upNumber.addEventListener('click', () => {
                inputNode.value = Number(inputNode.value) + 1; // string
                item.quantity = Number(inputNode.value); // number
                downNumber.classList.remove('down-number-hidden');
                downNumber.classList.add('down-number');
                totalMoneyNode.innerHTML = `${dollar.format(item.price * item.quantity)} $`;
                localStorage.setItem('key', JSON.stringify(cartList));
                paymentMoney(cartList);
                updateIconNumberCart(cartList);
            })
            
            // inputNode.addEventListener('change', () => {
            //     if (Number(inputNode.value) <= 0) {
            //         alert('Số lượng thấp nhất là 1');
            //     }else {
            //         item.quantity = Number(inputNode.value);
            //         totalMoneyNode.innerHTML = `${dollar.format(item.price * item.quantity)} $`;
            //         localStorage.setItem('key', JSON.stringify(cartList));
            //         paymentMoney(cartList);
            //         updateIconNumberCart(cartList);
            //     }
            // })
            
            const deleteNode = trNode.querySelector('.delete');
            deleteNode.addEventListener('click', () => {
                let choice = confirm(`Bạn muốn xóa sản phẩm ${item.name}`);
                if (choice) {
                    let viTri = -1;
                    for(let i = 0; i < cartList.length; i += 1) {
                        if (cartList[i].id === item.id) {
                            trNode.classList.add('tr-hidden');
                            setTimeout(function(){
                                trNode.remove();
                            }, 300)
                            viTri = i;
                            break;
                        }
                    }
                    cartList.splice(viTri, 1);
                    localStorage.setItem('key', JSON.stringify(cartList));
                    paymentMoney(cartList);
                    updateIconNumberCart(cartList);
                }
                
            })
        })
        // Hiển thị Tiền thanh toán
        paymentMoney(cartList);
        // Cập nhật number của icon cart
        updateIconNumberCart(cartList);
    }
})
// Hiển thị Tiền thanh toán
function paymentMoney(paramArr) {
    let payment = paramArr.reduce(function(acc, item) {
        return acc + (item.price * item.quantity);
    }, 0)
    divPayment.innerHTML = `
        <strong>Tiền thanh toán : ${dollar.format(payment)} $</strong>
        <button>Thanh Toán</button>
    `
}
// Cập nhật number của icon cart
function updateIconNumberCart(paramArr) {
    let numberCart = paramArr.reduce(function(acc, item) {
        return acc + item.quantity;
    }, 0)
    numberIconCart.innerHTML = `${numberCart}`;
}

