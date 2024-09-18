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