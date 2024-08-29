import {create} from "zustand";

type HeartModelState = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
};

export const useHeartModel = create<HeartModelState> ((set)=>({
    isOpen: false,
    open: () => set({isOpen: true}),
    close: () => set({isOpen: false})
}))