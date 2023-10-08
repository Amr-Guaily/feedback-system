import { Flex, Heading, Text } from "@chakra-ui/react";

import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

import EmptyState from "@/components/dashboard/sites/EmptyState";
import AddSiteModal from "@/components/dashboard/sites/AddSiteModal";
import SiteTable from "@/components/dashboard/sites/SiteTable";

export default async function Sites() {
    const sites = [];

    const q = query(collection(db, 'sites'), orderBy("name"));
    const querySnapshot = (await getDocs(q)).forEach(doc => sites.push(doc.data()));

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