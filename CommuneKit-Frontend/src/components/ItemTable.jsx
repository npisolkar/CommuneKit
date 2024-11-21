import React, { useState, useEffect } from 'react';
import ItemComponent from './ItemComponent.jsx';
import {Link} from "react-router-dom";

export default function ItemTable({ headName, items, userID }) {
    const [displayItems, setDisplayItems] = useState(items || []);

    useEffect(() => {
            setDisplayItems(items);
    }, [userID, items]);

    return (
        <div className="table-container">
            <div className="table-head"><b>{headName}</b></div>
            {displayItems.length > 0 ?
            <table className="item-table">
                <thead>
                    <tr>
                        <th></th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                {displayItems.map(item => (
                    <ItemComponent key={`item-${item.itemID}-${userID}-${headName}`} data={item} userID={userID} />
                ))}
                </tbody>
            </table>
                :
                <>
                    {headName==="My Posted Items" ?
                        <div className="no-items">
                            <p>No posted items...</p>
                            <Link to="/newitem"><button>Create New Item</button></Link>
                        </div> : null
                    }
                    {headName==="My Borrowed Items" ?
                        <div>
                            <p>No borrowed items...</p>
                            <Link to="/search"><button>To Search</button></Link>
                        </div> : null
                    }
                    {headName==="My Lent Items" ?
                        <div>
                            <p>No lent items...</p>
                            <Link to="/newitem"><button>Create New Item</button></Link>
                        </div> : null
                    }
                    {headName==="Suggested Items" ?
                        <div>
                            <p>No items at all...</p>
                            <Link to="/search"><button>To Search</button></Link>
                        </div> : null
                    }
                </>
            }
        </div>
    );
}
