import { AxiosError } from "axios";

export type DataGetEvents<HistoricalEvent> = {
  events: HistoricalEvent[] | null;
  refreshEvents: () => void;
};


export type DataPost<T> = {
    postData: (
        formData: any, 
        setConfirmLoading: (loading: boolean) => void,
        setOpen: (open: boolean) => void
    ) => Promise<any>;
    error: AxiosError | null;
}