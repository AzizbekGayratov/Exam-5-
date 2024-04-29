const newPage = document.querySelector('.card__block');
const modal = document.querySelector('.modal');
const close = document.querySelector('.modal__close');
const modalContent = document.querySelector('.modal__block');
const cart = document.querySelector('.header__cart')

const render = (data) => {
    newPage.innerHTML = `
    <div class="card__box">
    <div class="card__img">
        <img src="${data.img}" alt="img">
    </div>
    <div class="card__content">
        <h2 class="card__title"><strong>Golden Soft</strong> 
            <strong>GS-200Z-5 для офиса</strong></h2>
            <div class="card__text_block">
                <p class="card__text">Замок дверной электронный Golden Soft GS-200Z-5 имеет роскошный глянцевый блеск, четкие линии, красивые формы.</p>
                <p class="card__text">Подходит для установки на деревянную/межкомнатную дверь.</p>
            </div>
            <div class="card__prize_block">
                <span class="card__prize_cap">Цена</span>
                <div class="card__prize_box">
                    <p class="card__real_prize">${data.price}</p>
                    <p class="card__old_prize">${data.discount}</p>
                </div>
                <button data-buy="${data.id}" class="card__btn">КОРЗИНКА</button>
            </div>
        </div>
    </div>
    `;
    const btn = document.querySelector('.card__btn');
    btn.addEventListener('click', (e) => {
        if (e.target.dataset.buy) {
            modal.style.display = "flex"
            modalContent.innerHTML = `
            <div class="modal__top">
                <div class="modal__top_content">
                    <div class="modal__top_img_block">
                        <img src="${data.img}" alt="img">
                    </div>
                    <div class="modal__top_info">
                        <div class="modal__top_text_box">
                            <p class="modal__top_des">${data.des}</p>
                            <p class="modal__top_cap">+ Подарок:<a class="modal__top_cap_link" href="#">“Приложение
                                    к замкам Golden Service”</a>
                            </p>
                        </div>
                        <div class="modal__index_block">
                            <button class="modal__idf_btn modal__minus_btn">
                                <img src="/img/modal-minus.svg" alt="img">
                            </button>
                            <span class="modal__index_idf">1</span>
                            <button class="modal__idf_btn modal__plus_btn">
                                <img src="/img/modal-plus.svg" alt="img">
                            </button>
                        </div>
                    </div>
                </div>
                <div class="modal__social">
                    <button data-del="${data.id}" class="modal__del_btn">Удалить</button>
                    <p class="modal__price_text">${data.price}</p>
                </div>
            </div>
            <div class="modal__bottom">
                <div class="modal__bottom_item">
                    <p class="modal__total">Итого:<strong class="modal__total_text">${data.price}</strong></p>
                    <button data-buy="${data.id}" class="modal__order_btn">Оформить заказ</button>
                </div>
                <div class="modal__bottom_item">
                    <button data-buy="${data.id}" class="modal__buy_btn">Продолжить покупки</button>
                </div>
            </div>
            `
        }
    })
};


close.addEventListener('click', () => {
    modal.style.display = "none"
})

const renderNewPage = () => {
    let data = JSON.parse(localStorage.getItem('card'));
    let result = data[data.length - 1];
    render(result)
}


const cart_btn = document.querySelector('.header__cart');

cart_btn.addEventListener('click', () => {
    window.location.href = './cart.html'
})



modalContent.addEventListener('click', (e) => {
    if (e.target.dataset.buy) {
        if (confirm('Вы действительно хотите добавить в корзину?')) {
            fetch(`http://localhost:3000/cards/${e.target.dataset.buy}`).then((res) => res.json()).then((data) => {
                let sum = JSON.parse(localStorage.getItem('sum')) || [];
                sum.push(data);
                localStorage.setItem('sum', JSON.stringify(sum));
            })
            modal.style.display = "none"
        }
    } else if (e.target.dataset.del) {
        if (confirm('Вы действительно хотите удалить?')) {
            let sum = JSON.parse(localStorage.getItem('sum')) || [];
            const element = sum.find(item => item.id === e.target.dataset.delete);
            if (element) {
                sum.pop(e.target.dataset.del);
                localStorage.setItem('sum', JSON.stringify(sum));
                modal.style.display = "none"
            }
        }
    }
})



renderNewPage()
