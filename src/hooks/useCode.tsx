import { useState } from "react";

export type CodeTab = "html" | "css" | "js" | "jsx";

export interface Code {
  html: string;
  css: string;
  js: string;
  jsx: string;
}

export const useCode = () => {
  const [code, setCode] = useState<Code>({
    html: "<h1>Hello World</h1>",
    css: "body { font-family: sans-serif; } h1 { color: blue; }",
    js: "document.getElementById('hacaga').style.color = 'red'",
    jsx: "const App = () => <h2 className='text-green-600'>Hello JSX!</h2>;"
  });

  const updateCode = (tab: CodeTab, value: string) =>
    setCode(prev => ({ ...prev, [tab]: value }));

  return { code, updateCode };
};
