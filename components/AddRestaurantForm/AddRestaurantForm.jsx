import useSWR, { mutate } from "swr";
import Form from "../Form/Form";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function AddRestaurantForm({ userData }) {
  const { data: dbData } = useSWR(
    `/api/user?email=${userData.user.email}`,
    fetcher
  );
  if (!dbData) {
    return;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const restaurantData = Object.fromEntries(formData);
    restaurantData.createdBy = dbData._id;
    restaurantData.date = new Date().toLocaleDateString("en-IN");

    const response = await fetch("/api/restaurants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(restaurantData),
    });

    if (response.ok) {
      mutate();
    }

    event.target.reset();
    event.target.restaurant.focus();
  }

  return <Form handleSubmit={handleSubmit} />;
}
