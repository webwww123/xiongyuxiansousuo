import React, { useEffect, useRef, useState } from 'react';

const snippets = [
  "struct group_info init_groups = { .usage = ATOMIC_INIT(2) };",
  "unsigned long buffer[1024];",
  "void inject_payload(void *addr) {",
  "  memcpy(addr, shellcode, sizeof(shellcode));",
  "}",
  "// TARGET: XIONG_YUXIAN //",
  "connecting to neural_link...",
  "decrypting_bios_signature...",
  "downloading memory_dump_0xA1F...",
  "ACCESS_LEVEL: GOD_MODE",
  "loading knowledge_base.json...",
  "if (query == UNKNOWN) { force_resolve(); }",
  "0x7F 0x45 0x4C 0x46 0x01 0x01 0x01 0x00",
  "System.out.println('TRUTH_FOUND');",
  "Matrix.reload();",
  "searching deep_web_sector_7...",
  "=> bypass_firewall(true);",
  "CRITICAL ERROR: KNOWLEDGE OVERFLOW",
  "optimizing quantum states...",
  "var xiong = new Human({iq: 'calculating...'});"
];

const CodeStream: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setLines(prev => {
        const newLine = snippets[Math.floor(Math.random() * snippets.length)];
        const newLines = [...prev, `> ${newLine}`];
        if (newLines.length > 30) {
          return newLines.slice(newLines.length - 30);
        }
        return newLines;
      });
    }, 40); // Very fast speed

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden flex flex-col justify-end pointer-events-none z-0 opacity-40"
      style={{ 
        textShadow: '0 0 5px #0f0',
        fontFamily: '"Share Tech Mono", monospace'
      }}
    >
      {lines.map((line, i) => (
        <div key={i} className="whitespace-nowrap text-xs md:text-sm text-green-600 px-4">
          {line}
        </div>
      ))}
    </div>
  );
};

export default CodeStream;