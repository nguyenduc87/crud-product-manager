import productList from "./data.js";
const ulNode = document.querySelector('ul');
const numberNode = document.querySelector('.number');
let cartProductList = [];


window.addEventListener('load', () => {
    // Xử lý UI input search
    const parentNode = document.querySelector('.parent');
    const inputNode = parentNode.querySelector('.input');
    parentNode.classList.toggle('active');
    inputNode.focus();

    // Xử lý hiển thị số lượng trên icon giỏ hàng
    const productJson = localStorage.getItem('key');
    if (productJson === null) {
        cartProductList = [];
    } else {
        cartProductList = JSON.parse(productJson);
        let quantitySum = cartProductList.reduce(function (acc, item){
            return acc + (item.quantity);
        }, 0)
        numberNode.innerHTML = `${quantitySum}`;
    }
    // Xử lý hiển thị các sản phẩm trong thẻ ul
    productList.forEach(item => {
        const liNode = document.createElement('li');
        ulNode.appendChild(liNode);
        liNode.innerHTML = `
        <div>
            <img src="${item.image}"><br>
            <label for=""><strong>${item.name}</strong></label><br>
            <label for=""><strong>${item.price} USD</strong></label>
        </div>
        <button class="add-to-cart">Add to Cart</button>
        `
        // Xử lý ấn nút Add To Cart
        const addToCartNode = liNode.querySelector('.add-to-cart'); 
        addToCartNode.addEventListener('click', () => {
            const productJson = localStorage.getItem('key');
            if (productJson === null) {
                const product = {
                    ...item,
                    quantity: 1
                }
                // Thêm vào mảng giỏ hàng
                cartProductList.push(product);
                // Lưu vào local Storage
                localStorage.setItem('key', JSON.stringify(cartProductList));
                // Thông báo thêm thành công
                alert("Thêm sản phẩm thành công.");
            } else {
                cartProductList = JSON.parse(productJson);
                let flag = true;
                for(let i = 0; i < cartProductList.length; i += 1) {
                    if (cartProductList[i].id === item.id) {    
                        // Cập nhật số lượng sản phẩm đã tồn tại
                        cartProductList[i].quantity += 1;
                        // Lưu vào local Storage
                        localStorage.setItem('key', JSON.stringify(cartProductList));
                        // Thông báo sản phẩm đã tồn tại
                        alert('Sản phẩm đã có trong giỏ hàng');
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    const product = {
                        ...item,
                        quantity: 1
                    }
                    // Thêm vào mảng giỏ hàng
                    cartProductList.push(product);
                    // Lưu vào local Storage
                    localStorage.setItem('key', JSON.stringify(cartProductList));
                    // Thông báo thêm thành công
                    alert("Thêm sản phẩm thành công.");
                }
            }
            // Cập nhật TỔNG số lượng trên icon giỏ hàng
            let quantitySum = cartProductList.reduce(function (acc, item){
                return acc + item.quantity;
            }, 0)
            numberNode.innerHTML = `${quantitySum}`;
        })
    })
})

// Xu ly nut back to top
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
    let scrollValue = window.scrollY;
    if (scrollValue > 300) {
        backToTop.classList.add('back-to-top-open');
    } else {
        backToTop.classList.remove('back-to-top-open');
    }
})
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    // window.scrollTo(0,0);
})







