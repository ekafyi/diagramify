import { describe, expect, test } from "vitest";

import { getMermaidAndLinks } from "./str";

const sample1 = `\`\`\`mermaid
graph LR
subgraph Photosynthesis
  A[Light energy] --> B[Chlorophyll] --> C[Water] --> D[Oxygen]
  C --> E[Carbon dioxide] --> F[Glucose]
end
\`\`\`

- [Photosynthesis](https://www.khanacademy.org/science/ap-biology/cell-structure-and-function/photosynthesis/a/steps-of-photosynthesis)
- [The Process of Photosynthesis](https://www.nationalgeographic.org/encyclopedia/photosynthesis/)
`;

const sampleMermaidOnly = `\`\`\`mermaid
graph LR
subgraph Photosynthesis
  A[Light energy] --> B[Chlorophyll] --> C[Water] --> D[Oxygen]
  C --> E[Carbon dioxide] --> F[Glucose]
end
\`\`\``;

const sampleNegative = "NO_DIAGRAM";

describe("process Gemini response", () => {
  test("mermaid and links", () => {
    const result = getMermaidAndLinks(sample1);
    expect(result).toMatchInlineSnapshot(`
      {
        "markdown": "- [Photosynthesis](https://www.khanacademy.org/science/ap-biology/cell-structure-and-function/photosynthesis/a/steps-of-photosynthesis)
      - [The Process of Photosynthesis](https://www.nationalgeographic.org/encyclopedia/photosynthesis/)",
        "mermaid": "graph LR
      subgraph Photosynthesis
        A[Light energy] --> B[Chlorophyll] --> C[Water] --> D[Oxygen]
        C --> E[Carbon dioxide] --> F[Glucose]
      end",
      }
    `);
  });

  test("mermaid only", () => {
    const result = getMermaidAndLinks(sampleMermaidOnly);
    expect(result).toMatchInlineSnapshot(`
      {
        "markdown": "",
        "mermaid": "graph LR
      subgraph Photosynthesis
        A[Light energy] --> B[Chlorophyll] --> C[Water] --> D[Oxygen]
        C --> E[Carbon dioxide] --> F[Glucose]
      end",
      }
    `);
  });

  test("nothing", () => {
    const result = getMermaidAndLinks(sampleNegative);
    expect(result).toMatchInlineSnapshot(`null`);
  });
});
