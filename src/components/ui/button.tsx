import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes } from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-mono uppercase tracking-[0.14em] text-xs transition-all duration-150 disabled:opacity-40 disabled:pointer-events-none cursor-pointer border',
  {
    variants: {
      variant: {
        default:
          'bg-transparent border-[var(--color-line)] text-[var(--color-ink)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:-translate-y-px hover:shadow-[0_0_16px_var(--color-glow,rgba(197,242,64,0.35))]',
        solid:
          'bg-[var(--color-accent)] text-[#111] border-[var(--color-accent)] hover:brightness-110',
        ghost: 'border-transparent hover:border-[var(--color-line)]',
      },
      size: {
        default: 'h-9 px-3',
        sm: 'h-7 px-2 text-[10px]',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)

export function Button({
  className,
  variant,
  size,
  asChild,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
}
