export function handler(callback){
    return function (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const data = Object.fromEntries(formData);
        
        for (let datum in data) {
            if (data[datum] == ''){
                
                return alert('All fields are required')
            }
        }
        
        callback(data);
        e.target.reset();

    }
}