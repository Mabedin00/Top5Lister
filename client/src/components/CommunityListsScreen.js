import React, { useContext, useEffect } from 'react'
import AuthContext from '../auth'

export default function CommunityListsScreen() {
    const { auth } = useContext(AuthContext);

    
    return (
        <div >
            Community Lists
        </div>
    )
}