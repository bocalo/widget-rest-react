import styles from './SuccessScreen.module.css';

const SuccessScreen = ({ onClose, onNewBooking }) => {
	return (
		<div className={styles.container}>
			<h3>Reservation is confirmed!</h3>
			<button onClick={onClose}>Close</button>
			<button onClick={onNewBooking}>New Booking</button>
		</div>
	);
};

export default SuccessScreen;
