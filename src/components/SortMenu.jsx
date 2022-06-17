import "../styles/Sortmenu.css"

const SortMenu = ({ setOrder, setSortBy }) => {

    const handleSumbit = (event) => {
        event.preventDefault();
        for(let i = 0; i < 6; i++){
            if(event.target[i].checked === true) {
                if(event.target[i].name === "sort_by") {
                    setSortBy(event.target[i].id);
                }
                if(event.target[i].name === "order") {
                    setOrder(event.target[i].id);
                }
            }
        }
    }

    return (
        <section className="SortMenu">
            <form className="SortMenu__form" onSubmit={handleSumbit}>
                <div className="SortMenu__sortby">
                    <h4>Sort by:</h4>
                    <ul>
                        <li><input id="created_at" name="sort_by" type="radio" defaultChecked></input><label htmlFor="created_at">Date</label></li>
                        <li><input id="comment_count" name="sort_by" type="radio"></input><label htmlFor="comment_count">Comment Count</label></li>
                        <li><input id="votes" name="sort_by" type="radio"></input><label htmlFor="votes">Votes</label></li>
                    </ul>
                </div>
                <div className="SortMenu__order">
                    <h4>Order:</h4>
                    <ul>
                        <li><input id="desc" name="order" type="radio" defaultChecked></input><label htmlFor="desc">Descending</label></li>
                        <li><input id="asc" name="order" type="radio"></input><label htmlFor="asc">Ascending</label></li>
                    </ul>
                </div>
                <button type="submit">Search</button>
            </form>
        </section>
    )
}

export default SortMenu;