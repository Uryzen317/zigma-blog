export interface DividerPrimaryInput {
  title?: string;
}

export default function DividerPrimary({ title }: DividerPrimaryInput) {
  return (
    <div className="flex gap-2 items-start mb-2">
      <div className="grow border-t border-dashed"></div>
      <span className="text-sm opacity-75 -translate-y-2">
        {title || "جدید ترین ها"}
      </span>
      <span className="text-xs opacity-50 -translate-y-2">+</span>
      <div className="w-4 border-t border-dashed"></div>
    </div>
  );
}
