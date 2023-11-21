import { useTheme } from "next-themes";
import { useRecoilState } from "recoil";
import { queryState } from "@/pages/api/_atoms";

export default function Search(props: { path: any }) {
  const { theme } = useTheme();
  const [query, setQuery] = useRecoilState(queryState);
  let path = props.path;
  return (
    <>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={` h-15 p-2 color-black w-2/5 sm:w-8/12 shadow rounded-lg border-color focus:outline-none  ${
          theme === "dark"
            ? "bg-gray-800 focus:bg-gray-700"
            : theme === "light"
            ? "bg-neutral-100 focus:bg-white"
            : "bg-transparent"
        } ${path === "/" ? "hidden" : ""}`}
        type="text"
        placeholder="Search todos"
      />
    </>
  );
}
