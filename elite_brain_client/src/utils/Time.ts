import dayjs from 'dayjs';

export const getCurrentTimeStr = () => {
    const date = new Date();
    const hours = date.getHours();
    const hoursStr = hours < 10 ? `0${hours}` : hours;
    const minutes = date.getMinutes();
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
    return `${hoursStr}:${minutesStr}`;
};

export const hourMinuteToTime = (hour: string, minute: string) => {
    return dayjs().hour(Number(hour)).minute(Number(minute));
};
