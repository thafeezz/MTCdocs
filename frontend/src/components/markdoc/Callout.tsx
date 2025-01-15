import { ReactNode } from "react";

type CalloutProps = {
  children: ReactNode;
  title: string;
};

const Callout = ({ children, title }: CalloutProps) => {
  return (
    <div className="bg-slate-800/40 border-l-4 border-maize rounded-r-lg p-4 my-6">
      <div className="font-medium text-blue-400 mb-2">{title}</div>
      <div className="text-offwhite">{children}</div>
    </div>
  );
};

export default Callout;
