import { useState } from 'react';
import styles from './ContactForm.module.css';

const ContactForm = ({ bookingDetails, onSubmit, onBack }) => {
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');

	const now = new Date();
	const defaultDate = now.toLocaleDateString();
	const defaultTime = now.toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit({ name, phone, date: defaultDate, time: defaultTime });
	};

	return (
		<div className={styles.container}>
			<h2>Contact details</h2>
			<p>
				You are making a reservation for {bookingDetails.people} persons, on{' '}
				{bookingDetails.date} at {bookingDetails.time}
			</p>

			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.formGroup}>
					<label>Name</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</div>

				<div className={styles.formGroup}>
					<label>Phone number</label>
					<input
						type="tel"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						required
					/>
				</div>

				<div className={styles.buttonGroup}>
					<button
						type="button"
						onClick={onBack}
						className={styles.secondaryButton}
					>
						Back
					</button>
					<button type="submit" className={styles.primaryButton}>
						Confirm reservation
					</button>
				</div>
			</form>
		</div>
	);
};

export default ContactForm;
