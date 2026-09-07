import Icon from "./Icon";

type CarouselNavButtonProps = {
  direction: "prev" | "next";
  onClick: () => void;
  disabled?: boolean;
};

export default function CarouselNavButton({
  direction,
  onClick,
  disabled,
}: CarouselNavButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-[#1A1A1A] text-ink transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-[#0B0B0B] disabled:pointer-events-none disabled:opacity-30"
    >
      <Icon name={direction === "prev" ? "chevronLeft" : "chevronRight"} size={16} stroke={2} />
    </button>
  );
}
