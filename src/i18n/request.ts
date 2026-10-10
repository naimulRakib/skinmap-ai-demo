import { getRequestConfig } from "next-intl/server";

/**
 * next-intl request config.
 * Locale is fixed to 'bn' for the demo.
 * All messages come from src/i18n/messages/bn.json.
 */
export default getRequestConfig(async () => {
  const locale = "bn";
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
    timeZone: "Asia/Dhaka",
    now: new Date(),
  };
});
