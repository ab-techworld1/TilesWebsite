let urlString = window.location.href;
    let paramString = urlString.split('?')[1];
    let params_arr = paramString.split('&');
    let value = "";
    let product_id_pair = params_arr[0].split('=');
    let product_id = product_id_pair[1];
    let product_img_pair = params_arr[1].split('=');
    let product_img_url = product_img_pair[1];

    // function to be performed while page loading..
    function performAction(product_id,image_url){
        const apiBaseUrl = 'file:///C:/Users/Abhishek%20Srivastav/Desktop/tileWebsite/TilesWebsite/backend/api/';
        const absoluteImageUrl = `${apiBaseUrl}${image_url}`;
        const image_cont = document.getElementById('product_img');
        image_cont.src = absoluteImageUrl;
        console.log("product ID : ",product_id);
        console.log("product img : ",image_url);
    }

    // orderClicked Function
    function getProductId(){
        document.getElementById('p_id').value =product_id;
    }

    // call function
    performAction(product_id,product_img_url);
