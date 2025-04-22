// lib/richtext.tsx
import React from "react"
import type { RichTextBlock } from "./api"

export function renderRichText(blocks: RichTextBlock[]): React.ReactElement[] {
  return blocks.map((block, index) => {
    const text = block.children.map((child) => child.text).join(" ")

    switch (block.type) {
      case "paragraph":
        return <p key={index} className="mb-2">{text}</p>
      case "heading":
      case "heading1":
        return <h1 key={index} className="text-2xl font-bold mb-2">{text}</h1>
      case "heading2":
        return <h2 key={index} className="text-xl font-semibold mb-2">{text}</h2>
      case "list-item":
        return <li key={index}>{text}</li>
      default:
        return <p key={index}>{text}</p>
    }
  })
}
