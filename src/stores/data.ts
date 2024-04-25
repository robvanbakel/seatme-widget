import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { z } from "zod";

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

const Step1Schema = z.object({
  arrivalTime: z
    .string()
    .regex(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/, "Invalid date"),
  partySize: z.number().max(99),
  notes: z.string().optional(),
});

const Step2Schema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional(),
  phone: z
    .string()
    .refine(
      (val) => {
        return (
          val.split("").filter((char) => !isNaN(parseInt(char))).length >= 10
        );
      },
      {
        message: "Invalid phone number",
      }
    )
    .optional(),
  preferredContactMethod: z.enum(["email", "phone"]),
});

export const useDataStore = defineStore("data", () => {
  const restaurant = ref<Restaurant>();
  const reservation = ref<Partial<Reservation>>({});

  const isReady = computed(() => !!restaurant.value);

  const isStep1Valid = computed(() => {
    return Step1Schema.safeParse(reservation.value).success;
  });

  const isStep2Valid = computed(() => {
    return Step2Schema.safeParse(reservation.value).success;
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

  return {
    restaurant,
    reservation,
    reset,
    isStep1Valid,
    isStep2Valid,
    submit,
    init,
    isReady,
  };
});
