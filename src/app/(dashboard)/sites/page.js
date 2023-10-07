import { Heading, Text } from "@chakra-ui/react";

import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

import EmptyState from "@/components/dashboard/sites/EmptyState";

export default async function Sites() {
    const sites = [];

    const q = query(collection(db, 'sites'), orderBy("name"));
    const querySnapshot = (await getDocs(q)).forEach(doc => sites.push(doc.data()));

    return (
        <>
            <Heading as="h1" fontWeight="medium" mb={8}>My Sites</Heading>
            <EmptyState />


            {sites.map(site => <Text>{site.name}</Text>)}
        </>
    );
}