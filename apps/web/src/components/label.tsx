import { LabelProps } from "@/types";

const Label = ({ className, children, ...props }: LabelProps) => (
  <label
    className={`${className} block font-medium text-sm text-gray-700 dark:text-gray-200`}
    {...props}
  >
    {children}
  </label>
);

export default Label;
