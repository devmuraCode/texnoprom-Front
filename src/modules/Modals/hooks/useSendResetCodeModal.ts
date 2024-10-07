import { create } from "zustand";

interface ResetModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useSendResetCodeModal = create<ResetModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useSendResetCodeModal