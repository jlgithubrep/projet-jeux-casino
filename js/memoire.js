$(document).ready(function () {
    // Le code ne s'executeras pas tant que la page n'est pas chargée

    //let balance = 100;
    //document.getElementById("balance").innerHTML = "" + balance;//affiche la valeur de la balance sur la page


    /*
    * grille de 4x4
    * 16 cases en tout
    * images par pair de 2
    * 8 images differentes
    * */

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }


    //remplissage d'un tableau de chiffre de 1 à 16 au hasard, sans repetition
    let listeCarte = [];
    while (listeCarte.length < 16) { //rempli un tableau de random de 0 à 15 different de longeur 16
        let randomnumber = getRandomInt(0, 16); //random de 0 à 15
        if (listeCarte.indexOf(randomnumber) != -1) continue;
        listeCarte[listeCarte.length] = randomnumber;
    }
    console.log("listeCarte", listeCarte);

    //le double d'une carte est placé dans son chiffre +8 si chiffre <= 8, sinon -8
    //ex : le joker est sur la case contenant 8 , son doublon sera sur la case du tableau contenant 16
    //ex2 : ace of club sur 1, doublon sur 9
    //ex3 : king est sur 14, son doublon est sur 6


    function listeNomCarte(u) {
        //let indice = u-1;
        console.log("u", u);
        let tab = [
            "carteAceClub",
            "carteAceDiamond",
            "carteAceHeart",
            "carteAceSpade",
            "carteJackSpade",
            "carteKingDiamond",
            "carteQueenHeart",
            "carteJoker"];

        return tab[u];
    }

    let retourne = 0;//pour savoir si une autre carte a été retournée
    let numRetourne;//pour retenir le type de la 1er carte retournée
    let idRetourne;//pour retenir l'id de la 1er carte retournée
    let t = 0;//pour ne pas ouvrir une 3eme carte quand on attend que 2 cartes qui ne vont pas ensemble se re cache
    let score = 0;

    function clicCarte() {

        //console.log(this.className);
        if (this.className == "carte" && t == 0) { //execute la suite seulement si on clic sur case grise et que l'on attend pas 2 cartes impaires de se rechacher

            let id = this.id;
            console.log("id", id);


            let numCarteTabRandom = listeCarte[id - 1];

            console.log("numCarteTabRandom", numCarteTabRandom);
            let numCarte;

            if (numCarteTabRandom < 8) {
                numCarte = numCarteTabRandom;
            } else {
                numCarte = numCarteTabRandom - 8;
            }

            let nomCarte = listeNomCarte(numCarte);


            $("#" + id).addClass(nomCarte);


            if (retourne == 1) { //si une autre carte est deja retourné
                retourne = 0;
                console.log("une autre retournée");

                if (numRetourne == numCarte) {
                    console.log("match");
                    score++;
                    console.log("score", score);
                    document.getElementById("message").innerHTML = "Score: "+score;
                    if (score == 8) {
                        document.getElementById("message").innerHTML = "Vous avez gagné!";
                    }
                } else {
                    console.log("no match");
                    t = 1;//

                    setTimeout(function () {
                        $("#" + id).removeClass(nomCarte);
                        $("#" + id).addClass("carte");
                    }, 2000);

                    setTimeout(function () {
                        $("#" + idRetourne).removeClass(listeNomCarte(numRetourne));
                        $("#" + idRetourne).addClass("carte");
                    }, 2000);

                    setTimeout(function () {
                        t = 0;
                    }, 2000);
                }

            } else { //si aucune autre carte n'a été retourné
                retourne = 1;
                numRetourne = numCarte;
                idRetourne = id;
                console.log("rien d'autre retoune");
            }

        }


    }


    $(".carte").click(clicCarte);

});