import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
}

export default function Input({ label, className, ...props }: InputProps) {
    return (
        <>
            <label htmlFor={props.id as string | undefined} className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {label}
            </label>
            <input
                {...props}
                className={
                    `mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-300 ${className}`}
            />
        </>
    )
}