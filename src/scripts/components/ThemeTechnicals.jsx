export default function ThemeTechnicals({ theme }) {
	const version = theme.theme_latest_version;
	const builder = theme.theme_builder;
	const requires = theme.theme_requires;
	const tested = theme.theme_tested;
	const updated = theme.modified
		? new Date(theme.modified).toLocaleDateString('en-US', {
				month: 'long',
				year: 'numeric',
			})
		: null;
	const slug = theme.theme_slug;
	const categories = theme._embedded?.['wp:term']?.[0] ?? [];
	const tags = theme._embedded?.['wp:term']?.[1] ?? [];
	const wikiUrl = `https://wiki.wolfthemes.com/`;
	const docUrl = `https://doc.wolfthemes.com/theme/${slug}/`;

	return (
		<div className='wolf-theme-technicals wolf-theme-single__section'>
			<div className='wolf-theme-single__wrapper'>
				<div className='wolf-theme-technicals__terms-container'>
					{/* Categories */}
					{categories.length > 0 && (
						<div className='wolf-theme-technicals__terms'>
							<h3 className='wolf-theme-technicals__section-title'>
								Categories
							</h3>
							<div className='wolf-theme-technicals__categories tagcloud'>
								{categories.map(term => (
									<a
										key={term.id}
										href={term.link}
										className='wolf-theme-technicals__category'
									>
										{term.name}
									</a>
								))}
							</div>
						</div>
					)}

					{/* Tags */}
					{tags.length > 0 && (
						<div className='wolf-theme-technicals__terms'>
							<h3 className='wolf-theme-technicals__section-title'>
								Tags
							</h3>
							<div className='wolf-theme-technicals__tags tagcloud'>
								{tags.map(term => (
									<a
										key={term.id}
										href={term.link}
										className='wolf-theme-technicals__tag'
									>
										{term.name}
									</a>
								))}
							</div>
						</div>
					)}
				</div>

				{/* Benefits */}
				{/* <ThemeBenefits /> */}

				{/* Support links */}
				<div className='wolf-theme-technicals__support'>
					<h3 className='wolf-theme-technicals__section-title'>
						Support
					</h3>
					<ul className='wolf-theme-technicals__support-links'>
						<li>
							<a
								href={docUrl}
								target='_blank'
								rel='noopener noreferrer'
							>
								📖 Documentation
							</a>
						</li>
						<li>
							<a
								href={wikiUrl}
								target='_blank'
								rel='noopener noreferrer'
							>
								🗂️ Knowledge Base
							</a>
						</li>
						<li>✉️ Direct support via Email</li>
					</ul>
				</div>

				{/* Meta */}
				<div className='wolf-theme-technicals__meta'>
					<h3 className='wolf-theme-technicals__section-title'>
						Technical Details
					</h3>
					{version && (
						<div className='wolf-theme-technicals__row'>
							<span className='wolf-theme-technicals__label'>
								Version
							</span>
							<span className='wolf-theme-technicals__value'>
								{version}
							</span>
						</div>
					)}
					{builder && (
						<div className='wolf-theme-technicals__row'>
							<span className='wolf-theme-technicals__label'>
								Builder
							</span>
							<span className='wolf-theme-technicals__value'>
								{builder}
							</span>
						</div>
					)}
					{requires && (
						<div className='wolf-theme-technicals__row'>
							<span className='wolf-theme-technicals__label'>
								Requires WP
							</span>
							<span className='wolf-theme-technicals__value'>
								{requires}+
							</span>
						</div>
					)}
					{tested && (
						<div className='wolf-theme-technicals__row'>
							<span className='wolf-theme-technicals__label'>
								Tested up to
							</span>
							<span className='wolf-theme-technicals__value'>
								{tested}
							</span>
						</div>
					)}
					{updated && (
						<div className='wolf-theme-technicals__row'>
							<span className='wolf-theme-technicals__label'>
								Last Update
							</span>
							<span className='wolf-theme-technicals__value'>
								{updated}
							</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
