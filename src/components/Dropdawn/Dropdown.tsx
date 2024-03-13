import React from "react";
import DropdownBase, { DropDownProps as IProps } from "antd/lib/dropdown";

const Dropdown: React.FC<IProps> = ({ children, ...props }) => (
  <DropdownBase {...props} destroyPopupOnHide className="cursor-pointer">
    <div className="px-4 py-2 bg-blue-500 text-white font-bold cursor-pointer">{children}</div>
  </DropdownBase>
);

export default Dropdown;
