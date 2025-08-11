import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"

export function BrandLogo({ compact = false, className = "" }: { compact?: boolean; className?: string }) {
  return (
    <Link href="#top" className={cn("inline-flex select-none items-center gap-2 text-white", className)}>
      <div className="relative h-6 w-6">
        <Image
          src="/favicon.png"
          alt="GetHelp Logo"
          width={24}
          height={24}
          className="rounded-sm"
        />
      </div>
      {!compact && (
        <span className="font-mono text-sm tracking-widest text-white/90">
          GetHelp
        </span>
      )}
    </Link>
  )
}
