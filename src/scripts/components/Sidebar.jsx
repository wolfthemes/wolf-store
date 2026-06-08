import { useState } from 'react';
import { useTerms } from './hooks/useTerms';

const FILTER_GROUPS = [
    { slug: 'theme_cat',          label: 'Categories' },
    { slug: 'theme_tag',          label: 'Tags', orderby: 'count', order: 'desc' },
    { slug: 'theme_color',        label: 'Color' },
    { slug: 'theme_price',        label: 'Price Range', prefix: '$' },
    { slug: 'theme_style',        label: 'Style' },
    { slug: 'theme_page_builder', label: 'Page Builder' },
];

const VISIBLE_LIMIT = 6;

function TermItem( { term, slug, prefix, activeTaxonomy, activeTermId, onChange } ) {
    return (
        <li>
            <a
                href='#'
                className={ `wolf-store-sidebar__term${
                    activeTaxonomy === slug && activeTermId === term.id ? ' is-active' : ''
                }` }
                onClick={ e => { e.preventDefault(); onChange( slug, term.id ); } }
            >
                <span className='wolf-store-sidebar__label'>
                    { term.term_color && (
                        <span
                            className='wolf-store-sidebar__swatch'
                            style={ { background: term.term_color } }
                        />
                    ) }
                    { prefix && <span className='wolf-store-sidebar__prefix'>{ prefix }</span> }
                    { term.name }
                </span>
                <span className='wolf-store-sidebar__count'>{ term.count }</span>
            </a>
        </li>
    );
}

function FilterGroup( { slug, label, prefix, orderby, order, activeTaxonomy, activeTermId, onChange } ) {
    const { terms } = useTerms( slug, { orderby, order } );
    const [ expanded, setExpanded ] = useState( false );

    if ( ! terms.length ) return null;

    const hasMore     = terms.length > VISIBLE_LIMIT;
    const visible     = terms.slice( 0, VISIBLE_LIMIT );
    const hidden      = hasMore ? terms.slice( VISIBLE_LIMIT ) : [];
    const hiddenCount = hidden.length;
    const termProps   = { slug, prefix, activeTaxonomy, activeTermId, onChange };

    return (
        <div className='wolf-store-sidebar__group'>
            <h3 className='wolf-store-sidebar__title'>{ label }</h3>
            <ul className='wolf-store-sidebar__list'>
                { visible.map( term => <TermItem key={ term.id } term={ term } { ...termProps } /> ) }
            </ul>
            { hasMore && (
                <>
                    <div className={ `wolf-store-sidebar__extra${ expanded ? ' is-open' : '' }` }>
                        <ul className='wolf-store-sidebar__list'>
                            { hidden.map( term => <TermItem key={ term.id } term={ term } { ...termProps } /> ) }
                        </ul>
                    </div>
                    <button
                        className='wolf-store-sidebar__toggle'
                        onClick={ () => setExpanded( ! expanded ) }
                    >
                        { expanded ? 'Show Less' : `Show More (${ hiddenCount })` }
                    </button>
                </>
            ) }
        </div>
    );
}

export default function Sidebar( { activeTaxonomy, activeTermId, onChange, isOpen } ) {
    return (
        <aside className={ `wolf-store-sidebar${ isOpen ? ' is-open' : '' }` }>

            <div className='wolf-store-sidebar__group'>
                <a
                    href='#'
                    className={ `wolf-store-sidebar__all${ ! activeTermId ? ' is-active' : '' }` }
                    onClick={ e => { e.preventDefault(); onChange( '', 0 ); } }
                >
                    All Themes
                </a>
            </div>

            { FILTER_GROUPS.map( group => (
                <FilterGroup
                    key={ group.slug }
                    { ...group }
                    activeTaxonomy={ activeTaxonomy }
                    activeTermId={ activeTermId }
                    onChange={ onChange }
                />
            ) ) }

        </aside>
    );
}
