export const listingService = {
  async createListing(formData, userId) {
    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: userId,
        }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Failed to create listing:", error.message);
      throw error;
    }
  },
};
