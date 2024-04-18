import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

type Restaurant = {
  id: string;
  name: string;
};

type Reservation = {
  arrivalTime: string;
  partySize: number;
  notes: string;
  name: string;
  phone: string;
  email: string;
  preferredContactMethod: "email" | "phone";
};

export type ReservationField = keyof Reservation;

export const useDataStore = defineStore("data", () => {
  const restaurant = ref<Restaurant>();
  const reservation = ref<Partial<Reservation>>({});

  const isReady = computed(() => {
    return !!restaurant.value;
  });

  const isValid = computed(() => {
    return [
      reservation.value.arrivalTime,
      reservation.value.partySize,
      reservation.value.name,
      reservation.value.phone || reservation.value.email,
    ].every(Boolean);
  });

  const init = async () => {
    const query = new URLSearchParams(window.location.search);
    const restaurantId = query.get("restaurantId");

    const { data } = await axios.get<Restaurant>(`restaurant/${restaurantId}`, {
      baseURL: import.meta.env.VITE_ROOT_API,
    });

    restaurant.value = data;
  };

  const submit = () => {
    if (!restaurant.value) throw new Error("Restaurant details not found");

    return axios.post(
      "reservation",
      {
        restaurantId: restaurant.value.id,
        ...reservation.value,
      },
      {
        baseURL: import.meta.env.VITE_ROOT_API,
      }
    );
  };

  const reset = () => {
    reservation.value = {};
  };

  return { restaurant, reservation, reset, isValid, submit, init, isReady };
});
