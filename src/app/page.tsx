"use client";
import { Button } from "@/components/styled/button.styled.component";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="h-[100vh] w-full flex flex-col items-center justify-center gap-3">
      <Button onClick={() => router.push("/dashboard")} variant="standard">Get Started</Button>
      <Button onClick={() => router.push("/auth/sign-in")} variant="secondary">Sign-in</Button>
      <Button onClick={() => router.push("/auth/register")} variant="primary">Register</Button>
    </div>
  );
}
