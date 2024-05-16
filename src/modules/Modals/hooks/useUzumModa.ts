import { create } from "zustand";

interface UzumModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useUzumModal = create<UzumModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useUzumModal