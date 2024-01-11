const Error = () => null

export async function getServerSideProps() {
  return {
    props: {},
    notFound: true,
  }
}

export default Error
