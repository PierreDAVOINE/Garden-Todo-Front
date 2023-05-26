import { X } from 'react-feather';
import './style.scss';
import { OneNotificationMessageType } from "../../../src/@types/notifications";


function NotificationPopUp({ notifications, setnotificationIsOn, notificationIsOn }: OneNotificationMessageType) {

    return (
        <section className={notificationIsOn ? 'wrapper-notification-box' : 'notif-off'}>
            <button className='close-all-button' onClick={() => setnotificationIsOn(!notificationIsOn)} >
                TOUT FERMER
                < X className="close-icon" />
            </button>


            {
                notifications.map((oneNotification) => (
                    <div className={oneNotification.isError ? 'box-notification error-message' : 'box-notification info-message'} key={oneNotification.message}>
                        <button onClick={() => setnotificationIsOn(!notificationIsOn)}>
                            <X className={notificationIsOn ? 'close-icon' : 'notif-off'} />
                        </button>
                        <h2>NOTIFICATION</h2>
                        <p>{oneNotification.message}</p>
                        <a href="/mon-espace-vert">Voir la to-do list</a>
                    </div>
                ))
            }

        </section >
    );
}
export default NotificationPopUp;