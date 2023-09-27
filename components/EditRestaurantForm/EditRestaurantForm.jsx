import { useRouter } from "next/router";
import useSWR from "swr";
import Form from "../Form/Form";

export default function EditRestaurantForm({ restaurantData, id }) {
  const { mutate } = useSWR();
  const router = useRouter();
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newRestaurantData = Object.fromEntries(formData);
    newRestaurantData.createdBy = restaurantData.createdBy;
    newRestaurantData.date = new Date().toLocaleDateString("en-IN");
    console.log(newRestaurantData);

    const response = await fetch(`/api/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRestaurantData),
    });

    if (response.ok) {
      mutate();
      router.push("/restaurants");
    }
  }

  return <Form placeholders={restaurantData} handleSubmit={handleSubmit} />;
}
