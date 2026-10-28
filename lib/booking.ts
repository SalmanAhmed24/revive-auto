/**
 * Tekmetric online booking (modal).
 * Shop ID from Tekmetric's embed code; override per environment with NEXT_PUBLIC_TEKMETRIC_SHOP_ID.
 */
export const TEKMETRIC_SHOP_ID = process.env.NEXT_PUBLIC_TEKMETRIC_SHOP_ID || 'e591677c-0cc3-4dfa-bd5f-01c4db4fdc43';

/** Tekmetric's standalone booking page: the no-JavaScript fallback for every "Schedule Appointment" link. */
export const BOOKING_URL = `https://booking.tekmetric.com/?shop=${TEKMETRIC_SHOP_ID}`;
