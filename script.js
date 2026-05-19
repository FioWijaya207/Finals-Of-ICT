// Load data from Local Storage
let activities = JSON.parse(localStorage.getItem("activities")) || [];

// Function to save activity
function saveActivity() {
  const title = document.getElementById("activityTitle").value;
  const desc = document.getElementById("description").value;
  const imageFile = document.getElementById("activityImage").files[0];
  // Validation
  if (title === "" || desc === "" || !imageFile) {
  alert("Please fill the title, description, and upload an image!");
  return;
  }

  const reader = new FileReader();

  reader.onload = function(event) {
    const newActivity = {
      id: Date.now(),
      title: title,
      image: event.target.result
    };

    activities.push(newActivity);

    // Save to Local Storage
    localStorage.setItem("activities", JSON.stringify(activities));

    // Reset form
    document.getElementById("activityTitle").value = "";
    document.getElementById("description").value = "";
    document.getElementById("activityImage").value = "";

    // Refresh list
    displayActivities();
  };

  reader.readAsDataURL(imageFile);
}

// Function to display activities
function displayActivities() {
  const activityList = document.getElementById("activityList");
  activityList.innerHTML = "";

  activities.forEach(activity => {
    activityList.innerHTML += `
      <div class="activity-card">
        <h4>${activity.title}</h4>
        <img src="${activity.image}" alt="Activity Image">
        <button onclick="deleteActivity(${activity.id})">Delete</button>
      </div>
    `;
  });
}

// Function to delete activity
function deleteActivity(id) {
  activities = activities.filter(activity => activity.id !== id);

  localStorage.setItem("activities", JSON.stringify(activities));

  displayActivities();
}

// Run display function when page loads
displayActivities();
