"use client";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  return (
    <>
      <main className="container m-auto">
        <h1 className="text-4xl text-blue-600 my-4">Page not found</h1>
        <hr />
        <p className="text-base mt-4">
          The page you are trying to found, doesnt exists
        </p>

        <button onClick={() => router.back()}>Go back</button>
      </main>
    </>
  );
};

export default NotFound;
