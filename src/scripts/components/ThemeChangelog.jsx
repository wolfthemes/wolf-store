import { useState } from 'react';

export default function ThemeChangelog({ theme }) {
	const changelog = theme?.theme_changelog;
	const [open, setOpen] = useState(false);

	if (!changelog) {
		return null;
	}
	return (
		<div className='wolf-theme-changelog wolf-theme-single__section'>
			<div className='wolf-theme-single__wrapper'>
				<button
					className='wolf-theme-changelog__toggle'
					onClick={() => setOpen(!open)}
				>
					{open ? 'Hide changelog ↑' : 'View changelog ↓'}
				</button>
				{open && (
					<div
						className='wolf-theme-changelog__content'
						dangerouslySetInnerHTML={{ __html: changelog }}
					/>
				)}
			</div>
		</div>
	);
}
