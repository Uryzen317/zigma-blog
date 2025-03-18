import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

export default function PostCardSkeleton() {
  return (
    <div className="border flex h-36 rounded-md overflow-hidden shadow-md grow bg-card">
      {/* details */}
      <div className="grow p-4 flex flex-col h-full justify-between">
        {/* title */}
        <Skeleton className="h-6 w-72 place-self-end"></Skeleton>

        {/* author | read time */}
        <Skeleton className="h-6 w-72 place-self-end"></Skeleton>

        {/* controllers | statistics */}
        <div className="flex justify-between items-center">
          <Skeleton className="h-9 w-32"></Skeleton>

          <Skeleton className="h-5 w-44"></Skeleton>
        </div>
      </div>

      {/* image */}
      <Skeleton className="h-full aspect-video"></Skeleton>
    </div>
  );
}
