import { twMerge } from "tailwind-merge";

interface BoxProps {
  children?: React.ReactNode;
  className?: string;
}

const Box: React.FC<BoxProps> = ({ children, className }) => {
  return (
    <div className={twMerge("h-fit w-full bg-[#121212] rounded-lg", className)}>
      <div>{children}</div>
    </div>
  );
};

export default Box;
