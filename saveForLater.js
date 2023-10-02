// Saved items functionality

// Store saved items as an array of objects
let savedItems = [];

// Function to save an item
function saveItem(title, content, type) {
  savedItems.push({ title, content, type });
  // Call a function to display the item count alert
  displayItemCount();
}

// Function to display saved items
function displaySavedItems() {
  const savedList = document.getElementById("saved-list");
  savedList.innerHTML = "";

  savedItems.forEach((item, index) => {
    const li = document.createElement("li");
    if (item.type === "table") {
      // Handle saved table items
      li.innerHTML = `<h4>${item.title} (Table)</h4>${item.content}`;
    } else if (item.type === "image") {
      // Handle saved image items
      li.innerHTML = `<h4>${item.title} (Image)</h4><img src="${item.content}" alt="${item.title}" />`;
    }
    li.innerHTML += `<button class="remove-button" data-index="${index}">Remove</button>`;
    savedList.appendChild(li);
  });

  // Add click event listener to remove saved items
  const removeButtons = document.querySelectorAll(".remove-button");
  removeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = event.target.getAttribute("data-index");
      savedItems.splice(index, 1);
      displaySavedItems();
      // Call a function to display the updated item count after removal
      displayItemCount();
    });
  });
}

// Function to display the item count alert
function displayItemCount() {
  const itemCount = savedItems.length;
  alert(`You have ${itemCount} item(s) saved for later.`);
}

// Attach click event listeners to "Save" buttons
const saveButtons = document.querySelectorAll(".save-button");
saveButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const itemContainer = button.parentElement;
    const title = itemContainer.querySelector("h4").textContent;
    let type; // Declare type variable

    // Check if the itemContainer contains an image
    if (itemContainer.querySelector("img")) {
      type = "image";
    } else {
      type = "table";
    }

    // Get content based on type
    let content;
    if (type === "image") {
      content = itemContainer.querySelector("img").getAttribute("src");
    } else {
      content = itemContainer.querySelector("table").outerHTML;
    }

    saveItem(title, content, type);
    displaySavedItems();
  });
});

// Initial display of saved items
displaySavedItems();

// Like button functionality

// Get all like buttons and add click event listeners
const likeButtons = document.querySelectorAll(".like-button");

likeButtons.forEach((button) => {
  let likes = 0; // Initialize the likes counter

  // Add a click event listener to each like button
  button.addEventListener("click", () => {
    likes++; // Increment the likes counter
    updateLikesDisplay(button, likes); // Update the display
  });
});

// Function to update the likes display
function updateLikesDisplay(button, likes) {
  // Find the parent container of the button
  const container = button.parentElement;

  // Create or get the likes display element
  let likesDisplay = container.querySelector(".likes-display");
  if (!likesDisplay) {
    likesDisplay = document.createElement("p");
    likesDisplay.className = "likes-display";
    container.appendChild(likesDisplay);
  }

  // Update the likes display text
  likesDisplay.textContent = `${likes} Likes`;
}
