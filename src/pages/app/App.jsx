import { Flex, Button } from 'antd';
import { Link } from 'react-router-dom';

import style from './App.module.css';

function App() {
  return (
    <Flex className={style.container} justify="center" align="center">
      <Flex vertical gap="small">
        <Link to="/people"><Button type="primary">People</Button></Link>
        <Link to="/planets"><Button type="primary">Planets</Button></Link>
      </Flex>
    </Flex>
  );
}

export default App;
