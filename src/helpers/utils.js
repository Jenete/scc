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