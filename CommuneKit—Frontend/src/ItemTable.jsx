/* ItemTable: A class handling the displaying of lists of items.
*  Up to a certain amount of items should load at once, with
*  subsequent requests populating more. */
export default function ItemTable({headName}) {
    return (
        <>
            <h1>{headName}</h1>
                <table className="item-table">
                    <tbody>
                    <tr>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
        </>
    );
}