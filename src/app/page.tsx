"use client"

import { useCode } from "~/hooks/useCode";

import { EditorTabs } from "~/components/ui/EditorTabs";
import { PreviewPanel } from "~/components/ui/PreviewPanel";

export default function Home() {
  const { code, updateCode } = useCode();

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-indigo-50 to-white">
      <div className="md:w-1/2 p-4 h-[90vh] flex flex-col shadow-lg bg-white rounded-l-lg">
        <h2 className="text-xl font-bold mb-2">Code Editor</h2>
        <EditorTabs code={code} updateCode={updateCode} />
      </div>

      <div className="md:w-1/2 p-4 h-[90vh]">
        <h2 className="text-xl font-bold mb-2">Live Preview</h2>
        <PreviewPanel code={code} />
      </div>
    </main>
  );
}
