import create from "zustand"; // create로 zustand를 불러옵니다.

const useStore = create((set) => ({
  _intraId: "",
  _server: "13.124.3.170:3000",
  setIntraId: (intraId) => set({ _intraId: intraId }),
}));

export default useStore;
