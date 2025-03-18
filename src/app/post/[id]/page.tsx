import DividerPrimary from "@/components/divider-primary";
import PostCard from "@/components/post-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import * as moment from "jalali-moment";

export default async function Post({ params }: { params: { id: string } }) {
  const { id } = await params;

  let res = await fetch("http://localhost:5000/get-post/" + id);
  let post: {
    _id: string;
    picture: string;
    title: string;
    description: string;
    tags: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    user: {
      _id: string;
      username: string;
      roles: Array<number>;
    };
  } = await res.json();

  return (
    <>
      {/* picture | name | author | read time | statistics |  tags */}
      <section className="border-y border-dashed p-4 flex gap-8 justify-between basis-1">
        <div className="grow  h-12 flex flex-col gap-8 py-4 items-end">
          {/* name */}
          <h1 className="font-bold text-3xl">{post.title}</h1>

          {/* author */}
          <div className="flex gap-4 justify-end items-center">
            <div className="flex flex-col items-end justify-between h-full">
              <p className="font-bold opacity-75 text-xl">
                {post.user.username}
              </p>
              <div className="flex gap-2">
                <Badge variant={"secondary"}>نویسنده</Badge>
                <Badge variant={"secondary"}>ناظر</Badge>
                <Badge variant={"secondary"}>مدیر</Badge>
              </div>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000000"
              className="fill-foreground w-14 h-14 ring ring-slate-600 ring-offset-1 rounded-full  opacity-50"
            >
              <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
            </svg>
          </div>

          {/* read time | statistics */}
          <div className="flex flex-col items-end gap-2 bg-zinc-900 p-2 px-4 rounded-md">
            <div className="flex gap-2 justify-end items-center">
              <p className="opacity-75" dir="rtl">
                2 دقیقه
              </p>
              <p className="opacity-50 text-sm" dir="rtl">
                مدت زمان تقریبی مطالعه :
              </p>
            </div>

            <div className="flex gap-2 items-center  w-full">
              <div className="flex gap-1 items-center">
                <span className="opacity-50 text-sm">100</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#000000"
                  className="w-4 h-4 opacity-50 fill-foreground"
                >
                  <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                </svg>
              </div>

              <div className="flex gap-1 items-center">
                <span className="opacity-50 text-sm">10</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#000000"
                  className="w-4 h-4 opacity-50 fill-foreground"
                >
                  <path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z" />
                </svg>
              </div>

              <span className="opacity-25 text-xs text-center grow border-t border-t-zinc-200"></span>

              <p dir="rtl" className="opacity-75">
                {(new Date().getTime() - new Date(post.createdAt).getTime()) /
                  86_400_000 >=
                1 ? (
                  <span>
                    {(new Date().getTime() -
                      new Date(post.createdAt).getTime()) /
                      86_400_000}
                  </span>
                ) : (
                  <span>به تازگی</span>
                )}
              </p>
            </div>
          </div>

          {/* tags */}
          <div className="w-full">
            <div className="flex gap-2 items-center mb-4">
              <div className="grow border-t"></div>
              <span className="text-sm opacity-75">تگ های مرتبط</span>
              <span className="text-xs opacity-25">+</span>
            </div>

            <div className="flex flex-wrap justify-end gap-2">
              {post.tags.split(" ").map((tag: string) => (
                <span className="bg-foreground text-xs text-background px-2 py-1 rounded-md opacity-25">
                  {tag}#
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* picture */}
        <div className="h-96 aspect-video bg-slate-600 shrink-0 basis-1 rounded-md shadow-md"></div>
      </section>

      {/* text */}
      <section>
        <p className="text-justify p-4" dir="rtl">
          {post.description}
        </p>
      </section>

      {/* recommended */}
      <section className="mt-2">
        <DividerPrimary title="مطالب پیشنهادی" />
        <div className="flex gap-4 flex-wrap px-4 pb-4">
          {Array(4)
            .fill(true)
            .map((x) => (
              <PostCard />
            ))}
        </div>
      </section>

      {/* comments */}
      <section className="mt-3">
        <DividerPrimary title="نظرات" />
        <div className="flex gap-4 -translate-y-7">
          {/* comments */}
          <div className="flex flex-col gap-4 grow pt-4 pl-4">
            {Array(10)
              .fill(true)
              .map((x) => (
                <div className="card bg-base-200 min-h-24 border border-base-300 shadow-sm p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-2 items-center sm:justify-start justify-center">
                      <span dir="rtl" className="text-sm opacity-75">
                        {" "}
                        ۲ ساعت پیش{" "}
                      </span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#000000"
                        className="opacity-50 w-5 h-5 fill-foreground "
                      >
                        <path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" />
                      </svg>
                    </div>

                    <div className="flex gap-2 items-start">
                      <div className="flex flex-col items-end gap-1">
                        <p className="text-sm">نام کاربری</p>
                        <Badge className="" variant={"outline"}>
                          ناظر
                        </Badge>
                      </div>

                      <div className="avatar">
                        <div className="w-12 rounded-full">
                          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="divider p-0 m-0 my-2 opacity-50"></div>
                  <p className="text-justify text-sm leading-7" dir="rtl">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                    با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه
                    و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی
                    تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای
                    کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و
                    آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم
                    افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص
                    طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این
                    صورت می توان امید داشت که تمام و دشواری موجود در ارائه
                    راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز
                    شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل
                    دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                  </p>

                  <div className="flex gap-4 items-center border-t mt-2 pt-2 border-zinc-900">
                    <div className="flex gap-1 badge-error shadow-sm items-center">
                      <span className="opacity-50">-2</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#000000"
                        className="fill-foreground w-4 h-4 opacity-50"
                      >
                        <path d="M240-840h440v520L400-40l-50-50q-7-7-11.5-19t-4.5-23v-14l44-174H120q-32 0-56-24t-24-56v-80q0-7 2-15t4-15l120-282q9-20 30-34t44-14Zm360 80H240L120-480v80h360l-54 220 174-174v-406Zm0 406v-406 406Zm80 34v-80h120v-360H680v-80h200v520H680Z" />
                      </svg>
                    </div>
                    <div className="flex gap-1 badge-success shadow-sm items-center">
                      <span className="opacity-50">+2</span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#000000"
                        className="fill-foreground w-4 h-4 opacity-50"
                      >
                        <path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* comment yourself */}
          <div className="sm:w-96 w-full bg-base-200 h-fit sm:sticky sm:top-20 p-4 flex flex-col gap-4 shrink-0 border-b border-l border-dashed">
            <p className="text-center font-bold">
              ! نظرتان را به اشتراک بگذارید
            </p>

            <Textarea
              style={{ minHeight: "120px" }}
              placeholder="نظر شما"
              dir="rtl"
            ></Textarea>
            <label
              className="text-xs text-justify opacity-50 leading-6"
              dir="rtl"
            >
              <span className="text-red-500">*&nbsp;</span>
              نظر شما پس از تایید و بررسی نمایش داده میشود؛ قوانین و مقررات را
              رعایت کنید.
            </label>

            <Button variant={"outline"}>ثبت نظر</Button>
          </div>
        </div>
      </section>
    </>
  );
}
