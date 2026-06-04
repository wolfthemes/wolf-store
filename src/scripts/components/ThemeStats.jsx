
import { useEffect, useRef } from 'react';

const STATS = [
    { to: 36,  decimals: 0, suffix: 'K+', label: 'Customers'  },
    { to: 14,  decimals: 0, suffix: 'y',  label: 'Experience' },
    { to: 4.5, decimals: 1, suffix: '/5', label: 'Rating'     },
];

const DURATION = 1600; // ms

function easeOut( t ) {
    return 1 - Math.pow( 1 - t, 3 );
}

function StatItem( { to, decimals, prefix = '', suffix = '', label } ) {
    const ref = useRef( null );

    useEffect( () => {
        const el = ref.current;
        if ( ! el ) return;

        let raf;
        let started = false;

        const run = ( startTime ) => {
            const animate = ( now ) => {
                const elapsed = now - startTime;
                const progress = Math.min( elapsed / DURATION, 1 );
                const value = to * easeOut( progress );
                el.textContent = prefix + value.toFixed( decimals ) + suffix;
                if ( progress < 1 ) {
                    raf = requestAnimationFrame( animate );
                }
            };
            raf = requestAnimationFrame( animate );
        };

        const observer = new IntersectionObserver(
            ( [ entry ] ) => {
                if ( entry.isIntersecting && ! started ) {
                    started = true;
                    run( performance.now() );
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        observer.observe( el );

        return () => {
            observer.disconnect();
            cancelAnimationFrame( raf );
        };
    }, [ to, decimals, prefix, suffix ] );

    return (
        <div className='wolf-theme-stats__item'>
            <span ref={ ref } className='wolf-theme-stats__value'>
                { prefix }{ to.toFixed( decimals ) }{ suffix }
            </span>
            <span className='wolf-theme-stats__label'>{ label }</span>
        </div>
    );
}

export default function ThemeStats() {
    return (
        <div className='wolf-theme-stats'>
            { STATS.map( ( stat ) => (
                <StatItem key={ stat.label } { ...stat } />
            ) ) }
        </div>
    );
}
