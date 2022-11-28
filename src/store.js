import create from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      _oauth:
        "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-ffa1eb7dfe8ca1260f9d27ba33051536d23c76cd1ab09f489cb233c7e8e5e065&redirect_uri=https%3A%2F%2F42mogle.com%2Fauth&response_type=code",
      _server: "https://42mogle.com:3000",
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
