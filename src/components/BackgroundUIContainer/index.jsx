import { BackgroundBeams } from "../ui/background-beams";

export function BackgroundUIContainer({ children }) {
  return (
    <>
      <BackgroundBeams />
      <div className="relative dark z-10 h-screen w-screen flex flex-col text-foreground backdrop-blur-sm">
        {children}
      </div>
    </>
  );
}
