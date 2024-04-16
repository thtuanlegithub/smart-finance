import { useMemo } from 'react';

export function useSnapPoints() {
    return useMemo(() => ['50%', '75%', '98%'], []);
}