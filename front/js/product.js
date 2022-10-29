
//cette fonction permets de recuperer le paramettre id depuis l'Url de la requette definie dans l'attribue 
//href du prouduit depuis la page scrit.js

function getIdProduct() {
  let url = new URL(window.location.href);
  let search_params = new URLSearchParams(url.search);

  if (search_params.has('id')) {
    var productId = search_params.get('id');
    console.log(productId);
    return productId;
  }

}
//cette fonction nous permets de recupere dynamiquement le produit appartir de l'id depuis le back-end
async function getProductById() {
  let idProduct = getIdProduct();
  try {
    let response = await fetch(`http://localhost:3000/api/products/${idProduct}`);
    return await response.json();
  } catch (error) {
    console.log("erreur dans le traitement de la requette", error);
  }
}
// cette condition nous permettra de recuperer certaine donner pour l'utilisation de localstorag

//cette fonction permet d'afficher les produit et c'est detail dynamiquement dans la page produit;
(async function renderProduct() {
  let product = await getProductById();
  console.log("produit", product);
  document.querySelector(".item__img").innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
  document.getElementById("title").innerHTML = product.name;
  document.getElementById("price").innerHTML = product.price;
  document.getElementById("description").innerHTML = product.description;
  for (number in product.colors) {
    colors.options[colors.options.length] = new Option(
      product.colors[number],
      product.colors[number]
    );
  }
  //Appell de la fonction addProductToCard avec comme paramettre le produit afficher
  addProductToCard(product);
}
)();

//cette fontion permet d'ajouter un produit dans le panier
function addProductToCard(article) {
  const button = document.querySelector('#addToCart')
  if (button != null) {
    //recuperation des valeur 
    const s_color = document.querySelector("#colors")
    const s_quantity = document.querySelector("#quantity")

    // prendre les information qu'on souhaite mettre dans le panier
    button.addEventListener('click', function (event) {

      //recuperation des valeur saisie par l'utilisateur

      let choixCouleur = s_color.value;
      let choixQuantity = s_quantity.value;
      //console.log(choixCouleur, choixQuantité)

      const recupDon = {
        id: article._id,
        image: article.imageUrl,
        descr: article.description,
        name: article.name,
        price: article.price,
        color: choixCouleur,
        quantyti: choixQuantity
      }
      console.log(recupDon.price)

      //console.log(recupDon.name, recupDon.id);
      if (choixCouleur === "") {
        alert('veuiller choisir une couleur svp')
      } else if (choixQuantity <= 0 || choixQuantity > 100) {
        alert('veuiller indiquer une quantier comprise entre 1 et 100 svp')
      }
      else {
        //intialisation du localstorage
        let localStoragProduit = JSON.parse(localStorage.getItem("produit"));
        //mise en place du produit dans le local storage
        if (localStoragProduit) {
          const resutStorage = localStoragProduit.find(
            (el) => el.id === article.id && el.color === choixCouleur)

          //incrementation du produit si il et deja dans le panier
          if (resutStorage) {
            let ajtProduit =
              parseInt(recupDon.quantyti) + parseInt(resutStorage.quantyti)
            resutStorage.quantyti = ajtProduit;
            localStorage.setItem("produit", JSON.stringify(localStoragProduit));
          }
          //est si il n'a pas etais ajouter dans le panier
          else {
            localStoragProduit.push(recupDon);
            localStorage.setItem("produit", JSON.stringify(localStoragProduit));
          }
        }
        //dans le cas ou le panier et vide
        else {
          localStoragProduit = [];
          localStoragProduit.push(recupDon);
          localStorage.setItem("produit", JSON.stringify(localStoragProduit));
        }
      }
    });
  }
}





