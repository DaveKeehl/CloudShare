const withParameters = (callback) => {
    return (event) => {
        event.preventDefault();

        let form = event.target;
        let obj = {};

        Array.from(form.elements)
            .forEach((element) => {
                if(element.type != 'file')
                    obj[element.name] = element.value;
                else
                    obj[element.name] = element.files[0];

                element.value = '';
            });

        callback(obj);
    }
}
