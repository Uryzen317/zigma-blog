export default function Navbar() {
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
            <div className="grow border-t "></div>
            <span className="text-sm opacity-75">{category.title}</span>
            <span className="text-xs opacity-25">+</span>
          </div>

          <div className="border-r pr-1.5 mr-1">
            {Array(category.count)
              .fill(1)
              .map((_x, j) => (
                <a
                  key={j}
                  href="#"
                  className="flex gap-4 items-center hover:bg-foreground rounded-md p-2 duration-200 hover:text-background"
                >
                  <span className="text-xs font-bold opacity-50" dir="rtl">
                    100 پست
                  </span>
                  <div className="border-t border-dashed grow"></div>
                  <span className="opacity-50 text-sm">دسته اول</span>
                </a>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
