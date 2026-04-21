import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold tracking-tight transition-[background,color,border-color,transform] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[color:var(--color-leaf)] focus-visible:ring-offset-[color:var(--color-paper)] aria-invalid:ring-destructive/30 aria-invalid:border-destructive cursor-pointer select-none",
  {
    variants: {
      variant: {
        default:
          "bg-[color:var(--color-ink)] text-[color:var(--color-paper)] border border-[color:var(--color-ink)] hover:bg-[color:var(--color-ink-2)]",
        leaf:
          "bg-[color:var(--color-leaf)] text-white border border-[color:var(--color-leaf)] hover:bg-[color:var(--color-leaf-deep)] hover:border-[color:var(--color-leaf-deep)]",
        sun:
          "bg-[color:var(--color-sun)] text-[color:var(--color-ink)] border border-[color:var(--color-sun-deep)] hover:bg-[color:var(--color-sun-bright)]",
        atlantic:
          "bg-[color:var(--color-atlantic)] text-white border border-[color:var(--color-atlantic)] hover:bg-[color:var(--color-atlantic-deep)] hover:border-[color:var(--color-atlantic-deep)]",
        outline:
          "bg-transparent text-[color:var(--color-ink)] border border-[color:var(--color-ink)] hover:bg-[color:var(--color-ink)] hover:text-[color:var(--color-paper)]",
        secondary:
          "bg-[color:var(--color-paper-2)] text-[color:var(--color-ink)] border border-transparent hover:bg-[color:var(--color-paper-3)]",
        ghost:
          "bg-transparent text-[color:var(--color-ink)] border border-transparent hover:bg-[color:var(--color-paper-2)]",
        link:
          "bg-transparent text-[color:var(--color-ink)] border-0 underline underline-offset-4 decoration-[color:var(--color-leaf)] decoration-2 hover:decoration-[color:var(--color-ink)] px-0 h-auto min-h-0",
        destructive:
          "bg-[color:var(--color-destructive)] text-white border border-[color:var(--color-destructive)] hover:opacity-90",
      },
      size: {
        default: "min-h-11 px-5 text-[0.9375rem]",
        xs: "min-h-7 px-2.5 text-[0.75rem] gap-1",
        sm: "min-h-9 px-4 text-[0.8125rem] gap-1.5",
        lg: "min-h-13 px-7 text-base",
        xl: "min-h-14 px-8 text-base",
        icon: "size-11",
        "icon-sm": "size-9",
        "icon-lg": "size-13",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
