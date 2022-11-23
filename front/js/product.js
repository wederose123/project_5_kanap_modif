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
})();


//------Modele d'objet pour les produits selectionnes
class product {
  constructor(productId, color, quantity) {
    this.productId = productId,
      this.color = color,
      this.quantity = quantity
  }
};

//---------Recuperation du choix de l'utilisateur---------//
(async function addProductToCard() {
  // recuperation du produit selectionne (api)
  let productData = await getProductById();

  // selection du boutton AddToCart
  const button = document.querySelector("#addToCart");
  // selection du formulaire Colors
  const selectedColor = document.querySelector("#colors");
  // selection de l'input Quantity
  const selectedQuantity = document.querySelector("#quantity");

  //------Ecouter le bouton AjouterAuPanier
  // ajouter un evenement
  button.addEventListener("click", (event) => {
    // bloquer les evenements par defaut
    event.preventDefault();

    //---Creation de l'objet de recuperation de la saisie de l'utilisateur
    let selection = new product(
      productData._id,
      selectedColor.value,
      Number(selectedQuantity.value)
    );

    // si la quantite enregistree est comprise entre 1 et 100
    if (selection.quantity >= 1 && selection.quantity <= 100) {
      //---Envoyer dans le panier (local storage)
      // recuperer les donnes du panier
      let cart = JSON.parse(localStorage.getItem("panier"));

      // si le panier n'existe pas
      if (cart == null) {
        // on cree le panier pour envoyer directement
        let cart = [selection];
        localStorage.setItem("panier", JSON.stringify(cart));

        // tester si il y a un doublon dans le tableau
      } else if (cart.some(y =>
        y.id === selection.id &&
        y.color === selection.color) == true) {
        // on prend son index
        const duplicateIndex = cart.findIndex(e =>
          e.id === selection.id &&
          e.color === selection.color);
        // addition de la valeur initiale du panier avec la selection
        cart[duplicateIndex].quantity = cart[duplicateIndex].quantity + selection.quantity;
        // mise a jour du panier
        localStorage.setItem("panier", JSON.stringify(cart));

        // si l'element n'est pas dans un panier
      } else {
        // envoyer directement la selection au panier
        cart.push(selection);
        localStorage.setItem("panier", JSON.stringify(cart));
      };
      alert(`${selection.quantity} article(s) ${selection.color} ajoute(s) dans le panier`);

      // si la quantite enregistree n'est pas comprise entre 1 et 100
    } else {
      // Message erreur
      alert("Veuillez indiquer une quantite entre 1 et 100");
    }


  });
})();