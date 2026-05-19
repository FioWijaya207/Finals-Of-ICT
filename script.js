// In-memory activity storage
let activities = JSON.parse(localStorage.getItem("gympe_activities")) || [];

// Save activity
function saveActivity() {
  const title = document.getElementById("activityTitle").value.trim();
  const desc = document.getElementById("description").value.trim();
  const imageFile = document.getElementById("activityImage").files[0];

  if (title === "" || desc === "" || !imageFile) {
    alert("Please fill in the title, description, and upload a photo!");
    return;
  }

  const reader = new FileReader();

  reader.onload = function(event) {
    const newActivity = {
      id: Date.now(),
      title: title,
      description: desc,
      image: event.target.result
    };

    activities.push(newActivity);
    localStorage.setItem("gympe_activities", JSON.stringify(activities));

    document.getElementById("activityTitle").value = "";
    document.getElementById("description").value = "";
    document.getElementById("activityImage").value = "";

    displayActivities();
  };

  reader.readAsDataURL(imageFile);
}

// Display activities
function displayActivities() {
  const activityList = document.getElementById("activityList");
  activityList.innerHTML = "";

  if (activities.length === 0) {
    activityList.innerHTML = `<p style="color:#92400e; font-size:14px; text-align:center; padding:20px 0;">No activities logged yet. Add your first one above!</p>`;
    return;
  }

  activities.forEach(activity => {
    activityList.innerHTML += `
      <div class="activity-card">
        <h4>${activity.title}</h4>
        <p style="font-size:14px; color:#57443a; margin:4px 0 0;">${activity.description}</p>
        <img src="${activity.image}" alt="Activity photo for ${activity.title}">
        <br/>
        <button onclick="deleteActivity(${activity.id})">🗑 Delete</button>
      </div>
    `;
  });
}

// Delete activity
function deleteActivity(id) {
  activities = activities.filter(a => a.id !== id);
  localStorage.setItem("gympe_activities", JSON.stringify(activities));
  displayActivities();
}

// Load on page start
displayActivities();
