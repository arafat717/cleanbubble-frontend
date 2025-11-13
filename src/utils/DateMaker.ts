const DateMaker = (dateString: string): string => {
    const date = new Date(dateString);

    // Example: dd-mm-yyyy
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}

export default DateMaker;
