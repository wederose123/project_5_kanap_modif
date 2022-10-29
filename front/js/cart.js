//initialisation du local storage 
let localStoragProduit = JSON.parse(localStorage.getItem("produit"));

//recuperation de l'élement cart__items
let RecupCartItem = document.querySelector('#cart__items')

function iniCart() {

    for (let produit in localStoragProduit) {
        // Insertion de l'élément article
        let productArticle = document.createElement("article");
        document.querySelector("#cart__items").appendChild(productArticle);
        productArticle.className = "cart__item";
        productArticle.setAttribute('data-id', localStoragProduit[produit].id);

        // Insertion de l'élément div
        let divProductImg = document.createElement("div");
        productArticle.appendChild(divProductImg);
        divProductImg.className = "cart__item__img";

        // mise en place de l'image
        let infoProductImg = document.createElement("img");
        divProductImg.appendChild(infoProductImg);
        infoProductImg.src = localStoragProduit[produit].image;
        infoProductImg.alt = localStoragProduit[produit].descr;

        //insetion de plusieur element div
        //-------------------------------------------------------------------regarder si sa ne fonction par peut etre a cause de la fonction
        // Insertion de l'élément "div"
        let productItemContent = document.createElement("div");
        productArticle.appendChild(productItemContent);
        productItemContent.className = "cart__item__content";

        // Insertion de l'élément div--titlePrice
        let TitlePriceProduct = document.createElement("div");
        productItemContent.appendChild(TitlePriceProduct);
        TitlePriceProduct.className = "cart__item__content__titlePrice";

        //-------------------------
        // Insertion de l'élément "div"
        let paramProduct = document.createElement("div");
        productItemContent.appendChild(paramProduct);
        paramProduct.className = "cart__item__content__settings";

        // Insertion de l'élément div au niveau de la quantité
        let productS_Quantity = document.createElement("div");
        paramProduct.appendChild(productS_Quantity);
        productS_Quantity.className = "cart__item__content__settings__quantity";

        // Insertion de l'élément "div"
        let suprParamProduct = document.createElement("div");
        paramProduct.appendChild(suprParamProduct);
        suprParamProduct.className = "cart__item__content__settings__delete";

        //----------------------------------------------------------------------------------------------//

        //mise en place du nom du produit
        let nameProduct = document.createElement("h2");
        TitlePriceProduct.appendChild(nameProduct);
        nameProduct.innerHTML = localStoragProduit[produit].name;

        //mise en place de la couleur
        let productColor = document.createElement("p");
        nameProduct.appendChild(productColor);
        productColor.innerHTML = localStoragProduit[produit].color;
        //productColor.style.fontSize = "20px";

        //mise en place du prix
        let productPrice = document.createElement("p");
        TitlePriceProduct.appendChild(productPrice);
        productPrice.innerHTML = localStoragProduit[produit].price + " €";

        //mise en place de la quantité
        let productQte = document.createElement("p");

        productS_Quantity.appendChild(productQte);
        productQte.innerHTML = "Qté : ";


        //----------
        let productQuantity = document.createElement("input");
        productS_Quantity.appendChild(productQuantity);
        productQuantity.value = localStoragProduit[produit].quantyti;
        productQuantity.className = "itemQuantity";
        productQuantity.setAttribute("type", "number");
        productQuantity.setAttribute("min", "1" || "max", "100");
        productQuantity.setAttribute("name", "itemQuantity");

        //mise en place du supprimer
        let productSupprimer = document.createElement("p");
        suprParamProduct.appendChild(productSupprimer);
        productSupprimer.className = "deleteItem";
        productSupprimer.innerHTML = "Supprimer";

    }
}
iniCart();

function deleteProduct() {
    //mise en place du supprimer
    let suprbutton = document.querySelectorAll('.deleteItem');
    for (let i = 0; i < suprbutton.length; i++) {
        suprbutton[i].addEventListener('click', function (event) {
            let idProductDelete = localStoragProduit[i].id;
            let colorProductDelete = localStoragProduit[i].color;
            let newLocalStoragProduit = localStoragProduit.filter(el => el.id !== idProductDelete || el.color !== colorProductDelete);
            localStorage.setItem("produit", JSON.stringify(newLocalStoragProduit));
            alert('se produit a bien etais supprimer du panier');
            location.reload();
        })
    }
}
deleteProduct();


//-----------------------------------Total du panier
function totalPanier() {

    //--------------------calcul du nombre de produit puis ajout dans le total
    let nbQtt = document.getElementsByClassName('itemQuantity');
    let nbQLenth = nbQtt.length;
    totalQt = 0;

    for (let i = 0; i < nbQLenth; i++) {
        totalQt += nbQtt[i].valueAsNumber;
    }

    let totalProductQuantity = document.getElementById('totalQuantity');
    totalProductQuantity.innerHTML = totalQt;

    //------------Prix total des produit dans le panier
    totalPrice = 0

    for (let i = 0; i < nbQLenth; i++) {
        totalPrice += (nbQtt[i].valueAsNumber * localStoragProduit[i].price);
    }

    let totalProduitPrix = document.getElementById('totalPrice');
    totalProduitPrix.innerHTML = totalPrice;
}
totalPanier();


