"use client";

import { FC, useState } from "react";

import Editor from "@monaco-editor/react";

import { Code, CodeTab } from "~/hooks/useCode";

import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";

interface EditorTabsProps {
  code: Code;
  updateCode: (tab: CodeTab, value: string) => void;
}

export const EditorTabs: FC<EditorTabsProps> = ({ code, updateCode }) => {
  const tabs: CodeTab[] = ["html", "css", "js", "jsx"];
  const [activeTab, setActiveTab] = useState<CodeTab>("html");

  const languageMap: Record<CodeTab, string> = {
    html: "html",
    css: "css",
    js: "javascript",
    jsx: "javascript",
  };

  return (
    <Tabs
      value={activeTab}
      className="flex flex-col h-full"
      onValueChange={(val) => setActiveTab(val as CodeTab)}
    >
      {" "}
      <TabsList className="bg-zinc-100 rounded-t-md">
        {tabs.map((tab) => (
          <TabsTrigger key={tab} value={tab} className="capitalize">
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="flex-1">
        <Editor
          height="100%"
          theme="vs-light"
          value={code[activeTab]}
          language={languageMap[activeTab]}
          onChange={(val) => updateCode(activeTab, val || "")}
          options={{
            fontSize: 14,
            wordWrap: "on",
            minimap: { enabled: false },
          }}
        />
      </div>
    </Tabs>
  );
};
