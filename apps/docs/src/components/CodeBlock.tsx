export function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-border bg-card/80 p-4 text-sm">
      <code className="font-mono text-violet-300">{children}</code>
    </pre>
  );
}
