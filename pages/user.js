import { useRouter } from "next/router";
import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function UserPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(id ? `/api/user?id=${id}` : null, fetcher);

  if (!id) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>Name: {data.name}</p>
      <p>Email: {data.email}</p>
      <img src={data.image} alt="Avatar" />
    </div>
  );
}
