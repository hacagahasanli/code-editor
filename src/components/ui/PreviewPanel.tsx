"use client";

import { FC, useEffect, useRef } from "react";

import { Code } from "~/hooks/useCode";

interface PreviewPanelProps {
  code: Code;
}

export const PreviewPanel: FC<PreviewPanelProps> = ({ code }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const doc = iframeRef.current?.contentDocument;
    if (!doc) return;

    if (!code.html.trim()) {
      doc.open();
      doc.write(`
        <html>
          <body>
            <p style="color:gray; font-family:sans-serif">No HTML content yet</p>
          </body>
        </html>
      `);
      doc.close();
      return;
    }

    doc.open();
    doc.write(`
      <html>
        <head>
          <style>${code.css}</style>
        </head>
        <body>
          ${code.html}
          ${code.js.trim() ? `<script>${code.js}<\/script>` : ""}
        </body>
      </html>
    `);
    doc.close();
  }, [code]);

  return (
    <div className="h-[83.8vh]">
      <h2 className="text-xl font-bold mb-2">Live Preview</h2>
      <iframe
        ref={iframeRef}
        sandbox="allow-scripts allow-same-origin"
        className="w-full h-full border rounded-md shadow-lg"
      ></iframe>
    </div>
  );
};
