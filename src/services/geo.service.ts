// https://ipinfo.io//geo




export const GeoService = {
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