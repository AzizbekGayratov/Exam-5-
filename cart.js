const cartBox = document.querySelector('.cart__block');


const render = () => {
    const product = JSON.parse(localStorage.getItem('sum'));
    cartBox.innerHTML = product.map(item => {
        return `
        <div class="modal__top">
            <div class="modal__top_content">
                <div class="modal__top_img_block">
                    <img src="${item.img}" alt="img">
                </div>
                <div class="modal__top_info" id="modal__top_info">
                    <div class="modal__top_text_box">
                        <p class="modal__top_des">${item.des}</p>
                        <p class="modal__top_cap">+ Подарок:<a class="modal__top_cap_link" href="#">“Приложение
                                к замкам Golden Service”</a>
                        </p>
                    </div>
                </div>
            </div>
            <div class="modal__social">
                <button data-del="${item.id}" class="modal__del_btn">Удалить</button>
                <p class="modal__price_text">${item.price}</p>
            </div>
        </div>
        `
    })
}

cartBox.addEventListener('click', (e) => {
    if (e.target.dataset.del) {
        if (confirm('Точно хотите удалить?')) {
            let sum = JSON.parse(localStorage.getItem('sum')) || [];
            const element = sum.find(item => item.id === e.target.dataset.del);
            if (element) {
                sum.pop(e.target.dataset.del);
                localStorage.setItem('sum', JSON.stringify(sum));
            }
        }
    }
    render()
})

render()