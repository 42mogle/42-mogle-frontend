import create from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      _oauth: `${process.env.OAUTH_URL}`,
      _server: `${process.env.AWS_BACKEND_SERVER}`,
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

export default useStore;
