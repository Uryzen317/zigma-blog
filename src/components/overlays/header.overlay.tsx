import { Input } from "../ui/input";

export default function Header() {
  return (
    <header className="sticky top-0 h-14 flex justify-center border-b border-dashed bg-background z-30">
      <section className="container flex justify-between items-center border-x border-dashed px-4">
        {/* search */}
        <div>
          <Input type="email" placeholder="جستجو" dir="rtl" />
        </div>

        {/* name | nav */}
        <div className="flex justify-end gap-8 items-center">
          <nav>
            <ul className="flex items-center gap-4">
              <li>
                <a href="#" className="opacity-75 text-sm">
                  خانه
                </a>
              </li>

              <li>
                <a href="#" className="opacity-75 text-sm">
                  فروشگاه
                </a>
              </li>

              <li>
                <a href="#" className="opacity-75 text-sm">
                  درباره ما
                </a>
              </li>
            </ul>
          </nav>

          <p className="text-xl font-bold">بلاگ شخصی</p>
        </div>
      </section>
    </header>
  );
}
