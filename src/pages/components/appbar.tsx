import { useTheme } from "next-themes";
import ModeToggle from "./modetoggle";
import Search from "./searchbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRecoilState } from "recoil";
import { sidebarState, userState } from "../api/_atoms";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies } from "nookies";

export default function Appbar() {
  const { theme } = useTheme();
  let router = useRouter();
  let path = router.pathname;
  const token = parseCookies().token;

  const handleRedirecting = () => {
    if (token && path === "/") {
      router.push("/home");
    }
    if (!token && path != "/") {
      router.push("/");
    }
  };

  return (
    <div>
      <div
        className={`flex justify-between items-center p-4 pl-7 border-b ${
          theme === "light"
            ? "border-neutral-300"
            : theme === "dark"
            ? "border-neutral-800"
            : "border-none"
        }`}
      >
        <KeepLogo handleRedirecting={handleRedirecting} />
        <Search path={path} />

        <div className="flex gap-3">
          <ModeToggle />
          <AvatarLogo path={path} />
        </div>
      </div>
    </div>
  );
}

function AvatarLogo(props: { path: any }) {
  let path = props.path;
  const [user, setUser] = useRecoilState(userState);
  let router = useRouter();
  return (
    <div className={`${path === "/" ? "hidden" : ""}`}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>{user}</DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              destroyCookie(null, "token");
              setUser("");
              router.push("/");
            }}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function KeepLogo(props: { handleRedirecting: () => void }) {
  const { theme } = useTheme();
  const [sidebar, setSidebar] = useRecoilState(sidebarState);
  let router = useRouter();
  let path = router.pathname;
  return (
    <div className="flex gap-3 items-center">
      <button
        onClick={() => {
          sidebar ? setSidebar(false) : setSidebar(true);
        }}
      >
        <svg
          className={` ${path === "/" ? "hidden" : ""}`}
          fill="#6B6B6B"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="20"
          height="20"
          viewBox="0 0 50 50"
        >
          <path d="M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z"></path>
        </svg>
      </button>
      <button
        onClick={() => {
          props.handleRedirecting();
        }}
        className="flex items-center gap-2"
      >
        <img
          width={"40"}
          src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
          alt=""
        />
        <h3
          className={` verdana font-sans text-xl ${
            theme === "light" ? "text-gray-500" : ""
          }`}
        >
          not-Keep
        </h3>
      </button>
    </div>
  );
}
