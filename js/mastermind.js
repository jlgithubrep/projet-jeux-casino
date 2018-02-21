$(document).ready(function () {
    // Le code ne s'executeras pas tant que la page n'est pas chargée

    let balance = 100;
    let pari;
    let mastermind = $(".mastermind");
    let nbHasard = [0, 0, 0];
    let gameStarted = 0;

    document.getElementById("balance").innerHTML = "" + balance;//affiche la valeur de la balance sur la page

    mastermind.toggle();

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function affichageMastermind() {
        if (gameStarted == 0) {
            gameStarted = 1;
            mastermind.toggle();
        }
    }

    function reinitialisation() {
        document.getElementById("message").innerHTML = "";
        document.getElementById("message2").innerHTML = "";
        document.getElementById("historique").innerHTML = "";
    }

    function game() {

        //on efface la zone de message quand on refait une tentative
        document.getElementById("message").innerHTML = "";
        document.getElementById("message2").innerHTML = "";

        balance -= pari; // on enleve de la balance à chaque fois que l'on propose un nombre
        document.getElementById("balance").innerHTML = "" + balance;

        let t = $(".tentative").val();
        console.log("tentative", t);
        //$(".historique").append(t + "<br>");
        let historique = "";

        let tabDecomposition = t.split(''); //apres avoir recupéré la tentative (entre 100 et 999), on decompose le nombre en 3 chiffres dans un tab
        console.log("decompo", tabDecomposition);

        let occurence = 0;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {

                if (nbHasard[i] == tabDecomposition[j]) {
                    if (i == j) {

                        if (occurence > 0) {
                            $(".message2").append(t + " : chiffre trouvé à la position correcte " + (i + 1) + "<br>");
                            historique += t + " : chiffre trouvé à la position correcte " + (i + 1) + "<br>";
                            occurence++;
                        } else {
                            document.getElementById("message").innerHTML = t + " : chiffre trouvé à la position correcte " + (i + 1) + "<br>";
                            historique = t + " : chiffre trouvé à la position correcte " + (i + 1) + "<br>"
                            console.log("val trouvé à la position correcte", i + 1);
                            occurence++;
                        }
                    }
                    else {

                        if (occurence > 0) {
                            /*
                            $(".message2").append(t + " : chiffre trouvé, mais pas à la bonne place<br>");
                            historique += t + " : chiffre trouvé, mais pas à la bonne place<br>";
                            occurence++;
                            */

                            $(".message2").append(t + ": " + occurence + " chiffres trouvés, mais pas à la bonne place<br>");
                            historique += t + ": " + occurence + " chiffres trouvés, mais pas à la bonne place<br>";
                            occurence++;

                        } else {
                            document.getElementById("message").innerHTML = t + " : chiffre trouvé, mais pas à la bonne place<br>";
                            historique = t + " : chiffre trouvé, mais pas à la bonne place<br>";
                            console.log("val trouvée à la position", i + 1);
                            occurence++;
                        }
                    }

                } else if (occurence == 0) {
                    document.getElementById("message").innerHTML = t + " : rien n'a été trouvé<br>";
                    historique = t + " : rien n'a été trouvé<br>";
                }


            }
        }


        $(".historique").append(historique);
        console.log("valeur d'occurence à la fin de la fct game", occurence);
    }


    function lancement() {
        console.log("dans la fonction lancement");


        if (gameStarted == 1) { // re initialisation du jeu
            console.log("appel de la reinitialisation");
            reinitialisation();
        }


        pari = $(".pari").val();
        pari = parseInt(pari);
        console.log("pari", pari);


        nbHasard[0] = getRandomInt(1, 9);
        nbHasard[1] = getRandomInt(1, 9);
        nbHasard[2] = getRandomInt(1, 9);
        console.log("nbhasard", nbHasard);

        affichageMastermind();
    }


    $(".playButton").click(lancement);

    $(".boutonTentative").click(game);

});