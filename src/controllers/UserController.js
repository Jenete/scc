import {
    dbgetAllMembers,
    dbaddMember,
    dbupdateMember,
    dbremoveMember,
    dbgetMemberById
  } from "../services/MemberService";
import ActivityController from "./ActivityController";
  
  class UserController {
    constructor() {
      this.members = [];
      this.currentUser = null;
    }
  
    // Method to update member details
    async updateMember(memberId, updatedData) {
      try {
        const updatedMember = await dbupdateMember(memberId, updatedData);
        this.logActivity(`User ${updatedMember.fullname} updated their profile.`);
        return updatedMember;
      } catch (error) {
        console.error("Error updating member:", error);
        throw error;
      }
    }
  
    // Method to remove a member (Delete)
    async removeMember(memberId) {
      try {
        const removedMember = await dbremoveMember(memberId);
        this.logActivity(`User ${removedMember.fullname} was removed.`);
        return removedMember;
      } catch (error) {
        console.error("Error removing member:", error);
        throw error;
      }
    }
  
    // Method to get a member by their ID
    async getMemberById(memberId) {
      try {
        const member = await dbgetMemberById(memberId);
        return member;
      } catch (error) {
        console.error("Error fetching member by ID:", error);
        throw error;
      }
    }
  
    // Method for user login
    async login(username, password) {
      try {
        this.members = await dbgetAllMembers();
        const member = this.members.find(
          (member) => member.cellnumber === password
        );
        if (member) {
          this.currentUser = member;
          this.logActivity(`User ${member.fullname} logged in.`);
          ActivityController.createActivity('Logged',`User ${member.fullname} logged in.`);
          return member;
        } else {
          throw new Error("Invalid username or password");
        }
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    }
  
    // Method for user logout
    async logout() {
      if (this.currentUser) {
        this.logActivity(`User ${this.currentUser.fullname} logged out.`);
        this.currentUser = null;
      }
    }
  
    // Method to log activities (for analytics)
    logActivity(activity) {
      console.log(`[Activity Log]: ${activity}`);
      // Here, you could also send the logs to a server or save them in a database.
    }
  
    // Register method example
    async register(newMember) {
      return await this.addMember(newMember);
    }
  }
  
  export default new UserController();
  