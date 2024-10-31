import JSZip from 'jszip';
import FileSaver from 'file-saver';

//utils
/**
 * Copies the provided text to the clipboard.
 * @param {string} text - The text to copy.
 */
 export const handleCopyToClipBoard = (text) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
            .then(() => {
                alert('Link copied to clipboard');
            })
            .catch((err) => {
                console.error('Could not copy text: ', err);
                fallbackCopyText(text);
            });
    } else {
        fallbackCopyText(text);
    }
};

/**
 * Calculates and returns the age based on the provided date.
 * @param {string | Date} date - The birthdate (in string or Date format).
 * @returns {number} The calculated age.
 */
export const getAge = (date) => {
    const birthDate = new Date(date); // Convert the input to a Date object
    const today = new Date(); // Get the current date

    let age = today.getFullYear() - birthDate.getFullYear(); // Calculate the year difference
    const monthDifference = today.getMonth() - birthDate.getMonth(); // Get the month difference

    // If the birth month hasn't occurred yet this year, or it's the birth month but the day hasn't passed
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--; // Adjust age if the birthday hasn't occurred yet
    }

    return age; // Return the calculated age
};
/**
 * Returns a randomly generated ID.
 * @returns {string} randomly generated ID.
 */
export const generateID = () => {
    const id = Math.random().toString(36).substring(2,30);
    return id; 
};

/**
 * Checks if a user has permission based on a list of users.
 * @param {Object|string} user - The user (object or ID) to check.
 * @param {Array} users - The list of users to check in.
 * @returns {boolean} True if the user has permissions, false otherwise.
 */
export const hasPermissionHelper = (user, users = []) => {
    if (!user) return false;
    
    return users.some(({ id }) => id === (user.id || user));
};

export async function getAccurateDateTime() {
  const apiURL = "http://worldtimeapi.org/api/ip"; // Example external API for time
  try {
    // Try fetching date and time from external API
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error("Failed to fetch from API");
    }
    const data = await response.json();
    const dateTime = new Date(data.datetime).toISOString().substring(0,19).replace('T','  ');;
    return dateTime;
  } catch (error) {
    // If API fails, return local date and time
    console.warn("Using local date and time due to an error:", error);
    return new Date().toISOString().substring(0,19).replace('T','  ');
  }
}
export function getInstantDateTime() {
    return new Date().toISOString().substring(0,19).replace('T',' ⌚ ');
}


/**
 * Checks if the provided date is in the future or today.
 * use class to highlight className={`date-status-highlight date-status-highlight-${checkDateStatus(event.date)}`}
 * @param {string | Date} date - The date to check.
 * @returns {string} - 'future' if the date is in the future, 'present' if it's today, and 'past' if the date is in the past.
 */
export const checkDateStatus = (date) => {
    const today = new Date();
    const givenDate = new Date(date);
  
    // Remove the time part of the dates for comparison (only consider the date).
    today.setHours(0, 0, 0, 0);
    givenDate.setHours(0, 0, 0, 0);
  
    if (givenDate > today) {
      return 'future';
    } else if (givenDate.getTime() === today.getTime()) {
      return 'present';
    } else {
      return 'past';
    }
  };
  
/**
 * Fallback method for copying text to the clipboard.
 * @param {string} text - The text to copy.
 */
const fallbackCopyText = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed'; // Ensure element is out of view
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.opacity = '0';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        const msg = successful ? 'Link copied to clipboard' : 'Unable to copy';
        alert(msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    } finally {
        document.body.removeChild(textArea);
    }
};



export const generateAudioZip = async (audioUrls, audioTitles) => {
  const zip = new JSZip();

  // Fetch each audio file and add it to the ZIP
  for (let i = 0; i < audioUrls.length; i++) {
    const url = audioUrls[i];
    const title = audioTitles[i];

    try {
      // Fetch the audio file
      const response = await fetch(url);
      const audioBlob = await response.blob();

      // Add the audio file to the ZIP
      zip.file(`${title}.mp3`, audioBlob); // Assuming the audio files are in mp3 format
    } catch (error) {
      console.error(`Error fetching audio file from ${url}:`, error);
    }
  }

  // Generate the ZIP file
  const content = await zip.generateAsync({ type: 'blob' });

  // Save the ZIP file
  FileSaver.saveAs(content, 'audio-files.zip');
};

// // Usage example
// const audioUrls = [
//   'https://example.com/audio1.mp3',
//   'https://example.com/audio2.mp3',
//   // add more URLs as needed
// ];

// const audioTitles = [
//   'Audio Title 1',
//   'Audio Title 2',
//   // add corresponding titles as needed
// ];

// // Call the function
// generateAudioZip(audioUrls, audioTitles);
