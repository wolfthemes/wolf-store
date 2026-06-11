import ThemePriceBox from './ThemePriceBox';

export default function ThemeHero({ theme }) {
	const thumbnail = theme.theme_hero;
	const video = theme.theme_video;
	const title = theme.title?.rendered;
	const headline = theme.theme_store_headline;
	const subheadline = theme.theme_store_subheadline;

	return (
		<div className='wolf-theme-hero'>
			{(video || thumbnail) && (
				<div className='wolf-theme-hero__thumbnail'>
					{video ? (
						<video src={video} autoPlay muted loop playsInline />
					) : (
						<img src={thumbnail} alt={title} />
					)}
				</div>
			)}

			<div className='faded-edges-overlay'></div>
			{/* <div className="noise-overlay"></div> */}

			<div className='wolf-theme-hero__content wolf-core-font-light'>
				<h1 className='wolf-theme-hero__title'>{title}</h1>

				{headline && (
					<p className='wolf-theme-hero__headline'>{headline}</p>
				)}

				{subheadline && (
					<p className='wolf-theme-hero__subheadline'>{subheadline}</p>
				)}
			</div>

			{/* Hero CTA box — top of sidebar */}
			<ThemePriceBox theme={theme} />
		</div>
	);
}
