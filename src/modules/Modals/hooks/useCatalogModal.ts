import { create } from "zustand";

interface CatalogModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useCatalogModal = create<CatalogModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useCatalogModal