//----------------------Modification de la quantiter
//----------------------------------------------------------demander pk la quantiter devien la meme lors de la modifiquation de la quantiter
function modifPAnier() {

    let qtModif = document.querySelectorAll(".itemQuantity");

    for (let K = 0; K < qtModif.length; K++) {
        qtModif[K].addEventListener("change", (event) => {
            event.preventDefault();

            //les element à modifier en fonction de son id ET sa couleur
            let modifQuantity = localStoragProduit[K].quantyti;
            let modifValueQtt = qtModif[K].valueAsNumber;

            const resultFind = localStoragProduit.find((el) => el.modifValueQtt !== modifQuantity);
            resultFind.quantyti = modifValueQtt;
            localStoragProduit[K].quantyti = resultFind.quantyti;

            localStorage.setItem("produit", JSON.stringify(localStoragProduit));

            //--
            location.reload();

        })
    }
}
modifPAnier();
//---------------------------------------formulaire



//------------Verification/validation du formulaire
function registerForm() {
    //-----------recup du formulaire
    let form = document.querySelector('.cart__order__form')

    //--------------les REGEX
    let mailRegex = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let idenRegex = new RegExp("^[a-zA-Z ,.'-]+$");
    let adresRegex = new RegExp("^[A-zÀ-ú0-9 ,.'\-]+$");

    //------------Verification/validation du formulaire

    //-------verification du prenom
    //let firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
    form.firstName.addEventListener('change', function () {
        validFirstName(this);

    });
    const validFirstName = function (inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;
        if (idenRegex.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = ""
        } else {
            firstNameErrorMsg.innerHTML = "veuillez saisir un prénom valide";
        }
    }



    //-------verification du nom
    //let lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
    form.lastName.addEventListener('change', function () {
        validlastName(this)
    });
    const validlastName = function (inputlastName) {
        let lastNameErrorMsg = inputlastName.nextElementSibling;
        if (idenRegex.test(inputlastName.value)) {
            lastNameErrorMsg.innerHTML = ""
        } else {
            lastNameErrorMsg.innerHTML = "veuillez saisir un nom valide";
        }
    }

    //-------verification de l'adresse
    //let addressErrorMsg = document.getElementById('addressErrorMsg');
    form.address.addEventListener('change', function () {
        valideaddress(this)
    });
    const valideaddress = function (inputaddress) {
        let addressErrorMsg = inputaddress.nextElementSibling;
        if (adresRegex.test(inputaddress.value)) {
            addressErrorMsg.innerHTML = ""
        } else {
            addressErrorMsg.innerHTML = "veuillez saisir une adresse valide";
        }
    }

    //-------verification de la ville
    //let cityErrorMsg = document.getElementById('cityErrorMsg');
    form.city.addEventListener('change', function () {
        validecity(this)
    });
    const validecity = function (inputcity) {
        let cityErrorMsg = inputcity.nextElementSibling;
        if (idenRegex.test(inputcity.value)) {
            cityErrorMsg.innerHTML = ""
        } else {
            cityErrorMsg.innerHTML = "veuillez saisir une ville validele ";
        }
    }

    //-------verification de l'email
    //let emailErrorMsg = document.getElementById('emailErrorMsg');
    form.email.addEventListener('change', function () {
        valideemail(this)
    });
    const valideemail = function (inputemail) {
        let emailErrorMsg = inputemail.nextElementSibling;
        if (mailRegex.test(inputemail.value)) {
            emailErrorMsg.innerHTML = ""
        } else {
            emailErrorMsg.innerHTML = "veuillez saisir un email valide";
        }
    }
};
registerForm();

//-------------envoie des info dans le local storage
function servForm() {
    //------initalisation du bouton
    const btn_command = document.getElementById('order');

    btn_command.addEventListener('click', function (e) {
        e.preventDefault();

        //-----------recuperation des information du cliens
        let inputFirstName = document.getElementById('firstName');
        let inputLastName = document.getElementById('lastName');
        let inputAddress = document.getElementById('address');
        let inputCity = document.getElementById('city');
        let inputEmail = document.getElementById('email');

        //-------dans le cas ou le panier contien une erreur
        if (localStoragProduit == null) {
            alert("Pour passer commande, veuillez ajouter des produits à votre panier");
            e.preventDefault();
        } else if (firstName.value === "" || lastName.value === "" || address.value === "" || city.value === "" || email.value === "") {
            alert("Vous devez renseigner vos coordonnées pour passer la commande !");
            e.preventDefault();
        } else if (((idenRegex.test(inputlastName.value) || (!idenRegex.test(inputlastName.value)) || (!adresRegex.test(inputaddress.value)) || (!idenRegex.test(inputcity.value)) || (!mailRegex.test(inputemail.value))))) {
            alert("le formulaire n'est pas valide veuillez bien renseigner le formulaire pour passé commande ");
            e.preventDefault();
        }
        else {
            //construction de l'array pour le local storage
            let idProduct = [];
            for (let i = 0; i < localStoragProduit.length; i++) {
                idProduct.push(localStoragProduit[i].id);
            }
            //-------object contact
            const order = {
                contact: {
                    firstName: inputFirstName.value,
                    lastName: inputLastName.value,
                    address: inputAddress.value,
                    city: inputCity.value,
                    email: inputEmail.value,
                },
                products: idProduct,
            }

            const options = {
                method: 'POST',
                body: JSON.stringify(order),
                headers: {
                    "Content-Type": "application/json"
                },
            };

            fetch("http://localhost:3000/api/products/order", options)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    localStorage.setItem("orderId", data.orderId);

                    document.location.href = "confirmation.html";
                })
                .catch((err) => {
                    alert("tcProblème avec feh : " + err.message);
                });
        }
    })
}
servForm();


