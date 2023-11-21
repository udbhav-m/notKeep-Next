import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  emailState,
  messageState,
  errorState,
  passwordState,
  usernameState,
  successState,
  userState,
} from "../api/_atoms";
import { signin, signup } from "..";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";

export default function CardTab() {
  const { theme } = useTheme();
  const setUsername = useSetRecoilState(usernameState);
  const setEmail = useSetRecoilState(emailState);
  const setPassword = useSetRecoilState(passwordState);
  const setUser = useSetRecoilState(userState);

  const username = useRecoilValue(usernameState);
  const email = useRecoilValue(emailState);
  const password = useRecoilValue(passwordState);
  const [error, setError] = useRecoilState(errorState);
  const [success, setSuccess] = useRecoilState(successState);
  const [message, setMessage] = useRecoilState(messageState);
  const router = useRouter();
  return (
      <Tabs defaultValue="signin" className="w-[340px] sm:w-[400px]">
        <TabsList className={`grid w-full grid-cols-2 `}>
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="signin" className="h-[410px]">
          <Card>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  id="emailL"
                  placeholder="lol@gmail.com"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="passwordL"
                  placeholder="password"
                />
              </div>
              <CardDescription
                className={` hidden w-fit rounded p-2 mb-0 text-white ${
                  error ? "bg-red-400" : success ? "bg-green-400" : ""
                }`}
              >
                {message}
              </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                onClick={() =>
                  signin(email, password, router, setError, setMessage, setUser)
                }
              >
                Login
              </Button>
              <CardDescription
                className={` w-fit rounded p-2 mb-0 text-white ${
                  error ? "bg-red-400" : success ? "bg-green-400" : ""
                }`}
              >
                {message}
              </CardDescription>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="signup" className="h-[410px]">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input
                  onChange={(e) => setUsername(e.target.value)}
                  id="usernameS"
                  placeholder="thelol"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  placeholder="thelol@gmail.com"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  id="passwordS"
                  type="password"
                  placeholder="password"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                onClick={() => {
                  signup(
                    username,
                    email,
                    password,
                    setSuccess,
                    setError,
                    setMessage
                  );
                }}
              >
                Sign Up
              </Button>
              <CardDescription
                className={` w-fit rounded p-2 text-white ${
                  error ? "bg-red-400" : success ? "bg-green-400" : ""
                }`}
              >
                {message}
              </CardDescription>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
  );
}
