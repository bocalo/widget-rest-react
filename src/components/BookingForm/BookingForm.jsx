import { useEffect, useRef, useState } from 'react';
import styles from './BookingForm.module.css';

const BookingForm = ({ initialValues, onSubmit }) => {
	const [people, setPeople] = useState(initialValues.people);
	const [date, setDate] = useState(initialValues.date || '');
	const [time, setTime] = useState(initialValues.time || '');
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef(null);

	// Закрытие dropdown при клике вне его области
	useEffect(() => {
		const handleClickOutside = (e) => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
				setIsDropdownOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit({ people, date, time });
	};

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const handlePeopleSelect = (num) => {
		setPeople(num);
		setIsDropdownOpen(false);
	};

	return (
		<div className={styles.bookingForm}>
			<h2>Book a table</h2>
			{/* <p>This is where you'll add the details of your booking</p> */}

			<form onSubmit={handleSubmit} className={styles.form}>
				{/* Заголовок с выбранным количеством */}
				<div className={styles.peopleBlock} ref={dropdownRef}>
					<div
						className={styles.peopleHeader}
						onClick={toggleDropdown}
						style={{ cursor: 'pointer' }}
					>
						<span className={styles.peopleLabel}>
							{' '}
							People {isDropdownOpen ? '▲' : '▼'}
						</span>
						<span className={styles.peopleValue}>
							{people} person{people !== 1 ? 's' : ''}
						</span>
					</div>
					{/* Выпадающий список */}
					{isDropdownOpen && (
						<div className={styles.peopleDropdown}>
							{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
								<div
									key={num}
									className={`${styles.dropdownItem} ${
										people === num ? styles.selected : ''
									}`}
									onClick={() => handlePeopleSelect(num)}
								>
									{num}
								</div>
							))}
						</div>
					)}
					{/* Кнопки выбора количества */}
					{/* <div className={styles.peopleSelector}>
						{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
							<button
								key={num}
								type="button"
								className={`${styles.peopleButton} ${
									people === num ? styles.selected : ''
								}`}
								onClick={() => setPeople(num)}
							>
								{num}
							</button>
						))}
					</div> */}
				</div>

				<div className={styles.formGroup}>
					<label className={styles.labelDate}>Date</label>
					<input
						className={styles.inputDate}
						type="date"
						value={date}
						onChange={(e) => setDate(e.target.value)}
						required
					/>
				</div>

				<div className={styles.formGroup}>
					<label className={styles.labelTime}>Time</label>
					<input
						className={styles.inputTime}
						type="time"
						value={time}
						onChange={(e) => setTime(e.target.value)}
						required
					/>
				</div>

				<div className={styles.buttonGroup}>
					{/* <button
						type="button"
						onClick={onClose}
						className={styles.secondaryButton}
					>
						Cancel
					</button> */}
					<button type="submit" className={styles.primaryButton}>
						Book now
					</button>
				</div>
			</form>
		</div>
	);
};

export default BookingForm;
