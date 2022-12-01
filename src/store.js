import create from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      _intraId: "",
      setIntraId: (intraId) => set({ _intraId: intraId }),
      _isAttended: false,
      setIsAttended: () => set({ _isAttended: true }),
      _attendanceLog: [],
      setAttendanceLog: (attendanceLog) =>
        set({ _attendanceLog: attendanceLog }),
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
