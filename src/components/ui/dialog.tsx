"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogContent = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <DialogPrimitive.Content
            ref={ref}
            className={`fixed left-[50%] top-[50%] w-full max-w-md -translate-x-[50%] -translate-y-[50%] bg-white p-6 shadow-lg rounded-md ${className}`}
            {...props}
        />
    </DialogPrimitive.Portal>
));

const DialogHeader = ({ children }: { children: React.ReactNode }) => (
    <div className="text-lg font-semibold">{children}</div>
);

const DialogTitle = DialogPrimitive.Title;

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle };
