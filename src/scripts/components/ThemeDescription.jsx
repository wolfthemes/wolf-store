export default function ThemeDescription({ theme }) {
    const title           = theme.title?.rendered;
    const excerpt         = theme.excerpt?.rendered;
    const description     = theme.theme_short_description;
    const longDescription = theme.theme_long_description;
	return (
        <div className='wolf-theme-description wolf-theme-single__section'>
			<div className='wolf-theme-single__wrapper'>
            { excerpt && (
                <div
                    className='wolf-theme-hero__excerpt'
                    dangerouslySetInnerHTML={{ __html: excerpt }}
                />
            ) }

            { longDescription && (
                <div className='wolf-theme-hero__description'>
                    { longDescription }
                </div>
            ) }

			</div>
		</div>
	);
}
