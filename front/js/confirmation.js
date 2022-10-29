//Récupération du numéro de commande dans l'URL
function confirCommand() {
    const idCom = document.getElementById("orderId");
    idCom.innerText = localStorage.getItem("orderId");
    localStorage.clear();
}

confirCommand();