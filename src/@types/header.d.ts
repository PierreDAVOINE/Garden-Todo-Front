import { NotificationsInfo } from "./notifications";
export interface HeaderProps {
    isLogged: boolean;
    setIsLoginModalOpen: (value: boolean) => void;
    setIsSignup: (value: boolean) => void;
    notifications: {
        message: string,
        isError: boolean
    }[];
    setNotifications: (NotificationsInfo: NotificationsInfo[]) => void;
    setIsLogged: (value: boolean) => void;
    setnotificationIsOn: (boolean) => void;
    notificationIsOn: boolean;
}