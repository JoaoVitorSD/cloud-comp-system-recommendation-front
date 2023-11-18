import { toast } from "react-toastify";

export default function showSucessToast(message:string){
    toast.success(message, {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}