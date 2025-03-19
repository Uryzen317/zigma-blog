import { Skeleton } from "./ui/skeleton";

export default function NavbarSkeleton() {
  const categories: {
    title: string;
    count: number;
  }[] = [
    {
      title: "جدید ترین ها",
      count: 4,
    },
    {
      title: "قدیمی ترین ها",
      count: 3,
    },
    {
      title: "پربازدید ترین ها",
      count: 5,
    },
  ];

  return (
    <div className="w-80 shrink-0 h-fit sticky top-12 px-4 pt-2 border-dashed border-t">
      {categories.map((category, i) => (
        <div key={i}>
          <div className="flex gap-2 items-center my-2">
            <div className="grow border-t"></div>
            <Skeleton className="w-24 h-8"></Skeleton>
            <span className="text-xs opacity-25">+</span>
          </div>

          <div className="border-r pr-1.5 mr-1 flex flex-col gap-2">
            {Array(4)
              .fill(true)
              .map((x, j) => (
                <Skeleton key={j} className="w-full h-5"></Skeleton>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
