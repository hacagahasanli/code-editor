"use client";

import { FC, useRef, useEffect } from "react";

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
      doc.write(
        `<html><body><p style="color:gray;padding:1rem;">No HTML yet</p></body></html>`
      );
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
          ${code.js ? `<script>${code.js}<\/script>` : ""}
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
