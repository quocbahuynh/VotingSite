import { ReactSearchAutocomplete } from 'react-search-autocomplete'


export default function SearchForm({ items, handleDetail }) {

    const itemList = items.map((item, i) => ({
        id: i,
        name: item.title,
        data: item,
    }));

    const handleOnSelect = (item) => {
        // the item selected
        handleDetail(item.data);
    }

    const formatResult = (item) => {
        return (
            <>
                <span style={{ display: 'block', textAlign: 'left' }} >{item.name}</span>
            </>
        )
    }

    return (
        <>
            <form action="#" className="header__search">
                <div style={{ width: 400 }}>
                    <ReactSearchAutocomplete
                        items={itemList}
                        onSelect={handleOnSelect}
                        autoFocus
                        formatResult={formatResult}
                        maxResults={15}
                        placeholder="Seach team..."
                    />
                </div>
            </form>
        </>
    )
}
