import { ArrowLeft } from "@phosphor-icons/react";

interface SubHeaderProps {
  title: string;
  onBack: () => void;
}

export default function SubHeader({ title, onBack }: SubHeaderProps) {
  return (
    <div className="sticky top-0 z-[5] flex items-center gap-[14px] bg-[#2E3A30] p-[18px] text-[#F5F5F2]">
      <button
        type="button"
        onClick={onBack}
        aria-label="Volver al inicio"
        className="grid h-[38px] w-[38px] cursor-pointer appearance-none place-items-center rounded-[11px] border-none bg-[rgba(247,247,242,0.1)] text-[#F5F5F2]"
      >
        <ArrowLeft size={22} />
      </button>
      <h2 className="text-[17px] font-bold tracking-[0.02em]">{title}</h2>
    </div>
  );
}
