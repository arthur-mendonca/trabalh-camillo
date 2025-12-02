type InputProps =
    {
        label: string;
        value: string;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        type: string;
        id: string;
        name: string;
        className?: string;
    }

export default function Input(
    {
        label,
        value,
        onChange,
        type,
        id,
        name,
        className
    }: InputProps) {
    return (
        <>
            <label htmlFor={id} className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {label}
            </label>
            <input
                value={value}
                onChange={onChange}
                type={type}
                id={id}
                name={name}
                className={
                    `mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-300 
                ${className}`}
            />
        </>
    )
}