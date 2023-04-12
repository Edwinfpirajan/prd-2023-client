import { createRoot } from 'react-dom/client'
import Modal from "./Modal"

const createModal = (content: any, options = {}) => {
    if (!window.modalContainer) {
        window.modalContainer = createRoot(document.getElementById('modal-container'))
    }

    window.modalContainer.render(<Modal key={ Math.random() } content={ content } options={ options } />)
}
export default createModal