"use client"

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

    doc.open();
    doc.write(`
      <html>
        <head>
          <style>${code.css}</style>
        </head>
        <body>
          ${code.html}
          <script>${code.js}<\/script>
        </body>
      </html>
    `);
    
    doc.close();
  }, [code]);

  return (
    <iframe
      ref={iframeRef}
      sandbox="allow-scripts allow-same-origin"
      className="w-full h-full border rounded-md shadow-lg"
    />
  );
};
