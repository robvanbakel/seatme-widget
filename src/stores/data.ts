import { ref } from "vue";
import { defineStore } from "pinia";

type Restaurant = {
  name: string;
};

type Reservation = {
  arrivalTime: string;
  partySize: number;
  notes: string;
  name: string;
  phone: string;
  email: string;
  prefferedContactMethod: "email" | "phone";
};

export type ReservationField = keyof Reservation;

export const useDataStore = defineStore("data", () => {
  const restaurant = ref<Restaurant>({
    name: "Restaurant #1",
  });

  const reservation = ref<Partial<Reservation>>({});

  const reset = () => {
    reservation.value = {};
  };

  return { restaurant, reservation, reset };
});
