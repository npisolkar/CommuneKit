/* RequestComponent: The request objects listed in the notifications page,
*  through which borrowing and lending will be carried out */

export default function RequestComponent({data, isLending}) {
    return (
        <>
                {isLending ?
                    <tr>
                        <td>{data.startMonth}/{data.startDay}/{data.startYear}</td>
                        <td>{data.endMonth}/{data.endDay}/{data.endYear}</td>
                        <td>
                            <button>Accept</button>
                        </td>
                        <td>
                            <button>Deny</button>
                        </td>
                    </tr>
                    :
                    <tr>
                        <td>{data.startMonth}/{data.startDay}/{data.startYear}</td>
                        <td>{data.endMonth}/{data.endDay}/{data.endYear}</td>
                        <td><a href={"/profile/" + data.borrowingUserId}>Click 4 Profile</a></td>
                    </tr>
                }

        </>
    )
}