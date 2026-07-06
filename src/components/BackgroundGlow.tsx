/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

export function BackgroundGlow() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#070a13] no-print">
      {/* Ambient background glows */}
      <div 
        className="absolute top-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-violet-600/10 blur-[120px]" 
        id="bg-glow-violet"
      />
      <div 
        className="absolute bottom-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-cyan-600/10 blur-[120px]" 
        id="bg-glow-cyan"
      />
      <div 
        className="absolute top-[30%] right-[20%] h-[400px] w-[400px] rounded-full bg-fuchsia-600/5 blur-[100px]" 
        id="bg-glow-fuchsia"
      />
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" 
        id="bg-grid-overlay"
      />
    </div>
  );
}
