document.getElementById('fileInput').addEventListener('change', function () {
    const fileInput = this;
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append('product_name', 'Example Product');
    formData.append('size', 'Medium');
    formData.append('product_id', 'P123');
    formData.append('category', 'Clothing');
    formData.append('product_details', 'This is an example product.');
    formData.append('product_image', file);

    fetch('http://localhost:8000/api/addProduct/', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
});


function hitApi(){
    fetch('http://localhost:8000/api/addCategory/',{
        method:'POST',
        body: JSON.stringify({
            name: "Abhishek Srivastav",
            category_id: "KT567",
        }),
         
        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => response.json())
 
// Displaying results to console
    .then(json => console.log(json));
}


function submitProductForm() {
    const form = document.getElementById('productForm');
    const formData = new FormData(form);

    // Add any additional fields not included in the form
    // formData.append('product_name', 'Example Product');
    // formData.append('category', 'Example Category');  // Include the 'category' field


    // Fetch request
    fetch('http://localhost:8000/api/addProduct/', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}
