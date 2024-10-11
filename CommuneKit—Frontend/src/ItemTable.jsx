/* ItemTable: A class handling the displaying of lists of items.
*  Up to a certain amount of items should load at once, with
*  subsequent requests populating more. */
const userID = localStorage.getItem("userId")

export default function ItemTable({headName, userID}) {
    return (
        <>
            <h1>{headName}</h1>
                <table className="item-table">

                    <tbody>
                    <tr>

                        <td>Do you remember</td>
                    </tr>
                    <tr>
                        <td>The twenty-first night of September</td>
                    </tr>
                    </tbody>
                </table>
        </>
    );
}