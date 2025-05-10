import createMollieClient from "@mollie/api-client";

export const mollie = createMollieClient({
  apiKey: process.env.MOLLIE_TEST_KEY ?? "Test API key",
});
