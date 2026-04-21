import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold w-fit whitespace-nowrap shrink-0 gap-1.5 [&>svg]:size-3 [&>svg]:pointer-events-none border tracking-[0.16em] uppercase font-mono leading-none",
  {
    variants: {
      variant: {
        default:
          "bg-[color:var(--color-ink)] text-[color:var(--color-paper)] border-[color:var(--color-ink)]",
        secondary:
          "bg-[color:var(--color-paper-2)] text-[color:var(--color-ink-3)] border-transparent",
        outline:
          "bg-transparent text-[color:var(--color-ink)] border-[color:var(--color-ink)]",
        leaf:
          "bg-[rgba(0,168,107,0.08)] text-[color:var(--color-leaf)] border-[color:var(--color-leaf)]",
        sun:
          "bg-[rgba(244,196,48,0.14)] text-[color:var(--color-sun-deep)] border-[color:var(--color-sun-deep)]",
        atlantic:
          "bg-[rgba(29,78,216,0.06)] text-[color:var(--color-atlantic)] border-[color:var(--color-atlantic)]",
        clay:
          "bg-[rgba(196,90,58,0.10)] text-[color:var(--color-clay-deep)] border-[color:var(--color-clay)]",
        destructive:
          "bg-[color:var(--color-destructive)] text-white border-[color:var(--color-destructive)]",
        solidLeaf:
          "bg-[color:var(--color-leaf)] text-white border-[color:var(--color-leaf)]",
        solidSun:
          "bg-[color:var(--color-sun)] text-[color:var(--color-ink)] border-[color:var(--color-sun-deep)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
