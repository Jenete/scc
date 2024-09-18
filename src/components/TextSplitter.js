import React, { useState } from 'react';
import './styles/TextSplitter.css';

const TextSplitter = () => {
  const [text, setText] = useState('');
  const [splitText, setSplitText] = useState('');
  const rows = 5;
  const columns = 5;

  // Function to split text into paragraphs of a certain length
  const splitIntoParagraphs = (text, charLimit) => {
    const words = text.trim().split(/\s+/); // Split into words
    const paragraphs = [];
    let currentParagraph = '';

    // Accumulate words until the character limit is reached
    words.forEach((word,index) => {
      if ((currentParagraph.length + word.length + 1) > charLimit) {
        paragraphs.push(currentParagraph);
        currentParagraph = word; // Start a new paragraph
      } else {
        if (index%rows === 0) currentParagraph+="\n";
        currentParagraph = `${currentParagraph} ${word}`.trim();
      }
    });

    if (currentParagraph) {
      paragraphs.push(currentParagraph); // Add any remaining text as the last paragraph
    }
    return paragraphs;
  };

  const handleSplitText = () => {
    const paragraphs = splitIntoParagraphs(text, 60); // Split into 60-character paragraphs
    let singleText = "";

    paragraphs.forEach((parag,index)=>{
        singleText += paragraphs;
        if (++index%columns ===0) singleText+="\n\n";
    })
    setSplitText(singleText);
  };

  return (
    <div className="text-splitter">
      <h2>Text Splitter</h2>
      <textarea
        className="text-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text here..."
      />
      <button className="split-button" onClick={handleSplitText}>
        Split Text
      </button>

      <div className="split-output">
        <textarea value={splitText}>
            
        </textarea>
      </div>
    </div>
  );
};

export default TextSplitter;
