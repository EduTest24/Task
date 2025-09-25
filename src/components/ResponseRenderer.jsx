"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

function MarkdownRenderer({ text }) {
  return (
    <div
      className="
        prose prose-base max-w-none
        prose-headings:font-semibold prose-headings:text-gray-800
        prose-p:text-gray-700 prose-p:leading-relaxed
        prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-a:transition-colors
        prose-strong:text-gray-900
        prose-em:text-gray-600 prose-em:italic
        prose-blockquote:border-l-4 prose-blockquote:border-blue-400 prose-blockquote:bg-blue-50/70 prose-blockquote:px-4 prose-blockquote:py-2 prose-blockquote:rounded-lg prose-blockquote:text-gray-700
        prose-code:text-pink-600 prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-medium
        prose-pre:bg-[#1e1e2e] prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-xl prose-pre:shadow-md
        prose-li:marker:text-blue-500
        prose-table:border prose-table:border-gray-300 prose-table:rounded-lg prose-table:overflow-hidden
        prose-th:bg-gray-100 prose-th:text-gray-800 prose-th:p-3
        prose-td:p-3 prose-tr:odd:bg-gray-50
      "
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        components={{
          a: ({ node, ...props }) => (
            <a
              {...props}
              className="text-blue-600 font-medium hover:text-blue-700 hover:underline transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            />
          ),

          input: ({ node, ...props }) => {
            if (props.type === "checkbox") {
              return (
                <input
                  type="checkbox"
                  className="mr-2 rounded-md border-gray-400 text-green-600 focus:ring-green-500"
                  {...props}
                />
              );
            }
            return <input {...props} />;
          },

          p: ({ node, children }) => {
            const highlight = (child) => {
              if (typeof child === "string") {
                return child.split(/(Important|Deadline|Tomorrow)/gi).map(
                  (part, i) =>
                    ["important", "deadline", "tomorrow"].includes(
                      part.toLowerCase()
                    ) ? (
                      <span
                        key={i}
                        className="bg-yellow-100/80 text-yellow-800 font-semibold px-1.5 py-0.5 rounded"
                      >
                        {part}
                      </span>
                    ) : (
                      part
                    )
                );
              }
              return child;
            };

            return (
              <p className="leading-relaxed text-gray-700">
                {React.Children.map(children, highlight)}
              </p>
            );
          },
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}

export default function ResponseRenderer({ text }) {
  return <MarkdownRenderer text={text} />;
}
