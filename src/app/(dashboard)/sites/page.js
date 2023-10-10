import { Flex, Heading } from "@chakra-ui/react";

import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

import verifyUserToken from "@/utils/veriftUserToken";
import { redirect } from "next/dist/server/api-utils";

import EmptyState from "@/components/dashboard/sites/EmptyState";
import AddSiteModal from "@/components/dashboard/sites/AddSiteModal";
import SiteTable from "@/components/dashboard/sites/SiteTable";

export default async function Sites() {
    const { uid, error } = await verifyUserToken();

    if (error) redirect("/");
    const sites = [];

    const q = query(collection(db, 'sites'), where('authorId', '==', uid));
    const querySnapshot = await getDocs(q, orderBy('createdAt', 'desc'));
    querySnapshot.forEach(doc => sites.push({ ...doc.data(), id: doc.id }));

    return (
        <>
            <Flex align='center' justify='space-between' mb={8}>
                <Heading as="h1" fontWeight="medium">My Sites</Heading>
                {sites.length != 0 && <AddSiteModal >+ Add site</AddSiteModal>}
            </Flex>

            {sites.length == 0 ? <EmptyState /> : <SiteTable sites={sites} />}
        </>
    );
}