const box = document.querySelector('.product__cards_bottom');
const btn__box = document.querySelector('.product__page_btn_box');
const select = document.getElementById('price-filter')

const openInfo = (id) => {
    window.location.href = `./card.html`
    fetch(`http://localhost:3000/cards/${id}`).then((res) => res.json()).then((data) => {
        let cardData = JSON.parse(localStorage.getItem('card')) || [];
        cardData.push(data);
        localStorage.setItem('card', JSON.stringify(cardData));
    })
}
const checkAvailibility = (i) => {
    if (i) {
        return `
        <img src="/img/product-avail.svg" alt="icon">
        <p class="product__avail_text">В наличии</p>
        `
    } else {
        return `
        <img src="/img/product-avail_x.svg" alt="icon">
        <p class="product__avail_text">Нет в наличии</p>
        `
    }
}
const renderCards = (data, total) => {
    box.innerHTML = data.map((item) => {
        return `
        <div class="product__card" onclick="openInfo(${item.id})">
        <div class="product__cap_block">
            <ul class="product__cap_list">
                <li class="product__cap_item">
                    <div class="product__avail">
                        ${checkAvailibility(item.available)}
                    </div>
                    <div class="product__prize">
                        <img src="./img/product-gift.svg" alt="icon">
                        <p class="product__prize_text">Подарок</p>
                    </div>
                </li>
                <li class="product__cap_item">
                    <span class="product__sale_text">SALE</span>
                </li>
            </ul>
        </div>
        <div class="product__img_block">
            <img src="${item.img}" alt="img">
        </div>
        <div class="product__card_content">
            <div class="product__rate_block">
                <a href="#" class="product__rate_img">
                    <img src="./img/product-rate.svg" alt="icon">
                </a>
                <p class="product__rate_text">(12) отзывов</p>
            </div>
            <p class="product__card_des">${item.des}</p>
            <div class="product__card_price">
                <p class="product__card_real_price">${item.price}</p>
                <p class="product__card_old_price">${item.discount}</p>
            </div>
        </div>
    </div>
        `
    }).join("");
    let result = Math.ceil(total / 6);
    let arr = new Array(result).fill(null);
    btn__box.innerHTML = arr.map((_, index) => {
        return `<button class="product__page_btn" data-page="${index + 1}">${index + 1}</button>`
    }).join("");
}

const getTotal = async () => {
    const response = await fetch(`http://localhost:3000/cards`)
    const data = await response.json()
    return data.length
}
const getData = async (index = 1) => {
    const arr = JSON.parse(localStorage.getItem('params'));
    let params;
    if (arr == null) {
        params = "default";
    } else {
        params = arr[arr.length - 1];
    }
    const response = await fetch(`http://localhost:3000/cards?_sort=${params}&_limit=6&_page=${index}`)
    let total = await getTotal()
    const data = await response.json()
    renderCards(data, total)
}

btn__box.addEventListener("click", (e) => {
    let target = e.target.dataset.page;
    if (target) {
        getData(target)
    }
})


select.addEventListener("change", (e) => {
    let target = e.target.value;
    // getData(target)
    let arr = JSON.parse(localStorage.getItem('params')) || [];
    arr.push(target);
    localStorage.setItem('params', JSON.stringify(arr));
    location.reload();
})
getData()


const recentBox = document.querySelector('.recent__cards_block');

const renderRecent = (data) => {
    recentBox.innerHTML = data.map((item) => {
        return `
        <div class="product__card" onclick="openInfo(${item.id})">
        <div class="product__cap_block">
        <ul class="product__cap_list">
            <li class="product__cap_item">
                <div class="product__avail">
                    ${checkAvailibility(item.available)}
                </div>
                <div class="product__prize">
                    <img src="./img/product-gift.svg" alt="icon">
                    <p class="product__prize_text">Подарок</p>
                </div>
            </li>
            <li class="product__cap_item">
                <span class="product__sale_text">SALE</span>
            </li>
        </ul>
        </div>
            <div class="product__img_block">
                <img src="${item.img}" alt="img">
            </div>
            <div class="product__card_content">
                <p class="product__card_des">${item.des}</p>
                <div class="product__card_price">
                    <p class="product__card_real_price">${item.price}</p>
                    <p class="product__card_old_price">${item.discount}</p>
                </div>
            </div>
        </div>
        `
    }).join("")
}

const recentData = async () => {
    fetch(`http://localhost:3000/cards?_limit=4`).then((res) => res.json()).then((data) => {
        renderRecent(data)
    })
}

recentData()


const input = document.querySelector('.product__form_input');
const search_result = document.querySelector('.search__result');

input.addEventListener('keyup', (e) => {
    const value = e.target.value;
    if (value.length > 0) {
        fetch(`http://localhost:3000/cards?des_like=${value}`).then((res) => res.json()).then((data) => {
            search_result.style.display = "block";
            search_result.innerHTML = data.map((i) => `
            <p class="search__result_text">${value}</p>
            `).join("")
        })
    } else {
        search_result.style.display = "none";
    }
})

input.addEventListener('blur', () => {
    search_result.style.display = "none";
})

input.addEventListener('focus', () => {
    if (input.value.length > 0) {
        search_result.style.display = "block";
    }
})

const cart_btn = document.querySelector('.header__cart');

cart_btn.addEventListener('click', () => {
    window.location.href = './cart.html'
})