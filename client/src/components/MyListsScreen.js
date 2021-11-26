import React, { useContext, useEffect } from 'react'
import AuthContext from '../auth'

export default function MyListsScreen() {
    const { auth } = useContext(AuthContext);

    
    return (
        <div >
            My Lists
        </div>
    )
}