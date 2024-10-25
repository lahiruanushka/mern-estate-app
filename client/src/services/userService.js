export const updateUser = async (userId, userData) => {
  try {
    const response = await fetch(`/api/user/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update user");
    }

    return await response.json(); // Return the updated user data
  } catch (error) {
    console.error("Error updating user:", error);
    throw error; // Rethrow error for further handling
  }
};
