export async function userDetailById(id) {
    console.log("function invokeds", id);
    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    };
    const response = await fetch(`https://educationrevolution-1.onrender.com/users/${id}`, {
        method: 'get',
        headers: headersList
    });
    const data = await response.json();
    return (data);
}