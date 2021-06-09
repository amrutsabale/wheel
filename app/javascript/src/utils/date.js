import dayjs from "dayjs";

export const formattedDate = date => dayjs(date).format("YYYY-MM-DD");
