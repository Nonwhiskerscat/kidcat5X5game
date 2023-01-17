function nyanMaker(cat) {
    let kitty='';
    for(let i=0;i<cat;i++) {
        kitty+=`
        <button class="nyan nyan_hover">
            <span>${i+1}</span>
        </button>
        `;
    }
    document.querySelector('.main_table').innerHTML=kitty;
}