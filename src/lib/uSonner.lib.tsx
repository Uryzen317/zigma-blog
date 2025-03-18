import { toast } from "sonner";

export default function uSonner(title: string, desc: string) {
  toast(title, {
    description: desc,
    descriptionClassName: "text-xs opacity-50",
    className: "text-right",
    style: {
      direction: "rtl",
    },
    icon: (
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#000000"
          className="fill-foreground w-4 h-4 -translate-y-[10px]"
        >
          <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
        </svg>
      </div>
    ),
  });
}
