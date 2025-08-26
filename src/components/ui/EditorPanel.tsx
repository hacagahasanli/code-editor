"use client";

import { FC } from "react";

import { Code } from "~/hooks/useCode";

interface EditorPanelProps {
  code: Code;
  updateCode: (field: keyof Code, value: string) => void;
}

export const EditorPanel: FC<EditorPanelProps> = ({ code, updateCode }) => {
  return (
    <div className="flex flex-col gap-2">
      <textarea
        value={code.html}
        placeholder="HTML"
        className="border rounded p-2 w-full h-24 font-mono"
        onChange={(e) => updateCode("html", e.target.value)}
      />
      <textarea
        value={code.css}
        placeholder="CSS"
        onChange={(e) => updateCode("css", e.target.value)}
        className="border rounded p-2 w-full h-24 font-mono"
      />
      <textarea
        value={code.js}
        placeholder="JS"
        onChange={(e) => updateCode("js", e.target.value)}
        className="border rounded p-2 w-full h-24 font-mono"
      />
    </div>
  );
};
