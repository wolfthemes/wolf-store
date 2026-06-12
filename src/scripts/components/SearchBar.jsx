import { useState, useEffect, useRef } from 'react';

export default function SearchBar({ externalValue, onSearch }) {
	const [inputValue, setInputValue] = useState(externalValue || '');
	const timerRef = useRef(null);

	useEffect(() => {
		if (externalValue === '' && inputValue !== '') {
			setInputValue('');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [externalValue]);

	const handleChange = e => {
		const v = e.target.value;
		setInputValue(v);
		clearTimeout(timerRef.current);
		timerRef.current = setTimeout(() => onSearch(v), 300);
	};

	const handleClear = () => {
		setInputValue('');
		clearTimeout(timerRef.current);
		onSearch('');
	};

	return (
		<div className='wolf-store-search'>
			<input
				type='search'
				className='wolf-store-search__input'
				placeholder='Search themes…'
				value={inputValue}
				onChange={handleChange}
				aria-label='Search themes'
			/>
			{inputValue && (
				<button
					className='wolf-store-search__clear'
					onClick={handleClear}
					aria-label='Clear search'
					type='button'
				>
					<svg
						width='12'
						height='12'
						viewBox='0 0 12 12'
						fill='none'
						aria-hidden='true'
					>
						<path
							d='M1 1l10 10M11 1L1 11'
							stroke='currentColor'
							strokeWidth='1.5'
							strokeLinecap='round'
						/>
					</svg>
				</button>
			)}
		</div>
	);
}
