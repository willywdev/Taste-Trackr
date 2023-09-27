import { mutate } from "swr";

import Form from "../Form/Form";

export default function AddRestaurantForm({ userData }) {
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const restaurantData = Object.fromEntries(formData);
    restaurantData.createdBy = userData.user.email;
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
