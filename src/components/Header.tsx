import React from "react";

type HeaderChildren = {
  children: React.ReactNode;
};

const Header = ({ children }: HeaderChildren) => {
  return <header>{children}</header>;
};

export default Header;
