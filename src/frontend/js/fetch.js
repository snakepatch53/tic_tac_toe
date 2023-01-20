let fetch_query = (method, formData, url) => {
    return fetch(url, {
        method: method,
        headers: new Headers().append("Accept", "application/json"),
        body: formData,
    })
        .then((res) => res.json())
        .then((res) => res);
};
