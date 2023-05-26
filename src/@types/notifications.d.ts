export interface NotificationsInfo {
    message: string,
    isError: boolean
}[]

export interface OneNotificationMessageType {
    notifications: NotificationsInfo[];
    setNotifications: (NotificationsInfo: NotificationsInfo[]) => void;
    setnotificationIsOn: (boolean) => void;
    notificationIsOn: boolean;
}


