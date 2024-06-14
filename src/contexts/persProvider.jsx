import React, { useState } from 'react';

export const PersContext = React.createContext({
    pers: null,
    setPers: () => {},
});

export default function PersProvider({ children }) {
    // Add 'children' to props validation
    PersProvider.propTypes = {
        children: React.ReactNode,
    };
    const [pers, setPers] = useState(null);

    return (
        <PersContext.Provider value={{ pers, setPers }}>
            {children}
        </PersContext.Provider>
    );

}