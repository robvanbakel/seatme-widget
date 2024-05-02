import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { z } from "zod";

type Restaurant = {
  id: string;
  name: string;
};

const ReservationSchema = z.object({
  restaurantId: z.string().uuid(),
  arrivalTime: z
    .string()
    .regex(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/, "Invalid date"),
  partySize: z.number().min(1).max(99),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  notes: z.string().optional(),
});

type Reservation = z.infer<typeof ReservationSchema>;
export type ReservationField = keyof Reservation;

export const useDataStore = defineStore("data", () => {
  const restaurant = ref<Restaurant>();
  const reservation = ref<Partial<Reservation>>({});

  const isReady = computed(() => !!restaurant.value);

  const fieldErrors = computed(() => {
    return (
      ReservationSchema.safeParse(reservation.value).error?.formErrors
        .fieldErrors ?? {}
    );
  });

  const isStep1Valid = computed(() => {
    const fields: ReservationField[] = ["arrivalTime", "partySize", "notes"];
    return fields.every((field) => !fieldErrors.value[field]?.length);
  });

  const isStep2Valid = computed(() => {
    const fields: ReservationField[] = ["name", "email", "phone"];
    return fields.every((field) => !fieldErrors.value[field]?.length);
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
    const parsedData = ReservationSchema.parse({
      restaurantId: restaurant.value?.id,
      ...reservation.value,
    });

    return axios.post("reservation", parsedData, {
      baseURL: import.meta.env.VITE_ROOT_API,
    });
  };

  const reset = () => {
    reservation.value = {};
  };

  return {
    restaurant,
    reservation,
    reset,
    fieldErrors,
    isStep1Valid,
    isStep2Valid,
    submit,
    init,
    isReady,
  };
});
