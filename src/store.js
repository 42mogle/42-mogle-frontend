import create from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      _intraId: "",
      setIntraId: (intraId) => set({ _intraId: intraId }),
      _attendanceCount: 0,
      setAttendanceCount: (attendanceCount) => set({ _attendanceCount: attendanceCount }),
      increaseAttendanceCount: (prev) => set({ _attendanceCount: prev + 1 }),
      _photoUrl: "",
      setPhotoUrl: (photoUrl) => set({ _photoUrl: photoUrl }),
      _summary: {},
      setSummary: (summary) => set({ _summary: summary}),
    }),
    {
      name: "user-data",
    }
  )
);

export default useStore;
