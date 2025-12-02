export default function PageBox(
    {
        children, className
    }:
        {
            children: React.ReactNode, className?: string

        }
) {
    return (
        <div className={`p-6 h-full ${className}`}>
            {children}
        </div>
    )
}