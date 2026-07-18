import type { Icon } from "@phosphor-icons/react";

interface IconTileProps {
  icon: Icon;
}

export default function IconTile({ icon: IconCmp }: IconTileProps) {
  return (
    <div className="grid h-[42px] w-[42px] flex-none place-items-center rounded-[12px] bg-[#E9ECE5] text-[#2E3A30]">
      <IconCmp size={21} />
    </div>
  );
}
