export const formatDate = (date_n: number) => {
    const date = new Date(date_n);
    const day = date.toLocaleString('default', { day: '2-digit' });
    const month = date.toLocaleString('default', { month: 'short' });

    return `${day} ${month}`;
};