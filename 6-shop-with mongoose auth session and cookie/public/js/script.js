let url = window.location.pathname;
if(url =="/admin/add-product"){
    var activeLink = document.getElementById("addProductLink");
}
else if(url =="/"){
    var activeLink = document.getElementById("shopLink");
} else{
    console.log("404");
}
activeLink.classList+=" active";