import React, { useContext, useEffect } from 'react'
import AuthContext from '../auth'

export default function UserListsScreen() {
    const { auth } = useContext(AuthContext);

    
    return (
        <div >
            User Lists
        </div>
    )
}