window.addEventListener('load', ()=> {
    
    
    class Kidcat {
        constructor(kitty) {
            this.kitty = kitty;
        }
    
        add(a, b) {
            this.kitty.push(a, b);
        }
    
        shiftTwo() {
            for (let i = 0; i < 5; i++) {
                this.kitty.shift();
            }
        }
    
        clearAll() {
            this.kitty = [];
        }
    }

    illustAni();
    
    const cellData = new Kidcat([]);
    
    const gameBoard = [
        [' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ']
    ];

    nyanMaker(25);

    let svgKitty=document.querySelector('.svg_kitty');
    let svgAntenna=document.querySelector('.svg_antenna');


    kittySvg(svgKitty);
    antennaSvg(svgAntenna);


    let startBtn = document.querySelector("#start_btn");
    let kidcatBtn = document.querySelector('#kidcat_btn');
    let nyanBtns = document.querySelectorAll(".nyan");
    let retryBtn = document.querySelector("#retry_btn");
    let giveupBtn = document.querySelector('#giveup_btn');
    let cat_h2 = document.querySelector("#cat-name");
    let com_h2 = document.querySelector("#com-name");
    let cat_page = document.querySelector("#cat_page");
    let notice = document.querySelector('.semi_title p')
    let isTaken;


    startBtn.addEventListener('click', ()=>{
        settingGame(cat_page)
    });

    kidcatBtn.addEventListener('click', ()=>{
        window.open("https://github.com/Nonwhiskerscat");
    });

    retryBtn.addEventListener('click', retryGame);

    giveupBtn.addEventListener('click', () => {
        retryGame();
        giveupGame(cat_page);
    })


    for (const button of nyanBtns) {
        button.addEventListener('click', function() {
            let catNyan = parseInt(this.children[0].innerHTML);

            isTaken = checkPos(gameBoard, catNyan);

            if (isTaken) {
                gameTurn(catNyan, button);
            } else {
                button.classList.add("nyan_error");
                notice.innerHTML = "정신 차리고 하라냥!, 니가 유치원생이냥?";
                
                
                setTimeout(() => {
                    button.classList.remove("nyan_error");
                }, 600);
            }
        });
    }


    function settingGame(kitty) {
        if(kitty.classList.contains("end")) {
            kitty.classList.remove("end");
        }
        kitty.classList.remove("cover");
        kitty.classList.remove("display_none");
        kitty.classList.add("cover");
    }

    function retryGame() {
        let icons = document.querySelectorAll(".fi");

        for (let btn of nyanBtns) {
            for (let icon of icons) {
                if (btn.contains(icon)) {
                    icon.remove();
                }
            }
        }

        for (let btn of nyanBtns) {
            btn.classList.add("nyan_hover");
            btn.removeAttribute("disabled", "");
            btn.style.cursor = "pointer";
        }

        cat_h2.innerHTML = "너 차례다냥!";
        com_h2.innerHTML = "기다리라냥...";
        notice.innerHTML = "Kidcat 5X5 게임에 오신 것을 환영한다냥.";
        cat_h2.classList.add("title_cat");
        cat_h2.classList.remove("display_none");
        com_h2.classList.add("display_none");
        com_h2.classList.remove("title_com");
    

        resetGame(gameBoard);
    }

    function giveupGame(kitty) {
        resetGame(gameBoard);
        kitty.classList.remove("cover");
        kitty.classList.add("end");
        kitty.classList.add("display_none"); 
    }

    function gameTurn(catNyan, btn) {
        let catWinWin = catWinner(gameBoard, cellData, true);

        if (!catWinWin) {
            let cross = createIcon(true);

            btn.append(cross);
            btn.classList.remove("nyan_hover");
            btn.setAttribute("disabled", "");
            btn.style.cursor = "auto";

            pushBoard(gameBoard, catNyan, true);
            catWinWin = catWinner(gameBoard, cellData, true);
        }

        if (!catWinWin) {
            let comNyan = comTurn(gameBoard);
            if (comNyan !== null) {
                gameBreak(true);
                changeTitleName();
                let randTime = Math.floor(Math.random() * 1500) + 500;
                setTimeout(() => {
                    let circle = createIcon(false);
                    let btn = nyanBtns[comNyan];

                    btn.append(circle);
                    btn.classList.remove("nyan_hover");
                    btn.setAttribute("disabled", "");
                    btn.style.cursor = "auto";

                    gameBreak(false);

                    let catLostLost = catWinner(gameBoard, cellData, false);
                    if (catLostLost) {
                        endGame(false);
                    }
                    if (!catLostLost) {
                        changeTitleName();
                    }
                }, randTime);
            } else {
                draw();
            }
        }


        if (catWinWin) {
            endGame(true);
        }
    }

    function createIcon(catWin) {
        let icon = document.createElement("i");
        icon.classList.add("fi");

        if (catWin) {
            icon.classList.add("fi", "fi-rs-cross", "icon_cross");
        } else {
            icon.classList.add("fi", "fi-rs-circle", "icon_circle");
        }

        return icon;
    }

    function endGame(catWin) {
        for (let btn of nyanBtns) {
            btn.classList.remove("nyan_hover");
            btn.setAttribute("disabled", "");
            btn.style.cursor = "auto";
        }

        endAlert(catWin);
    }

    function draw() {
        for (let btn of nyanBtns) {
            btn.classList.remove("nyan_hover");
            btn.setAttribute("disabled", "");
            btn.style.cursor = "auto";
        }
        cat_h2.innerHTML = "무승부다냥!";
        notice.innerHTML = "좋은 승부였다냥, 하지만 다음에는 내가 이길거라냥!";

    }

    function endAlert(catWin) {

        if (catWin) {
            cat_h2.innerHTML = "너가 이겼다냥!";
            notice.innerHTML = "분하다냥!, 고양이 상대로 이렇게 강해도 되는거다냥?";

        } else {
            com_h2.innerHTML = "너가 졌다냥!";
            notice.innerHTML = "고양이한테 게임을 진다냥? 너무 어이없고 웃기다냥!";
        }
    }



    function gameBreak(pause) {
        if (pause) {
            for (let btn of nyanBtns) {
                btn.classList.remove("nyan_hover");
                btn.setAttribute("disabled", "");
                btn.style.cursor = "auto";
                notice.innerHTML = "하... 저기 내가 놓으려고 했다냥, 비겁하게 이러기냥?";
            }
        }
        if (!pause) {
            for (let btn of nyanBtns) {
                btn.classList.add("nyan_hover");
                btn.removeAttribute("disabled", "");
                btn.style.cursor = "pointer";
                notice.innerHTML = "너 차례다냥, 어디 놓아도 나한테 안 된다냥!";
            }
        }
    }

    function changeTitleName() {
        cat_h2.classList.toggle("title_cat");
        cat_h2.classList.toggle("display_none");
        com_h2.classList.toggle("display_none");
        com_h2.classList.toggle("title_comp");
    }
    
    
})

