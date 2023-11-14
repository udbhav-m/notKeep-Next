import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const isDarkTheme = theme === "dark";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          onClick={() =>
            theme === "light" ? setTheme("dark") : setTheme("light")
          }
          variant="ghost"
          size="icon"
          className={`${isDarkTheme ? "button-dark" : "button-light"} bg-none`}
        >
          <Sun
            className={`h-[1.2rem] w-[1.2rem] transition-all dark:-rotate-90 dark:scale-0  ${
              !isDarkTheme ? "hidden" : ""
            }`}
          />
          <Moon
            className={`absolute h-[1.2rem] w-[1.2rem] transition-all dark:rotate-0 dark:scale-100 ${
              isDarkTheme ? "hidden" : ""
            }`}
          />
        </Button>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}
