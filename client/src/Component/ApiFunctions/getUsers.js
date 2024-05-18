export async function userDetailById(id) {
    console.log("function invokeds", id);
    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    };
    const response = await fetch(`http://localhost:8000/users/${id}`, {
        method: 'get',
        headers: headersList
    });
    const data = await response.json();
    return (data);
}