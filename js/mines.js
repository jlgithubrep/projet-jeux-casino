$(document).ready(function () {
    // Le code ne s'executeras pas tant que la page n'est pas chargée


    /*
    * tableau de 25 cases pour la grille
    * 1 piege
    * 0 safe
    * 2 sage et cliqué par le user
    *
    * random pour la bombe
    * for remplissage tab, if quand on tombe sur le random
    *
    * */

    //let temp;
    let balance = 1000;
    let initialStake = 0;
    let coinsweeper = $(".coinsweeper");//demineur
    let bCashout = $(".cashout");
    let pari;//somme parié par le user, on peut pas jouer si 0 ou moins
    let gameStarted = 0;
    let tabCoinsweeper = [];
    let loss = 0;
    let nbBombes;

    //variable de score
    let nbCasesClique = 0;
    //let nextGain = 0;
    let valCase = 0;//pour afficher sur la case

    document.getElementById("balance").innerHTML = "" + balance;

    coinsweeper.toggle();// on cache le demineur de base quand on arrive sur la page
    bCashout.toggle();

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function affichageCoinsweeper() {
        if (gameStarted == 0) {
            gameStarted = 1;
            coinsweeper.toggle();
            bCashout.toggle();
        }
    }

    function calcGain(stake, nombreBombes, nombreClic) {

        console.log("initialStake dans calcGain", initialStake);
        //valCase = nombreBombes * nombreClic;
        valCase = nombreClic * (nombreBombes * 5) + (initialStake / 2);
        let s = stake + valCase;
        console.log("fct calcgain", stake, nombreBombes, nombreClic);
        return s;
    }

    function calcNextGain(stake, nombreBombes, nombreClic) {
        console.log("initialStake dans calcNextGain", initialStake);
        if (nombreClic == 0) {
            //return nombreBombes * 1;
            return 1 * (nombreBombes * 5) + (initialStake / 2);
        } else {
            //return nombreBombes * (nombreClic + 1);
            return (nombreClic + 1) * (nombreBombes * 5 ) + (initialStake / 2);
        }

    }

    function clicCase() {

        //gameStarted = 1;

        if (loss == 0) {
            let id = this.id;

            if (tabCoinsweeper[id] == 1) {

                for (let i = 1; i <= 25; i++) {
                    if (tabCoinsweeper[i] == 1) {
                        $("#" + i).addClass("casePiegeRestante");
                    }

                }

                $("#" + id).addClass("casePiege");
                loss = 1;
                pari = 0;
                document.getElementById("stake").innerHTML = "PERDU, Stake: " + pari;
                document.getElementById("next-gain").innerHTML = "";

            } else if (tabCoinsweeper[id] != 2) {
                $("#" + id).addClass("caseSafe");
                tabCoinsweeper[id] = 2; //case cliqué safe est passée à 2
                console.log("bonne case");
                //pari = parseInt(pari);


                //calcul des variables de winstreak selon le nb de bombes et la mise

                console.log("nombre de cases cliquées", nbCasesClique);
                nbCasesClique++;
                pari = calcGain(pari, nbBombes, nbCasesClique);


                document.getElementById(id).innerHTML = "" + valCase;// affichage de la valeur sur la case

                console.log("pari", pari);
                document.getElementById("stake").innerHTML = "Stake: " + pari;


                //affiche next gain
                let temp = calcNextGain(pari, nbBombes, nbCasesClique);
                document.getElementById("next-gain").innerHTML = "Next gain: " + temp;

            }

        }

    }

    function game(bombeRandom) { //prend en parametre le nombre de bombes
        affichageCoinsweeper();
        console.log("b dans la fct game", bombeRandom);

        //TO DO : si on a plusieurs bombes, remplissage de tabCoinsweeper[]

        //indexOf prend en parametre une valeur,
        // et renvoie l'index de la valeur si celle ci est trouvée dans le tableau.
        // renvoie -1 si rien n'est trouvé.

        let arr = [];
        while (arr.length < bombeRandom) { //rempli un tableau de random de 1 à 25 different de longeur bombeRandom
            let randomnumber = getRandomInt(1, 26);
            if (arr.indexOf(randomnumber) != -1) continue;
            arr[arr.length] = randomnumber;
        }
        console.log("arrrr", arr);

        for (let i = 1; i <= 25; i++) {
            tabCoinsweeper[i] = 0; // met de base toutes les case safes
            for (let j = 0; j < arr.length; j++) { //parcourt le tableau de chiffre random piege, on piege la case dont la valeur de l'index se trouve dans le tab de random
                if (i == arr[j]) {
                    tabCoinsweeper[i] = 1; // case piege
                }
            }
        }
        console.log("arr0", arr[0]);
        console.log("atttt,", tabCoinsweeper);


        /*
                let bombe = getRandomInt(1, 25);
                console.log("la case piegée est: ", bombe)


                for (let i = 1; i <= 25; i++) { //remplissage du tableau de jeu de bombes et de cases safe
                    if (i == bombe) {
                        tabCoinsweeper[i] = 1;// piege
                    } else {
                        tabCoinsweeper[i] = 0;//safe
                    }
                }
        */
    }


    function radioBombes() {
        let radios = document.getElementsByName("nb-bombe");

        for (let j = 0; j <= radios.length; j++) {
            if (radios[j].checked) {
                return radios[j].value;
            }
        }
    }


    function reinitialisation() {
        loss = 0;
        nbCasesClique = 0;
        valCase = 0;
        initialStake = 0;
        ////
        ////

        for (let i = 1; i <= 25; i++) {
            //console.log("dans le for", i);
            $("#" + i).removeClass("caseSafe");
            $("#" + i).removeClass("casePiege");
            $("#" + i).removeClass("casePiegeRestante");
            document.getElementById(i).innerHTML = "";
        }
    }

    function lancement() {

        console.log("dans la fct game");
        console.log("game started", gameStarted);

        if (gameStarted == 1) { // re initialisation du jeu

            reinitialisation();
        }

        pari = $(".pari").val();
        pari = parseInt(pari);
        console.log("pari", pari);
        initialStake = pari;

        //TO DO
        //recuperation du nb de bombes
        //nbBombes = 1;//////////////
        nbBombes = radioBombes();
        console.log("nombre de bombes", nbBombes);


        //test si le pari est valide
        if (pari <= 0 || isNaN(pari) || (balance - pari < 0)) {
            loss = 1;
            document.getElementById("message").innerHTML = "Valeur de mise non permise";

        } else {

            balance = balance - pari;
            document.getElementById("balance").innerHTML = "" + balance;
            document.getElementById("stake").innerHTML = "Stake: " + pari;
            document.getElementById("message").innerHTML = "";

            //affichage initial du premier next gain
            let temp = calcNextGain(pari, nbBombes, nbCasesClique);
            document.getElementById("next-gain").innerHTML = "Next gain: " + temp;

            game(nbBombes);
        }


    }

    function clicCashout() {
        console.log("cashout");
        document.getElementById("stake").innerHTML = "Cashout de " + pari;
        reinitialisation();
        balance = balance + pari;
        document.getElementById("balance").innerHTML = "" + balance;

        for (let i = 1; i <= 25; i++) {
            if (tabCoinsweeper[i] == 1) {
                $("#" + i).addClass("casePiegeRestante");
            }

        }

        //$("#" + id).addClass("casePiege");
        loss = 1;
        pari = 0;

        document.getElementById("next-gain").innerHTML = "";
    }

    $(".playButton").click(lancement);

    $(".case").click(clicCase);

    $(".cashout").click(clicCashout);


});

