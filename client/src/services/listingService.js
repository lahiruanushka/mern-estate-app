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
      throw error; // Re-throw the error for further handling
    }
  },
  async getUserListings(userId) {
    try {
      const response = await fetch(`/api/listings/user/${userId}`);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch user listings:", error);
      throw error;
    }
  },
  async deleteListing(listingId) {
    try {
      const response = await fetch(`/api/listings/${listingId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to delete listing:", error);
      throw error;
    }
  },
  async getSingleListing(listingId) {
    try {
      const response = await fetch(`/api/listings/${listingId}`);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch single listing:", error);
      throw error;
    }
  },
  async updateListing(formData, listingId) {
    try {
      const res = await fetch(`/api/listings/${listingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Failed to update listing:", error.message);
      throw error;
    }
  },
  async getAllListings(searchQuery) {
    try {

      const response = await fetch(`/api/listings/?${searchQuery}`);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetchlistings:", error);
      throw error;
    }
  },
};
