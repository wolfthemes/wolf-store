import { useState, useEffect } from 'react';

function pad(n) {
	return String(n).padStart(2, '0');
}

export default function CountdownTimer({ expiry }) {
	const target = expiry ? new Date(expiry).getTime() : null;

	const getTimeLeft = () => {
		if (!target) {
			return null;
		}
		const diff = target - Date.now();
		return diff > 0 ? diff : 0;
	};

	const [timeLeft, setTimeLeft] = useState(getTimeLeft);

	useEffect(() => {
		if (!target) {
			return;
		}
		const id = setInterval(() => {
			const diff = target - Date.now();
			setTimeLeft(diff > 0 ? diff : 0);
		}, 1000);
		return () => clearInterval(id);
	}, [target]);

	if (!target || timeLeft === null || timeLeft <= 0) {
		return null;
	}

	const totalSecs = Math.floor(timeLeft / 1000);
	const days = Math.floor(totalSecs / 86400);
	const hours = Math.floor((totalSecs % 86400) / 3600);
	const mins = Math.floor((totalSecs % 3600) / 60);
	const secs = totalSecs % 60;

	return (
		<div className='wolf-countdown'>
			<span className='wolf-countdown__label'>Offer expires in</span>
			<div className='wolf-countdown__units'>
				{days > 0 && (
					<span className='wolf-countdown__unit'>
						<strong>{days}</strong>d
					</span>
				)}
				<span className='wolf-countdown__unit'>
					<strong>{pad(hours)}</strong>h
				</span>
				<span className='wolf-countdown__unit'>
					<strong>{pad(mins)}</strong>m
				</span>
				<span className='wolf-countdown__unit'>
					<strong>{pad(secs)}</strong>s
				</span>
			</div>
		</div>
	);
}
