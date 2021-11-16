import {
  Stack,
  HStack,
  unstable_Heading as Heading,
  unstable_Section as Section,
} from '@carbon/react';

export default function IndexPage({ issues, pulls }) {
  return (
    <>
      <header>Carbon Support</header>
      <Stack as="main" gap={6}>
        <Heading>Support</Heading>
        <HStack gap={6}>
          <Section>
            <Heading>Issues</Heading>
            <dl className="statistics">
              <dt>Opened last week</dt>
              <dd>53</dd>
              <dt>Closed last week</dt>
              <dd>50</dd>
              <dt>Delta Δ</dt>
              <dd>+3</dd>
            </dl>
          </Section>
          <Section>
            <Heading>Pull Requests</Heading>
            <dl className="statistics">
              <dt>Opened last week</dt>
              <dd>53</dd>
              <dt>Closed last week</dt>
              <dd>50</dd>
              <dt>Delta Δ</dt>
              <dd>+3</dd>
            </dl>
          </Section>
        </HStack>
      </Stack>
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      issues: [],
      pulls: [],
    },
  };
}
