/* ItemTable: A class handling the displaying of lists of items.
*  Up to a certain amount of items should load at once, with
*  subsequent requests populating more. */
import ItemComponent from "./ItemComponent.jsx";

export default function ItemTable({headName, items}) {

    return (
        <>
            <h1>{headName}</h1>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Category</th>
                </tr>
                </thead>
                <tbody>
                {
                    items.map(item => (
                        <ItemComponent data={item} />
                    ))
                }
                </tbody>
            </table>
        </>
    );
}