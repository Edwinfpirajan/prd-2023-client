import { toast } from "react-toastify"
// import Icon from "../components/UI/Icon/Icon"

const ToastCall = (message = 'Toast', theme = 'info', key) => {
    const toastType = () => {
        switch (theme) {
            case 'success':
                return 'success'

            case 'info':
                return 'info'

            case 'warning':
                return 'warn'

            case 'danger':
                return 'error'

            default:
                return 'info'
        }
    }

    const iconType = () => {
        switch (theme) {
            case 'success':
                return 'check'

            case 'info':
                return 'info'

            case 'warning':
                return 'flag'

            case 'danger':
                return 'ban'

            default:
                return 'check'
        }
    }

    return toast[toastType()]((<strong>{message}</strong>), {
        className: 'light',
        toastId: key || message,
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        // icon: () => <Icon icon={iconType()} size={2} theme={theme} style="be" />
    })
}

export default ToastCall
