import React, {useState, useEffect} from 'react';
import Table from "./Table.jsx";
import Form from "./Form.jsx";

function MyApp() {
    const [characters, setCharacters] = useState([]);

    function removeOneCharacter(index) {
        const userToDelete = characters[index];

        if (userToDelete && userToDelete.id) {
            const deleteUrl = `http://localhost:8000/users/${userToDelete.id}`;

            fetch(deleteUrl, {method: 'DELETE'})
                .then(response => {
                    if (response.status === 204) {
                        const updated = characters.filter((character) => character.id !== userToDelete.id);
                        setCharacters(updated);
                    } else if (response.status === 404) {
                        console.error('User not found, could not delete.');
                    }
                });
        } else {
            console.error('Invalid user data or missing ID.');
        }
    }

    function updateList(person) {
        postUser(person)
            .then(response => {
                if (response.status === 201) {
                    return response.json()
                } else {
                    throw new Error('Failed to add user');
                }
            })
            .then(addedPerson => setCharacters([...characters, addedPerson]))
            .catch((error) => {
                console.log(error);
            })
    }

    function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
    }

    function postUser(person) {
        const promise = fetch("Http://localhost:8000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
        });

        return promise;
    }

    useEffect(() => {
        fetchUsers()
            .then((res) => res.json())
            .then((json) => setCharacters(json["users_list"]))
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="container">
            <Table
                characterData={characters}
                removeCharacter={removeOneCharacter}
            />
            <Form handleSubmit={updateList}/>
        </div>
    );
}

export default MyApp;