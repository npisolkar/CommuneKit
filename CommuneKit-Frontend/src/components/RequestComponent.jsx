/* RequestComponent: The request objects listed in the notifications page,
*  through which borrowing and lending will be carried out */

export default function RequestComponent({data, isLending}) {
    return (
        <>
                {isLending ?
                    <tr>
                        <td>{data.startDay}/{data.startMonth}/{data.startYear}</td>
                        <td>{data.endDay}/{data.endMonth}/{data.endYear}</td>
                        <td>
                            <button>Accept</button>
                        </td>
                        <td>
                            <button>Deny</button>
                        </td>
                    </tr>
                    :
                    <tr>
                        <td>{data.startDay}/{data.startMonth}/{data.startYear}</td>
                        <td>{data.endDay}/{data.endMonth}/{data.endYear}</td>
                    </tr>
                }

        </>
    )
}