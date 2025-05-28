import { useEffect, useState, useRef } from 'react';
import styles from './TruncableText.module.scss';
import { Focusable, Tooltip, TooltipTrigger } from 'react-aria-components';

interface TruncableTextProps {
  text: string;
  className?: string;
}

export const TruncableText = ({ text, className }: TruncableTextProps) => {
  const itemRef = useRef(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [isTextTruncated, setIsTextTruncated] = useState(false);

  const checkTruncation = () => {
    const element = textRef.current;
    if (element) {
      setIsTextTruncated(element.scrollWidth > element.clientWidth);
    }
  };

  useEffect(() => {
    checkTruncation();
    window.addEventListener('resize', checkTruncation);

    return () => {
      window.removeEventListener('resize', checkTruncation);
    };
  }, [text]);

  return (
    <div ref={itemRef} className={`${styles.root} ${className || ''}`}>
      <TooltipTrigger
        isDisabled={!isTextTruncated}
        // isOpen={isOpen}
        // onOpenChange={setOpen}
        delay={300}>
        <Focusable>
          <span ref={textRef} className={styles.text}>
            {text}
          </span>
        </Focusable>
        <Tooltip className={styles.tooltip}>{text}</Tooltip>
      </TooltipTrigger>
    </div>
  );
};
