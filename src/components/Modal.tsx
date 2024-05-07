import './Modal.css';

const Modal = ({ isOpen, close, children }) => {
	if (!isOpen) return null;

	return (
		<div className='modal'>
			<div className='modal-content'>
				{children}
				<button
					className='close-button'
					onClick={close}
				>
					Close
				</button>
			</div>
		</div>
	);
};

export default Modal;
