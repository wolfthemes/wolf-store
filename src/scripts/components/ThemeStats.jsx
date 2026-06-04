
const STATS = [
    { value: '35K+',   label: 'Customers'         },
    { value: '14y',    label: 'Experience' },
    { value: '4.5/5',  label: 'Rating'     },
];

export default function ThemeStats() {
    return (
        <div className='wolf-theme-stats'>
            { STATS.map( ( { value, label } ) => (
                <div key={ label } className='wolf-theme-stats__item'>
                    <span className='wolf-theme-stats__value'>{ value }</span>
                    <span className='wolf-theme-stats__label'>{ label }</span>
                </div>
            ) ) }
        </div>
    );
}
