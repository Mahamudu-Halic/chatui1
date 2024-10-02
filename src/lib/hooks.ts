import { AppDispatch, RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const convertBase64 = (file: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.onerror = (error) => reject(error);
  });
};

export const getDate = (): string => {
  // const currentDate = new Date();
  // const utcString = currentDate.toUTCString().split(" ");

  // const day = utcString[1];
  // const month = utcString[2];
  // const year = utcString[3];

  // return `${day} ${month} ${year}`;

  const date = new Date(); // Current date
  const options = {
    day: "numeric" as const,
    month: "short" as const,
    year: "numeric" as const,
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  return formattedDate;
};

export const getTime = (): string => {
  const date = new Date();
  const options = {
    hour: "numeric" as const,
    minute: "numeric" as const,
    hour12: true,
  };
  const formattedTime = new Intl.DateTimeFormat("en-US", options).format(date);
  return formattedTime.toLowerCase();
};
