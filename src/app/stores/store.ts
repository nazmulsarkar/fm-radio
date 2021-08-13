import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import RadioStore from "./radioStore";

interface Store {
    commonStore: CommonStore;
    modalStore: ModalStore;
    radioStore: RadioStore;
}

export const store: Store = {
    commonStore: new CommonStore(),
    modalStore: new ModalStore(),
    radioStore: new RadioStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}