// Function to load content for a selected page
function loadContent(selectedPage) {
    fetch("Srilanka wild life introduction.json")
        .then(response => response.json())
        .then(data => {
            console.log("Fetched Data:", data);

            let selectedContent = {}; // Use an object to construct JSON content

            switch (selectedPage) {
                case "Srilanka wild life introduction.html":
                    selectedContent.title = data.title;
                    selectedContent.heading1 = data.heading1;
                    selectedContent.galOye = {
                        description: data.galOye.description,
                        imgSrc: data.galOye.imgSrc,
                        mapSrc: data.galOye.mapSrc
                    };
                    selectedContent.galOyeTable = data.galOyeTable;
                    selectedContent.heading2 = data.heading2;
                    selectedContent.knuckles = {
                        description: data.knuckles.description,
                        imgSrc: data.knuckles.imgSrc,
                        mapSrc: data.knuckles.mapSrc
                    };
                    selectedContent.knucklesTable = data.knucklesTable;
                    break;
                    

                    
                // Add cases for other pages here if needed
                default:
                    console.log("Page content not found.");
            }

            // Update the textarea with selected content
            document.getElementById('editor-text').value = JSON.stringify(selectedContent, null, 2);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Function to save changes to JSON file and local storage
function saveChanges(selectedPage) {
    const url = 'http://127.0.0.1:5500/Srilanka%20wild%20life%20introduction.json'; // Adjust the URL as needed

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Get the edited content from the textarea
            const editedContent = JSON.parse(document.getElementById('editor-text').value);

            // Update the data with the edited content based on selected page
            switch (selectedPage) {
                case "Srilanka wild life introduction.html":
                    data.title = editedContent.title;
                    data.heading1 = editedContent.heading1;
                    data.galOye.description = editedContent.galOye.description;
                    data.galOye.imgSrc = editedContent.galOye.imgSrc;
                    data.galOye.mapSrc = editedContent.galOye.mapSrc;
                    data.galOyeTable = editedContent.galOyeTable;
                    data.heading2 = editedContent.heading2;
                    data.knuckles.description = editedContent.knuckles.description;
                    data.knuckles.imgSrc = editedContent.knuckles.imgSrc;
                    data.knuckles.mapSrc = editedContent.knuckles.mapSrc;
                    data.knucklesTable = editedContent.knucklesTable;
                    break;
                // Add cases for other pages here if needed
                default:
                    console.log("Page content not found.");
            }

            // Save updated data to localStorage
            localStorage.setItem('editedData', JSON.stringify(data));

            // POST request to update JSON file
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data, null, 2)
            })
            .then(response => {
                console.log('Response:', response);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log('Changes saved successfully.');
                loadContent(selectedPage); // Reload content after saving changes
                updateLocalStorage(selectedPage, data); // Update local storage
                updatePageContent(data); // Update the page content with saved changes
            })
            .catch(error => console.error('Error saving changes:', error));
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Function to display saved changes on the webpage
function displaySavedChanges() {
    const savedData = JSON.parse(localStorage.getItem('editedData'));

    // Update HTML elements with saved data
    // Replace these IDs with the appropriate IDs in your HTML
    document.getElementById('heading1').textContent = savedData.heading1;
    document.getElementById('galOyeDescription').textContent = savedData.galOye.description;
    document.getElementById('galOyeImage').src = savedData.galOye.imgSrc;
    document.getElementById('galOyeMap').src = savedData.galOye.mapSrc;
    // Update other elements as needed
}

// Function to update the page content with saved changes
function updatePageContent(data) {
    // Update HTML elements with edited content
    // Replace these IDs with the appropriate IDs in your HTML
    document.getElementById('heading1').textContent = data.heading1;
    document.getElementById('galOyeDescription').textContent = data.galOye.description;
    document.getElementById('galOyeImage').src = data.galOye.imgSrc;
    document.getElementById('galOyeMap').src = data.galOye.mapSrc;
    // Update other elements as needed
}

// Function to open the popup and load content for editing
function openPopup() {
    document.getElementById('popupContainer').style.display = 'block';
    loadContent("Srilanka wild life introduction.html"); // Load content for intro page by default
}

// Function to close the popup
function closePopup() {
    document.getElementById('popupContainer').style.display = 'none';
}

// Event listener for Save Changes button
document.getElementById('save').addEventListener('click', () => {
    saveChanges("Srilanka wild life introduction.html"); // Save changes for intro page
});

// Call displaySavedChanges to initially display saved data on the webpage
displaySavedChanges();
