import { useTheme } from "next-themes";
import Appbar from "./components/appbar";
import CardTab from "./components/CardTab";
import axios from "axios";
import { parseCookies, setCookie } from "nookies";
import { SetterOrUpdater } from "recoil";

export default function Landing() {
  const { theme } = useTheme();

  return (
    <>
      <Appbar />
      <div className="flex flex-wrap gap-20 justify-center items-center p-10 sm:pt-5 sm:p-0">
        <div>
          <h1
            className={`text-center lg:text-left verdana font-sans text-5xl ${
              theme === "light" ? "text-gray-500" : ""
            }`}
          >
            notKeep.
          </h1>
          <br />
          <h1 className={`text-4xl text-center lg:w-3/4 lg:text-left`}>
            Where Forgetfulness Meets Organization.
          </h1>
        </div>
        <div className="flex justify-center lg:pt-24 lg:pl-10">
          <CardTab />
        </div>
      </div>
    </>
  );
}

export async function signin(
  email: string,
  password: string,
  router: any,
  setError: (arg0: boolean) => void,
  setMessage: (arg0: string) => void,
  setUser: SetterOrUpdater<string>
) {
  try {
    const loginData = await axios
      .post(
        `/api/signin`,
        { email, password },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then((res) => res.data);

    if (loginData.token && loginData.token != undefined) {
      setUser(loginData.email);
      setCookie(null, "token", loginData.token, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: "/",
      });
      let cookies = parseCookies();
      if (cookies.token) {
        router.push("/home");
      } else {
        setError(true);
        setMessage("An error occurred while creating the session.");
        setTimeout(() => {
          setError(false);
          setMessage("");
        }, 5000);
      }
    } else {
      setError(true);
      setMessage(loginData.error);
      setTimeout(() => {
        setError(false);
        setMessage("");
      }, 5000);
    }
  } catch (error: any) {
    setError(true);
    setMessage("Invalid Login");
    setTimeout(() => {
      setError(false);
      setMessage("");
    }, 5000);
  }
}

export async function signup(
  username: string,
  email: string,
  password: string,
  setSuccess: (arg0: boolean) => void,
  setError: (arg0: boolean) => void,
  setMessage: (arg0: string) => void
) {
  try {
    const signupData = await axios
      .post(
        `/api/signup`,
        { username, email, password },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then((res) => res.data);

    if (signupData && signupData.message != undefined) {
      setSuccess(true);
      setMessage(signupData.message);
      setTimeout(() => {
        setSuccess(false);
        setMessage("");
      }, 5000);
    } else {
      setError(true);
      setMessage(signupData.error);
      setTimeout(() => {
        setError(false);
        setMessage("");
      }, 5000);
    }
  } catch (error: any) {
    setError(true);
    if (error.response?.data?.error && error.response.data.error != undefined) {
      setMessage(error.response.data.error);
    } else {
      setMessage(error.message);
    }
    console.error(error);
    setTimeout(() => {
      setError(false);
      setMessage("");
    }, 5000);
  }
}
