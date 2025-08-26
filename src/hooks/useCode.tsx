import { useState } from "react";

export type CodeTab = "html" | "css" | "js";

export interface Code {
  html: string;
  css: string;
  js: string;
}

export const useCode = () => {
  const [code, setCode] = useState<Code>({
    html: "",
    css: "",
    js: "",
  });

  const updateCode = (tab: CodeTab, value: string) => {
    setCode((prev) => ({ ...prev, [tab]: value }));
  };

  return { code, updateCode };
};
