//let num_tire;
//let color;// true noir, false rouge
//let colorUser;
//let pair;// true pair, false impair
let balance = 100;

let text = "";
let text2 = "";
let text3 = "";


let userChoices = [-1, -1, -1, -1, -1, -1]; //tableau de 6 cases [chiffre, mise, color, mise, parite, mise]
let resultatTirage = [-1, -1, -1];//tableau de 3 cases contenant le resultat du tirage [chiffre, color, parite]

let noir = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];

//document.getElementById("balance").innerHTML = "" + balance;
$('#balance').append(balance);

function traitement() {
    console.log("traitement");
    //text = "Le numéro tiré au hasard est: " + num_tire;
    text += "<p>Vous avez parié le numéro: " + userChoices[0] + "</p>";
    document.getElementById("result").innerHTML = text;

    if (resultatTirage[0] == userChoices[0]) {
        balance = balance + (userChoices[1] * 36);
        document.getElementById("result").innerHTML += "Vous avez gagné au tirage du chiffre! " + (userChoices[1] * 36) + " ajouté à la balance";
    } else {
        balance = balance - userChoices[1];
        document.getElementById("result").innerHTML += "Vous avez perdu au tirage du chiffre! " + userChoices[1] + " retiré de la balance";

    }

    console.log(balance);

    document.getElementById("balance").innerHTML = "" + balance;
}

function traitementCouleur() {
    let t;
    if (userChoices[2] == 0) {
        t = "rouge";
    } else if (userChoices[2] == 1) {
        t = "noir";
    }


    text2 += "<p>Vous avez parié sur la couleur: " + t + "</p>";
    document.getElementById("resultColor").innerHTML = text2;


    if (resultatTirage[1] == userChoices[2]) {
        balance = balance + (userChoices[3] * 2);
        document.getElementById("resultColor").innerHTML += "Vous avez gagné au tirage de la couleur! " + (userChoices[3] * 2) + " ajouté à la balance";
    } else {
        balance = balance - userChoices[3];
        document.getElementById("resultColor").innerHTML += "Vous avez perdu au tirage de la couleur!  " + userChoices[3] + " retiré de la balance";

    }

    console.log(balance);

    document.getElementById("balance").innerHTML = "" + balance;
}

function traitementParite() {
    let t;
    if (userChoices[4] == 0) {
        t = "impair";
    } else if (userChoices[4] == 1) {
        t = "pair";
    }

    text3 += "<p>Vous avez parié sur la parite: " + t + "</p>";
    document.getElementById("resultParite").innerHTML = text3;


    if (resultatTirage[2] == userChoices[4]) {
        balance = balance + (userChoices[5] * 2);
        document.getElementById("resultParite").innerHTML += "Vous avez gagné au tirage de la parite! " + (userChoices[5] * 2) + " ajouté à la balance";
    } else {
        balance = balance - userChoices[5];
        document.getElementById("resultParite").innerHTML += "Vous avez perdu au tirage de la parite! " + userChoices[5] + " retiré de la balance";

    }

    console.log(balance);

    document.getElementById("balance").innerHTML = "" + balance;
}


function radioColor() {
    let radios = document.getElementsByName("color");

    if (radios[0].checked) {
        return (radios[0].value);  // 0 == rouge
    }
    else if (radios[1].checked) {
        return (radios[1].value); // 1 == noir
    } else {
        return -1; // renvoie -1 si il a pas parié sur la couleur
    }

}

function radioParite() {
    let radios = document.getElementsByName("parite");

    if (radios[0].checked) {
        return (radios[0].value);  // 0 == impair
    }
    else if (radios[1].checked) {
        return (radios[1].value); // 1 == pair
    } else {
        return -1; // renvoie -1 si il a pas parié sur la parite
    }

}

function affichageGraphique(e) {
    document.getElementById(e).classList.add("border");

}

function removeAffichage(e) {
    document.getElementById(e).classList.remove("border");
}


