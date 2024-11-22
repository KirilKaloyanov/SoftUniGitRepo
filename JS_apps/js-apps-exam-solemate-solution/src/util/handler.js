export function handler(callback) {
    return function (event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        for (let datum in data) {
            if (data[datum] == '') {
                return alert('All fields are required');
            }
        }

        callback(data);
        return event.target;
    }
}