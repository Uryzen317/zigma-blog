import DividerPrimary from "@/components/divider-primary";
import Navbar from "@/components/navbar";
import NavbarSkeleton from "@/components/navbar-skeleton";
import PostCard from "@/components/post-card";
import PostCardSkeleton from "@/components/post-card-skeleton";

export default function Home() {
  return (
    <>
      <section className=" flex justify-between">
        {/* <Navbar /> */}
        <NavbarSkeleton />

        {/* main page */}
        <div className="pb-4 border-l border-dashed">
          {Array(5)
            .fill(1)
            .map(() => (
              <>
                <DividerPrimary />

                <div className="grow flex flex-wrap justify-end gap-4 px-4 mb-6">
                  {Array(4)
                    .fill(1)
                    .map(() => (
                      // <PostCard />
                      <PostCardSkeleton />
                    ))}
                </div>
              </>
            ))}
        </div>
      </section>
    </>
  );
}
