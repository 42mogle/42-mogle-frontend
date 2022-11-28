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
    }),
    {
      name: "user-data",
    }
  )
);

// (set) => ({
// 	_intraId: "",
// 	_server: "13.124.3.170:3000",
// 	setIntraId: (intraId) => set({ _intraId: intraId }),
//   }))
export default useStore;
