import { Dialog, DialogPanel, CloseButton } from '@headlessui/react';
import { useState } from 'react';
import BookingForm from '../BookingForm/BookingForm';
import ContactForm from '../ContactForm/ContactForm';
import SuccessScreen from '../SuccessScreen/SuccessScreen';
import styles from './Modal.module.css';

const Modal = ({ isOpen, onClose }) => {
	const [step, setStep] = useState(1);
	const [bookingDetails, setBookingDetails] = useState({
		people: 2,
		date: '',
		time: '',
		name: '',
		phone: '',
	});

	const handleBookingSubmit = (details) => {
		setBookingDetails((prev) => ({ ...prev, ...details }));
		setStep(2);
	};

	const handleContactSubmit = (contactDetails) => {
		const finalDetails = { ...bookingDetails, ...contactDetails };
		console.log('Booking details', finalDetails);

		setStep(3);

		setTimeout(() => {
			onClose();
			setStep(1);
		}, 3000);
		// Здесь можно добавить сброс состояния или другие действия после бронирования
		setBookingDetails({
			people: 2,
			date: '',
			time: '',
			name: '',
			phone: '',
		});
		//onClose();
	};

	return (
		<Dialog open={isOpen} onClose={onClose} className={styles.dialog}>
			<div className={styles.overlay} aria-hidden="true" />
			<CloseButton onClose={onClose} className={styles.closeBtn}>
				<svg className={styles.closeIconModal} viewBox="0 0 20 20" fill="none">
					<path
						stroke="#fff"
						strokeLinecap="round"
						strokeWidth="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</CloseButton>
			<div className={styles.panelContainer}>
				<DialogPanel className={styles.panel}>
					{step === 1 && (
						<BookingForm
							initialValues={bookingDetails}
							onSubmit={handleBookingSubmit}
							onClose={onClose}
						/>
					)}
					{step === 2 && (
						<ContactForm
							bookingDetails={bookingDetails}
							onSubmit={handleContactSubmit}
							onBack={() => setStep(1)}
						/>
					)}
					{step === 3 && (
						<SuccessScreen onClose={onClose} onNewBooking={() => setStep(1)} />
					)}
				</DialogPanel>
			</div>
		</Dialog>
	);
};

export default Modal;
