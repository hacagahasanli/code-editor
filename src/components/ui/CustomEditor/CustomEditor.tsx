"use client";

import { FC, useRef, useEffect, useState } from "react";

import { PAIRS } from "./CustomEditor.consts";

import "./CustomEditor.css";

interface CustomEditorProps {
  value: string;
  theme?: "light" | "dark";
  onChange: (val: string) => void;
  language: "html" | "css" | "js";
}

export const CustomEditor: FC<CustomEditorProps> = ({
  value,
  onChange,
  language,
  theme = "dark",
}) => {
  const lineRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [lines, setLines] = useState<number[]>([1]);

  useEffect(() => {
    const lineCount = value.split("\n").length || 1;
    setLines(Array.from({ length: lineCount }, (_, i) => i + 1));
  }, [value]);

  const handleScroll = () => {
    if (!textareaRef.current || !lineRef.current) return;
    lineRef.current.scrollTop = textareaRef.current.scrollTop;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const el = textareaRef.current;
    if (!el) return;

    const start = el.selectionStart;
    const end = el.selectionEnd;
    const val = el.value;

    if (language === "html" && e.key === ">") {
      const tagMatch = val.slice(0, start).match(/<([a-zA-Z0-9]+)$/);
      if (tagMatch) {
        const tag = tagMatch[1];
        e.preventDefault();
        const newVal = val.slice(0, start) + ">" + `</${tag}>` + val.slice(end);
        onChange(newVal);
        setTimeout(() => {
          el.selectionStart = el.selectionEnd = start + 1;
        }, 0);
      }
    }

    if (PAIRS[e.key]) {
      e.preventDefault();
      const newVal = val.slice(0, start) + e.key + PAIRS[e.key] + val.slice(end);
      onChange(newVal);
      setTimeout(() => {
        el.selectionStart = el.selectionEnd = start + 1;
      }, 0);
    }
  };

  return (
    <div className={`custom-editor ${theme}`}>
      <div className="line-numbers" ref={lineRef}>
        {lines.map((line) => (
          <div key={line}>{line}</div>
        ))}
      </div>

      <textarea
        value={value}
        ref={textareaRef}
        spellCheck={false}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
        className="editor-textarea"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
