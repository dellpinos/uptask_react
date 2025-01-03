
export const formDate = (isoString : string) : string => {
    
    const date = new Date(isoString);
    const formatter = new Intl.DateTimeFormat('es-ES', {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        // hour: "numeric",
        // minute: "numeric"
    })

    return formatter.format(date);
}

export const diffForHumans = (isoString: string): string => {
    const now = new Date();
    const date = new Date(isoString);
    const diffMs = now.getTime() - date.getTime(); // Convierte `Date` a milisegundos

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const pluralize = (count: number, singular: string, plural: string): string =>
        count === 1 ? singular : plural;

    if (seconds < 60) return `hace ${seconds} ${pluralize(seconds, 'segundo', 'segundos')}`;
    if (minutes < 60) return `hace ${minutes} ${pluralize(minutes, 'minuto', 'minutos')}`;
    if (hours < 24) return `hace ${hours} ${pluralize(hours, 'hora', 'horas')}`;
    if (days < 30) return `hace ${days} ${pluralize(days, 'día', 'días')}`;

    const months = Math.floor(days / 30);
    if (months < 12) return `hace ${months} ${pluralize(months, 'mes', 'meses')}`;

    const years = Math.floor(months / 12);
    return `hace ${years} ${pluralize(years, 'año', 'años')}`;
};