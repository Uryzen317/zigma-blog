import { Badge } from "./ui/badge";

type CommentProps = {
  user: {
    username: string;
    roles: Array<number>;
  };
  description: string;
  likes: number;
  dislikes: number;
  createdAt: string;
};

export function getCreationTime(createdAt: string) {
  const diviation =
    (new Date().getTime() - new Date(createdAt).getTime()) / 86_400_000;
  let creationTime = "به تازگی";
  if (diviation / 86_400_000 > 1)
    creationTime = `${Math.round(diviation)} روز پیش`;

  return creationTime;
}

export default function Comment({
  user,
  description,
  likes,
  dislikes,
  createdAt,
}: CommentProps) {
  return (
    <div className="card bg-base-200 min-h-24 border border-base-300 shadow-sm p-4 pb-2">
      <div className="flex justify-between items-start">
        <div className="flex gap-2 items-center sm:justify-start justify-center">
          <span dir="rtl" className="text-sm opacity-75">
            {getCreationTime(createdAt)}
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
            <p className="text-sm">{user.username}</p>
            {user.roles.includes(1) ? (
              <Badge className="" variant={"outline"}>
                نویسنده{" "}
              </Badge>
            ) : null}
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
        {description}
      </p>

      <div className="flex gap-4 items-center border-t mt-2 pt-2 border-zinc-900">
        <div className="flex gap-1 badge-error shadow-sm items-center">
          <span className="opacity-50">-{dislikes}</span>
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
          <span className="opacity-50">+{likes}</span>

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
  );
}
