import Complaint, { ComplaintData } from "@/types/petition";
import { create } from "zustand";

type ComplaintStore = {
  complaint: Complaint | null;
  setComplaint: (complaint: Complaint) => void;
  updateComplaint: (data: Partial<ComplaintData>) => void;
};

export const useComplaintStore = create<ComplaintStore>((set, get) => ({
  complaint: null,
  setComplaint: (complaint) => set({ complaint }),
  updateComplaint: (data) => {
    const current = get().complaint;
    if (current) {
      current.update(data);
      set({ complaint: new Complaint(current) }); // 새 인스턴스로 갱신
    }
  },
}));
