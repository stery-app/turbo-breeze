import { DropdownButtonProps } from "@/types";
import { Menu } from "@headlessui/react";

export default function DropdownButton({
  type = "button",
  children,
  ...props
}: DropdownButtonProps) {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={`w-full text-left block px-4 py-2 text-sm leading-5 text-gray-700 ${
            active ? "bg-gray-100" : ""
          } focus:outline-none transition duration-150 ease-in-out`}
          {...props}
        >
          {children}
        </button>
      )}
    </Menu.Item>
  );
}
