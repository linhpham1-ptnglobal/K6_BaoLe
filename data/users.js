export function getUsers() {
    let data = []
    // data.push({ 
    //     "username": "sysadm", 
    //     "password": "password" 
    // })
    for (let n = 1500; n <= 3000; n++) {
        data.push({ 
            "username": "jmeterUser" + n,
            "password": "password"
        })
    }
    return data
}
export function getAdminUsers() {
    let data = []
    // data.push({ 
    //     "username": "sysadm", 
    //     "password": "password" 
    // })
    for (let n = 1; n <= 2; n++) {
        data.push({ 
        "username": "sysadm", 
        "password": "password" 
        })
    }
    return data
}