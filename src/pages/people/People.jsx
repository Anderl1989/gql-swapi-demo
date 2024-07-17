import { useLazyQuery, useQuery } from '@apollo/client';
import { Peoples, Person } from './People.gql';
import { Button, Card, Descriptions, Flex, Menu, Spin } from 'antd';

import styles from './People.module.css';

const labels = {
  height: 'Height',
  hairColor: 'Hair color',
  gender: 'Gender',
  eyeColor: 'Eye color',
  birthYear: 'Birth year',
};

function People() {
  const { data, loading, fetchMore } = useQuery(Peoples);
  const [getPerson, { loading: loadPerson, data: personData }] = useLazyQuery(Person);

  if (loading) return <Spin tip="Loading" size="large" />;

  const peoples = data.allPeople.edges.map((edge) => ({
    label: edge.node.name,
    key: edge.node.id,
  }));
  const pageInfo = data.allPeople.pageInfo;

  const person = personData?.person;

  console.log('data', person);

  return (
    <Flex className={styles.container}>
      <Flex vertical gap="small" className={styles.listContainer}>
        <Menu
          items={peoples}
          onClick={(info) => {
            getPerson({ variables: { personId: info.key }});
          }}
        />
        { pageInfo.hasNextPage && (
          <Button
            onClick={() => {
              fetchMore({ variables: { after: pageInfo.endCursor }});
            }}
          >
            Load more
          </Button>
        )}
      </Flex>
      {(loadPerson || person) && (
        <Flex vertical gap="small" className={styles.cardContainer}>
          {loadPerson && <Spin tip="Loading" size="large" />}
          {person && (
            <Card
              className={styles.card}
              title={person.name}
            >
              <Descriptions
                className={styles.descriptions}
                title="Details"
                column={1}
                items={Object.keys(person).filter(key => !['name', '__typename'].includes(key)).map((key, i) => ({
                  key: i,
                  label: labels[key],
                  children: person[key],
                }))}
              />
            </Card>
          )}
        </Flex>
      )}
    </Flex>
  );
}

export default People;