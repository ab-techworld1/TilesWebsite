
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
    
    var dropdown_item = Array();

    // fetch all the tiles detials on loading of this page ......................
    document.addEventListener('DOMContentLoaded',function() {
      // console.log("fetch all tilesassociated to category...")
      fetch('http://127.0.0.1:8000/api/fetchProduct/?category_id='+value)
      .then(response => response.json())
      .then(data => {
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
            // dropdown_item.push(size);
            if(!dropdown_item.includes(size)){
              dropdown_item.push(size)
            }            
            // Construct the absolute URL by combining the base URL and relative path
            const absoluteImageUrl = `${apiBaseUrl}${image_url}`;
            // console.log("Image Url ::::::::::::::: ",absoluteImageUrl)

            // console.log("New text type : ",data['data'][i]['name'])
            const newCard = document.createElement('div');
            newCard.className='card custom_card'
            const newLink = document.createElement('a');
            newLink.href = 'javascript:void(0)';
            newLink.onclick = function() {
            // Handle click event if needed ( onclick- subcategory page should be opened........... )
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
        

   // --------------------------------------------------------------------------------------------------
        const parent_menu = document.getElementById('d_menu');
        for(let i=0;i<dropdown_item.length;i++)
        {
          // create dropdown items dynamically..........
            const item_value = dropdown_item[i]
            const newli = document.createElement('li');
            const newLink = document.createElement('a');
            newLink.className='dropdown-item';
            newLink.href='#';
            newLink.onclick = function(){
              console.log("Clicked : ",item_value)
          // ---------------------------------------------------------------------------
            // var all_card = document.querySelector('.custom_card');
            var all_card = document.getElementsByClassName('custom_card');
            var elementsArray = Array.from(all_card);
            // Remove each element in the array
            elementsArray.forEach(function(element) {
              element.remove();
            });

          url_value = 'http://127.0.0.1:8000/api/fetchProduct/?category_id='+value+'&size='+item_value;
          console.log("URL : ",url_value)
          fetch(url_value)
          .then(response => response.json())
          .then(data => {
            // Handle the data as needed
            // document.getElementsByClassName('custom_card').style.display='none';
            const apiBaseUrl = 'file:///C:/Users/Abhishek%20Srivastav/Desktop/tileWebsite/TilesWebsite/backend/api/';
            len = data['data']['length'];
            for(let i=0;i<len;i++)
            {
              const product_id = data['data'][i]['product_id'];
              const product_name = data['data'][i]['product_name'];
              const image_url = data['data'][i]['product_image'];
              const category = data['data'][i]['category'];
              const product_details = data['data'][i]['product_details'];
              const size = data['data'][i]['size'];

        
              // Construct the absolute URL by combining the base URL and relative path
              const absoluteImageUrl = `${apiBaseUrl}${image_url}`;
              // console.log("Image Url ::::::::::::::: ",absoluteImageUrl)

              // console.log("New text type : ",data['data'][i]['name'])
              const newCard = document.createElement('div');
              newCard.className='card custom_card'
              const newLink = document.createElement('a');
              newLink.href = 'javascript:void(0)';
              newLink.onclick = function() {
              // Handle click event if needed ( onclick- subcategory page should be opened........... )
              // redirect_url = "subcategory.html?category_id="+category_id;
              // window.location.href = redirect_url;
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
            }
          })
          .catch(error => {
          console.error('Error:', error);
          });

            
          // ---------------------------------------------------------------------------

            }
            newLink.innerHTML= item_value;
            console.log("======================= ",item_value)
            newli.appendChild(newLink);
            parent_menu.appendChild(newli);
        }
        
        })
      .catch(error => {
        console.error('Error:', error);
      });
    
    })

    // window.onload = pageLoadFunc()

    // console.log("dropdown item : ",dropdown_item.length)


    // // --------------------------------------------------------------------------------------------------------------
    //       // -----------------------------------------------------------------------------------------------------------------
    //       const parent_menu = document.getElementById('d_menu');
    //       console.log("bbbb  ",dropdown_item)
    //       console.log("zzzzzzzzzzzzzzzzzzzz" + dropdown_item.length)
    //       for(let i=0;i<dropdown_item.length;i++)
    //       {
    //         // create dropdown items dynamically..........
    //           const item_value = dropdown_item[i]
    //           const newli = document.createElement('li');
    //           const newLink = document.createElement('a');
    //           newLink.className='dropdown-item';
    //           newLink.href='#';
    //           newLink.onclick= function()
    //           {
                
    //             var all_card = document.querySelector('.custom_card');
    //             console.log("check 22222222222222222222 ",  all_card)
    //             if(all_card){
    //               console.log("nnnnnn")
    //               all_card.remove();
    //             }
    //             else{
    //               console.log("No div ekebjsfhvkdjfkbfkg")
    //             }
    //             fetch('http://127.0.0.1:8000/api/fetchProduct/?category_id='+value+'&size='+item_value)
    //             .then(response => response.json())
    //             .then(data => {
    //               // Handle the data as needed
    //               // document.getElementsByClassName('custom_card').style.display='none';
    //               const apiBaseUrl = 'file:///C:/Users/Abhishek%20Srivastav/Desktop/tileWebsite/TilesWebsite/backend/api/';
    //               len = data['data']['length'];
    //               for(let i=0;i<len;i++)
    //               {
    //                 const product_id = data['data'][i]['product_id'];
    //                 const product_name = data['data'][i]['product_name'];
    //                 const image_url = data['data'][i]['product_image'];
    //                 const category = data['data'][i]['category'];
    //                 const product_details = data['data'][i]['product_details'];
    //                 const size = data['data'][i]['size'];

              
    //                 // Construct the absolute URL by combining the base URL and relative path
    //                 const absoluteImageUrl = `${apiBaseUrl}${image_url}`;
    //                 // console.log("Image Url ::::::::::::::: ",absoluteImageUrl)

    //                 // console.log("New text type : ",data['data'][i]['name'])
    //                 const newCard = document.createElement('div');
    //                 newCard.className='card custom_card'
    //                 const newLink = document.createElement('a');
    //                 newLink.href = 'javascript:void(0)';
    //                 newLink.onclick = function() {
    //                 // Handle click event if needed ( onclick- subcategory page should be opened........... )
    //                 // redirect_url = "subcategory.html?category_id="+category_id;
    //                 // window.location.href = redirect_url;
    //                     };
    //                 // Create an image element within the link
    //                 const newImage = document.createElement('img');
    //                 newImage.className = 'card-img-top fixed-size-img img-fluid';
    //                 // newImage.src = "images/category/parking categ.jpg";
    //                 newImage.src = absoluteImageUrl;
    //                 newImage.alt = 'Card image';
    //                 // newImage.style.width = '100%';

    //                 // Create a card body within the card
    //                 const newCardBody = document.createElement('div');
    //                 newCardBody.className = 'card-body';

    //                 // Create a card title within the card body
    //                 const newCardTitle = document.createElement('h4');
    //                 newCardTitle.className = 'card-title';
    //                 newCardTitle.textContent = product_name;
    //                 // Append elements to build the card structure
    //                 newLink.appendChild(newImage);
    //                 newCardBody.appendChild(newCardTitle);
    //                 newCard.appendChild(newLink);
    //                 newCard.appendChild(newCardBody);
    //                 // Append the new card to the container
    //                 parent_card.appendChild(newCard);
    //               }
    //             })
    //             .catch(error => {
    //             console.error('Error:', error);
    //             });
    // // ----------------------------------------------------------------------------------------------------------------
    //           }
    //           newLink.innerHTML= item_value;
    //           console.log("======================= ",item_value)
    //           newli.appendChild(newLink);
    //           parent_menu.appendChild(newli);   
    //      }

    