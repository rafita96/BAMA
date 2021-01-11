import Layout from '../components/layouts/Layout'
import Games from '../components/Games'
import fs from "fs";

import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import withAuthentication from '../lib/withAuthentication';
import { Row, Col } from 'react-bootstrap';


function Juegos({data, user}) {

  return (
    <Layout title="Juegos" role={user.role}>
      <Games games={data}/>
    </Layout>
  );
}

// This gets called on every request
export async function getStaticProps() {
  const fileNames = fs.readdirSync('public/juegos/')
  const data = fileNames.map(fileName => {
    let fileContents = JSON.parse(fs.readFileSync("public/juegos/"+fileName+"/meta.json", 'utf8'));
    fileContents.filename = fileName;
    return fileContents;
  });
  return {
    props: {data}
  }
  // Fetch necessary data for the blog post using params.id
}

const mapStateToProps = state => ({
  user: state.users.user
});

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default withAuthentication(connect(mapStateToProps, mapDispatchToProps)(Juegos));