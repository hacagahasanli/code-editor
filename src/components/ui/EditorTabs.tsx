"use client";

import { FC, useState } from "react";

import { Code, CodeTab } from "~/hooks/useCode";

import { CustomEditor } from "./CustomEditor/CustomEditor";

interface EditorTabsProps {
  code: Code;
  updateCode: (tab: CodeTab, value: string) => void;
}

const tabs: CodeTab[] = ["html", "css", "js"];

export const EditorTabs: FC<EditorTabsProps> = ({ code, updateCode }) => {
  const [activeTab, setActiveTab] = useState<CodeTab>("html");
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between rounded-t-md">
        <div className="flex py-1 px-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 font-medium text-sm rounded-sm transition-all duration-300 ${
                activeTab === tab ? "bg-gray-700 text-white" : "text-gray-800"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
        <button
          className="px-3 py-1 mr-2 bg-gray-700 rounded text-white hover:bg-gray-600"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? "Light" : "Dark"}
        </button>
      </div>

      <div className="flex-1">
        <CustomEditor
          theme={theme}
          language={activeTab}
          value={code[activeTab]}
          // eslint-disable-next-line
          onChange={(val: any) => updateCode(activeTab, val)}
        />
      </div>
    </div>
  );
};
