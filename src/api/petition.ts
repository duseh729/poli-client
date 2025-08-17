import API from "./axios";

export const initPetition = async (roomId: number, petitionRaw: any) => {
  try {
    const res = await API.put(`/chat/petition/${roomId}`, { petitionRaw });
    return res.data;
  } catch (err) {
    console.error("initPetition error:", err);
    throw err;
  }
};

export const getPetition = async (roomId: number) => {
  try {
    const res = await API.get(`/chat/petition/${roomId}`);
    let data = res.data;

    // 응답이 string이라면 JSON.parse
    if (typeof data.petitionJson === "string") {
      try {
        data = JSON.parse(data.petitionJson);
      } catch (e) {
        console.error("JSON parse error:", e);
        throw e;
      }
    }

    return data;
  } catch (err) {
    console.error("getPetition error:", err);
    throw err;
  }
};

