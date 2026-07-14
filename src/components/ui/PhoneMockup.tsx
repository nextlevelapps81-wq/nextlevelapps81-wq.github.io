import Image from "next/image";
import { cn } from "@/lib/utils";

interface PhoneMockupProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export function PhoneMockup({
  src,
  alt,
  className,
  priority = false,
}: PhoneMockupProps) {
  return (
    <div
      className={cn(
        "relative mx-auto w-[260px] sm:w-[280px]",
        className
      )}
    >
      <div className="relative rounded-[2.5rem] border-[6px] border-gray-800 bg-gray-900 p-2 shadow-2xl dark:border-gray-700 dark:shadow-black/50">
        <div className="absolute left-1/2 top-3 z-10 h-[22px] w-[90px] -translate-x-1/2 rounded-full bg-gray-900 dark:bg-black" />
        <div className="overflow-hidden rounded-[2rem] bg-black">
          <Image
            src={src}
            alt={alt}
            width={280}
            height={606}
            className="h-auto w-full object-cover"
            priority={priority}
          />
        </div>
      </div>
      <div
        className="absolute -inset-4 -z-10 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.4) 0%, rgba(255,107,157,0.2) 50%, transparent 70%)",
        }}
        aria-hidden
      />
    </div>
  );
}
