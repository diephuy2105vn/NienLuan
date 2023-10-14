function useFormData() {
    function createFormData(data) {
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            if (typeof data[key] === "object") {
                data[key].forEach((item) => {
                    formData.append(key, item);
                });
                return;
            }
            formData.append(key, data[key]);
        });
        return formData;
    }
    return { createFormData };
}

export default useFormData;
