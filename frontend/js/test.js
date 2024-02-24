let urlString = window.location.href;
    let paramString = urlString.split('?')[1];
    let params_arr = paramString.split('&');
    let value = "";
    for(let i=0; i< params_arr.length; i++ )
    {
      let pair = params_arr[i].split('=');
      console.log("Key is : ", pair[0])
      console.log("Value is : ", pair[1])
      value = pair[1]
    }
    
    // Fetch data from the API and populate cards
    function fetchDataAndPopulateCards(categoryId, size = null) {
    // ... Your fetch logic here ...
        console.log("This is size : ",size)
        // Dynamically construct the API URL based on categoryId and size
        const apiUrl = `http://127.0.0.1:8000/api/fetchProduct/?category_id=${categoryId}${size ? `&size=${size}` : ''}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Populate cards based on data
                const apiBaseUrl = 'file:///C:/Users/Abhishek%20Srivastav/Desktop/tileWebsite/TilesWebsite/backend/api/';
                len = data['data']['length'];
            for(let i=0;i<len;i++)
            {
                const product_id = data['data'][i]['product_id'];
                const product_name = data['data'][i]['product_name'];
                const image_url = data['data'][i]['product_image'];
                const category = data['data'][i]['category'];
                const product_details = data['data'][i]['product_details'];
                var size = data['data'][i]['size'];
                // // dropdown_item.push(size);
                // if(!dropdown_item.includes(size)){
                // dropdown_item.push(size)
                // }            
                // Construct the absolute URL by combining the base URL and relative path
                const absoluteImageUrl = `${apiBaseUrl}${image_url}`;
                // console.log("Image Url ::::::::::::::: ",absoluteImageUrl)

                // console.log("New text type : ",data['data'][i]['name'])
                const newCard = document.createElement('div');
                newCard.className='card custom_card'
                const newLink = document.createElement('a');
                newLink.href = 'javascript:void(0)';
                newLink.onclick = function() {
                // Handle click event if needed ( onclick- details page should be opened........... )
                redirect_url = "detailspage.html?product_id="+product_id+"&image_url="+image_url;
                window.location.href = redirect_url;

                };
                // Create an image element within the link
                const newImage = document.createElement('img');
                newImage.className = 'card-img-top fixed-size-img img-fluid';
                // newImage.src = "images/category/parking categ.jpg";
                newImage.src = absoluteImageUrl;
                newImage.alt = 'Card image';
                // newImage.style.width = '100%';

                // Create a card body within the card
                const newCardBody = document.createElement('div');
                newCardBody.className = 'card-body';

                // Create a card title within the card body
                const newCardTitle = document.createElement('h4');
                newCardTitle.className = 'card-title';
                newCardTitle.textContent = product_name;
                // Append elements to build the card structure
                newLink.appendChild(newImage);
                newCardBody.appendChild(newCardTitle);
                newCard.appendChild(newLink);
                newCard.appendChild(newCardBody);
            // Append the new card to the container
                parent_card.appendChild(newCard);
                // console.log("dropdown item : ",dropdown_item.length)
                }
        
            })
            .catch(error => console.error('Error fetching data:', error));
    }

        // Populate the dropdown menu
    function populateDropdown(categoryId, dropdownItems) {
        const parentMenu = document.getElementById('d_menu');
        
        dropdownItems.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item;

            listItem.addEventListener('click', function() {
                console.log('Clicked:', item);
                
                // Clear existing cards
                clearCards();

                // Fetch data and populate cards based on the selected dropdown item
                fetchDataAndPopulateCards(categoryId, item);
            });

            parentMenu.appendChild(listItem);
        });
    }

    // Clear existing cards
function clearCards() {
    const parentCard = document.getElementById('parent_card');
    parentCard.innerHTML = ''; // Remove all child elements
}

document.addEventListener('DOMContentLoaded', function() {
    const categoryId = value; // Replace with your actual category ID
    const apiUrl = `http://127.0.0.1:8000/api/fetchProduct/?category_id=${categoryId}`;

    // Fetch data for initial load and populate dropdown
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Extract unique sizes
            const sizes = Array.from(new Set(data['data'].map(item => item.size)));

            // Populate dropdown
            populateDropdown(categoryId, sizes);

            // Populate cards for the initial load
            fetchDataAndPopulateCards(categoryId);
        })
        .catch(error => console.error('Error fetching data:', error));
});
