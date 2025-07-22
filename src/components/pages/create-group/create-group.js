"use client"

import { useEffect, useState } from "react";

import CreateGroupButtons from "./create-group-buttons";
import CreateGroupMembers from "./create-group-members";
import CreateGroupSearch from "./create-group-search";

export default function CreateGroup() {
    const [members, setMembers] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getMembers = setTimeout(() => {
            setLoading(false);
        }, 2000);

        () => clearTimeout(getMembers);
    }, []);

    return (
        <section className='flex flex-col w-full max-w-[540px] bg-white min-[540px]:rounded-[10px] min-[540px]:border min-[540px]:border-neutral-200'>
            <CreateGroupSearch
                setMembers={setMembers}
                selectedMembers={selectedMembers}
                setSelectedMembers={setSelectedMembers}
            />

            <CreateGroupMembers
                loading={loading}
                members={members}
                selectedMembers={selectedMembers}
            />

            <CreateGroupButtons
                selectedMembers={selectedMembers}
            />
        </section>
    )
}