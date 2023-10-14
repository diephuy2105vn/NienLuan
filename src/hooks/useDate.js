function useDate() {
    function toDateString(date) {
        const newDate = new Date(date);
        return newDate.toLocaleDateString("vi-VN");
    }

    return { toDateString };
}

export default useDate;
