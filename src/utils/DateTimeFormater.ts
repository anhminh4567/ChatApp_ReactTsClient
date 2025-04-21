import moment from "moment";
import { DATE_TIME_FORMAT } from "@/config/dateTimeFormat";
export const DateTimeFormatter = {
  parseToDateTimeFormat: (serverTime: string): string => {
    return moment(serverTime).format(DATE_TIME_FORMAT);
  },
};
