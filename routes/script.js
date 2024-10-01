// script.js
const shoeListContainer = document.getElementById('shoe-list');

// Fetch data from the API
fetch('https://freeshoesapi-production.up.railway.app/api/v1/api/v1/shoes/women')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Map the JSON data to a simpler array of objects
        const shoes = data.map(item => {
            return {
                id: item.id, // Assuming there is an 'id' field
                name: item.name, // Replace with the actual property name for shoe name
                price: item.price, // Replace with the actual property name for price
                image: item.image // Replace with the actual property name for image URL
            };
        });

        // Render the shoes on the webpage
        renderShoes(shoes);
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

// Function to render shoes
function renderShoes(shoes) {
    shoes.forEach(shoe => {
        const shoeElement = document.createElement('div');
        shoeElement.className = 'shoe-item'; // Add class for styling
        shoeElement.innerHTML = `
            <h2>${shoe.name}</h2>
            <p>Price: $${shoe.price}</p>
            <img src="${shoe.image}" alt="${shoe.name}" />
        `;
        shoeListContainer.appendChild(shoeElement);
    });
}
