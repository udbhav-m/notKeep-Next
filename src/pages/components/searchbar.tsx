import { useTheme } from "next-themes";

export default function Search(props: { path: any }) {
  const { theme } = useTheme();
  let path = props.path;
  return (
    <>
      <input
        className={`w-8/12 h-15 p-2 shadow rounded-lg border-color focus:outline-none focus:bg-white  ${
          theme === "dark"
            ? "bg-gray-700"
            : theme === "light"
            ? "bg-neutral-100"
            : "bg-transparent"
        } ${path === "/" ? "hidden" : "hidden sm:block"}`}
        type="text"
        placeholder="Search todos"
      />
    </>
  );
}
