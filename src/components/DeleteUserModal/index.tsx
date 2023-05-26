import { AlertCircle, User, X, XCircle } from "react-feather";
import './style.scss';
import { HandleDeletemodalProps } from "../../../src/@types/modal";

function ModaleDeleteUser({ handleDeleteUser, setIsDeleteModalOpen }: HandleDeletemodalProps) {



    return (
        <div className="modale-delete-user">
            <div className="content-modale">
                <button className="close-btn" onClick={() => setIsDeleteModalOpen(false)} title="fermer la fenêtre"><X /></button>
                <div>
                    <h1><AlertCircle /> Suppression de compte</h1>
                    <p>Êtes-vous sûr(e) de vouloir supprimer votre compte définitivement ?</p>
                    <div className="btn-wrapper">
                        <button className="yes" onClick={handleDeleteUser}><XCircle />SUPPRIMER MON COMPTE</button>
                        <button className="no" onClick={() => setIsDeleteModalOpen(false)}><User />CONSERVER MON COMPTE</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ModaleDeleteUser;