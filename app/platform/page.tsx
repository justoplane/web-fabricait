import { CADViewer } from "@/components/platform/cad-viewer"

export default function PlatformPage() {
  return (
    <div className="flex h-screen flex-col">
      <header className="border-b border-border/40 bg-background p-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </header>
      <main className="flex-1 overflow-hidden p-4">
        <div className="h-full rounded-lg border border-border/40 bg-muted/20 shadow-sm">
          <CADViewer />
        </div>
      </main>
    </div>
  )
}



// 'use client'
// import { useEffect, useRef, useState } from "react"
// import { CADViewer } from "@/components/platform/cad-viewer"
// import dynamic from "next/dynamic"

// const Viewer = dynamic(() => import("@/components/platform/cad-renderer"), { ssr: false });

// export default function PlatformPage() {
//     return (
//     <div className="flex h-screen flex-col">
//       <header className="border-b border-border/40 bg-background p-4">
//         <h1 className="text-2xl font-bold">Dashboard</h1>
//       </header>
//       <main className="flex-1 overflow-hidden p-4">
//         <div className="h-full rounded-lg border border-border/40 bg-muted/20 shadow-sm">
//           <Viewer />
//         </div>
//       </main>
//     </div>
//   )
// }
