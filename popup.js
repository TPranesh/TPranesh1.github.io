// Function to load content for a selected page
function loadContent(selectedPage) {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            console.log("Fetched Data:", data);

            let selectedContent = "";

            switch (selectedPage) {
                case "index.html":
                    const mainContent = data.html.body.main;

                    // Extract text content from main content
                    selectedContent += `Heading 1: ${mainContent.h2[0].content}\n\n`;
                    selectedContent += `Paragraph 1: ${mainContent.p[0].content}\n\n`;
                    selectedContent += `Heading 2: ${mainContent.h2[1].content}\n\n`;
                    selectedContent += `Paragraph 2: ${mainContent.p[1].content}\n\n`;
                    selectedContent += `Heading 3: ${mainContent.div[1].homep3.p[0].content}\n\n`;
                    selectedContent += `Paragraph 3: ${mainContent.div[1].homep3.p[1].content}\n\n`;
                    selectedContent += "Unordered List:\n";
                    mainContent.div[1].homep3.ul.li.forEach(item => {
                        selectedContent += `- ${item.content}\n`;
                    });
                    break;

                case "Srilanka wild life introduction.html":
                    selectedContent += `Title: ${data.title}\n`;
                    selectedContent += `Heading 1: ${data.heading1}\n\n`;
                    selectedContent += `Gal Oya Description: ${data.galOye.description}\n`;
                    selectedContent += `Gal Oya Image Source: ${data.galOye.imgSrc}\n`;
                    selectedContent += `Gal Oya Map Source: ${data.galOye.mapSrc}\n\n`;
                    selectedContent += "Gal Oya Table:\n";
                    data.galOyeTable.forEach(row => {
                        selectedContent += `${row}\n`;
                    });
                    selectedContent += `\nHeading 2: ${data.heading2}\n\n`;
                    selectedContent += `Knuckles Description: ${data.knuckles.description}\n`;
                    selectedContent += `Knuckles Image Source: ${data.knuckles.imgSrc}\n`;
                    selectedContent += `Knuckles Map Source: ${data.knuckles.mapSrc}\n\n`;
                    selectedContent += "Knuckles Table:\n";
                    data.knucklesTable.forEach(row => {
                        selectedContent += `${row}\n`;
                    });
                    break;

                default:
                    selectedContent = "Page content not found.";
            }

            // Update the textarea with selected content
            document.getElementById('editor-text').value = selectedContent;
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Function to save changes to data.json and localStorage
function saveChanges(selectedPage) {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            // Get the edited content from the textarea
            const editedContent = document.getElementById('editor-text').value;

            // Update the data with the edited content based on selected page
            switch (selectedPage) {
                case "index.html":
                    data.html.body.main.h2[0].content = editedContent.split('\n\n')[0].split(': ')[1];
                    data.html.body.main.p[0].content = editedContent.split('\n\n')[1].split(': ')[1];
                    data.html.body.main.h2[1].content = editedContent.split('\n\n')[2].split(': ')[1];
                    data.html.body.main.p[1].content = editedContent.split('\n\n')[3].split(': ')[1];
                    data.html.body.main.div[1].homep3.p[0].content = editedContent.split('\n\n')[4].split(': ')[1];
                    data.html.body.main.div[1].homep3.p[1].content = editedContent.split('\n\n')[5].split(': ')[1];

                    // Update the unordered list
                    const listItems = editedContent.split('Unordered List:\n')[1].split('\n');
                    data.html.body.main.div[1].homep3.ul.li.forEach((item, index) => {
                        item.content = listItems[index].split('- ')[1];
                    });
                    break;

                case "Srilanka wild life introduction.html":
                    data.title = editedContent.split('\n')[0].split(': ')[1];
                    data.heading1 = editedContent.split('\n')[1].split(': ')[1];
                    data.galOye.description = editedContent.split('\n')[2].split(': ')[1];
                    data.galOye.imgSrc = editedContent.split('\n')[3].split(': ')[1];
                    data.galOye.mapSrc = editedContent.split('\n')[4].split(': ')[1];
                    data.galOyeTable = editedContent.split('\n')[6].split(': ')[1].split('\n');
                    data.heading2 = editedContent.split('\n')[7].split(': ')[1];
                    data.knuckles.description = editedContent.split('\n')[8].split(': ')[1];
                    data.knuckles.imgSrc = editedContent.split('\n')[9].split(': ')[1];
                    data.knuckles.mapSrc = editedContent.split('\n')[10].split(': ')[1];
                    data.knucklesTable = editedContent.split('\n')[12].split(': ')[1].split('\n');
                    break;

                default:
                    console.log("Page content not found.");
            }

            // Save updated data to localStorage
            localStorage.setItem('editedData', JSON.stringify(data));

            // POST request to update data.json
            fetch("data.json", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log('Changes saved successfully.');
                closePopup(); // Close the popup after saving changes
                displaySavedChanges(); // Display saved changes on the webpage
            })
            .catch(error => console.error('Error saving changes:', error));
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Function to display saved changes on the webpage
function displaySavedChanges() {
    const savedData = JSON.parse(localStorage.getItem('editedData'));

    // Update HTML elements with saved data for index.html
    document.getElementById('heading1').textContent = savedData.html.body.main.h2[0].content;
    document.getElementById('homep1').textContent = savedData.html.body.main.p[0].content;
    document.getElementById('heading2_1').textContent = savedData.html.body.main.h2[1].content;
    document.getElementById('homep2').textContent = savedData.html.body.main.p[1].content;
    document.getElementById('homep3_p1').textContent = savedData.html.body.main.div[1].homep3.p[0].content;
    document.getElementById('homep3_p2').textContent = savedData.html.body.main.div[1].homep3.p[1].content;

    const listItems = savedData.html.body.main.div[1].homep3.ul.li;
    const ul = document.getElementById('saved-list');
    ul.innerHTML = ''; // Clear existing list items
    listItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.content;
        ul.appendChild(li);
    });

    // Update HTML elements with saved data for Srilanka wild life introduction.html
    document.getElementById('title').textContent = savedData.title;
    document.getElementById('heading1_intro').textContent = savedData.heading1;
    document.getElementById('galOyeDescription').textContent = savedData.galOye.description;
    document.getElementById('galOyeImage').src = savedData.galOye.imgSrc;
    document.getElementById('galOyeMap').src = savedData.galOye.mapSrc;
    
    const galOyeTable = document.getElementById('galOyeTable');
    galOyeTable.innerHTML = ''; // Clear existing table content
    savedData.galOyeTable.forEach(row => {
        const tr = document.createElement('tr');
        row.split(',').forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        });
        galOyeTable.appendChild(tr);
    });

    document.getElementById('heading2_intro').textContent = savedData.heading2;
    document.getElementById('knucklesDescription').textContent = savedData.knuckles.description;
    document.getElementById('knucklesImage').src = savedData.knuckles.imgSrc;
    document.getElementById('knucklesMap').src = savedData.knuckles.mapSrc;

    const knucklesTable = document.getElementById('knucklesTable');
    knucklesTable.innerHTML = ''; // Clear existing table content
    savedData.knucklesTable.forEach(row => {
        const tr = document.createElement('tr');
        row.split(',').forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        });
        knucklesTable.appendChild(tr);
    });
}

// Function to open the popup and load content for editing
function openPopup() {
    document.getElementById('popupContainer').style.display = 'block';
    loadContent("index.html"); // Load content for index.html by default
}

// Function to close the popup
function closePopup() {
    document.getElementById('popupContainer').style.display = 'none';
}

// Event listener for Save Changes button
document.getElementById('save').addEventListener('click', () => {
    const selectedPage = document.getElementById('dropdown').value;
    saveChanges(selectedPage);
});

// Call displaySavedChanges to initially display saved data on the webpage
displaySavedChanges();
