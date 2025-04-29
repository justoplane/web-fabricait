import { CADViewer } from "@/components/platform/cad-viewer"
import { ChatDrawer } from "@/components/platform/chat-drawer"

export default function PlatformPage() {
  return (
    <div className="flex h-full flex-col">
      <header className="border-b border-border/40 bg-background p-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </header>
      <main className="flex-1 overflow-hidden relative pb-[120px]">
        <div className="h-full">
          <CADViewer />
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <ChatDrawer />
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
