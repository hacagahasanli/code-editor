"use client";
import { FC, useState } from "react";

import Editor from "@monaco-editor/react";

import { Code, CodeTab } from "~/hooks/useCode";

import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";

interface EditorTabsProps {
  code: Code;
  updateCode: (tab: CodeTab, value: string) => void;
}

const tabs: CodeTab[] = ["html", "css", "js", "jsx"];

export const EditorTabs: FC<EditorTabsProps> = ({ code, updateCode }) => {
  const [activeTab, setActiveTab] = useState<CodeTab>("html");
  const [theme, setTheme] = useState<"vs-dark" | "vs-light">("vs-dark");

  const isDark = theme === "vs-dark";

  const languageMap: Record<CodeTab, string> = {
    html: "html",
    css: "css",
    js: "javascript",
    jsx: "javascript",
  };

  return (
    <div className="flex flex-col h-full">
      <div className={`flex items-center justify-between rounded-t-md ${isDark ? "bg-gray-800" : ""}`}>
        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as CodeTab)}
          className="flex-1"
        >
          <TabsList
            className={`flex  text-white ${isDark ? "bg-gray-800" : ""}`}
          >
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className={`capitalize px-4 py-2 text-sm font-medium ${
                  isDark ? "hover:bg-gray-700" : ""
                } `}
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <button
          className={`text-sm px-3 py-1 mr-2  rounded text-white ${
            true ? "bg-gray-700 hover:bg-gray-600" : ""
          }`}
          onClick={() => setTheme(() => (isDark ? "vs-light" : "vs-dark"))}
        >
          {theme === "vs-dark" ? "Light" : "Dark"}
        </button>
      </div>

      <div className={`flex-1 ${isDark ? "bg-gray-800" : ""}`}>
        <Editor
          height="100%"
          theme={theme}
          className="pb-2"
          value={code[activeTab]}
          language={languageMap[activeTab]}
          onChange={(val) => updateCode(activeTab, val || "")}
          options={{
            fontSize: 14,
            wordWrap: "on",
            autoIndent: "full",
            formatOnType: true,
            formatOnPaste: true,
            smoothScrolling: true,
            automaticLayout: true,
            minimap: { enabled: false },
            autoClosingQuotes: "always",
            autoClosingBrackets: "always",
            autoClosingOvertype: "always",
            autoSurround: "languageDefined",
            fontFamily: "'Fira Code', monospace",
            scrollbar: { verticalScrollbarSize: 10 },
          }}
        />
      </div>
    </div>
  );
};
