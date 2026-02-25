// https://ipinfo.io//geo




export const GeoService = {
    getCurrent: async () => {
        try {
            const response = await fetch('https://ipinfo.io//geo');
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`)
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Fetch failed:', error);
        }  
    },

    search: async (ip: string) => {
        try {
            const response = await fetch(`https://ipinfo.io/${ip}/json`);
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`)
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Fetch failed:', error)
        }
    }
}