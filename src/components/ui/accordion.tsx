"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const Accordion = AccordionPrimitive.Root;

export function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn("border-b border-border", className)}
      {...props}
    />
  );
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "group flex flex-1 items-center justify-between gap-4 py-6 text-left text-base font-semibold text-text transition-colors hover:text-accent sm:text-lg",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown className="h-5 w-5 shrink-0 text-text-light transition-transform duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:text-accent" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className={cn(
        "overflow-hidden text-sm text-text-light data-[state=closed]:animate-[accordion-up_0.25s_ease] data-[state=open]:animate-[accordion-down_0.25s_ease] sm:text-base",
        className
      )}
      {...props}
    >
      <div className="pb-6 pr-8 leading-relaxed">{children}</div>
    </AccordionPrimitive.Content>
  );
}