function remplissageResultat() {

    if (resultatTirage[0] != -1) {
        removeAffichage(resultatTirage[0]);
    }


    console.log("dans remplissage");

    //// remplissage du tableau de resultat
    resultatTirage[0] = Math.floor(Math.random() * 36);
    //resultatTirage[0] = 0;
    console.log("resultatTirage[0]: ", resultatTirage[0]);
    text = "Le numéro tiré au hasard est: " + resultatTirage[0];
    text2 = "Le numéro tiré au hasard est: " + resultatTirage[0];
    text3 = "Le numéro tiré au hasard est: " + resultatTirage[0];

    //document.getElementById("result").innerHTML = text;
    console.log("res tirage 0", resultatTirage[0]);
    affichageGraphique(resultatTirage[0]); // renvoie du chiffre dans la fonction d'affiche graphique

    resultatTirage[1] = false; // on met par defaut la couleur du resultat à rouge

    for (e in noir) {
        console.log("dans la boucle");
        if (resultatTirage[0] == noir[e]) {
            resultatTirage[1] = true;//noir
        }
    }

    console.log("couleur du tirage", resultatTirage[1]);

    if (resultatTirage[0] == 0) {
        resultatTirage[1] = -1; //si le chiffre est zero, pas de couleur
    }


    if (resultatTirage[1] == 0) {
        text2 += "<br>La couleur du numero tiré au hasard est: rouge";
    } else if (resultatTirage[1] == 1) {
        text2 += "<br>La couleur du numero tiré au hasard est: noir";
    } else {
        text2 += "<br>Couleur prison, Perdu";
    }


    if (resultatTirage[0] % 2 == 0) {
        resultatTirage[2] = true;
    }
    else {
        resultatTirage[2] = false;
    }

    if (resultatTirage[0] == 0) {
        resultatTirage[2] = -1; //si le chiffre est zero, pas de parité
    }


    console.log("parite du tirage", resultatTirage[2]);
    //text3 += "La parite du numero tiré au hasard est: " + resultatTirage[2];

    if (resultatTirage[2] == 0) {
        text3 += "<br>La parite du numero tiré au hasard est: impair";
    } else if (resultatTirage[2] == 1) {
        text3 += "<br>La parite du numero tiré au hasard est: pair";
    } else {
        text3 += "<br>Parité prison, Perdu";
    }

    //// fin de remplissage du tableau de resultat
}


function random() {


    /*
    pari = document.getElementById("pari").value; // recuperation de la valeur choisie par l'utilisateur
    mise = document.getElementById("mise").value; //recuperation de la somme misée
*/

    userChoices[0] = document.getElementById("pari").value; // recuperation de la valeur choisie par l'utilisateur
    if (userChoices[0] == "") {
        userChoices[0] = -1;
    }
    userChoices[1] = document.getElementById("mise").value; //recuperation de la somme misée
    if (userChoices[1] == "") {
        userChoices[1] = -1;
    }
    console.log("choix user chiffre", userChoices[0]);
    console.log("mise user chiffre", userChoices[1]);


    userChoices[2] = radioColor();
    userChoices[3] = document.getElementById("miseColor").value;
    if (userChoices[3] == "") {
        userChoices[3] = -1;
    }
    console.log("couleur de l'utilisateur", userChoices[2]);
    console.log("mise couleur de l'utilisateur", userChoices[3]);


    userChoices[4] = radioParite();
    userChoices[5] = document.getElementById("miseParite").value;
    if (userChoices[5] == "") {
        userChoices[5] = -1;
    }
    console.log("parite de l'utilisateur", userChoices[4]);
    console.log("mise parite de l'utilisateur", userChoices[5]);


    remplissageResultat();


    if (userChoices[0] != -1 && userChoices[1] != -1) {
        let pariOK = true;

        //test validité du pari
        if (userChoices[0] < 0 || userChoices[0] > 36) {
            pariOK = false;
            text = "Choississez entre 0 et 36";
            document.getElementById("result").innerHTML = "" + text;
        }

        //test validité de la somme misée
        if (userChoices[1] > balance || userChoices[1] < 1) {


            if (pariOK == false) {
                pariOK = false;
                text += "</br>" + "mise sur le chiffre incorrecte";
                document.getElementById("result").innerHTML = "" + text;

            } else {
                pariOK = false;
                text = "mise sur le chiffre incorrecte";
                document.getElementById("result").innerHTML = "" + text;
            }


        }


        if (pariOK == true) {
            traitement();
        }
    }


    ///////condition couleur


    if (userChoices[2] != -1 && userChoices[3] != -1) {
        let pariOK = true;


        //test validité de la somme misée sur la couleur
        if (userChoices[3] > balance || userChoices[3] < 1) {


            if (pariOK == false) {
                pariOK = false;
                text += "</br>" + "mise sur la couleur incorrecte";
                document.getElementById("resultColor").innerHTML = "" + text;

            } else {
                pariOK = false;
                text = "mise sur la couleur incorrecte";
                document.getElementById("resultColor").innerHTML = "" + text;
            }


        }


        if (pariOK == true) {
            traitementCouleur();
        }
    }


    ///////condition parite


    if (userChoices[4] != -1 && userChoices[5] != -1) {
        let pariOK = true;


        //test validité de la somme misée sur la parite
        if (userChoices[5] > balance || userChoices[5] < 1) {


            if (pariOK == false) {
                pariOK = false;
                text += "</br>" + "mise sur la parité incorrecte";
                document.getElementById("resultParite").innerHTML = "" + text;

            } else {
                pariOK = false;
                text = "mise sur la parité incorrecte";
                document.getElementById("resultParite").innerHTML = "" + text;
            }


        }


        if (pariOK == true) {
            traitementParite();
        }
    }


}






