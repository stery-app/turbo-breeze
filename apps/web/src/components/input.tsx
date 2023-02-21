import { InputProps } from "@/types";

const Input = ({ disabled = false, className, ...props }: InputProps) => (
  <input
    disabled={disabled}
    className={`${className} px-4 py-2 border focus:outline-none rounded-md shadow-sm border-gray-200 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
    {...props}
  />
);

export default Input;
