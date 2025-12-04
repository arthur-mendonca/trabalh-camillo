import React from 'react'

export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({ children, className, ...props }) => {
  return (
    <label className={["block text-sm font-medium text-gray-700 dark:text-gray-300", className].filter(Boolean).join(' ')} {...props}>
      {children}
    </label>
  )
}

export default Label
