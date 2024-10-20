import { generateID } from '../helpers/utils';
import * as ActivityService from '../services/ActivityService'; // Import the activity service

class ActivityController {
    // Create a new activity
    async createActivity(title, description, userId) {
        // Construct activity data with provided parameters
        let user = JSON.parse(sessionStorage.getItem('sccuser'));
        
        const activityData = {
        id: generateID(),
        title: title?.trim(),
        description: user?.fullname +" "+description?.trim(),
        assignedTo: user.id, // Assign the activity to the user
        createdAt: new Date().toISOString(), // Optionally add a created timestamp
        completed: false, // Initialize as not completed
        };
    
        try {
        await ActivityService.addActivity(activityData);
        } catch (error) {
        console.error("Error creating activity: ", error);
        //throw error; // Re-throw for further handling if needed
        }
    }
  

  // Read all activities and provide notifications
  async getUserNotifications(userId) {
    try {
      const activities = await ActivityService.getAllActivities();
      const userActivities = activities.filter(activity => activity.assignedTo === userId);
      
      const notifications = userActivities.map(activity => this.createNotification(activity));
      return notifications;
    } catch (error) {
      console.error("Error fetching user notifications: ", error);
      throw error;
    }
  }

//   // Update an existing activity
//   async updateActivity(id, updatedData) {
//     try {
//       await ActivityService.updateActivity(id, updatedData);
//       const updatedActivity = await ActivityService.getActivityById(id); // Assuming you have a method to get a single activity
//       return this.formatActivity(updatedActivity);
//     } catch (error) {
//       console.error("Error updating activity: ", error);
//       throw error; // Re-throw for further handling if needed
//     }
//   }

  // Delete an activity
  async deleteActivity(id) {
    try {
      await ActivityService.deleteActivity(id);
      return { message: "Activity deleted successfully" };
    } catch (error) {
      console.error("Error deleting activity: ", error);
      throw error; // Re-throw for further handling if needed
    }
  }

  // Format a single activity for display
  formatActivity(activity) {
    return {
      id: activity?.id || generateID(),
      title: activity.title,
      description: activity.description,
      formattedDate: new Date(activity.date).toLocaleDateString(), // Format date as needed
      status: activity.completed ? "Completed" : "Pending", // Example of a formatted field
    };
  }

  // Create a notification based on an activity
  createNotification(activity) {
    const activityStatus = activity.completed ? "completed" : "pending";
    return {
      id: activity.id,
      message: `Activity "${activity.title}" is currently ${activityStatus}.`,
      date: new Date(activity.date).toLocaleString(), // Format date for the notification
    };
  }

  // Fetch and format log activities
  async getLogActivities() {
    try {
      const activities = await ActivityService.getAllActivities();
      return activities;
    } catch (error) {
      console.error("Error fetching log activities: ", error);
      //throw error;
    }
  }
}

export default new ActivityController(); // Export a singleton instance of the controller
