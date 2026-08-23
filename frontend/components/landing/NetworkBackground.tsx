"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  label: string;
  type: "wallet" | "ip" | "tx" | "asn";
  highlight?: boolean;
}

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const labels = [
      { text: "198.51.100.24", type: "ip" },
      { text: "bc1q7a3f...92e", type: "wallet" },
      { text: "tx:e8b21...41c", type: "tx" },
      { text: "ASN-13335", type: "asn" },
      { text: "203.0.113.88", type: "ip" },
      { text: "bc1q99x8...55b", type: "wallet" },
      { text: "tx:401ca...8ef", type: "tx" },
      { text: "ASN-45102", type: "asn" },
      { text: "192.0.2.147", type: "ip" },
      { text: "bc1qd42m...10a", type: "wallet" },
      { text: "tx:9bf33...76d", type: "tx" },
      { text: "ASN-55836", type: "asn" },
      { text: "198.51.100.91", type: "ip" },
      { text: "bc1q88aa...33f", type: "wallet" },
      { text: "tx:613cc...11b", type: "tx" },
      { text: "ASN-24940", type: "asn" },
      { text: "198.51.100.105", type: "ip" },
      { text: "bc1q33ef...88c", type: "wallet" },
      { text: "tx:109aa...44e", type: "tx" },
      { text: "ASN-16509", type: "asn" },
    ];

    const nodes: Node[] = labels.map((item, idx) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: item.type === "wallet" ? 4 : item.type === "tx" ? 3.5 : 3,
      label: item.text,
      type: item.type as "wallet" | "ip" | "tx" | "asn",
      highlight: idx % 6 === 0,
    }));

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            const alpha = (1 - dist / 180) * 0.22;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = nodes[i].highlight || nodes[j].highlight
              ? `rgba(244, 63, 94, ${alpha * 1.5})`
              : `rgba(148, 163, 184, ${alpha})`;
            ctx.lineWidth = nodes[i].highlight || nodes[j].highlight ? 1.2 : 0.8;
            ctx.stroke();
          }
        }

        // Connection to mouse
        const mdx = nodes[i].x - mouseX;
        const mdy = nodes[i].y - mouseY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 140) {
          const malpha = (1 - mdist / 140) * 0.35;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(203, 213, 225, ${malpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Draw and update nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 20 || node.x > width - 20) node.vx *= -1;
        if (node.y < 20 || node.y > height - 20) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);

        if (node.highlight) {
          ctx.fillStyle = "rgba(244, 63, 94, 0.9)";
          ctx.shadowColor = "rgba(244, 63, 94, 0.6)";
          ctx.shadowBlur = 10;
        } else if (node.type === "wallet") {
          ctx.fillStyle = "rgba(226, 232, 240, 0.85)";
          ctx.shadowBlur = 0;
        } else if (node.type === "ip") {
          ctx.fillStyle = "rgba(148, 163, 184, 0.75)";
          ctx.shadowBlur = 0;
        } else if (node.type === "asn") {
          ctx.fillStyle = "rgba(203, 213, 225, 0.65)";
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = "rgba(100, 116, 139, 0.75)";
          ctx.shadowBlur = 0;
        }

        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw faint label on hover proximity or highlighted nodes
        const mdx = node.x - mouseX;
        const mdy = node.y - mouseY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mdist < 100 || node.highlight) {
          ctx.font = "9px ui-monospace, monospace";
          ctx.fillStyle = node.highlight ? "rgba(251, 113, 133, 0.9)" : "rgba(148, 163, 184, 0.65)";
          ctx.fillText(node.label, node.x + 8, node.y + 3);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-45"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
