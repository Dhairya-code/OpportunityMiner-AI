/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Copy, Check, Download, FileText, Printer } from "lucide-react";

interface MarkdownReportProps {
  markdown: string;
  niche: string;
}

export function MarkdownReport({ markdown, niche }: MarkdownReportProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy report to clipboard:", err);
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    const sanitizedNiche = niche.toLowerCase().replace(/[^a-z0-9]+/g, "_");
    element.download = `OpportunityMiner_Report_${sanitizedNiche}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePrint = () => {
    window.print();
  };

  // Extremely robust, beautiful and high-performance custom Markdown renderer
  const renderFormattedMarkdown = (text: string) => {
    if (!text) return null;

    const lines = text.split("\n");
    let insideList = false;
    let listItems: React.ReactNode[] = [];
    let insideTable = false;
    let tableRows: string[][] = [];
    const elements: React.ReactNode[] = [];

    const flushList = (key: number) => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`ul-${key}`} className="list-disc list-inside space-y-2 text-gray-300 ml-4 mb-6 leading-relaxed text-sm">
            {...listItems}
          </ul>
        );
        listItems = [];
        insideList = false;
      }
    };

    const flushTable = (key: number) => {
      if (tableRows.length > 0) {
        // First row is headers, second is alignment separators (ignored), rest are data
        const headers = tableRows[0];
        const dataRows = tableRows.slice(2);

        elements.push(
          <div key={`table-wrapper-${key}`} className="overflow-x-auto my-6 rounded-xl border border-white/10 bg-black/30">
            <table className="min-w-full divide-y divide-white/10 text-xs md:text-sm text-left">
              <thead className="bg-white/5 font-display font-semibold text-white">
                <tr>
                  {headers.map((h, i) => (
                    <th key={`th-${i}`} className="px-4 py-3 font-medium uppercase tracking-wider text-[11px] text-cyan-400">
                      {h.trim()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-300 font-mono">
                {dataRows.map((row, rowIdx) => (
                  <tr key={`tr-${rowIdx}`} className="hover:bg-white/5 transition-colors">
                    {row.map((cell, cellIdx) => (
                      <td key={`td-${cellIdx}`} className="px-4 py-3 leading-relaxed">
                        {cell.trim().replace(/\*\*(.*?)\*\*/g, "$1")}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        tableRows = [];
        insideTable = false;
      }
    };

    const parseInlineStyles = (lineStr: string) => {
      // Replaces bold (**text**) with bold tag and italics (*text*) with italic tag
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = boldRegex.exec(lineStr)) !== null) {
        if (match.index > lastIndex) {
          parts.push(lineStr.slice(lastIndex, match.index));
        }
        parts.push(<strong key={match.index} className="text-white font-semibold">{match[1]}</strong>);
        lastIndex = boldRegex.lastIndex;
      }

      if (lastIndex < lineStr.length) {
        parts.push(lineStr.slice(lastIndex));
      }

      return parts.length > 0 ? parts : lineStr;
    };

    lines.forEach((line, idx) => {
      const trimmed = line.trim();

      // Handle Markdown Tables
      if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
        flushList(idx);
        insideTable = true;
        // Split and filter empty elements caused by leading/trailing pipes
        const cells = line.split("|").map(c => c.trim()).filter((_, i, arr) => i > 0 && i < arr.length - 1);
        tableRows.push(cells);
        return;
      } else if (insideTable) {
        flushTable(idx);
      }

      // Handle Bullet Lists
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        flushList(idx); // Flush any pending different list just in case
        insideList = true;
        const itemText = trimmed.slice(2);
        
        // Handle checklists e.g., - [ ] or - [x]
        if (itemText.startsWith("[ ]") || itemText.startsWith("[x]") || itemText.startsWith("[X]")) {
          const checked = itemText.startsWith("[x]") || itemText.startsWith("[X]");
          const label = itemText.slice(3).trim();
          listItems.push(
            <li key={`li-${idx}`} className="list-none flex items-start gap-2.5 text-gray-300 text-sm">
              <input 
                type="checkbox" 
                checked={checked} 
                readOnly 
                className="mt-1 h-3.5 w-3.5 rounded border-white/10 bg-white/5 text-violet-500 focus:ring-0 select-none pointer-events-none" 
              />
              <span>{parseInlineStyles(label)}</span>
            </li>
          );
        } else {
          listItems.push(
            <li key={`li-${idx}`} className="text-gray-300 text-sm">
              {parseInlineStyles(itemText)}
            </li>
          );
        }
        return;
      } else if (insideList) {
        flushList(idx);
      }

      // Handle Headers
      if (trimmed.startsWith("# ")) {
        elements.push(
          <h1 key={`h1-${idx}`} className="font-display text-2xl md:text-3xl font-extrabold text-white mt-8 mb-4 border-b border-white/10 pb-4 leading-tight">
            {trimmed.slice(2)}
          </h1>
        );
      } else if (trimmed.startsWith("## ")) {
        elements.push(
          <h2 key={`h2-${idx}`} className="font-display text-xl md:text-2xl font-bold text-violet-400 mt-8 mb-4 leading-snug">
            {trimmed.slice(3)}
          </h2>
        );
      } else if (trimmed.startsWith("### ")) {
        elements.push(
          <h3 key={`h3-${idx}`} className="font-display text-lg font-semibold text-cyan-400 mt-6 mb-3">
            {trimmed.slice(4)}
          </h3>
        );
      } else if (trimmed === "---") {
        elements.push(<hr key={`hr-${idx}`} className="border-white/10 my-8" />);
      } else if (trimmed !== "") {
        // Plain Paragraph
        elements.push(
          <p key={`p-${idx}`} className="text-gray-300 leading-relaxed mb-4 text-sm md:text-base">
            {parseInlineStyles(line)}
          </p>
        );
      }
    });

    // Final flushes
    flushList(lines.length);
    flushTable(lines.length);

    return elements;
  };

  return (
    <div className="glass-panel p-6 md:p-8 rounded-2xl border border-white/8 space-y-6" id="markdown-report-container">
      {/* Top action header (Hidden when printing to preserve memo format) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6 no-print" id="markdown-report-actions">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-cyan-400" />
          <h3 className="font-display font-bold text-white text-lg">
            Strategic Investment Memo
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all font-mono text-xs border border-white/10"
            title="Copy Raw Markdown Memo"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied!" : "Copy Markdown"}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all font-mono text-xs border border-white/10"
            title="Download Raw Markdown Document"
          >
            <Download className="h-4 w-4" />
            Download .md
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white transition-all font-mono text-xs border border-violet-500/20"
            title="Print or Export to PDF"
          >
            <Printer className="h-4 w-4" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Styled Printed Memo Container */}
      <div className="prose prose-invert max-w-none print-only" id="investment-memo-body">
        {renderFormattedMarkdown(markdown)}
      </div>
    </div>
  );
}
