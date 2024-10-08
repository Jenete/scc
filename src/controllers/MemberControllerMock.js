import {
    dbgetAllMembers,
    dbaddMember,
    dbupdateMember,
    dbremoveMember,
    dbgetMemberById,
    dbgetAllContacts,
    dbaddContact,
    dbupdateContact,
    dbremoveContact
  } from "../services/MemberService";
  
  // Get all members
  export const getAllMembers = async () => {
    try {
      let members = await dbgetAllMembers();
      members = members?.map(member => {
        const formattedBirthday = member.birthday
          ? new Date(member.birthday).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })
          : 'No Birthday Provided';
        
        return {
          ...member,
          formattedBirthday
        };
      });
      return members;
    } catch (error) {
      console.error("Error fetching members:", error);
      throw new Error("Error fetching members");
    }
  };
  
  // Add a new member
  export const addMember = async (newMember) => {
    try {
      const member = await dbaddMember(newMember);
      return member;
    } catch (error) {
      console.error("Error adding member:", error);
      throw new Error("Error adding member");
    }
  };
  
  // Update an existing member
  export const updateMember = async (updatedMember) => {
    try {
      const member = await dbupdateMember(updatedMember);
      const sessionMember = sessionStorage.getItem('sccuser');

      if (sessionMember) {
        const parsedSessionMember = JSON.parse(sessionMember);
        
        // Check if the session member exists and if the IDs match
        if (parsedSessionMember?.id === member.id) {
          sessionStorage.setItem('sccuser', JSON.stringify(member));
        }
      }
      return member;
    } catch (error) {
      console.error("Error updating member:", error);
      throw new Error("Error updating member");
    }
  };
  
  // Remove a member
  export const removeMember = async (memberId) => {
    try {
      await dbremoveMember(memberId);
    } catch (error) {
      console.error("Error removing member:", error);
      throw new Error("Error removing member");
    }
  };
  
  // Get a specific member by ID
  export const getMemberById = async (memberId) => {
    try {
      const member = await dbgetMemberById(memberId);
      return member;
    } catch (error) {
      console.error("Error fetching member:", error);
      throw new Error("Error fetching member");
    }
  };


  // CONTACTS (OUTREACH) SECTION

// Get all contacts
export const getAllContacts = async () => {
  try {
    let contacts = await dbgetAllContacts();
    return contacts;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw new Error("Error fetching contacts");
  }
};

// Add a new contact (outreach)
export const addContact = async (newContact) => {
  try {
    const contact = await dbaddContact(newContact);
    return contact;
  } catch (error) {
    console.error("Error adding contact:", error);
    throw new Error("Error adding contact");
  }
};

// Update an existing contact
export const updateContact = async (updatedContact) => {
  try {
    const contact = await dbupdateContact(updatedContact);
    return contact;
  } catch (error) {
    console.error("Error updating contact:", error);
    throw new Error("Error updating contact");
  }
};

// Remove a contact
export const removeContact = async (contactId) => {
  try {
    await dbremoveContact(contactId);
  } catch (error) {
    console.error("Error removing contact:", error);
    throw new Error("Error removing contact");
  }
};
  