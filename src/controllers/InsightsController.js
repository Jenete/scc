// InsightsController.js

export const getAttendanceStats = (members, sessions) => {
    const attendanceCount = members.map(member => ({
      fullname: member.fullname,
      totalSessions: sessions.filter(session => session.membersPresent.includes(member.id)).length,
    }));
    return attendanceCount;
  };
  
  export const getPrayerHoursStats = (members) => {
    const prayerHours = members
      .filter(member => member.prayerHours)
      .map(member => ({
        fullname: member.fullname,
        prayerHours: parseInt(member.prayerHours, 10),
      }));
    return prayerHours;
  };
  
  export const getBirthdayStats = (members) => {
    const currentMonth = new Date().getMonth() + 1; // getMonth is 0-indexed
    const upcomingBirthdays = members.filter(member => {     
      const birthdayMonth = member.birthday ? new Date(member.birthday).getMonth() + 1 : null;
      return birthdayMonth === currentMonth;
    }).map(member => ({
      fullname: member.fullname,
      birthday: member.birthday,
    }));
    return upcomingBirthdays;
  };
  
  export const getTeacherEngagementStats = (sessions) => {
    const teacherEngagements = sessions.reduce((acc, session) => {
      acc[session.teacher] = (acc[session.teacher] || 0) + 1;
      return acc;
    }, {});
    
    return Object.entries(teacherEngagements).map(([teacher, sessionCount]) => ({
      teacher,
      sessionCount,
    }));
  };
  
  export const getSessionTopicsStats = (sessions) => {
    return sessions.map(session => ({
      date: session.date,
      area: session.area,
      teacher: session.teacher,
      topic: session.details,
      membersPresent: session.membersPresent,
    }));
  };

  // NEW: Get insights for Bacentas (e.g., session participation per Bacenta)
export const getBacentaSessionStats = (bacentas, sessions) => {
  const bacentaSessions = bacentas.map(bacenta => {
    const bacentaSessionList = sessions.filter(session => session.bacenta === bacenta.id);
    return {
      bacentaName: bacenta.name,
      leader: bacenta.leader,
      totalSessions: bacentaSessionList.length,
      sessions: bacentaSessionList.map(session => ({
        date: session.date,
        area: session.area,
        teacher: session.teacher,
        topic: session.details,
        membersPresent: session.membersPresent,
      }))
    };
  });

  return bacentaSessions;
};
  