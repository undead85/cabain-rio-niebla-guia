import { ChatCircleDots, WhatsappLogo } from "@phosphor-icons/react";
import SubHeader from "@/components/ui/SubHeader";
import { contactContent } from "@/content/guide";
import { WHATSAPP_URL } from "@/content/site";

interface ContactScreenProps {
  onBack: () => void;
}

export default function ContactScreen({ onBack }: ContactScreenProps) {
  return (
    <div>
      <SubHeader title={contactContent.title} onBack={onBack} />
      <div className="px-5 pt-[30px] pb-10 text-center">
        <div className="mx-auto mb-[18px] grid h-[72px] w-[72px] place-items-center rounded-full bg-[#2E3A30] text-[#A7B6A1]">
          <ChatCircleDots size={34} />
        </div>
        <div className="font-serif text-[26px] font-medium text-[#2E3A30]">
          {contactContent.name}
        </div>
        <div className="mt-1 text-[10px] font-semibold tracking-[0.3em] text-[#8A9E84]">
          {contactContent.role}
        </div>
        <p className="mx-auto mt-[18px] mb-[26px] max-w-[280px] text-[14px] leading-[1.6] text-[#5D6B5A]">
          {contactContent.message}
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-[10px] rounded-[14px] bg-[#8A9E84] p-4 text-[13px] font-bold tracking-[0.06em] text-white"
        >
          <WhatsappLogo size={20} />
          {contactContent.cta}
        </a>
      </div>
    </div>
  );
}
