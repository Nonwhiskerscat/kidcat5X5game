function illustAni() {
    let illusts=document.querySelector('.illusts').children;
    console.log(illusts);

    [].forEach.call(illusts, (cat, idx) => {
        cat.style.transform='translate(30vw)';
        cat.style.opacity='0';

        setTimeout(() => {
            cat.animate({
                transform: 'translate(0)'
                , opacity: 1
                }, {
                fill: 'forwards',
                duration: 1000,
                delay:200*idx
            })
        },2000)
    })
}