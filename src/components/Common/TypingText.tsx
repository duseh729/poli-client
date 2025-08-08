import { useEffect, useState } from "react";

interface TypingTextProps {
  text: string;
  speed?: number;
  pausePunctuation?: number;
  onComplete?: () => void;
}

const TypingText: React.FC<TypingTextProps> = ({
  text,
  speed = 30,
  pausePunctuation = 200,
  onComplete,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setDisplayedText("");
    setIndex(0);
  }, [text]);

  useEffect(() => {
    if (index >= text.length) {
      onComplete?.();
      return;
    }

    const currentChar = text[index];
    const isPauseChar = [".", ",", "!", "?"].includes(currentChar);
    const delay = isPauseChar ? pausePunctuation : speed;

    const timeout = setTimeout(() => {
      setDisplayedText((prev) => prev + currentChar);
      setIndex((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timeout);
  }, [index, text, speed, pausePunctuation, onComplete]);

  return (
    <div style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}>
      {displayedText}
    </div>
  );
};

export default TypingText;
