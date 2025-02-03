import { useEffect, useState } from "react";

export default function Profile() {
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const data = { email: "ohri@gmail.com", password: "rajat123" };

        const fetchUser = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/v1/user/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });

                if (!response.ok) {
                    throw new Error("Error getting user");
                }

                const result = await response.json();
                setProfile(result.data.user);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUser();
    });

    return (
        <div>
            <h2>My Profile</h2>
            <p>Name: {profile.name}</p>
            <p>Id : {profile._id}</p>
            <p>Contact : {profile.contactNumber}</p>
        </div>
    );
}
