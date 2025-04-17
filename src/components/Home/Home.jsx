import { useState } from 'react';
import Modal from '../Modal/Modal';
import styles from './Home.module.css';

const Home = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<main className={styles.main}>
			<div className={styles.title_group}>
				<button
					className={styles.bookButton}
					onClick={() => setIsModalOpen(true)}
				>
					Book a table
				</button>
			</div>

			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
		</main>
	);
};

export default Home;
