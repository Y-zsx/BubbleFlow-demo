import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  size?: number;
  decorative?: boolean;
};

export default function BrandLogo({
  className,
  size = 32,
  decorative = true,
}: BrandLogoProps) {
  return (
    <Image
      src="/bubbleflow-logo.svg"
      alt={decorative ? "" : "BubbleFlow 汽泡音露"}
      width={size}
      height={size}
      unoptimized
      className={cn("shrink-0 object-contain", className)}
    />
  );
}
