'use client';

import NextLink from 'next/link';

import { Box, Link } from '@chakra-ui/react';
import { Table, Tr, Th, Td } from './Table';

import DeleteSiteButton from './DeleteSiteButton';
const SiteTable = ({ sites }) => {
  function dateFormatter(date) {
    return new Date(date).toDateString();
  }

  return (
    <Box overflowX="auto">
      <Table w="full">
        <thead>
          <Tr>
            <Th>Name</Th>
            <Th>Site Link</Th>
            <Th>Feedback Link</Th>
            <Th>Date Added</Th>
            <Th width="50px">{''}</Th>
          </Tr>
        </thead>

        <tbody>
          {sites.map((site) => (
            <Box as="tr" key={site.id}>
              <Td fontWeight="medium">{site.name}</Td>
              <Td>
                <Link href={site.url} isExternal>
                  {site.url}
                </Link>
              </Td>
              <Td>
                <Link
                  as={NextLink}
                  href="/site/siteId"
                  color="blue.500"
                  fontWeight="medium"
                >
                  View Feedback
                </Link>
              </Td>
              <Td fontSize="sm">{dateFormatter(site.createdAt)}</Td>
              <Td>
                <DeleteSiteButton siteId={site.id} />
              </Td>
            </Box>
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default SiteTable;
