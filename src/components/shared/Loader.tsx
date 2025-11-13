// components/ui/Loader.tsx
"use client"

import { Loader2 } from "lucide-react"

export default function Loader({ size = 40, color = "text-blue-500" }) {
    return (
        <div className="min-h-screen flex justify-center items-center">
            <Loader2 className={`animate-spin ${color}`} size={size} />
        </div>
    )
}
