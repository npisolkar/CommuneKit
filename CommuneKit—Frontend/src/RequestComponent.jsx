/* RequestComponent: The request objects listed in the notifications page,
*  through which borrowing and lending will be carried out */

import {useState, useEffect} from 'react'

export default function RequestComponent({data, isLending}) {
    return (
        <>
                {isLending ?
                    <tr>
                        <td>{data.startDay}</td>
                        <td>{data.startMonth}</td>
                        <td>{data.startYear}</td>
                        <td>{data.endDay}</td>
                        <td>{data.endMonth}</td>
                        <td>{data.endYear}</td>
                        <td>{data.borrowingUser}</td>
                        <td>{data.itemId}</td>
                        <td>{data.message}</td>
                        <td>
                            <button>Accept</button>
                        </td>
                        <td>
                            <button>Deny</button>
                        </td>
                    </tr>
                    :
                    <tr>
                        <td>{data.startDay}</td>
                        <td>{data.startMonth}</td>
                        <td>{data.startYear}</td>
                        <td>{data.endDay}</td>
                        <td>{data.endMonth}</td>
                        <td>{data.endYear}</td>
                        <td>{data.lendingUser}</td>
                        <td>{data.itemId}</td>
                        <td>{data.message}</td>
                        <td><p>Request has been approved</p></td>
                    </tr>
                }

        </>
    )
}