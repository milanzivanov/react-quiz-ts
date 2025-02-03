type ComponentProps = {
  children: React.ReactNode;
};

function Main({ children }: ComponentProps) {
  return <main className="main">{children}</main>;
}
export default Main;
