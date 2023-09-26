import Landing from "@/components/Landing/Landing";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home({ isLoggedIn }) {
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/restaurants");
    }
  }, []);

  return (
    <main>
      <Landing />
    </main>
  );
}
