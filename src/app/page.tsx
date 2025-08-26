"use client";

import { EditorTabs } from "~/components/ui/EditorTabs";
import { PreviewPanel } from "~/components/ui/PreviewPanel/PreviewPanel";

import { useCode } from "~/hooks/useCode";

export default function Home() {
  const { code, updateCode } = useCode();

  return (
    <main className="min-h-screen flex md:flex-row flex-col gap-4 bg-gray-100 p-4">
      <div className="md:w-1/2 flex flex-col h-[90vh] rounded shadow-lg overflow-hidden">
        <h2 className="text-xl font-bold p-2 border-b">Code Editor</h2>
        <EditorTabs code={code} updateCode={updateCode} />
      </div>

      <div className="md:w-1/2 flex flex-col h-[90vh] rounded shadow-lg overflow-hidden">
        <h2 className="text-xl font-bold p-2 border-b">Live Preview</h2>
        <PreviewPanel code={code} />
      </div>
    </main>
  );
}
