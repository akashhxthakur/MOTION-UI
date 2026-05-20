'use client';

import { useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';

interface CodeBlockProps {
  code: string;
  lang?: string;
  className?: string;
}

export function CodeBlock({ code, lang = 'tsx', className = '' }: CodeBlockProps) {
  const [html, setHtml] = useState<string>('');

  useEffect(() => {
    let cancelled = false;
    codeToHtml(code, {
      lang,
      theme: 'tokyo-night',
    }).then((result) => {
      if (!cancelled) setHtml(result);
    });
    return () => {
      cancelled = true;
    };
  }, [code, lang]);

  if (!html) {
    return (
      <pre
        className={`max-w-full overflow-x-auto rounded-xl border border-white/10 bg-black/40 p-3 font-mono text-xs text-zinc-300 sm:p-4 sm:text-sm ${className}`}
      >
        <code>{code}</code>
      </pre>
    );
  }

  return (
    <div
      className={`code-block max-w-full overflow-x-auto rounded-xl border border-white/10 bg-[#1a1b26] p-3 text-xs sm:p-4 sm:text-sm [&_pre]:!bg-transparent [&_pre]:!p-0 ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
