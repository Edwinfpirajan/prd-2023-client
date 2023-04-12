import styles from './Modal.module.scss'
import { HiXCircle } from 'react-icons/hi2'
import { createElement, Fragment, useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Dismissible } from 'react-dismissible'

const Modal = ({ content, options: {
    closeButton = false,
    manualClose = true,
    darkMode = false,
    discardChangesWarning = false,
    showBackground = true,
    props = {},
    ...args
} }) => {
    const [isOpen, setIsOpen] = useState(true)

    const close = useCallback(() => setIsOpen(false), [isOpen])

    const closeWithWarning = useCallback(() => confirm('Se perderán los cambios que hayas realizado, ¿seguro qué deseas salir?') && close(), [discardChangesWarning])

    return <AnimatePresence >
        { isOpen && (<Fragment>
            <Dismissible
                escape={ manualClose }
                onDismiss={ () => {
                    setIsOpen(false)
                } }
            >
                <motion.div
                    initial={ { opacity: 0 } }
                    animate={ { opacity: 1 } }
                    exit={ { opacity: 0 } }
                    className={ styles.backdrop }
                    style={ { cursor: closeButton || !manualClose ? 'auto' : 'pointer' } }
                    onClick={ () => !closeButton && manualClose && discardChangesWarning
                        ? closeWithWarning()
                        : !closeButton && manualClose
                            ? close()
                            : null }
                    key="backdrop"
                />

                <motion.div
                    initial={ { x: '50%', y: '-50%', scale: 0 } }
                    animate={ { scale: 1, transition: { type: "spring", bounce: 0.6 } } }
                    exit={ { opacity: 0 } }
                    className={ styles.modal }
                    data-isOpen={ isOpen }
                    key="modal"
                    { ...args }
                >
                    { createElement(content, { close, closeWithWarning, ...props }) }
                </motion.div>

                { closeButton && <motion.button
                    initial={ { scale: 0 } }
                    animate={ { scale: 1 } }
                    exit={ { scale: 0 } }
                    whileHover={ { scale: 1.2 } }
                    whileTap={ { scale: 1.5 } }
                    transition={ { type: "spring", bounce: 0.6 } }
                    key="close"

                    className={ styles.close }
                    onClick={ () => discardChangesWarning ? closeWithWarning() : close() }
                >
                    <HiXCircle />
                </motion.button> }
            </Dismissible>
        </Fragment>) }
    </AnimatePresence >
}

export default Modal