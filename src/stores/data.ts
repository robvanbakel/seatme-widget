import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { z } from "zod";

type Restaurant = {
  id: string;
  name: string;
};

const ReservationSchema = z.object({
  arrivalTime: z
    .string()
    .regex(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/, "Invalid date"),
  partySize: z.number().max(99),
  notes: z.string().optional(),
  name: z.string().min(1),
  email: z.union([z.string().email(), z.literal("")]).optional(),
  phone: z
    .union([
      z.string().refine(
        (val) => {
          return (
            val.split("").filter((char) => !isNaN(parseInt(char))).length >= 10
          );
        },
        {
          message: "Invalid phone number",
        }
      ),
      z.literal(""),
    ])
    .optional(),
  preferredContactMethod: z.enum(["email", "phone"]),
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
    const fields: ReservationField[] = [
      "name",
      "email",
      "phone",
      "preferredContactMethod",
    ];

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
    fieldErrors,
    isStep1Valid,
    isStep2Valid,
    submit,
    init,
    isReady,
  };
});
