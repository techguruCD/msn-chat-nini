import { toast } from 'react-toastify'

export default function toast1(content, type) {
    console.log(123)
    toast(content, {
        type,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
    })
}