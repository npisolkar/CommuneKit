export default function ItemTable({headName}) {
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