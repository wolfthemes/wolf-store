import { useTerms } from './hooks/useTerms';

const FILTER_GROUPS = [
    { slug: 'theme_cat',          label: 'Categories' },
    { slug: 'theme_tag',          label: 'Tags' },
    { slug: 'theme_color',        label: 'Color' },
    { slug: 'theme_price',        label: 'Price Range' },
    { slug: 'theme_style',        label: 'Style' },
    { slug: 'theme_page_builder', label: 'Page Builder' },
];

function FilterGroup( { slug, label, activeTaxonomy, activeTermId, onChange } ) {
    const { terms } = useTerms( slug );
    if ( ! terms.length ) return null;

    return (
        <div className='wolf-store-sidebar__group'>
            <h3 className='wolf-store-sidebar__title'>{ label }</h3>
            <ul className='wolf-store-sidebar__list'>
                { terms.map( term => (
                    <li key={ term.id }>
                        <a
                            href='#'
                            className={ `wolf-store-sidebar__term${
                                activeTaxonomy === slug && activeTermId === term.id ? ' is-active' : ''
                            }` }
                            onClick={ e => { e.preventDefault(); onChange( slug, term.id ); } }
                        >
                            { term.term_color && (
                                <span
                                    className='wolf-store-sidebar__swatch'
                                    style={ { background: term.term_color } }
                                />
                            ) }
                            { term.name }
                            <span className='wolf-store-sidebar__count'>{ term.count }</span>
                        </a>
                    </li>
                ) ) }
            </ul>
        </div>
    );
}

export default function Sidebar( { activeTaxonomy, activeTermId, onChange } ) {
    return (
        <aside className='wolf-store-sidebar'>

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
