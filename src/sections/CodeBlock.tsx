import React, { useState } from "react";

interface CodeBlockProps {
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const [isCopy, setCopy] = useState<boolean>(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 1000);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          backgroundColor: "#f5f5f5",
          padding: "8px",
          borderRadius: "8px",
          margin: "20px",
        }}
      >
        <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
          <code>{code}</code>
        </pre>
        <button
          onClick={copyToClipboard}
          style={{
            backgroundColor: "white",
            color: "gray",
            border: "none",
            borderRadius: "4px",
            padding: "8px",
            cursor: "pointer",
          }}
        >
          {isCopy ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
};

export default CodeBlock;
