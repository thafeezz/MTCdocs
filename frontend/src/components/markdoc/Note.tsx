import { ReactNode } from "react";
import { Lightbulb, Info, Construction } from "lucide-react";

type AlertProps = {
  children: ReactNode;
};

export const Tip = ({ children }: AlertProps) => {
  return (
    <div className="w-full rounded-lg bg-emerald-50/85 p-4 my-2 border-2 border-emerald-300">
      <div className="flex items-start gap-2">
        <Lightbulb className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-emerald-600">{children}</div>
      </div>
    </div>
  );
};

export const Note = ({ children }: AlertProps) => {
  return (
    <div className="w-full rounded-lg bg-blue-50/85 p-4 my-2 border-2 border-blue-300">
      <div className="flex items-start gap-2">
        <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-blue-600">{children}</div>
      </div>
    </div>
  );
};

export const Alert = ({ children }: AlertProps) => {
  return (
    <div className="w-full rounded-lg bg-red-200/85 p-4 my-2 border-2 border-red-300">
      <div className="flex items-start gap-2">
        <Construction className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-red-700">{children}</div>
      </div>
    </div>
  );
};

export default Tip;
