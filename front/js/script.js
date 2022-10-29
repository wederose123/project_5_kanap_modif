//cette fonction permet de récuperé les produits depuis le back end
async function getProducts() {
  try {
    let response = await fetch("http://localhost:3000/api/products");
    //console.log("produits", response.json());
    return await response.json();
  } catch (error) {
    console.log("erreur dans le traitement de la requette", error);
  }
}
//cette fonction permet d'afficher les produit recuperer depuis le back-end dans la page d'acceuil
(async function renderProducts() {
  let products = await getProducts();
  //console.log("produit", products);
  let htmlRender = " ";
  products.forEach((element) => {
    let htmlContent = ` 
        <a href="./product.html?id=${element._id}">
        <article>
          <img src="${element.imageUrl}" alt="${element.altTxt}">
          <h3 class="productName">${element.name}</h3>
          <p class="productDescription">${element.description}</p>
        </article>
        </a>
        `;
    htmlRender += htmlContent;
  });
  let itemContainer = document.getElementById("items");
  itemContainer.innerHTML = htmlRender;
})();




