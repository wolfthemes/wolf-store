import { useTerms } from './hooks/useTerms';

export default function Sidebar( { activeTaxonomy, activeTermId, onChange } ) {
    const { terms: cats } = useTerms( 'theme_cat' );
    const { terms: tags } = useTerms( 'theme_tag' );

    const handleClick = ( e, taxonomy, termId ) => {
        e.preventDefault();
        onChange( taxonomy, termId );
    };

    return (
        <aside className='wolf-store-sidebar'>

            { /* All */ }
            <div className='wolf-store-sidebar__group'>

                    <a href='#'
                    className={ `wolf-store-sidebar__all${ ! activeTermId ? ' is-active' : '' }` }
                    onClick={ e => handleClick( e, '', 0 ) }
                >
                    All Themes
                </a>
            </div>

            { /* Categories */ }
            { cats.length > 0 && (
                <div className='wolf-store-sidebar__group'>
                    <h3 className='wolf-store-sidebar__title'>Categories</h3>
                    <ul className='wolf-store-sidebar__list'>
                        { cats.map( term => (
                            <li key={ term.id }>

                                    <a href='#'
                                    className={ `wolf-store-sidebar__term${
                                        activeTaxonomy === 'theme_cat' && activeTermId === term.id
                                            ? ' is-active' : ''
                                    }` }
                                    onClick={ e => handleClick( e, 'theme_cat', term.id ) }
                                >
                                    { term.name }
                                    <span className='wolf-store-sidebar__count'>{ term.count }</span>
                                </a>
                            </li>
                        ) ) }
                    </ul>
                </div>
            ) }

            { /* Tags */ }
            { tags.length > 0 && (
                <div className='wolf-store-sidebar__group'>
                    <h3 className='wolf-store-sidebar__title'>Tags</h3>
                    <ul className='wolf-store-sidebar__list'>
                        { tags.map( term => (
                            <li key={ term.id }>

                                    <a href='#'
                                    className={ `wolf-store-sidebar__term${
                                        activeTaxonomy === 'theme_tag' && activeTermId === term.id
                                            ? ' is-active' : ''
                                    }` }
                                    onClick={ e => handleClick( e, 'theme_tag', term.id ) }
                                >
                                    { term.name }
                                    <span className='wolf-store-sidebar__count'>{ term.count }</span>
                                </a>
                            </li>
                        ) ) }
                    </ul>
                </div>
            ) }

        </aside>
    );
}
