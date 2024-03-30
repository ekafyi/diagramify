export const getMermaidAndLinks = (str = "") => {
  if (!str || str === "NO_DIAGRAM") {
    return null;
  }

  const codeRegex = /```mermaid\n([\s\S]*?)\n```/;
  const match = str.match(codeRegex);

  if (!match) {
    return { mermaid: "", markdown: str };
  }

  const mermaid = match[1]?.trim();
  const markdown = str.replace(codeRegex, "")?.trim();

  return { mermaid, markdown };
};
