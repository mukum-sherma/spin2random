"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

type CheckboxProps = React.ComponentPropsWithoutRef<
	typeof CheckboxPrimitive.Root
> & {
	className?: string;
};

const Checkbox = React.forwardRef<
	React.ElementRef<typeof CheckboxPrimitive.Root>,
	CheckboxProps
>(({ className, children, ...props }, ref) => (
	<CheckboxPrimitive.Root
		ref={ref}
		className={cn(
			"inline-flex h-6 w-6 items-center justify-center rounded border bg-white text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none data-[state=checked]:bg-[#0076fe] data-[state=checked]:border-[#0076fe] data-[state=checked]:text-white",
			className
		)}
		{...props}
	>
		<CheckboxPrimitive.Indicator className="flex items-center justify-center">
			<Check className="h-4 w-4" />
		</CheckboxPrimitive.Indicator>
	</CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
