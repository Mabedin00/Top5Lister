import React, { useContext, useEffect } from 'react'
import AuthContext from '../auth'

export default function AllListsScreen() {
    const { auth } = useContext(AuthContext);

    
    return (
        <div >
            All Lists
        </div>
    )
}