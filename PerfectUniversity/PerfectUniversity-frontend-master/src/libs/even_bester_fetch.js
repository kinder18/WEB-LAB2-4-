export { even_bester_fetch as default };
const even_bester_fetch = async (url, options) => {

    // Trying to make a request for the server
    const response = await fetch(url, options);


    // http 401 appears when we are unauthorized, which means you need either to log in or refresh your token, we're supposing the second one
    if (response.status == 401) {

        // Options proto
        const jwt_options = {
            method: "POST",
            body: JSON.stringify({
                token: {}
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }

        const verify_options = {};
        const refresh_options = {};

        // Cloning options props and changing body
        Object.assign(verify_options, jwt_options);
        verify_options.body = JSON.stringify({ "token": localStorage.getItem('jwt') });
        console.log(verify_options);

        // Cloning options props and changing body
        Object.assign(refresh_options, jwt_options);
        refresh_options.body = JSON.stringify({ refresh: localStorage.getItem('refresh') });
        console.log(refresh_options);


        const verify_response = await fetch('http://yyr3ll.pythonanywhere.com/api/v1/auth/verify/', verify_options);
        const verify_data = await verify_response.json();


        // If our token isnt verified, then we trying to refresh it
        if (verify_data.detail) {

            // Refreshing token
            const response = await fetch('http://yyr3ll.pythonanywhere.com/api/v1/auth/refresh/', refresh_options);
            const data = await response.json();


            console.log(data);
            localStorage.setItem('jwt', data.access);
            localStorage.setItem('refresh', data.refresh);


            console.log(options);
            options.headers.access = localStorage.getItem("jwt");
            console.log(options);
            return await fetch(url, options);

        }
    }

    return response;

}
