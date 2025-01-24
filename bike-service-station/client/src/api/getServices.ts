// api/getServices.ts
export const viewServices = async (): Promise<any[]> => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmExMDM3ZmQ3NGE3ZmMzMzE4NTI0ZmMiLCJfaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzMxNjAyODc5LCJleHAiOjE3MzI4OTg4Nzl9.IsPFu1bbsw4jf1pJbkJTqjgEpGkKOxPyAVkw6c0EBFceyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmExMDM3ZmQ3NGE3ZmMzMzE4NTI0ZmMiLCJfaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzM3NzMzODU0LCJleHAiOjE3MzkwMjk4NTR9.mbKziRIPhvElskpisQPM6Bao_APOLXfSkvOghEzcXc0eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmExMDM3ZmQ3NGE3ZmMzMzE4NTI0ZmMiLCJfaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzM3NzMzODU0LCJleHAiOjE3MzkwMjk4NTR9.mbKziRIPhvElskpisQPM6Bao_APOLXfSkvOghEzcXc0";
    try {
      const response = await fetch("http://localhost:5000/dashboard/services", {
        headers: { token },
      });
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching services:", error);
      return []; 
    }
  };
  