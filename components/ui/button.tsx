import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sf text-sm font-medium transition-all duration-150 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-ember text-ink hover:bg-ember-hot shadow-ember active:scale-[0.98]",
        gradient:
          "bg-[linear-gradient(120deg,#FF6A39,#C9823D_50%,#4FD8C4)] bg-[length:200%_auto] text-ink hover:bg-[position:100%_0] shadow-ember active:scale-[0.98]",
        outline:
          "border border-graphite-border bg-transparent text-paper hover:border-ember/60 hover:text-ember",
        ghost: "bg-transparent text-paper hover:bg-graphite-light",
        destructive: "bg-red-500/90 text-white hover:bg-red-500 active:scale-[0.98]",
        link: "text-ember underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

/**
 * Button — the single reusable primitive behind every button style in
 * DesignForge (Primary, Gradient, Ghost, Outline, Icon, and Loading are all
 * variants/props of this one component rather than five separate ones).
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild, isLoading, leftIcon, rightIcon, children, disabled, ...props },
    ref
  ) => {
    // Radix's Slot requires exactly one child element. When asChild is used
    // (e.g. <Button asChild><Link>…</Link></Button>), we must forward only
    // `children` — wrapping it with leftIcon/rightIcon nodes would give Slot
    // multiple children and throw "React.Children.only" at render time.
    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={cn(buttonVariants({ variant, size }), className)}
          aria-busy={isLoading || undefined}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        aria-busy={isLoading || undefined}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
