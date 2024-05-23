import React from "react";
import DropdownBase, { DropDownProps as IProps } from "antd/lib/dropdown";
import cls from "./Dropdown.module.scss";
const Dropdown: React.FC<IProps> = ({ children, ...props }) => (
  <DropdownBase {...props} destroyPopupOnHide className="cursor-pointer">
    <div className={cls.wrapper}>{children}</div>
  </DropdownBase>
);

export default Dropdown;
