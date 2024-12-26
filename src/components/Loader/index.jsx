import { cn } from "@/lib/utils";

const Loader = ({ className }) => {
  return (
    <div className={cn("font-mono text-lg animate-pulse", className)}>
      <div className="flex items-center gap-1">
        <span>[</span>
        <span className="animate-[pulse_1s_ease-in-out_infinite]">|</span>
        <span className="animate-[pulse_1s_ease-in-out_0.2s_infinite]">/</span>
        <span className="animate-[pulse_1s_ease-in-out_0.4s_infinite]">-</span>
        <span className="animate-[pulse_1s_ease-in-out_0.6s_infinite]">\</span>
        <span>]</span>
        <span className="ml-2 animate-[pulse_1s_ease-in-out_infinite]">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default Loader;
