export const getTasks = async (token) => {
    const res = await fetch(`http://localhost:8080/api/tasks`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
        return res.json();
};

export const addTask = async(data, token) => {
    const res = await fetch(
        `http://localhost:8080/api/tasks`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data)
        });
        return res.json();
};

export const deleteTask = async (id,token) => {
    const res =  fetch(
        `http://localhost:8080/api/tasks/${id}`,
        {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
    return res;
};

export const updateTask = async (data, token) => {
    const res = await fetch(
        `http://localhost:8080/api/tasks/${data._id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data)
        });
        return res.json();
};

export const loginUser = async (credentials) => {
    const res = await fetch(`http://localhost:8080/api/users?action=login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
    return res.json();
};

export const signupUser = async (userData) => {
    const res = await fetch(`http://localhost:8080/api/users?action=register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    return res.json();
};