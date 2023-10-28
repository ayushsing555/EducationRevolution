export function LoggedInOrNot () {
    const item = localStorage.getItem("name");
    if(item==null){
        return false;
    }
    return true;
}