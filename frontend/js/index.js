

document.addEventListener("DOMContentLoaded", function() {
    // Make a GET request when the page is loaded
    fetch('http://127.0.0.1:8000/api/fetchCategory/')
      .then(response => response.json())
      .then(data => {
        // Handle the data as needed
        // Parent component...............
        parent_card = document.getElementById('parent_card')
        // Base URL of your API
        const apiBaseUrl = 'file:///C:/Users/Abhishek%20Srivastav/Desktop/tileWebsite/TilesWebsite/backend/api/';
        len = data['data']['length']
        for(let i=0;i<len;i++)
        {
            const category_name = data['data'][i]['name'];
            const image_url = data['data'][i]['category_image'];
            const category_id = data['data'][i]['category_id'];
            console.log("Category id ",category_id)
            // Construct the absolute URL by combining the base URL and relative path
            const absoluteImageUrl = `${apiBaseUrl}${image_url}`;
            // console.log("Image Url ::::::::::::::: ",absoluteImageUrl)

            console.log("New text type : ",data['data'][i]['name'])
            const newCard = document.createElement('div');
            newCard.className='card custom_card'
            const newLink = document.createElement('a');
            newLink.href = 'javascript:void(0)';
            newLink.onclick = function() {
          // Handle click event if needed ( onclick- subcategory page should be opened........... )
                redirect_url = "subcategory.html?category_id="+category_id;
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
            newCardTitle.textContent = category_name;
            // Append elements to build the card structure
            newLink.appendChild(newImage);
            newCardBody.appendChild(newCardTitle);
            newCard.appendChild(newLink);
            newCard.appendChild(newCardBody);
            // Append the new card to the container
            parent_card.appendChild(newCard);

        }
        cardElement = document.getElementById('tile_card')
        console.log("HTML ele", cardElement)
        console.log("length",data['data']);
        console.log("typr",typeof data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
  



























// function mainImageClicked()
// {
//     // alert("Main Image clicked.")
//     document.getElementById('main_category').style.display = "none";
//     document.getElementById('size_selection').style.display = "block";

// }

// function subImageClicked()
// {
//     // alert("Sub Image clicked.")
//     document.getElementById('sub_category').style.display = "none";
//     document.getElementById('category_details').style.display = "block";

// }
// function detailImageClicked()
// {
//     document.getElementById('category_details').style.display = "none";
//     document.getElementById('main_category').style.display = "block"; 
// }
// function prevClicked()
// {
//     document.getElementById('sub_category').style.display = "none";
//     document.getElementById('main_category').style.display = "block"; 
// }
// function Image2Clicked()
// {
//     document.getElementById('category_details').style.display = "none";
//     document.getElementById('sub_category').style.display = "block"; 
// }