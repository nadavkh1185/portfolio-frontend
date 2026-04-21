"use client";

import { useEffect, useRef } from "react";

interface Props {
  value: string;
  onChange: (html: string) => void;
}

export default function RichTextEditor({ value, onChange }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value || "";
    }
  }, [value]);

  return (
    <div className="border rounded-lg bg-gray-200">
      {/* toolbar minimal */}
      <div className="flex gap-2 p-2 border-b">
        <button onClick={() => document.execCommand("bold")} className="px-2">B</button>
        <button onClick={() => document.execCommand("italic")} className="px-2">I</button>
        <button onClick={() => document.execCommand("underline")} className="px-2">U</button>
      </div>

      <div
        ref={ref}
        contentEditable
        className="min-h-[140px] p-3 outline-none"
        onInput={() => onChange(ref.current?.innerHTML || "")}
      />
    </div>
  );
}