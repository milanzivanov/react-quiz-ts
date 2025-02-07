import { ReactNode } from "react";

interface FooterProps {
  children: ReactNode;
}

function Footer({ children }: FooterProps) {
  return <div>{children}</div>;
}
export default Footer;
