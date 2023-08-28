import { AxiosError } from "axios";

export type DataCreateUpdate<T> = {
  submitData: (
      formData: any, 
      setConfirmLoading: (loading: boolean) => void,
      setOpen: (open: boolean) => void
  ) => Promise<any>;
  error: AxiosError | null;
}

export type DataGetEvents<HistoricalEvent> = {
  events: HistoricalEvent[] | null;
  refreshEvents: () => void;
};